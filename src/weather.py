"""
Live Geocoding & Weather forecasting module for ANY location in India.
Uses Open-Meteo Geocoding API & Open-Meteo Forecast API.
"""
import urllib.request
import urllib.parse
import json
import numpy as np

POPULAR_INDIAN_CITIES = {
    "gurgaon": {"name": "Gurgaon", "admin1": "Haryana", "country": "India", "latitude": 28.4595, "longitude": 77.0266},
    "gurugram": {"name": "Gurugram", "admin1": "Haryana", "country": "India", "latitude": 28.4595, "longitude": 77.0266},
    "nise gurgaon": {"name": "Gurgaon (NISE Site)", "admin1": "Haryana", "country": "India", "latitude": 28.4595, "longitude": 77.0266},
    "pune": {"name": "Pune", "admin1": "Maharashtra", "country": "India", "latitude": 18.5204, "longitude": 73.8567},
    "poona": {"name": "Pune", "admin1": "Maharashtra", "country": "India", "latitude": 18.5204, "longitude": 73.8567},
    "jaipur": {"name": "Jaipur", "admin1": "Rajasthan", "country": "India", "latitude": 26.9124, "longitude": 75.7873},
    "patna": {"name": "Patna", "admin1": "Bihar", "country": "India", "latitude": 25.5941, "longitude": 85.1376},
    "shimla": {"name": "Shimla", "admin1": "Himachal Pradesh", "country": "India", "latitude": 31.1048, "longitude": 77.1734},
    "simla": {"name": "Shimla", "admin1": "Himachal Pradesh", "country": "India", "latitude": 31.1048, "longitude": 77.1734},
    "kochi": {"name": "Kochi", "admin1": "Kerala", "country": "India", "latitude": 9.9312, "longitude": 76.2673},
    "cochin": {"name": "Kochi", "admin1": "Kerala", "country": "India", "latitude": 9.9312, "longitude": 76.2673},
    "ahmedabad": {"name": "Ahmedabad", "admin1": "Gujarat", "country": "India", "latitude": 23.0225, "longitude": 72.5714},
    "delhi": {"name": "Delhi", "admin1": "Delhi", "country": "India", "latitude": 28.6139, "longitude": 77.2090},
    "new delhi": {"name": "New Delhi", "admin1": "Delhi", "country": "India", "latitude": 28.6139, "longitude": 77.2090},
    "mumbai": {"name": "Mumbai", "admin1": "Maharashtra", "country": "India", "latitude": 19.0760, "longitude": 72.8777},
    "bombay": {"name": "Mumbai", "admin1": "Maharashtra", "country": "India", "latitude": 19.0760, "longitude": 72.8777},
    "bengaluru": {"name": "Bengaluru", "admin1": "Karnataka", "country": "India", "latitude": 12.9716, "longitude": 77.5946},
    "bangalore": {"name": "Bengaluru", "admin1": "Karnataka", "country": "India", "latitude": 12.9716, "longitude": 77.5946},
    "hyderabad": {"name": "Hyderabad", "admin1": "Telangana", "country": "India", "latitude": 17.3850, "longitude": 78.4867},
    "chennai": {"name": "Chennai", "admin1": "Tamil Nadu", "country": "India", "latitude": 13.0827, "longitude": 80.2707},
    "madras": {"name": "Chennai", "admin1": "Tamil Nadu", "country": "India", "latitude": 13.0827, "longitude": 80.2707},
    "kolkata": {"name": "Kolkata", "admin1": "West Bengal", "country": "India", "latitude": 22.5726, "longitude": 88.3639},
    "calcutta": {"name": "Kolkata", "admin1": "West Bengal", "country": "India", "latitude": 22.5726, "longitude": 88.3639},
    "lucknow": {"name": "Lucknow", "admin1": "Uttar Pradesh", "country": "India", "latitude": 26.8467, "longitude": 80.9462},
    "noida": {"name": "Noida", "admin1": "Uttar Pradesh", "country": "India", "latitude": 28.5355, "longitude": 77.3910},
    "chandigarh": {"name": "Chandigarh", "admin1": "Chandigarh", "country": "India", "latitude": 30.7333, "longitude": 76.7794},
    "varanasi": {"name": "Varanasi", "admin1": "Uttar Pradesh", "country": "India", "latitude": 25.3176, "longitude": 82.9739},
    "benares": {"name": "Varanasi", "admin1": "Uttar Pradesh", "country": "India", "latitude": 25.3176, "longitude": 82.9739},
    "surat": {"name": "Surat", "admin1": "Gujarat", "country": "India", "latitude": 21.1702, "longitude": 72.8311},
    "indore": {"name": "Indore", "admin1": "Madhya Pradesh", "country": "India", "latitude": 22.7196, "longitude": 75.8577},
    "bhopal": {"name": "Bhopal", "admin1": "Madhya Pradesh", "country": "India", "latitude": 23.2599, "longitude": 77.4126},
    "nagpur": {"name": "Nagpur", "admin1": "Maharashtra", "country": "India", "latitude": 21.1458, "longitude": 79.0882},
    "visakhapatnam": {"name": "Visakhapatnam", "admin1": "Andhra Pradesh", "country": "India", "latitude": 17.6868, "longitude": 83.2185},
    "vizag": {"name": "Visakhapatnam", "admin1": "Andhra Pradesh", "country": "India", "latitude": 17.6868, "longitude": 83.2185},
    "guwahati": {"name": "Guwahati", "admin1": "Assam", "country": "India", "latitude": 26.1445, "longitude": 91.7362},
    "srinagar": {"name": "Srinagar", "admin1": "Jammu and Kashmir", "country": "India", "latitude": 34.0837, "longitude": 74.7973},
    "ranchi": {"name": "Ranchi", "admin1": "Jharkhand", "country": "India", "latitude": 23.3441, "longitude": 85.3096},
    "bhubaneswar": {"name": "Bhubaneswar", "admin1": "Odisha", "country": "India", "latitude": 20.2961, "longitude": 85.8245},
    "thiruvananthapuram": {"name": "Thiruvananthapuram", "admin1": "Kerala", "country": "India", "latitude": 8.5241, "longitude": 76.9366},
    "trivandrum": {"name": "Thiruvananthapuram", "admin1": "Kerala", "country": "India", "latitude": 8.5241, "longitude": 76.9366}
}

