# Solar PV AI - Research & ML Pipeline

AI-driven anomaly detection and economic loss analysis for Solar PV plants using National Institute of Solar Energy (NISE) dataset.

## Project Structure

```text
solar-pv-ai/
│
├── data/
│   ├── raw/
│   │   └── nise/
│   └── processed/
│
├── notebooks/
│   ├── 01_data_inspection.ipynb
│   ├── 02_data_cleaning_eda.ipynb
│   ├── 03_power_prediction.ipynb
│   ├── 04_anomaly_detection.ipynb
│   ├── 05_shap_analysis.ipynb
│   └── 06_economic_analysis.ipynb
│
├── src/
│   ├── __init__.py
│   ├── config.py
│   ├── data_loader.py
│   ├── preprocessing.py
│   ├── features.py
│   ├── train.py
│   ├── predict.py
│   ├── anomaly.py
│   ├── explain.py
│   └── economics.py
│
├── models/
├── results/
│   ├── figures/
│   ├── metrics/
│   └── predictions/
│
├── requirements.txt
├── .gitignore
└── README.md
```
