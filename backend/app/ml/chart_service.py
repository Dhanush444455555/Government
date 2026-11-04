"""
chart_service.py — Returns chart data as JSON (no matplotlib dependency).
Matplotlib was removed to reduce Vercel bundle size below 500 MB.
Frontend (Recharts) renders all charts from this JSON data.
"""
import base64


def generate_performance_chart(scores: list, dates: list = None) -> str:
    """
    Returns a base64-encoded JSON payload representing chart data.
    The frontend should use Recharts to render this data instead of a PNG image.
    """
    if not scores:
        scores = [45, 52, 60, 68, 74, 82]
    if not dates or len(dates) != len(scores):
        dates = [f"Test {i+1}" for i in range(len(scores))]

    chart_data = {
        "type": "line",
        "labels": dates,
        "datasets": [
            {
                "label": "Mock Test Score",
                "data": scores,
                "borderColor": "#38bdf8",
                "backgroundColor": "rgba(56,189,248,0.15)",
            }
        ],
        "baseline": 60,
        "title": "Student Learning Trajectory & Score Progression",
    }

    import json
    json_str = json.dumps(chart_data)
    return base64.b64encode(json_str.encode()).decode("utf-8")
