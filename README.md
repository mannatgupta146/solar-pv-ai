# Solar Operations & Decision Support System ☀️

An AI-powered solar plant decision support system and web dashboard built on real operational telemetry from the **National Institute of Solar Energy (NISE), Gurgaon, India**.

---

## 🌟 Key Decision Support Features

- **☀️ Today's Solar Brief (Landing Page)**: Morning operational briefing combining weather forecast, solar potential (82%), expected generation (1,284 kWh), peak power (312 kW), best generation window (10:30 AM – 2:00 PM), and AI action recommendations.
- **🌦️ Weather-Aware Forecasting**: Tomorrow's hourly generation forecast and 7-day solar potential outlook.
- **🚨 14-System Health Matrix**: Real-time operational monitoring across all 14 NISE PV technology blocks with early warning alerts.
- **🧹 Operator-Friendly Cause Attribution**: Translates ML feature attributions into plain-English root causes (*Cloud Cover & Shading: 48%*, *Irradiance Level: 31%*, *Equipment Factor: 21%*).
- **Interactive Model Selection**: Switch between **XGBoost Regressor (Tuned)** and **Random Forest Regressor (Baseline)** with live prediction curve morphing.
- **Smart Anomaly Filtering**: 4-step power drop detection pipeline with a 40-minute persistence filter that suppresses short cloud shadow false alarms.

---

## 🏗️ Architecture & Project Structure

```text
solar-pv-ai/
│
├── api/                        # FastAPI REST API Backend
│   └── main.py                 # Decision support & telemetry endpoints
│
├── frontend/                   # React + Vite + TailwindCSS Web Dashboard
│   ├── src/
│   │   ├── App.tsx             # Interactive Operations & Decision Support Dashboard UI
│   │   ├── main.tsx
│   │   └── index.css           # Styling setup
│   ├── dist/                   # Production build bundle
│   ├── index.html
│   └── package.json
│
├── src/                        # Core Decision Engine & Python ML Modules
│   ├── weather.py              # Weather forecast synthesis module
│   ├── forecasting.py          # Hourly & 7-day forecast engine
│   ├── risk_engine.py          # 14-system health matrix & early warning risk engine
│   ├── recommendations.py      # AI decision recommendation & cause attribution
│   ├── config.py               # Dataset configuration & path definitions
│   ├── data_loader.py          # Raw telemetry header parsing
│   ├── preprocessing.py       # Data cleaning & physical sanity bounds
│   ├── features.py             # Feature engineering & temporal lag calculations
│   ├── train.py                # Chronological train/test splitting & model training
│   ├── predict.py              # Inference & residual evaluation
│   ├── anomaly.py              # Deviation thresholding & 40-min persistence filtering
│   ├── explain.py              # TreeSHAP feature attributions
│   └── economics.py            # Energy loss (kWh) & monetary impact (₹) calculation
```
├── models/                     # Saved ML Models (.pkl)
│   ├── xgboost.pkl
│   └── random_forest.pkl
│
├── results/                    # Output Metrics & Predictions CSVs
│   ├── metrics/model_metrics.csv
│   └── predictions/predictions.csv
│
├── docs/                       # Project Documentation & Specifications
│   ├── PRD.md                  # Product Requirements Document & Research Scope
│   ├── tech_stack.md           # System requirements & execution steps
│   ├── tasks.md                # Task matrix & progress log
│   └── memory.md               # Project memory & verified empirical matrix
│
├── requirements.txt            # Python dependencies
└── README.md                   # Main Project Guide
```

---

## ⚡ Quick Start & Running Locally

### 1. Prerequisites
- **Python 3.10+**
- **Node.js 18+** & **npm**

### 2. Backend API Setup (FastAPI)

```bash
# Install Python dependencies
pip3 install -r requirements.txt

# Start FastAPI server on port 8000
python3 -m uvicorn api.main:app --host 0.0.0.0 --port 8000
```
API Documentation will be available at: `http://localhost:8000/docs`

### 3. Frontend Web Dashboard Setup (React + Vite)

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Run Vite development server (http://localhost:5173)
npm run dev
```

---

## 📊 End-to-End ML Pipeline Execution

To run the complete machine learning pipeline from scratch:

```bash
python3 src/preprocessing.py
python3 src/train.py
python3 src/predict.py
python3 src/anomaly.py
python3 src/explain.py
python3 src/economics.py
```

---

## 📝 Key Metrics & Empirical Summary

- **Primary Sensor**: 500 kW Sunlight Sensor at NISE Gurgaon
- **Selected Model Accuracy**: XGBoost Regressor (MAE: ~84.87 kW, RMSE: ~192.34 kW)
- **Confirmed Power Drops**: 14 persistent events (power loss lasting 40+ mins)
- **Total Energy Loss**: ~1,041.01 kWh
- **Estimated Monetary Loss**: ~₹8,328.08 (evaluated at ₹8.0 per kWh)
