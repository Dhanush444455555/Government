import io
import base64
import matplotlib
matplotlib.use('Agg') # Headless backend for web server
import matplotlib.pyplot as plt
import numpy as np

def generate_performance_chart(scores: list, dates: list = None) -> str:
    """Generates a Matplotlib student score trend chart and returns base64 PNG."""
    if not scores:
        scores = [45, 52, 60, 68, 74, 82]
    if not dates or len(dates) != len(scores):
        dates = [f"Test {i+1}" for i in range(len(scores))]

    fig, ax = plt.subplots(figsize=(7, 3.5), dpi=100)
    fig.patch.set_facecolor('#0f172a')
    ax.set_facecolor('#1e293b')

    ax.plot(dates, scores, marker='o', color='#38bdf8', linewidth=2.5, markersize=7, label="Mock Test Score")
    ax.axhline(60, color='#f59e0b', linestyle='--', alpha=0.8, label="Cutoff Baseline (60)")
    
    # Fill area
    ax.fill_between(dates, scores, 0, color='#38bdf8', alpha=0.15)

    ax.set_title("Student Learning Trajectory & Score Progression", color='#f8fafc', fontsize=12, fontweight='bold', pad=12)
    ax.set_ylabel("Score (%)", color='#cbd5e1', fontsize=10)
    ax.set_ylim(0, 105)
    
    ax.tick_params(colors='#94a3b8')
    for spine in ax.spines.values():
        spine.set_color('#334155')

    ax.grid(True, linestyle=':', alpha=0.3, color='#94a3b8')
    ax.legend(facecolor='#0f172a', edgecolor='#334155', labelcolor='#e2e8f0', loc='lower right')

    plt.tight_layout()
    buffer = io.BytesIO()
    plt.savefig(buffer, format='png', facecolor=fig.get_facecolor(), edgecolor='none')
    plt.close(fig)
    buffer.seek(0)
    return base64.b64encode(buffer.read()).decode('utf-8')
