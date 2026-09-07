"""
Data Loader Module for NISE Inverter Telemetry Dataset
"""
import sys
from pathlib import Path
import pandas as pd
import numpy as np

# Add project root to sys.path
sys.path.append(str(Path(__file__).resolve().parent.parent))

from src.config import NISE_FILE_PATH, IRRADIANCE_COL, POWER_COLUMNS_MAP, CLEANED_DATA_PATH


def load_nise_raw(file_path: Path = NISE_FILE_PATH) -> pd.DataFrame:
    """
    Loads raw NISE Excel dataset, cleans headers, parses timestamp.
    Handles duplicate column names by appending integer suffixes.
    """
    if not file_path.exists():
        raise FileNotFoundError(f"NISE dataset file not found at {file_path}")

    # Read excel starting from row 4 (0-indexed) where metric names exist
    df = pd.read_excel(file_path, header=4)

    # Clean column names by stripping outer spaces & deduplicating
    cols = [col.strip() if isinstance(col, str) else str(col).strip() for col in df.columns]
    seen = {}
    dedup_cols = []
    for c in cols:
        if c in seen:
            seen[c] += 1
            dedup_cols.append(f"{c}_{seen[c]}")
        else:
            seen[c] = 0
            dedup_cols.append(c)

    df.columns = dedup_cols

    # Combine DATE and TIME to form timestamp
    date_col = [c for c in df.columns if c.startswith('DATE')][0]
    time_col = [c for c in df.columns if c.startswith('TIME')][0]

    df['timestamp'] = pd.to_datetime(
        df[date_col].astype(str) + ' ' + df[time_col].astype(str),
        errors='coerce'
    )

    # Filter out rows with invalid timestamp
    df = df.dropna(subset=['timestamp']).sort_values('timestamp').reset_index(drop=True)

    return df


def extract_key_metrics(df: pd.DataFrame) -> pd.DataFrame:
    """
    Extracts timestamp, irradiance, and calculates total plant power outputs across inverters.
    """
    df_clean = pd.DataFrame()
    df_clean['timestamp'] = df['timestamp']

    ts_index = pd.DatetimeIndex(df['timestamp'])
    df_clean['date'] = ts_index.date
    df_clean['time'] = ts_index.time

    # Irradiance
    rad_cols = [c for c in df.columns if 'RADIATION' in c.upper() or 'RAD' in c.upper()]
    if rad_cols:
        rad_series = pd.Series(pd.to_numeric(df[rad_cols[0]], errors='coerce')).fillna(0)
        df_clean['irradiance'] = rad_series.clip(lower=0)
    else:
        df_clean['irradiance'] = 0.0

    # Extract active power for each inverter and sum for aggregate total AC power
    total_ac_power = np.zeros(len(df))

    # Find all ACTIVE POWER columns across inverters
    power_cols = [c for c in df.columns if 'ACTIVE POWER' in c.upper()]

    for col in power_cols:
        col_series = pd.Series(pd.to_numeric(df[col], errors='coerce')).fillna(0)
        numeric_vals = col_series.clip(lower=0).values
        df_clean[col] = numeric_vals
        total_ac_power = total_ac_power + numeric_vals

    df_clean['total_ac_power_kw'] = total_ac_power

    return df_clean


if __name__ == "__main__":
    df_raw = load_nise_raw()
    print("Loaded raw NISE dataset successfully. Shape:", df_raw.shape)
    df_metrics = extract_key_metrics(df_raw)
    print("Extracted metrics shape:", df_metrics.shape)
    print("Total AC Power Summary:")
    print(df_metrics['total_ac_power_kw'].describe())
