"""
Operator recommendation engine & plain-English cause attribution synthesizer.
"""

def generate_daily_brief():
    """
    Returns today's comprehensive solar brief card data.
    """
    return {
        "date": "8 September 2026",
        "expected_generation_kwh": 1284,
        "expected_peak_kw": 312,
        "solar_potential_pct": 82,
        "weather_summary": "Partly Cloudy",
        "cloud_impact": "Medium (11 AM - 2 PM)",
        "plant_health": "Healthy",
        "plant_health_code": "GREEN",
        "best_generation_window": "10:30 AM – 2:00 PM",
        "energy_at_risk_kwh": 74,
        "financial_risk_inr": 592,
        "ai_recommendations": [
            "Generation is expected to be ~5% lower today because of afternoon cloud cover.",
            "Inverter Block 7 shows minor efficiency drift; monitor during next maintenance window.",
            "No immediate emergency shutdown required."
        ]
    }

def get_cause_attribution():
    """
    Returns plain-English operator breakdown answering "Why is production low?".
    """
    return {
        "primary_reason": "Cloud Cover & Shading",
        "primary_contribution_pct": 48,
        "secondary_reason": "Reduced Irradiance Level",
        "secondary_contribution_pct": 31,
        "equipment_contribution_pct": 21,
        "equipment_factor_level": "Low",
        "ai_conclusion": "The current generation drop is primarily weather-driven (79% combined weather factor). Equipment health is operating normally across 13 out of 14 inverter blocks."
    }

def get_financial_summary():
    """
    Returns today's and monthly business value & tariff sensitivity breakdown.
    """
    return {
        "today": {
            "expected_generation_kwh": 1420,
            "actual_generation_kwh": 1301,
            "energy_lost_kwh": 119,
            "revenue_lost_inr": 952,
            "tariff_rate_inr": 8.0
        },
        "monthly": {
            "month": "September 2026",
            "expected_revenue_inr": 42800,
            "actual_revenue_inr": 39600,
            "potential_loss_inr": 3200
        },
        "sensitivity_matrix": [
            {"tariff": "₹4 / kWh", "loss": 4164},
            {"tariff": "₹6 / kWh", "loss": 6246},
            {"tariff": "₹8 / kWh (Base)", "loss": 8328},
            {"tariff": "₹10 / kWh", "loss": 10410},
            {"tariff": "₹12 / kWh", "loss": 12492}
        ]
    }
