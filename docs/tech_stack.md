# Technology Stack & Environment Setup

## 1. Core Stack
- **Language**: Python 3.14 / 3.12 (System Python Environment)
- **Data Wrangling**: `pandas`, `numpy`, `openpyxl`
- **Machine Learning**: `scikit-learn` (Random Forest Regressor), `xgboost` (XGBRegressor)
- **Model Explainability**: `shap` (TreeExplainer)
- **Visualization**: `matplotlib`, `seaborn`
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
```

---

## 3. Environment Setup & Execution

### Install Dependencies Globally:
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

### Launch Jupyter Notebook:
```bash
jupyter notebook
```
