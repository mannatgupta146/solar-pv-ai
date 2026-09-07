# Project Task Matrix: Solar PV AI Research Pipeline

## Phase 1: Environment & Dataset Inspection
- [x] Create standardized project folder structure (`data/`, `notebooks/`, `src/`, `models/`, `results/`, `docs/`)
- [x] Configure Python environment and `requirements.txt`
- [x] Inspect real NISE dataset (`Inverter Report.xlsx`) in `notebooks/01_data_inspection.ipynb`
- [x] Document NISE 224-column schema, 14 PV plants, 10-min sampling frequency, and `RADIATION 500 KW` metric

## Phase 2: Data Loading & Cleaning Pipeline
- [x] Update `src/config.py` with NISE plant constants and column mapping schemas
- [x] Implement `src/data_loader.py` to parse raw headers (row 3 plant names, row 4 sub-headers)
- [x] Implement `src/preprocessing.py` for physical sanity bounds, zero power clipping, and missing value handling
- [x] Implement `notebooks/02_data_cleaning_eda.ipynb` for dataset quality checks and plant generation EDA
- [x] Export `data/processed/cleaned_data.csv`

## Phase 3: Feature Engineering & Baseline Models
- [x] Implement `src/features.py` for temporal features (`hour`, `month`, `day_of_year`, `sin_hour`, `cos_hour`, `solar_noon_proximity`, lags & rolling means)
- [x] Implement `src/train.py` with 80/20 chronological time-series train/test split
- [x] Train Random Forest Regressor baseline model (`models/random_forest.pkl`)
- [x] Train XGBoost Regressor tuned model (`models/xgboost.pkl`)
- [x] Implement `notebooks/03_power_prediction.ipynb` and log metrics to `results/metrics/model_metrics.csv`

## Phase 4: Anomaly Detection & Persistence Filtering
- [x] Implement `src/anomaly.py` for expected vs. actual residual calculation & relative deviation %
- [x] Implement rolling-window persistence filter (40-min window) to suppress transient shading noise
- [x] Implement `notebooks/04_anomaly_detection.ipynb`
- [x] Save predicted anomalies to `results/predictions/predictions.csv`

## Phase 5: Explainability & Economic Loss Analysis
- [x] Implement `src/explain.py` for TreeSHAP analysis on XGBoost predictions in `notebooks/05_shap_analysis.ipynb`
- [x] Implement `src/economics.py` for kWh energy loss and ₹ financial loss evaluation in `notebooks/06_economic_analysis.ipynb`
- [x] Generate detailed predictions & economic loss report (`results/predictions/predictions.csv`)

## Phase 6: Web Analytics Dashboard & REST API
- [x] Implement FastAPI server (`api/main.py`) serving live telemetry overview, predictions, anomalies, SHAP features & tech benchmarks
- [x] Build React + Vite web application (`frontend/src/App.tsx`) with interactive tabbed navigation
- [x] Integrate live **Model Selector** dropdown for toggling between XGBoost Regressor and Random Forest Regressor with real-time curve overlay
- [x] Refine UI typography, font sizing, and plain-English terminology for optimal presentation to reviewers
- [x] Verify production build (`npm run build`)

## Phase 7: Solar Operations & Decision Support Layer
- [x] Implement weather forecast synthesis module (`src/weather.py`)
- [x] Implement hourly tomorrow forecasting and 7-day solar potential outlook engine (`src/forecasting.py`)
- [x] Implement 14-system operational health matrix & early warning risk engine (`src/risk_engine.py`)
- [x] Implement AI recommendations & operator cause attribution engine (`src/recommendations.py`)
- [x] Expose new REST endpoints (`GET /api/today`, `/api/forecast`, `/api/system-health`, `/api/attribution`, `/api/revenue`) in `api/main.py`
- [x] Upgrade React web frontend (`frontend/src/App.tsx`) with **Today Brief**, **Weather Forecast**, and **14-System Health Matrix** views
- [x] Update project documentation (`PRD.md`, `README.md`, `tech_stack.md`, `memory.md`, `tasks.md`)

## Phase 8: Indian City Geocoding & UI Aesthetic Refinement
- [x] Implement pre-indexed Indian city and state alias resolver (`POPULAR_INDIAN_CITIES`) in `src/weather.py` (`Gurgaon` $\rightarrow$ **Haryana**, `Bangalore` $\rightarrow$ **Karnataka**, `Mumbai` $\rightarrow$ **Maharashtra**, `Kochi` $\rightarrow$ **Kerala**, `Shimla` $\rightarrow$ **Himachal Pradesh**, etc.)
- [x] Implement population-weighted sorting for Open-Meteo geocoding queries to eliminate small village homonym misclassifications
- [x] Standardize UI yellow accent color palette to warm solar gold (`amber-400` / `hover:amber-300`)
- [x] Ensure rock-solid zero-shake dashboard container layout with dedicated inner scroll viewport
- [x] Verify production bundle build (`npm run build`) with zero errors
