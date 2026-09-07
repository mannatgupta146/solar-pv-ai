# Solar PV AI — Platform Overview

## What is Solar PV AI?

**Solar PV AI** is an intelligent AI-powered platform designed to monitor, forecast, and optimize solar photovoltaic (PV) power plants.

It combines real-time weather forecasts, machine learning models (XGBoost & Random Forest), and economic loss tracking into a simple, beautiful web dashboard. 

Whether you manage a commercial solar power plant or want to forecast solar generation for any location in India, **Solar PV AI** provides accurate energy predictions, fault detection, and financial insights in plain English.

---

## Key Capabilities & Features

### 1. Solar Generation Forecast (Any Location in India)
- **7-Day Weather & Energy Outlook**: Type any Indian city (e.g., *Gurgaon*, *Bangalore*, *Jaipur*, *Mumbai*) and your planned plant size (e.g., *100 kWp*) to get a 7-day weather and power forecast.
- **Revenue Estimates**: Automatically calculates expected daily generation in kilowatt-hours (`kWh`) and estimated revenue in Rupees (`₹` at ₹8.0/kWh).
- **Hourly Power Curves**: Displays an intraday hourly power curve (6 AM to 6 PM) comparing expected power (`kW`), solar sunlight (`W/m²`), and cloud cover (`%`).

### 2. Plant Performance Analytics (NISE Gurgaon Hub)
- **Real-Time Plant Tracking**: Live overview of real solar plant telemetry data (e.g., NISE Gurgaon plant).
- **AI Prediction Models**: Toggle between **XGBoost** and **Random Forest** AI models to compare expected vs. actual solar output in real-time.

### 3. Smart Alerts & Fault Monitoring
- **Persistent Drop Detection**: Filters out brief passing clouds by requiring **40+ minute drop windows** before flagging an issue.
- **Loss Impact Analysis**: Instantly calculates exact energy loss in `kWh` and financial impact in Rupees (`₹`) for every detected power drop.

### 4. AI Insights & Explainability
- **SHAP Feature Insights**: Answers the question *"Why did solar output drop?"* by identifying whether the cause was low sunlight, heavy cloud cover, ambient temperature, or system efficiency.
- **Tech Specifications**: Shows detailed solar inverter and technology breakdowns.

---

## Summary of Platform Value

| Benefit | How Solar PV AI Delivers It |
| :--- | :--- |
| **Accurate Planning** | Predicts 7-day solar power output and daily revenue for any Indian location. |
| **Fewer False Alarms** | Suppresses short 10-minute passing cloud noise to only highlight real persistent power drops. |
| **Clear Financial Tracking** | Shows exact energy losses (`kWh`) and Rupees lost (`₹`) for operational decisions. |
| **Simple & Plain English** | Replaces complex academic jargon with intuitive, clean dashboards. |
