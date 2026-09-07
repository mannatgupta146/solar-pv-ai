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
