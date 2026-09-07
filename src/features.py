"""
Feature Engineering Module for Solar Power Telemetry
"""
import sys
from pathlib import Path
import pandas as pd
import numpy as np

# Add project root to sys.path
sys.path.append(str(Path(__file__).resolve().parent.parent))


def create_features(df: pd.DataFrame) -> pd.DataFrame:
    """
    Constructs ML input features from cleaned NISE solar telemetry.
    Includes temporal features, solar angle proxy, irradiance lags, and rolling metrics.
    """
    df_feat = df.copy()

    # Ensure timestamp sorting
    df_feat = df_feat.sort_values('timestamp').reset_index(drop=True)
    ts_index = pd.DatetimeIndex(df_feat['timestamp'])

    # 1. Temporal cyclical features
    df_feat['hour'] = ts_index.hour
    df_feat['minute'] = ts_index.minute
    df_feat['month'] = ts_index.month
    df_feat['day_of_year'] = ts_index.dayofyear
    df_feat['day_of_week'] = ts_index.dayofweek

    # Sine/Cosine cyclical encoding for hour of day (24h period)
    hour_float = ts_index.hour + ts_index.minute / 60.0
    df_feat['sin_hour'] = np.sin(2 * np.pi * hour_float / 24.0)
    df_feat['cos_hour'] = np.cos(2 * np.pi * hour_float / 24.0)

    # 2. Solar Position Proxy (approximate solar elevation angle factor)
    # Peak solar noon ~ 12.0
    solar_noon_diff = np.abs(hour_float - 12.5)
    df_feat['solar_noon_proximity'] = np.maximum(0, 1.0 - (solar_noon_diff / 6.5))

    # 3. Lag and Rolling Window Features for Irradiance
    if 'irradiance' in df_feat.columns:
        # Lag features (10-min and 20-min prior readings)
        df_feat['irradiance_lag1'] = df_feat['irradiance'].shift(1).fillna(0)
        df_feat['irradiance_lag2'] = df_feat['irradiance'].shift(2).fillna(0)

        # 30-minute rolling mean & max (3 steps of 10-min)
        df_feat['irradiance_roll_mean_30m'] = df_feat['irradiance'].rolling(window=3, min_periods=1).mean()
        df_feat['irradiance_roll_max_30m'] = df_feat['irradiance'].rolling(window=3, min_periods=1).max()

    return df_feat


def get_feature_column_names() -> list[str]:
    """
    Returns the list of input feature column names for model training.
    """
    return [
        'irradiance',
        'hour',
        'minute',
        'month',
        'day_of_year',
        'day_of_week',
        'sin_hour',
        'cos_hour',
        'solar_noon_proximity',
        'irradiance_lag1',
        'irradiance_lag2',
        'irradiance_roll_mean_30m',
        'irradiance_roll_max_30m'
    ]


if __name__ == "__main__":
    from src.data_loader import load_nise_raw, extract_key_metrics
    from src.preprocessing import clean_nise_data

    df_raw = load_nise_raw()
    df_metrics = extract_key_metrics(df_raw)
    df_clean = clean_nise_data(df_metrics)
    df_features = create_features(df_clean)

    print("Created features dataframe. Shape:", df_features.shape)
    print("Input Features:", get_feature_column_names())
