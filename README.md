# Solar PV AI — Performance Monitoring & Forecasting Platform ☀️

> **An AI-powered decision support platform and web dashboard for solar PV energy forecasting, real-time plant monitoring, and financial loss tracking.**

---

## 🌟 Key Platform Features

- 🗺️ **Any-Location Indian Solar Forecast**: Search any city or town in India (e.g. *Gurgaon*, *Bangalore*, *Jaipur*, *Mumbai*, *Shimla*, *Kochi*) with intelligent Indian city geocoding.
- ☀️ **7-Day Weather & Energy Forecast**: Accurately predicts 7-day solar power output (`kWh`), peak noon power (`kW`), and estimated revenue (`₹` at ₹8.0/kWh).
- 📊 **Flexible Forecast Layouts**: Toggle seamlessly between an interactive **Cards Deck** and a high-density **Table Matrix** with zero text trimming.
- ⚡ **Today's Hourly Power Curve**: Dual-axis chart comparing expected power (`kW`), solar sunlight (`W/m²`), and cloud cover (`%`) from 6 AM to 6 PM.
- 📈 **AI Prediction Models**: Toggle between **XGBoost Regressor** (tuned, $R^2 > 0.98$) and **Random Forest Regressor** (baseline) with live curve morphing.
- 🚨 **Smart Anomaly & Drop Detection**: Filters out 10-minute passing cloud noise using a **40-minute persistence filter** to pinpoint real power drops and calculate financial impact (`₹`).
- 🧠 **AI Insights & Explainability**: Uses TreeSHAP to explain *why* solar generation dropped (e.g. sunlight level vs cloud shading vs temperature) in plain English.
- 🎨 **Clean & Zero-Shake UI**: Modern SaaS dashboard built with warm solar gold accents (`amber-400`), crisp typography, and non-flickering hover interactions.

---

## 🏗️ Project Architecture & File Registry

```text
solar-pv-ai/
│
├── api/                        # FastAPI REST Backend
│   └── main.py                 # Backend API routes (/search-location, /api/anomalies, /api/forecast)
│
├── frontend/                   # React + Vite + Tailwind CSS Web Dashboard
│   ├── src/
│   │   ├── App.tsx             # Interactive dashboard UI component
│   │   ├── main.tsx            # React application entry point
│   │   └── index.css           # Styling setup
│   ├── dist/                   # Production build bundle
│   ├── index.html
│   └── package.json
│
├── src/                        # Python Core ML & Weather Modules
│   ├── weather.py              # Geocoding engine & Open-Meteo 7-day forecast engine
│   ├── forecasting.py          # Hourly & 7-day prediction logic
│   ├── risk_engine.py          # 14-system plant health evaluator
│   ├── recommendations.py      # AI decision recommendation & cause attribution engine
│   ├── config.py               # Path definitions & plant constants
│   ├── data_loader.py          # Raw telemetry parser
│   ├── preprocessing.py       # Data cleaning & physical sanity bounds
│   ├── features.py             # Feature engineering & temporal lag calculations
│   ├── train.py                # Chronological train/test splitting & ML training
│   ├── predict.py              # Model inference & residual evaluation
│   ├── anomaly.py              # Deviation thresholding & 40-min persistence filtering
│   ├── explain.py              # TreeSHAP feature attributions
│   └── economics.py            # Energy loss (kWh) & monetary impact (₹) calculation
│
├── models/                     # Saved ML Model Weights (.pkl)
│   ├── xgboost.pkl
│   └── random_forest.pkl
│
├── results/                    # Output Metrics & Predictions CSVs
│   ├── metrics/model_metrics.csv
│   └── predictions/predictions.csv
│
├── docs/                       # Platform Documentation
│   ├── overview.md             # High-level platform summary (plain English)
│   ├── PRD.md                  # Product Requirements Document & Scope
│   ├── tech_stack.md           # Technologies, file breakdown & setup guide
│   ├── tasks.md                # Task matrix & progress log
│   └── memory.md               # Verified empirical metrics & project status
│
├── requirements.txt            # Python dependencies
└── README.md                   # Main Project Guide
```

---

## ⚡ Quick Start & Running Locally

### 1. Prerequisites
- **Python 3.10+**
- **Node.js 18+** & **npm**

### 2. Launch Backend API Server (FastAPI)

```bash
# Install Python dependencies
pip3 install -r requirements.txt

# Start FastAPI backend server on port 8000
python3 -m uvicorn api.main:app --host 0.0.0.0 --port 8000
```
*API interactive documentation will be available at: `http://localhost:8000/docs`*

### 3. Launch Frontend Web Dashboard (React + Vite)

```bash
# In a new terminal window:
cd frontend

# Install Node.js dependencies
npm install

# Run Vite dev server (http://localhost:5173)
npm run dev
```

---

## 📊 End-to-End ML Pipeline Execution

To run the complete machine learning data & training pipeline from scratch:

```bash
python3 src/preprocessing.py
python3 src/train.py
python3 src/predict.py
python3 src/anomaly.py
python3 src/explain.py
python3 src/economics.py
```

---

## 📝 Empirical Results & Benchmark Summary

- **Primary Sensor**: 500 kW Sunlight Sensor at NISE Gurgaon
- **Selected Model Accuracy**: XGBoost Regressor ($R^2 > 0.98$, MAE: ~84.87 kW)
- **Confirmed Anomaly Events**: 14 persistent underperformance drops (power loss lasting 40+ mins)
- **Total Energy Loss**: ~1,041.01 kWh
- **Financial Impact**: ~₹8,328.08 (evaluated at ₹8.0 per kWh)
