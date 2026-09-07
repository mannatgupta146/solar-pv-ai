"""
Preprocessing and Data Quality Pipeline for NISE Solar Telemetry
"""
import sys
from pathlib import Path
import pandas as pd
import numpy as np

# Add project root to sys.path
sys.path.append(str(Path(__file__).resolve().parent.parent))

from src.config import CLEANED_DATA_PATH
from src.data_loader import load_nise_raw, extract_key_metrics


def clean_nise_data(df_metrics: pd.DataFrame) -> pd.DataFrame:
    """
    Applies quality checks, physical constraint filters, and temporal feature extraction.
    """
    df_clean = df_metrics.copy()

    # Ensure timestamp sorting
    df_clean = df_clean.sort_values('timestamp').reset_index(drop=True)

    # Extract temporal indicators using DatetimeIndex
    ts_index = pd.DatetimeIndex(df_clean['timestamp'])
    df_clean['hour'] = ts_index.hour
    df_clean['minute'] = ts_index.minute
    df_clean['month'] = ts_index.month
    df_clean['day_of_year'] = ts_index.dayofyear
    df_clean['day_of_week'] = ts_index.dayofweek

    # Daytime flag: 06:00 to 18:00 with irradiance > 5 W/m^2
    df_clean['is_daytime'] = ((df_clean['hour'] >= 6) & (df_clean['hour'] <= 18) & (df_clean['irradiance'] > 5)).astype(int)

    # Physical Clipping: Power cannot be negative
    if 'total_ac_power_kw' in df_clean.columns:
        df_clean['total_ac_power_kw'] = df_clean['total_ac_power_kw'].clip(lower=0)

        # Enforce zero power during zero irradiance nighttime
        night_mask = (df_clean['irradiance'] <= 1.0) & ((df_clean['hour'] < 5) | (df_clean['hour'] > 19))
        df_clean.loc[night_mask, 'total_ac_power_kw'] = 0.0

    return df_clean


def save_processed_data(df: pd.DataFrame, output_path: Path = CLEANED_DATA_PATH) -> None:
    """
    Saves cleaned dataframe to processed CSV directory.
    """
    output_path.parent.mkdir(parents=True, exist_ok=True)
    df.to_csv(output_path, index=False)
    print(f"Successfully exported cleaned data to: {output_path}")


if __name__ == "__main__":
    df_raw = load_nise_raw()
    df_metrics = extract_key_metrics(df_raw)
    df_clean = clean_nise_data(df_metrics)
    save_processed_data(df_clean)
    print("Processed Dataset Shape:", df_clean.shape)