def geocode_location(query: str):
    """
    Geocodes any location or city name in India using curated pre-indexed city maps
    and live Open-Meteo Geocoding API with population priority.
    """
    clean_query = query.strip().lower()
    
    # 1. Direct match in curated popular Indian cities dictionary
    if clean_query in POPULAR_INDIAN_CITIES:
        return POPULAR_INDIAN_CITIES[clean_query]
        
    # Check if query contains any known city name as substring
    for key, city_data in POPULAR_INDIAN_CITIES.items():
        if key == clean_query or key in clean_query:
            return city_data

    # 2. Live query to Open-Meteo Geocoding API
    search_term = "Gurugram" if clean_query in ["gurgaon", "gurugram"] else query
    encoded_query = urllib.parse.quote(search_term)
    url = f"https://geocoding-api.open-meteo.com/v1/search?name={encoded_query}&count=10&language=en&format=json"
    
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=5) as response:
            data = json.loads(response.read().decode())
            results = data.get("results", [])
            
            # Filter for India locations
            india_results = [r for r in results if r.get("country_code") == "IN"]
            final_results = india_results if india_results else results
            
            if not final_results:
                return None
                
            # Prefer result with population if available
            sorted_results = sorted(final_results, key=lambda x: x.get("population") or 0, reverse=True)
            top = sorted_results[0]
            
            return {
                "name": top.get("name"),
                "admin1": top.get("admin1", "India"), # State
                "country": top.get("country", "India"),
                "latitude": top.get("latitude"),
                "longitude": top.get("longitude")
            }
    except Exception as e:
        print(f"Geocoding error for {query}: {e}")
        return None

