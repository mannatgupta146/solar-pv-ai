# Project Memory & Status: Solar PV AI

## Locked Research Title & Scope
> **"An India-Specific Explainable Machine Learning Framework for Solar PV Performance Monitoring, Anomaly Detection, and Economic Impact Analysis"**

---

## Core Methodological Principles
1. **Single-Dataset Architecture**: NISE Indian Solar Telemetry dataset (`Inverter Report.xlsx`) as the sole primary dataset.
2. **Scientific Terminology**:
   - Use **"Performance Deviation Detection"** and **"Persistent Anomalous Periods"** (do NOT claim unverified hardware faults).
3. **Tariff Sensitivity**:
   - Model financial loss as a **scenario sensitivity parameter** ($\text{₹}4/\text{kWh}$ to $\text{₹}12/\text{kWh}$).

---

## Final Empirical Verification Matrix

| Metric / Scenario | Value |
| :--- | :--- |
| **Cleaned Telemetry Dataset** | `data/processed/cleaned_data.csv` (1,028 rows x 33 features) |
| **Sampling Rate** | **10-minute intervals** |
| **Primary Models** | Random Forest (`models/random_forest.pkl`), XGBoost (`models/xgboost.pkl`) |
| **Deviation Threshold** | **31.34% Relative Deviation** (95th percentile) |
| **Transient Anomaly Flags** | 28 timesteps (~4.6 hours) |
| **Persistent Anomalous Periods** | **14 timesteps (2.33 hours total)** via 40-min rolling filter |
| **Transient Flag Reduction** | **50.0% reduction** via temporal persistence filtering |
| **Total Estimated Energy Loss** | **1,041.01 kWh** |
| **Tariff Sensitivity Matrix (₹ Loss)** | $\text{₹}4/\text{kWh} \rightarrow \text{₹}4,164.04$<br>$\text{₹}6/\text{kWh} \rightarrow \text{₹}6,246.06$<br>$\text{₹}8/\text{kWh} \rightarrow \text{₹}8,328.08$<br>$\text{₹}10/\text{kWh} \rightarrow \text{₹}10,410.10$<br>$\text{₹}12/\text{kWh} \rightarrow \text{₹}12,492.12$ |

---

## Directory & File Registry
```text
solar-pv-ai/
├── api/
│   └── main.py (FastAPI REST Backend)
├── data/
│   ├── raw/nise/Inverter Report.xlsx
│   └── processed/cleaned_data.csv
├── docs/
│   ├── PRD.md (Decision Support System Scope)
│   ├── tasks.md (Completed through Phase 7)
│   ├── memory.md (Updated)
│   └── tech_stack.md (System Python + Node.js)
├── frontend/
│   ├── src/App.tsx (Operations & Decision Support UI)
│   ├── index.html
│   ├── dist/ (Production build bundle)
│   └── vite.config.ts
├── notebooks/
│   ├── 01_data_inspection.ipynb (Verified)
│   ├── 02_data_cleaning_eda.ipynb (Verified)
│   ├── 03_power_prediction.ipynb (Verified)
│   ├── 04_anomaly_detection.ipynb (Verified)
│   ├── 05_shap_analysis.ipynb (Verified)
│   └── 06_economic_analysis.ipynb (Verified)
├── src/
│   ├── weather.py (Weather forecast module)
│   ├── forecasting.py (Hourly & 7-day forecast engine)
│   ├── risk_engine.py (14-system health matrix)
│   ├── recommendations.py (AI decision recommendation engine)
│   ├── config.py (Configured)
│   ├── data_loader.py (Verified)
│   ├── preprocessing.py (Verified)
│   ├── features.py (Verified)
│   ├── train.py (Verified)
│   ├── predict.py (Verified)
│   ├── anomaly.py (Verified)
│   ├── explain.py (Verified)
│   └── economics.py (Verified)
├── models/
│   ├── random_forest.pkl
│   └── xgboost.pkl
├── results/
│   ├── metrics/model_metrics.csv
│   └── predictions/predictions.csv
└── requirements.txt
```
