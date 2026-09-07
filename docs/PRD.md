# Product Requirements Document (PRD): Solar PV AI Research Pipeline

## 1. Locked Research Title & Scope
> **"An India-Specific Explainable Machine Learning Framework for Solar PV Performance Monitoring, Anomaly Detection, and Economic Impact Analysis"**

- **Primary Dataset**: National Institute of Solar Energy (NISE) Operational Telemetry (`Inverter Report.xlsx`)
- **Geographic Focus**: India-Specific (NISE, Gurgaon)
- **Target Audience**: Peer-Reviewed Renewable Energy / ML Journals

---

## 2. Scientific Language & Methodological Rules
To maintain rigorous scientific standards for peer review:
1. **No Unsubstantiated Fault Claims**:
   - Use **"Performance Deviation Detection"** and **"Persistent Anomalous Periods"** instead of claiming "Fault Diagnosis" or "Inverter Faults" (since ground-truth maintenance logs are unlabelled).
2. **Scenario-Based Tariff Sensitivity**:
   - Do **not** claim $\text{₹}8/\text{kWh}$ is a fixed NISE plant tariff.
   - Tariff is modeled as a **scenario parameter** evaluated across a sensitivity matrix ($\text{₹}4/\text{kWh}, \text{₹}6/\text{kWh}, \text{₹}8/\text{kWh}, \text{₹}10/\text{kWh}, \text{₹}12/\text{kWh}$).
3. **Single-Dataset Focus**:
   - Rely solely on NISE Indian PV operational dataset for internal consistency, avoiding domain mismatch or cross-dataset normalization issues from mixing non-Indian datasets (e.g. BR-PVGen).

---

## 3. Dataset Characteristics (NISE Telemetry)
- **Source**: National Institute of Solar Energy (NISE), Gurgaon, India
- **File**: `data/raw/nise/Inverter Report.xlsx`
- **Nominal Sampling Interval**: 10 minutes (658 exact 10-min deltas)
- **Timeframe**: June 21, 2026 – June 27, 2026 (1,028 timesteps)
- **Feature Space**: 224 columns covering 14 PV plants and battery subsystems:
  - `SURYA BHAVAN 150KW` (SMA Inverters 1–6)
  - `NEW GUEST HOUSE` (Multi-Si 25 kWp)
  - `OLD GUEST HOUSE` (Multi-Si 7.5 kWp)
  - `ADITYA BHAVAN` (Mono-Si Bifacial 7.5 kWp)
  - `Bifacial Test Bed` (Monofacial 10 kWp, Tilted Bifacial 5 kWp, Vertical Bifacial 5 kWp)
  - `IBC` (100 kWp)
  - `Multi C-Si` (75 kWp)
  - `HIT` (100 kWp)
  - `CIGS` (100 kWp)
  - `CdTe` (100 kWp)
  - Battery Subsystems (`BAT-1 VRAL`, `BAT-2 Flooded LA`)

---

## 4. End-to-End System Architecture

```text
                 NISE INDIA DATASET
                         │
                         ▼
             Multiple PV Technologies (14)
                         │
                         ▼
               Actual Power Telemetry
                         │
                         ▼
        ┌────────────────┴────────────────┐
        ▼                                 ▼
 Expected Power Model           Performance Analysis
(Random Forest / XGBoost)      (Technology Comparison)
        │
        ▼
   Actual - Expected
        │
        ▼
Residual Anomaly Detection
  (Deviation Threshold)
        │
        ▼
 Persistence Filtering
    (40-min window)
        │
        ▼
Persistent Anomalous Periods
        │
  ┌─────┴──────────────┐
  ▼                    ▼
Energy Loss        SHAP / XAI
  │             (Explainability)
  ▼
₹ Financial Loss
 (Sensitivity Analysis)
```

---

## 5. Summary of Empirical Pipeline Outputs

| Metric / Scenario | Value |
| :--- | :--- |
| **Cleaned Telemetry Dataset** | `data/processed/cleaned_data.csv` (1,028 rows x 33 features) |
| **Trained Regressors** | Random Forest (`models/random_forest.pkl`), XGBoost (`models/xgboost.pkl`) |
| **Deviation Threshold** | **31.34% Relative Deviation** (95th percentile) |
| **Transient Anomaly Flags** | 28 timesteps (~4.6 hours) |
| **Persistent Anomalous Periods** | **14 timesteps (2.33 hours total)** via 40-min rolling filter |
| **Transient Flag Reduction** | **50.0% reduction** in transient flags via temporal filtering |
| **Total Estimated Energy Loss** | **1,041.01 kWh** |
| **Tariff Sensitivity Matrix (₹ Loss)** | $\text{₹}4/\text{kWh} \rightarrow \text{₹}4,164.04$<br>$\text{₹}6/\text{kWh} \rightarrow \text{₹}6,246.06$<br>$\text{₹}8/\text{kWh} \rightarrow \text{₹}8,328.08$<br>$\text{₹}10/\text{kWh} \rightarrow \text{₹}10,410.10$<br>$\text{₹}12/\text{kWh} \rightarrow \text{₹}12,492.12$ |
| **Final Predictions Report** | `results/predictions/predictions.csv` |
| **Model Performance Metrics** | `results/metrics/model_metrics.csv` |
