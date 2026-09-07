"""
Anomaly Detection and Rolling Persistence Filter Module
"""
import sys
from pathlib import Path
import pandas as pd
import numpy as np

# Add project root to sys.path
sys.path.append(str(Path(__file__).resolve().parent.parent))

from src.config import SAMPLING_INTERVAL_MINUTES


def detect_anomalies(df_pred: pd.DataFrame, quantile_threshold: float = 0.95, persistence_steps: int = 4) -> pd.DataFrame:
    """
    Computes expected vs actual power residual, relative deviation %, 
    residual anomaly flags, and rolling window persistence anomalies.
    
    persistence_steps=4 corresponds to 4 * 10min = 40 minutes of persistent degradation.
    """
    df_anomaly = df_pred.copy()

    # 1. Compute Residual: Actual - Expected
    df_anomaly['residual_kw'] = df_anomaly['total_ac_power_kw'] - df_anomaly['expected_power_kw']

    # 2. Relative Deviation % during daytime hours
    denom = df_anomaly['expected_power_kw'].clip(lower=5.0)  # avoid division by zero or tiny power
    df_anomaly['deviation_pct'] = (np.abs(df_anomaly['residual_kw']) / denom) * 100.0

    # 3. Anomaly Thresholding (95th percentile of daytime deviation)
    daytime_mask = df_anomaly['irradiance'] > 10.0
    threshold_val = df_anomaly.loc[daytime_mask, 'deviation_pct'].quantile(quantile_threshold)

    df_anomaly['raw_anomaly'] = (df_anomaly['deviation_pct'] > threshold_val) & daytime_mask

    # 4. Rolling Persistence Filter (suppress transient cloud shading noise)
    # Require at least (persistence_steps - 1) anomalous readings out of persistence_steps consecutive intervals
    df_anomaly['persistent_anomaly'] = (
        df_anomaly['raw_anomaly'].rolling(window=persistence_steps, min_periods=persistence_steps).sum() >= (persistence_steps - 1)
    ).fillna(False)

    return df_anomaly, threshold_val


if __name__ == "__main__":
    from src.config import CLEANED_DATA_PATH
    from src.predict import predict_expected_power
    if CLEANED_DATA_PATH.exists():
        df_clean = pd.read_csv(CLEANED_DATA_PATH)
        df_pred = predict_expected_power(df_clean)
        df_anom, thresh = detect_anomalies(df_pred)
        print(f"Anomaly Detection Complete. 95th Percentile Deviation Threshold: {thresh:.2f}%")
        print("Raw Anomalies Detected:", df_anom['raw_anomaly'].sum())
        print("Persistent Anomalies Detected:", df_anom['persistent_anomaly'].sum())
