# Product Requirements Document (PRD): Solar PV Operations & Decision Support System

## 1. Locked Research & System Scope
> **"An AI-Based Decision Support & Performance Monitoring System for Indian Solar PV Operations Using NISE Telemetry and Weather-Aware Forecasting"**

- **Primary Dataset**: National Institute of Solar Energy (NISE) Operational Telemetry (`Inverter Report.xlsx`)
- **Geographic Focus**: India-Specific (NISE, Gurgaon, Haryana)
- **Primary Objective**: Transition from offline historical research analysis into an actionable daily decision support system for solar plant operators.

---

## 2. Scientific Language & Operational Rules
To maintain both scientific rigor for peer-review and daily practical utility:
1. **No Unsubstantiated Fault Claims**:
   - Use **"Performance Deviation Detection"** and **"Persistent Anomalous Periods"** instead of claiming unverified hardware faults.
2. **Operator Actionability ("Today" Focus)**:
   - Provide a morning **"Today's Solar Brief"** combining weather forecast, solar potential %, best generation window, energy at risk, and AI action recommendations.
3. **Scenario-Based Tariff Sensitivity**:
   - Evaluate financial loss across sensitivity scenarios ($\text{₹}4/\text{kWh}, \text{₹}6/\text{kWh}, \text{₹}8/\text{kWh}, \text{₹}10/\text{kWh}, \text{₹}12/\text{kWh}$).

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
                  NISE Telemetry (14 Systems) & Weather Forecast
                                        │
                                        ▼
                            Data Preprocessing Engine
                                        │
             ┌──────────────────────────┼──────────────────────────┐
             ▼                          ▼                          ▼
      Expected Power             Residual Anomaly           SHAP Feature
       Forecast Model            Detection Filter           Attribution
    (XGBoost / Random Forest)    (40-min Persistence)      (Explainability)
             │                          │                          │
             └──────────────────────────┼──────────────────────────┘
                                        │
                                        ▼
                           Decision Support Engine
                        (src/weather.py, forecasting.py,
                        risk_engine.py, recommendations.py)
                                        │
             ┌──────────────────────────┼──────────────────────────┐
             ▼                          ▼                          ▼
     Today's Solar Brief       14-System Health Matrix    Tomorrow Forecast
    (Best Generation Window)     (Early Warnings)         (7-Day Outlook)
             │                          │                          │
             └──────────────────────────┼──────────────────────────┘
                                        │
                                        ▼
                          Web Operations Dashboard
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

---

## 6. Any-Location Geocoding Engine & Dashboard UI Specifications

### 6.1 Indian City Geocoding & 7-Day Forecast Engine (`src/weather.py`)
- **Curated City Map (`POPULAR_INDIAN_CITIES`)**: Maintains verified coordinate and state mapping for all major Indian cities and regional aliases (`Gurgaon` / `Gurugram` $\rightarrow$ **Haryana**, `Bangalore` / `Bengaluru` $\rightarrow$ **Karnataka**, `Mumbai` / `Bombay` $\rightarrow$ **Maharashtra**, `Kochi` / `Cochin` $\rightarrow$ **Kerala**, `Shimla` $\rightarrow$ **Himachal Pradesh**, `Pune` $\rightarrow$ **Maharashtra**, `Jaipur` $\rightarrow$ **Rajasthan**, `Patna` $\rightarrow$ **Bihar**, `Delhi` $\rightarrow$ **Delhi**, `Hyderabad` $\rightarrow$ **Telangana**, `Chennai` $\rightarrow$ **Tamil Nadu**, `Kolkata` $\rightarrow$ **West Bengal**, `Ahmedabad` $\rightarrow$ **Gujarat**).
- **7-Day Weekly Location Forecasting**: Generates 7-day daily forecast breakdown matrices for any searched location, computing daily expected kWh, peak kW capacity, solar potential rating %, and estimated revenue ($\text{₹}$) evaluated at $\text{₹}8.0/\text{kWh}$.
- **Open-Meteo Fallback**: Uses population-weighted sorting for unlisted geocoding queries to ensure major population centers are selected over small rural villages with identical names.

### 6.2 Visual Design System & Interactive Forecast Views (`frontend/src/App.tsx`)
- **Color Palette**: Solar Golden Amber (`amber-400` / `hover:amber-300`) with high-contrast text (`text-zinc-950`).
- **Interactive Forecast View Switcher**: Toggles seamlessly between:
  1. **7-Day Weekly Forecast & Outlook**: Bar/Line composite chart comparing daily expected generation ($\text{kWh}$) and peak noon power ($\text{kW}$), paired with a 7-day daily forecast & revenue matrix and 7-day summary card.
  2. **Today Intraday Curve & Telemetry Matrix**: 4 intraday quick metric cards (*Peak Irradiance*, *Optimal Window*, *Daytime Temp*, *Cloud Attenuation*), dual-axis power & cloud cover overlay chart, and a daylight hourly telemetry matrix table (06:00 to 18:00).
- **Layout Integrity**: Rock-solid zero-shake container (`h-screen overflow-hidden` root layout with dedicated internal scrolling canvas).
- **Typography & Components**: Proportional KPI numbers (`text-2xl font-bold`), single-line card titles, and clean white sidebar (`bg-white border-r border-zinc-200`).
