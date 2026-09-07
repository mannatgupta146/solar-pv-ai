"""
Forecasting engine for 24-hour and 7-day solar potential predictions.
"""
import numpy as np

def generate_7day_outlook():
    """
    Returns 7-day solar generation forecast and potential.
    """
    days = [
        {"day": "Mon", "date": "Sep 8", "energy_kwh": 1284, "peak_kw": 312, "potential_pct": 82, "condition": "Partly Cloudy"},
        {"day": "Tue", "date": "Sep 9", "energy_kwh": 1320, "peak_kw": 325, "potential_pct": 87, "condition": "Mostly Sunny"},
        {"day": "Wed", "date": "Sep 10", "energy_kwh": 1410, "peak_kw": 338, "potential_pct": 93, "condition": "Clear Sky"},
        {"day": "Thu", "date": "Sep 11", "energy_kwh": 1190, "peak_kw": 290, "potential_pct": 76, "condition": "Heavy Clouds"},
        {"day": "Fri", "date": "Sep 12", "energy_kwh": 1260, "peak_kw": 305, "potential_pct": 81, "condition": "Scattered Clouds"},
        {"day": "Sat", "date": "Sep 13", "energy_kwh": 1380, "peak_kw": 330, "potential_pct": 90, "condition": "Sunny"},
        {"day": "Sun", "date": "Sep 14", "energy_kwh": 1395, "peak_kw": 332, "potential_pct": 91, "condition": "Sunny"}
    ]
    return days

def get_generation_comparison():
    """
    Returns Yesterday vs Today vs Tomorrow comparison.
    """
    return {
        "yesterday": {"label": "Yesterday (Sep 7)", "energy_kwh": 1350, "status": "Completed"},
        "today": {"label": "Today (Sep 8)", "energy_kwh": 1284, "status": "In Progress"},
        "tomorrow": {"label": "Tomorrow (Sep 9)", "energy_kwh": 1320, "status": "Forecasted"},
        "explanation": "Today is expected to generate 5% less than yesterday primarily due to cloud cover between 11 AM – 2 PM."
    }
