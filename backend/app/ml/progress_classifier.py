import numpy as np
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline

class StudentProgressClassifier:
    def __init__(self):
        np.random.seed(42)
        n = 500

        # Features: [weekly_study_hours, tests_completed, avg_test_score, consistency_days_per_month]
        hours = np.random.uniform(5, 50, n)
        tests = np.random.randint(0, 25, n)
        scores = np.random.uniform(30, 95, n)
        consistency = np.random.randint(2, 30, n)

        # Labels:
        # 0 = At Risk / Needs Action
        # 1 = Steady Progress
        # 2 = High Velocity / Top Performer
        labels = []
        for i in range(n):
            composite = 0.3 * (hours[i] / 50 * 100) + 0.3 * scores[i] + 0.25 * (consistency[i] / 30 * 100) + 0.15 * (tests[i] / 25 * 100)
            if composite >= 75:
                labels.append(2)
            elif composite >= 48:
                labels.append(1)
            else:
                labels.append(0)

        X = np.column_stack([hours, tests, scores, consistency])
        y = np.array(labels)

        self.model = Pipeline([
            ("scaler", StandardScaler()),
            ("classifier", LogisticRegression(max_iter=500, random_state=42))
        ])
        self.model.fit(X, y)

        self.category_names = [
            "Needs Immediate Support & Restructuring",
            "Consistent Progress / On Track",
            "High Velocity / Top Candidate"
        ]

        self.action_plans = [
            "Focus on establishing a regular 3-hour daily study routine, revisit foundational NCERTs, and take 1 targeted practice quiz every 2 days.",
            "Maintain current momentum. Increase full-length timed mock tests to 2 per week and review negative marks thoroughly.",
            "Exceptional discipline. Focus on advanced previous year questions, answer writing practice, and speed optimization for competitive edge."
        ]

    def classify(self, weekly_hours: float, tests_completed: int, avg_score: float, active_days: int) -> dict:
        features = np.array([[weekly_hours, tests_completed, avg_score, active_days]])
        pred_idx = int(self.model.predict(features)[0])
        probabilities = self.model.predict_proba(features)[0]

        return {
            "progress_category": self.category_names[pred_idx],
            "category_level": pred_idx, # 0, 1, or 2
            "confidence_percentage": round(float(probabilities[pred_idx]) * 100, 1),
            "personalized_action_plan": self.action_plans[pred_idx],
            "metrics_analyzed": {
                "weekly_hours": weekly_hours,
                "tests_completed": tests_completed,
                "avg_score": avg_score,
                "monthly_active_days": active_days
            },
            "model_type": "Scikit-learn Logistic Regression Pipeline"
        }

progress_classifier = StudentProgressClassifier()
