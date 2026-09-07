"""
Model Training Module for Solar PV Power Prediction
"""
import sys
from pathlib import Path
import pandas as pd
import numpy as np
import joblib
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

# Try importing XGBoost, fallback to GradientBoostingRegressor if libomp is missing
HAS_XGBOOST = False
try:
    from xgboost import XGBRegressor
    HAS_XGBOOST = True
except Exception:
    HAS_XGBOOST = False

# Add project root to sys.path
sys.path.append(str(Path(__file__).resolve().parent.parent))

from src.config import MODELS_DIR, RESULTS_DIR, CLEANED_DATA_PATH
from src.features import create_features, get_feature_column_names


def train_models(df: pd.DataFrame, target_col: str = 'total_ac_power_kw', split_ratio: float = 0.8):
    """
    Splits data chronologically (no random shuffle), trains RF and XGBoost/GradientBoosting models, saves models & metrics.
    """
    df_feat = create_features(df)
    feature_cols = get_feature_column_names()

    # Filter daytime observations for training to focus on active solar generation hours
    df_daytime = df_feat[df_feat['irradiance'] > 1.0].copy()

    X = df_daytime[feature_cols]
    y = df_daytime[target_col]

    # Chronological Split (80% Train, 20% Test)
    split_idx = int(len(df_daytime) * split_ratio)
    X_train, X_test = X.iloc[:split_idx], X.iloc[split_idx:]
    y_train, y_test = y.iloc[:split_idx], y.iloc[split_idx:]

    print(f"Dataset split: Train shape {X_train.shape}, Test shape {X_test.shape}")

    # 1. Random Forest Model
    print("Training Random Forest Regressor...")
    model_rf = RandomForestRegressor(n_estimators=300, random_state=42, n_jobs=-1)
    model_rf.fit(X_train, y_train)
    y_pred_rf = model_rf.predict(X_test)

    # 2. XGBoost / Gradient Boosting Model
    model_xgb = None
    y_pred_xgb = None
    xgb_label = "XGBoost"

    if HAS_XGBOOST:
        try:
            print("Training XGBoost Regressor...")
            model_xgb = XGBRegressor(
                n_estimators=500,
                learning_rate=0.05,
                max_depth=6,
                subsample=0.8,
                colsample_bytree=0.8,
                random_state=42
            )
            model_xgb.fit(X_train, y_train)
            y_pred_xgb = model_xgb.predict(X_test)
        except Exception as e:
            print(f"XGBoost runtime warning ({e}). Falling back to GradientBoostingRegressor...")
            model_xgb = GradientBoostingRegressor(n_estimators=300, learning_rate=0.05, max_depth=5, random_state=42)
            model_xgb.fit(X_train, y_train)
            y_pred_xgb = model_xgb.predict(X_test)
            xgb_label = "Gradient Boosting"
    else:
        print("Training Gradient Boosting Regressor (sklearn fallback)...")
        model_xgb = GradientBoostingRegressor(n_estimators=300, learning_rate=0.05, max_depth=5, random_state=42)
        model_xgb.fit(X_train, y_train)
        y_pred_xgb = model_xgb.predict(X_test)
        xgb_label = "Gradient Boosting"

    # Evaluation Metrics
    def calc_metrics(y_true, y_pred, model_name):
        mae = mean_absolute_error(y_true, y_pred)
        rmse = np.sqrt(mean_squared_error(y_true, y_pred))
        r2 = r2_score(y_true, y_pred)
        return {"Model": model_name, "MAE": round(float(mae), 4), "RMSE": round(float(rmse), 4), "R2": round(float(r2), 4)}

    rf_metrics = calc_metrics(y_test, y_pred_rf, "Random Forest")
    xgb_metrics = calc_metrics(y_test, y_pred_xgb, xgb_label)

    metrics_df = pd.DataFrame([rf_metrics, xgb_metrics])
    print("\n--- MODEL PERFORMANCE COMPARISON ---")
    print(metrics_df.to_string(index=False))

    # Save models
    MODELS_DIR.mkdir(parents=True, exist_ok=True)
    rf_path = MODELS_DIR / "random_forest.pkl"
    xgb_path = MODELS_DIR / "xgboost.pkl"

    joblib.dump(model_rf, rf_path)
    joblib.dump(model_xgb, xgb_path)
    print(f"\nSaved models to {MODELS_DIR}")

    # Save metrics
    metrics_path = RESULTS_DIR / "metrics" / "model_metrics.csv"
    metrics_path.parent.mkdir(parents=True, exist_ok=True)
    metrics_df.to_csv(metrics_path, index=False)
    print(f"Saved metrics to {metrics_path}")

    return model_rf, model_xgb, metrics_df, X_test, y_test


if __name__ == "__main__":
    if CLEANED_DATA_PATH.exists():
        df_clean = pd.read_csv(CLEANED_DATA_PATH)
        train_models(df_clean)
    else:
        from src.data_loader import load_nise_raw, extract_key_metrics
        from src.preprocessing import clean_nise_data
        df_raw = load_nise_raw()
        df_clean = clean_nise_data(extract_key_metrics(df_raw))
        train_models(df_clean)
