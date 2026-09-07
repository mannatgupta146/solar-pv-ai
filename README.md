# Solar Energy Performance Tracker & Issue Detector ☀️

An AI-powered solar power monitoring, anomaly detection, and economic impact dashboard built on real operational telemetry from the **National Institute of Solar Energy (NISE), Gurgaon, India**.

---

## 🌟 Overview & Key Features

- **Real Telemetry Dataset**: Operational power data recorded every 10 minutes across 14 photovoltaic technology blocks and string inverters at NISE Gurgaon (June 21–27, 2026).
- **Interactive Model Selection**: Real-time switching between **XGBoost Regressor (Tuned)** and **Random Forest Regressor (Baseline)** with live prediction curve updates.
- **Plain-English Terminology**: Easy-to-understand metrics designed for reviewers, plant managers, and researchers.
- **Smart Issue Filtering**: 4-step power drop detection pipeline with a 40-minute persistence filter that suppresses short cloud shadow false alarms.
- **AI Explanation & Benchmark**: Integrated feature importance ranking and benchmark comparison across 14 solar panel technology types.

---

## 🏗️ Architecture & Project Structure

```text
solar-pv-ai/
│
├── api/                        # FastAPI REST API Backend
│   └── main.py                 # Serving overview, performance, anomalies, explainability & tech benchmark
│
├── frontend/                   # React + Vite + TailwindCSS Web Dashboard
│   ├── src/
│   │   ├── App.tsx             # Main Interactive Dashboard UI
│   │   ├── main.tsx
│   │   └── index.css           # Styling setup
│   ├── dist/                   # Production build bundle
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
│
├── data/
│   ├── raw/nise/               # Original Inverter Report.xlsx telemetry
│   └── processed/              # Processed CSV datasets
│
├── notebooks/                  # Step-by-step Jupyter Notebooks (01 to 06)
│   ├── 01_data_inspection.ipynb
│   ├── 02_data_cleaning_eda.ipynb
│   ├── 03_power_prediction.ipynb
│   ├── 04_anomaly_detection.ipynb
│   ├── 05_shap_analysis.ipynb
│   └── 06_economic_analysis.ipynb
│
├── src/                        # Core Python Machine Learning Modules
│   ├── config.py               # Dataset configuration & path definitions
│   ├── data_loader.py          # Raw telemetry header parsing
│   ├── preprocessing.py       # Data cleaning & physical sanity bounds
│   ├── features.py             # Feature engineering & temporal lag calculations
│   ├── train.py                # Chronological train/test splitting & model training
│   ├── predict.py              # Inference & residual evaluation
│   ├── anomaly.py              # Deviation thresholding & 40-min persistence filtering
│   ├── explain.py              # TreeSHAP feature attributions
│   └── economics.py            # Energy loss (kWh) & monetary impact (₹) calculation
│
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
