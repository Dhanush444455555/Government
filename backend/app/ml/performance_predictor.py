import numpy as np
import pandas as pd
from sklearn.linear_model import Ridge
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline

class StudentPerformancePredictor:
    def __init__(self):
        # Synthetic baseline representative dataset for student performance in competitive exams
        np.random.seed(42)
        n_samples = 500
        
        mock_score = np.random.uniform(30, 95, n_samples)
        study_hours = np.random.uniform(2, 12, n_samples)
        gpa = np.random.uniform(5.5, 9.8, n_samples)
        attempts = np.random.choice([0, 1, 2, 3, 4], size=n_samples, p=[0.4, 0.3, 0.15, 0.1, 0.05])
        revision_rounds = np.random.randint(1, 6, n_samples)

        # Realistic formula with statistical noise
        final_score = (
            0.45 * mock_score +
            3.2 * study_hours +
            3.5 * gpa -
            2.0 * attempts +
            3.0 * revision_rounds +
            np.random.normal(0, 3, n_samples)
        )
        final_score = np.clip(final_score, 15, 100)

        df = pd.DataFrame({
            "mock_score": mock_score,
            "study_hours": study_hours,
            "gpa": gpa,
            "attempts": attempts,
            "revision_rounds": revision_rounds,
            "final_score": final_score
        })

        X = df[["mock_score", "study_hours", "gpa", "attempts", "revision_rounds"]]
        y = df["final_score"]

        self.model = Pipeline([
            ("scaler", StandardScaler()),
            ("regressor", Ridge(alpha=1.0))
        ])
        self.model.fit(X, y)

    def predict(self, mock_score: float, study_hours: float, gpa: float, attempts: int, revision_rounds: int = 2) -> dict:
        features = np.array([[mock_score, study_hours, gpa, attempts, revision_rounds]])
        predicted_score = float(self.model.predict(features)[0])
        predicted_score = round(max(5.0, min(99.0, predicted_score)), 1)
        
        # Calculate passing probability (sigmoid centered around cutoff 60)
        z = (predicted_score - 60.0) / 10.0
        probability = round(1.0 / (1.0 + np.exp(-z)) * 100, 1)

        tier = "High Potential" if predicted_score >= 75 else ("Moderate Probability" if predicted_score >= 55 else "Needs High Focus")

        return {
            "predicted_score": predicted_score,
            "passing_probability": probability,
            "performance_tier": tier,
            "recommended_daily_hours": max(int(study_hours), 6 if predicted_score < 60 else 4),
            "model_type": "Scikit-learn Ridge Regression"
        }

predictor = StudentPerformancePredictor()
