"""
Prediction Module for Expected Power Inference
"""
import sys
from pathlib import Path
import pandas as pd
import joblib

# Add project root to sys.path
sys.path.append(str(Path(__file__).resolve().parent.parent))

from src.config import MODELS_DIR
from src.features import create_features, get_feature_column_names


def predict_expected_power(df: pd.DataFrame, model_path: Path = MODELS_DIR / "xgboost.pkl") -> pd.DataFrame:
    """
    Computes expected AC power generation for input solar telemetry dataframe using trained model.
    """
    if not model_path.exists():
        raise FileNotFoundError(f"Model file not found at {model_path}. Train model first.")

    model = joblib.load(model_path)

    df_feat = create_features(df)
    feature_cols = get_feature_column_names()

    X = df_feat[feature_cols]
    expected_power = model.predict(X)

    # Clip expected power to physical lower bound 0
    df_result = df.copy()
    df_result['expected_power_kw'] = expected_power
    df_result['expected_power_kw'] = df_result['expected_power_kw'].clip(lower=0)

    return df_result


if __name__ == "__main__":
    from src.config import CLEANED_DATA_PATH
    if CLEANED_DATA_PATH.exists():
        df_clean = pd.read_csv(CLEANED_DATA_PATH)
        df_pred = predict_expected_power(df_clean)
        print("Generated predictions shape:", df_pred.shape)
        print(df_pred[['timestamp', 'irradiance', 'total_ac_power_kw', 'expected_power_kw']].head())