def fetch_weather_by_coords(lat: float, lon: float, location_name: str, state_name: str, system_size_kw: float = 100.0):
    """
    Fetches real-time hourly solar radiation and weather forecast for exact Lat/Lon coordinates.
    """
    url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=temperature_2m,relative_humidity_2m,cloud_cover,shortwave_radiation&hourly=temperature_2m,cloud_cover,shortwave_radiation&timezone=Asia%2FKolkata"
    
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=5) as response:
            data = json.loads(response.read().decode())
            
        current = data.get("current", {})
        hourly = data.get("hourly", {})
        
        times = hourly.get("time", [])
        temps = hourly.get("temperature_2m", [])
        clouds = hourly.get("cloud_cover", [])
        rads = hourly.get("shortwave_radiation", [])
        
        daytime_hours = []
        tot_radiation = 0.0
        max_rad = 0.0
        
        for i in range(min(len(times), 24)):
            t_str = times[i]
            hour_val = int(t_str.split("T")[1].split(":")[0])
            if 6 <= hour_val <= 18:
                c_pct = clouds[i] if i < len(clouds) else 10
                r_val = rads[i] if i < len(rads) else 400.0
                temp_val = temps[i] if i < len(temps) else 30.0
                
                tot_radiation += r_val
                if r_val > max_rad:
                    max_rad = r_val
                    
                time_label = f"{hour_val if hour_val <= 12 else hour_val-12} {'AM' if hour_val < 12 else 'PM'}"
                pwr_est = round((r_val / 1000.0) * system_size_kw * 0.78, 1)
                daytime_hours.append({
                    "hour": hour_val,
                    "time": time_label,
                    "cloud_cover_pct": c_pct,
                    "raw_irradiance_w_m2": round(r_val, 1),
                    "temperature_c": round(temp_val, 1),
                    "expected_power_kw": pwr_est
                })

        avg_cloud = int(np.mean([h["cloud_cover_pct"] for h in daytime_hours])) if daytime_hours else 15
        potential_pct = max(50, min(99, int(100 - avg_cloud * 0.4)))
        expected_energy = round(sum([h["expected_power_kw"] for h in daytime_hours]) * (10/60.0) * 6, 1)
        expected_peak = round((max_rad / 1000.0) * system_size_kw * 0.78, 1)
        condition = "Clear & Sunny" if avg_cloud < 20 else ("Partly Cloudy" if avg_cloud < 50 else "Overcast & Cloudy")

        # 7-DAY DAILY FORECAST AGGREGATION
        days_dict = {}
        for i in range(len(times)):
            t_str = times[i]
            date_part, time_part = t_str.split("T")
            hour_val = int(time_part.split(":")[0])
            
            if date_part not in days_dict:
                days_dict[date_part] = []
            days_dict[date_part].append({
                "hour": hour_val,
                "temp": temps[i] if i < len(temps) else 30.0,
                "cloud": clouds[i] if i < len(clouds) else 15,
                "rad": rads[i] if i < len(rads) else 0.0
            })
            
        from datetime import datetime
        daily_forecast = []
        for idx, (date_str, h_data) in enumerate(list(days_dict.items())[:7]):
            dt = datetime.strptime(date_str, "%Y-%m-%d")
            date_label = "Today" if idx == 0 else ("Tomorrow" if idx == 1 else dt.strftime("%a %d %b"))
            
            daytime = [h for h in h_data if 6 <= h["hour"] <= 18]
            if not daytime:
                continue
                
            day_avg_cloud = int(sum(h["cloud"] for h in daytime) / len(daytime))
            day_max_rad = max(h["rad"] for h in daytime)
            day_total_pwr = sum((h["rad"] / 1000.0) * system_size_kw * 0.78 for h in daytime)
            
            day_gen_kwh = round(day_total_pwr, 1)
            day_peak_kw = round((day_max_rad / 1000.0) * system_size_kw * 0.78, 1)
            day_potential_pct = max(50, min(99, int(100 - day_avg_cloud * 0.4)))
            day_est_revenue_inr = round(day_gen_kwh * 8.0, 0)
            day_cond = "Clear & Sunny" if day_avg_cloud < 20 else ("Partly Cloudy" if day_avg_cloud < 50 else "Overcast & Cloudy")
            
            daily_forecast.append({
                "date": date_str,
                "day_label": date_label,
                "condition": day_cond,
                "avg_cloud_pct": day_avg_cloud,
                "max_irradiance_w_m2": round(day_max_rad, 1),
                "expected_generation_kwh": day_gen_kwh,
                "expected_peak_kw": day_peak_kw,
                "solar_potential_pct": day_potential_pct,
                "estimated_revenue_inr": day_est_revenue_inr
            })

        total_7day_kwh = round(sum(d["expected_generation_kwh"] for d in daily_forecast), 1)
        avg_daily_kwh = round(total_7day_kwh / len(daily_forecast), 1) if daily_forecast else expected_energy
        total_7day_revenue_inr = round(sum(d["estimated_revenue_inr"] for d in daily_forecast), 0)
        best_day_entry = max(daily_forecast, key=lambda x: x["expected_generation_kwh"]) if daily_forecast else {"day_label": "Today", "expected_generation_kwh": expected_energy}

        weekly_summary = {
            "total_7day_kwh": total_7day_kwh,
            "avg_daily_kwh": avg_daily_kwh,
            "total_7day_revenue_inr": total_7day_revenue_inr,
            "best_day_label": best_day_entry["day_label"],
            "best_day_kwh": best_day_entry["expected_generation_kwh"]
        }
        
        return {
            "location_name": location_name,
            "state": state_name,
            "system_size_kw": system_size_kw,
            "latitude": lat,
            "longitude": lon,
            "is_live": True,
            "current_temp_c": current.get("temperature_2m", 31.0),
            "current_cloud_pct": current.get("cloud_cover", avg_cloud),
            "current_radiation_w_m2": current.get("shortwave_radiation", 0.0),
            "avg_cloud_cover_pct": avg_cloud,
            "condition": condition,
            "solar_potential_pct": potential_pct,
            "expected_generation_kwh": expected_energy,
            "expected_peak_kw": expected_peak,
            "best_window": "10:30 AM – 2:30 PM",
            "hourly": daytime_hours,
            "daily_forecast": daily_forecast,
            "weekly_summary": weekly_summary
        }
        
    except Exception as e:
        print(f"Fallback weather for {location_name}: {e}")
        fallback_daily = [
            {"date": "2026-09-08", "day_label": "Today", "condition": "Clear & Sunny", "avg_cloud_pct": 15, "max_irradiance_w_m2": 720.0, "expected_generation_kwh": round(system_size_kw * 4.2, 1), "expected_peak_kw": round(system_size_kw * 0.8, 1), "solar_potential_pct": 92, "estimated_revenue_inr": round(system_size_kw * 4.2 * 8.0, 0)},
            {"date": "2026-09-09", "day_label": "Tomorrow", "condition": "Clear & Sunny", "avg_cloud_pct": 10, "max_irradiance_w_m2": 740.0, "expected_generation_kwh": round(system_size_kw * 4.4, 1), "expected_peak_kw": round(system_size_kw * 0.82, 1), "solar_potential_pct": 95, "estimated_revenue_inr": round(system_size_kw * 4.4 * 8.0, 0)},
            {"date": "2026-09-10", "day_label": "Wed 10 Sep", "condition": "Partly Cloudy", "avg_cloud_pct": 30, "max_irradiance_w_m2": 650.0, "expected_generation_kwh": round(system_size_kw * 3.8, 1), "expected_peak_kw": round(system_size_kw * 0.75, 1), "solar_potential_pct": 82, "estimated_revenue_inr": round(system_size_kw * 3.8 * 8.0, 0)},
            {"date": "2026-09-11", "day_label": "Thu 11 Sep", "condition": "Clear & Sunny", "avg_cloud_pct": 12, "max_irradiance_w_m2": 730.0, "expected_generation_kwh": round(system_size_kw * 4.3, 1), "expected_peak_kw": round(system_size_kw * 0.81, 1), "solar_potential_pct": 93, "estimated_revenue_inr": round(system_size_kw * 4.3 * 8.0, 0)},
            {"date": "2026-09-12", "day_label": "Fri 12 Sep", "condition": "Partly Cloudy", "avg_cloud_pct": 25, "max_irradiance_w_m2": 680.0, "expected_generation_kwh": round(system_size_kw * 4.0, 1), "expected_peak_kw": round(system_size_kw * 0.77, 1), "solar_potential_pct": 85, "estimated_revenue_inr": round(system_size_kw * 4.0 * 8.0, 0)},
            {"date": "2026-09-13", "day_label": "Sat 13 Sep", "condition": "Overcast & Cloudy", "avg_cloud_pct": 55, "max_irradiance_w_m2": 520.0, "expected_generation_kwh": round(system_size_kw * 3.2, 1), "expected_peak_kw": round(system_size_kw * 0.65, 1), "solar_potential_pct": 70, "estimated_revenue_inr": round(system_size_kw * 3.2 * 8.0, 0)},
            {"date": "2026-09-14", "day_label": "Sun 14 Sep", "condition": "Partly Cloudy", "avg_cloud_pct": 20, "max_irradiance_w_m2": 700.0, "expected_generation_kwh": round(system_size_kw * 4.1, 1), "expected_peak_kw": round(system_size_kw * 0.78, 1), "solar_potential_pct": 88, "estimated_revenue_inr": round(system_size_kw * 4.1 * 8.0, 0)}
        ]
        return {
            "location_name": location_name,
            "state": state_name,
            "system_size_kw": system_size_kw,
            "latitude": lat,
            "longitude": lon,
            "is_live": False,
            "current_temp_c": 30.0,
            "current_cloud_pct": 20,
            "current_radiation_w_m2": 600.0,
            "avg_cloud_cover_pct": 20,
            "condition": "Partly Cloudy",
            "solar_potential_pct": 85,
            "expected_generation_kwh": round(system_size_kw * 4.2, 1),
            "expected_peak_kw": round(system_size_kw * 0.8, 1),
            "best_window": "10:30 AM – 2:00 PM",
            "hourly": [],
            "daily_forecast": fallback_daily,
            "weekly_summary": {
                "total_7day_kwh": round(system_size_kw * 28.0, 1),
                "avg_daily_kwh": round(system_size_kw * 4.0, 1),
                "total_7day_revenue_inr": round(system_size_kw * 28.0 * 8.0, 0),
                "best_day_label": "Tomorrow",
                "best_day_kwh": round(system_size_kw * 4.4, 1)
            }
        }
