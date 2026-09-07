"""
Economic Analysis Module: Energy Loss (kWh) and Financial Loss (₹) Computation
"""
import sys
from pathlib import Path
import pandas as pd
import numpy as np

# Add project root to sys.path
sys.path.append(str(Path(__file__).resolve().parent.parent))

from src.config import DEFAULT_TARIFF_INR_KWH, SAMPLING_INTERVAL_HOURS, RESULTS_DIR


def calculate_economic_losses(df_anomaly: pd.DataFrame, tariff_inr_kwh: float = DEFAULT_TARIFF_INR_KWH) -> dict:
    """
    Computes energy loss in kWh and monetary loss in Indian Rupees (₹) for anomalous intervals.
    """
    df_econ = df_anomaly.copy()

    # Power deficit during persistent anomalous intervals (kW)
    # Deficit = Expected Power - Actual Power (clipped at 0)
    df_econ['power_loss_kw'] = np.where(
        df_econ['persistent_anomaly'],
        (df_econ['expected_power_kw'] - df_econ['total_ac_power_kw']).clip(lower=0),
        0.0
    )

    # Convert Power Loss (kW) to Energy Loss (kWh) over 10-minute interval (0.1667 hours)
    df_econ['energy_loss_kwh'] = df_econ['power_loss_kw'] * SAMPLING_INTERVAL_HOURS

    # Financial Loss in INR (₹)
    df_econ['financial_loss_inr'] = df_econ['energy_loss_kwh'] * tariff_inr_kwh

    total_energy_loss_kwh = float(df_econ['energy_loss_kwh'].sum())
    total_financial_loss_inr = float(df_econ['financial_loss_inr'].sum())
    anomalous_hours = float(df_econ['persistent_anomaly'].sum() * SAMPLING_INTERVAL_HOURS)

    summary = {
        "Tariff (₹/kWh)": tariff_inr_kwh,
        "Total Persistent Anomaly Duration (Hours)": round(anomalous_hours, 2),
        "Total Energy Loss (kWh)": round(total_energy_loss_kwh, 2),
        "Total Financial Loss (₹)": round(total_financial_loss_inr, 2)
    }

    # Export predictions with economic losses
    predictions_path = RESULTS_DIR / "predictions" / "predictions.csv"
    predictions_path.parent.mkdir(parents=True, exist_ok=True)
    df_econ.to_csv(predictions_path, index=False)
    print(f"Exported detailed predictions & economic loss report to {predictions_path}")

    return summary, df_econ


if __name__ == "__main__":
    from src.config import CLEANED_DATA_PATH
    from src.predict import predict_expected_power
    from src.anomaly import detect_anomalies

    if CLEANED_DATA_PATH.exists():
        df_clean = pd.read_csv(CLEANED_DATA_PATH)
        df_pred = predict_expected_power(df_clean)
        df_anom, thresh = detect_anomalies(df_pred)
        summary, _ = calculate_economic_losses(df_anom)
        print("\n--- ECONOMIC LOSS ANALYSIS SUMMARY ---")
        for k, v in summary.items():
            print(f"{k}: {v}")
