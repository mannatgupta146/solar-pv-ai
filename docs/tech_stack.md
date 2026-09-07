# Technology Stack & Environment Setup

## 1. Core Stack
- **Language**: Python 3.14 / 3.12 (System Python Environment), TypeScript / JavaScript
- **Backend API**: FastAPI, Uvicorn CORS Middleware (`api/main.py`)
- **Decision Engine**: `src/weather.py`, `src/forecasting.py`, `src/risk_engine.py`, `src/recommendations.py`
- **Frontend Dashboard**: React 18, Vite 6, TailwindCSS 4, Recharts, Lucide Icons
- **Data Wrangling**: `pandas`, `numpy`, `openpyxl`
- **Machine Learning**: `scikit-learn` (Random Forest Regressor), `xgboost` (XGBRegressor)
- **Model Explainability**: `shap` (TreeExplainer)
- **Visualization**: Recharts (Web UI), `matplotlib`, `seaborn`
- **Serialization**: `joblib`
- **Interactive Development**: `jupyter`, `ipykernel`

---

## 2. Dependency Manifest (`requirements.txt`)
```text
pandas
numpy
openpyxl
matplotlib
seaborn
scikit-learn
xgboost
shap
jupyter
joblib
scipy
fastapi
uvicorn
```

---

## 3. Environment Setup & Execution

### Install Python Dependencies:
```bash
pip3 install -r requirements.txt --break-system-packages
```

### Run Full Pipeline End-to-End:
```bash
python3 src/preprocessing.py
python3 src/train.py
python3 src/predict.py
python3 src/anomaly.py
python3 src/explain.py
python3 src/economics.py
```

### Launch Backend API Server (FastAPI):
```bash
python3 -m uvicorn api.main:app --host 0.0.0.0 --port 8000
```

### Launch Frontend Dashboard (React + Vite):
```bash
cd frontend
npm install
npm run dev
```

### Build Production Bundle:
```bash
cd frontend
npm run build
```
