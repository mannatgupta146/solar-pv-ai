# Technology Stack, File Roles & Setup Guide

This document explains the technologies, libraries, file structure, core logic, and quickstart setup for the **Solar PV AI Platform**.

---

## 1. Technologies & Libraries Used

### Backend & AI Stack (Python)
| Technology / Library | What Need It Fulfills | Why It Was Chosen |
| :--- | :--- | :--- |
| **Python (3.12+)** | Core programming language for data engineering, AI models, and backend web service. | Industry standard for machine learning, statistics, and weather data processing with rich libraries. |
| **FastAPI & Uvicorn** | Asynchronous REST API web server providing endpoints to the frontend UI. | Extremely fast execution, automatic OpenAPI documentation, and seamless integration with Python ML models. |
| **XGBoost & Scikit-Learn** | Machine learning regressors for predicting solar power output (kW). | Gradient Boosted Decision Trees (XGBoost) provide state-of-the-art accuracy ($R^2 > 0.98$) on tabular solar telemetry. |
| **SHAP (SHapley Additive exPlanations)** | Explainable AI (XAI) framework. | Explains model predictions in plain language by identifying exactly why solar output dropped (e.g., cloud cover vs irradiance vs temperature). |
| **Open-Meteo Weather API** | Live weather forecasting & solar radiation data source; also manages local datasets: <br>- `data/raw/`: Contains original raw operational PV measurements from National Institute of Solar Energy (NISE), Gurugram. (Tracked in Git repository). <br>- `data/processed/`: Contains pre-processed, missing-value cleaned dataset `cleaned_data.csv` used for ML training. (Tracked in Git repository). | Provides free global solar irradiance (W/m²), 7-day daily forecasts, and cloud cover percentage without requiring complex API keys. |
| **Pandas & NumPy** | Fast data manipulation, tabular data frames, and numerical calculations. | Efficient array processing and time-series aggregation for hourly solar telemetry. |
| **Joblib** | Model serialization and loading (`xgboost.pkl`). | Allows instant loading of pre-trained AI model weights into the API without retraining. |

---

### Frontend & UI Stack (TypeScript & React)
| Technology / Library | What Need It Fulfills | Why It Was Chosen |
| :--- | :--- | :--- |
| **React (v19) & TypeScript** | Component-based frontend dashboard UI with static type safety. | Provides fast interactive state management, modular components, and prevents runtime bugs. |
| **Vite (v6)** | Next-generation frontend build tool and dev server. | Offers instant hot module reloading (HMR) and lightning-fast production builds (< 1.1s). |
| **Tailwind CSS (v4)** | Modern utility-first styling system. | Allows rapid creation of clean, responsive, high-end SaaS UI without writing custom CSS files. |
| **Recharts** | Interactive chart rendering library. | Displays dual-axis power curves, solar irradiance overlays, and 7-day forecast bar charts smoothly. |
| **Lucide React** | Modern UI icons. | Provides clear visual icons (`Sun`, `CloudSun`, `Zap`, `TrendingUp`, `MapPin`) for clean navigation. |

---

## 2. Core Logic & Main Files Breakdown

Here is what each key file in the codebase does in simple language:

### Backend & Machine Learning (`api/` and `src/`)
- **[`api/main.py`](file:///Users/mannatgupta146/Desktop/PROJECTS/solar-pv-ai/api/main.py)**: The main entry point for the backend web server. Runs FastAPI endpoints for:
  - Any-location city search (`/search-location` or `/api/search-location`)
  - NISE Gurgaon plant telemetry overview (`/api/overview`)
  - AI model predictions (`/api/forecast`)
  - Persistent anomaly alerts (`/api/anomalies`)
  - Feature explainability (`/api/explainability`)
- **[`src/weather.py`](file:///Users/mannatgupta146/Desktop/PROJECTS/solar-pv-ai/src/weather.py)**: The weather engine and geocoding handler.
  - Pre-indexes major Indian solar hubs (e.g., `Gurgaon` $\rightarrow$ Haryana, `Bangalore` $\rightarrow$ Karnataka).
  - Fetches 7-day daily weather forecasts and 12-hour intraday sunlight data from Open-Meteo.
  - Calculates expected daily energy (`kWh`), peak power (`kW`), relative yield percentage, and estimated tariff revenue (`₹`).
- **[`src/features.py`](file:///Users/mannatgupta146/Desktop/PROJECTS/solar-pv-ai/src/features.py)**: Feature engineering pipeline. Computes solar position, time-of-day sine/cosine cyclicals, cloud shading factors, and temperature adjustments for the AI models.
- **[`src/train.py`](file:///Users/mannatgupta146/Desktop/PROJECTS/solar-pv-ai/src/train.py)**: AI training script. Trains XGBoost and Random Forest regressors on historical solar data and saves model weights to `models/xgboost.pkl`.
- **[`src/anomaly.py`](file:///Users/mannatgupta146/Desktop/PROJECTS/solar-pv-ai/src/anomaly.py)**: Fault detector. Filters out temporary cloud passing by requiring **40+ minute persistent drop windows** before flagging confirmed underperformance alerts.

### Frontend Dashboard (`frontend/src/`)
- **[`frontend/src/App.tsx`](file:///Users/mannatgupta146/Desktop/PROJECTS/solar-pv-ai/frontend/src/App.tsx)**: The primary frontend dashboard application. Renders:
  - Sidebar navigation menu (**Solar Forecast**, **Plant Overview**, **AI Predictions**, **Alerts & Issues**, **AI Insights**).
  - Top metric KPI cards (System Capacity, Today's Output, 7-Day Output, 7-Day Revenue).
  - Interactive 7-Day Forecast with **Cards Deck** and **Table View** options.
  - Dual-axis intraday power generation curves and daylight hourly breakdown tables.
- **[`frontend/src/main.tsx`](file:///Users/mannatgupta146/Desktop/PROJECTS/solar-pv-ai/frontend/src/main.tsx)**: Frontend entry point initializing React DOM root.

---

## 3. Environment Setup & Quickstart

Follow these simple steps to run the complete platform locally:

### Step 1: Install Python Dependencies
```bash
pip3 install -r requirements.txt --break-system-packages
```

### Step 2: Launch Backend API Server (FastAPI)
Run the backend daemon on port 8000:
```bash
python3 -m uvicorn api.main:app --host 0.0.0.0 --port 8000
```
*The backend API will be live at `http://localhost:8000`.*

### Step 3: Launch Frontend Dashboard (React + Vite)
In a second terminal window, start the frontend dev server:
```bash
cd frontend
npm install
npm run dev
```
*The web dashboard will be live at `http://localhost:5173`.*

### Step 4: Build for Production (Optional)
To generate the optimized production bundle:
```bash
cd frontend
npm run build
```
