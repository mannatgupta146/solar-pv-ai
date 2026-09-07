"""
Model Explainability Module using TreeSHAP
"""
import sys
from pathlib import Path
import pandas as pd
import numpy as np
import shap

# Add project root to sys.path
sys.path.append(str(Path(__file__).resolve().parent.parent))

from src.features import create_features, get_feature_column_names


def compute_shap_values(model, X_sample: pd.DataFrame):
    """
    Computes SHAP values using TreeExplainer for XGBoost / Random Forest models.
    """
    explainer = shap.TreeExplainer(model)
    shap_values = explainer.shap_values(X_sample)
    return explainer, shap_values


if __name__ == "__main__":
    import joblib
    from src.config import MODELS_DIR, CLEANED_DATA_PATH

    model_path = MODELS_DIR / "xgboost.pkl"
    if model_path.exists() and CLEANED_DATA_PATH.exists():
        model = joblib.load(model_path)
        df_clean = pd.read_csv(CLEANED_DATA_PATH)
        df_feat = create_features(df_clean)
        feature_cols = get_feature_column_names()
        X_sample = df_feat[df_feat['irradiance'] > 10.0][feature_cols].iloc[:100]

        explainer, shap_vals = compute_shap_values(model, X_sample)
        print("Successfully computed SHAP values for sample. Shape:", shap_vals.shape)
