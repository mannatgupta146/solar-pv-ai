"""
Risk engine & system-level health status monitoring across all 14 NISE PV technology blocks.
"""

def evaluate_system_health_matrix():
    """
    Evaluates operational health across all 14 NISE solar subsystems.
    """
    systems = [
        {"id": "SYS-01", "name": "Surya Bhavan Central (150 kWp)", "expected_kw": 142.0, "actual_kw": 139.5, "deviation_pct": -1.8, "risk_level": "Low", "status": "Healthy", "code": "GREEN"},
        {"id": "SYS-02", "name": "IBC System (100 kWp)", "expected_kw": 95.0, "actual_kw": 93.8, "deviation_pct": -1.3, "risk_level": "Low", "status": "Healthy", "code": "GREEN"},
        {"id": "SYS-03", "name": "HIT System (100 kWp)", "expected_kw": 94.0, "actual_kw": 74.2, "deviation_pct": -21.1, "risk_level": "High", "status": "Action Required", "code": "RED", "issue": "Persistent underperformance (30+ mins)"},
        {"id": "SYS-04", "name": "Multi C-Si (75 kWp)", "expected_kw": 68.0, "actual_kw": 66.5, "deviation_pct": -2.2, "risk_level": "Low", "status": "Healthy", "code": "GREEN"},
        {"id": "SYS-05", "name": "CIGS Thin-Film (100 kWp)", "expected_kw": 88.0, "actual_kw": 84.1, "deviation_pct": -4.4, "risk_level": "Low", "status": "Healthy", "code": "GREEN"},
        {"id": "SYS-06", "name": "CdTe Thin-Film (100 kWp)", "expected_kw": 89.0, "actual_kw": 85.0, "deviation_pct": -4.5, "risk_level": "Low", "status": "Healthy", "code": "GREEN"},
        {"id": "SYS-07", "name": "Inverter Block 7 (Aditya Bhavan)", "expected_kw": 7.2, "actual_kw": 5.9, "deviation_pct": -18.1, "risk_level": "Medium", "status": "Warning", "code": "AMBER", "issue": "Producing 18% less power than expected"},
        {"id": "SYS-08", "name": "New Guest House (25 kWp)", "expected_kw": 23.0, "actual_kw": 22.4, "deviation_pct": -2.6, "risk_level": "Low", "status": "Healthy", "code": "GREEN"},
        {"id": "SYS-09", "name": "Bifacial Monofacial (10 kWp)", "expected_kw": 9.4, "actual_kw": 9.2, "deviation_pct": -2.1, "risk_level": "Low", "status": "Healthy", "code": "GREEN"},
        {"id": "SYS-10", "name": "Bifacial Tilted (5 kWp)", "expected_kw": 4.8, "actual_kw": 4.7, "deviation_pct": -2.0, "risk_level": "Low", "status": "Healthy", "code": "GREEN"},
        {"id": "SYS-11", "name": "Bifacial Vertical (5 kWp)", "expected_kw": 4.6, "actual_kw": 4.5, "deviation_pct": -2.2, "risk_level": "Low", "status": "Healthy", "code": "GREEN"},
        {"id": "SYS-12", "name": "Old Guest House (7.5 kWp)", "expected_kw": 6.8, "actual_kw": 6.6, "deviation_pct": -2.9, "risk_level": "Low", "status": "Healthy", "code": "GREEN"},
        {"id": "SYS-13", "name": "Battery VRAL Subsystem", "expected_kw": 15.0, "actual_kw": 14.7, "deviation_pct": -2.0, "risk_level": "Low", "status": "Healthy", "code": "GREEN"},
        {"id": "SYS-14", "name": "Battery Flooded LA Subsystem", "expected_kw": 15.0, "actual_kw": 14.6, "deviation_pct": -2.7, "risk_level": "Low", "status": "Healthy", "code": "GREEN"}
    ]
    
    warnings = [
        {
            "system_id": "SYS-03",
            "system_name": "HIT System (100 kWp)",
            "title": "Severe Output Drop Detected",
            "description": "HIT System is producing 21.1% less power than expected. Persistent for 40+ mins.",
            "risk": "High",
            "recommended_action": "Inspect string inverter connectors during evening maintenance window."
        },
        {
            "system_id": "SYS-07",
            "system_name": "Inverter Block 7 (Aditya Bhavan)",
            "title": "Early Warning Deviation",
            "description": "Inverter Block 7 is producing 18% less power than expected (30 min duration).",
            "risk": "Medium",
            "recommended_action": "Monitor inverter output during next scheduled check."
        }
    ]
    
    return {
        "total_systems": len(systems),
        "healthy_count": len([s for s in systems if s["code"] == "GREEN"]),
        "warning_count": len([s for s in systems if s["code"] == "AMBER"]),
        "critical_count": len([s for s in systems if s["code"] == "RED"]),
        "systems": systems,
        "early_warnings": warnings
    }
