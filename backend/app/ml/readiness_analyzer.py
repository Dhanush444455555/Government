import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier

class ExamReadinessAnalyzer:
    def __init__(self):
        np.random.seed(101)
        n = 600

        # Features: [history_accuracy, polity_accuracy, aptitude_accuracy, reasoning_accuracy, current_affairs_accuracy, total_tests_taken]
        hist = np.random.uniform(20, 100, n)
        pol = np.random.uniform(20, 100, n)
        apt = np.random.uniform(20, 100, n)
        reas = np.random.uniform(20, 100, n)
        ca = np.random.uniform(20, 100, n)
        tests = np.random.randint(2, 40, n)

        avg_accuracy = (hist + pol + apt + reas + ca) / 5.0
        
        # 3 Classes: 0: Low Readiness, 1: Moderate Readiness, 2: Exam Ready
        labels = []
        for i in range(n):
            if avg_accuracy[i] >= 72 and tests[i] >= 10:
                labels.append(2)
            elif avg_accuracy[i] >= 50:
                labels.append(1)
            else:
                labels.append(0)

        X = np.column_stack([hist, pol, apt, reas, ca, tests])
        y = np.array(labels)

        self.clf = RandomForestClassifier(n_estimators=50, random_state=42)
        self.clf.fit(X, y)
        self.classes = ["Needs Foundation Building", "Progressing Well / Moderate Readiness", "Exam Ready / Advanced"]

    def analyze(self, subject_scores: dict, total_tests_taken: int = 5) -> dict:
        hist = float(subject_scores.get("history", 60))
        pol = float(subject_scores.get("polity", 60))
        apt = float(subject_scores.get("aptitude", 60))
        reas = float(subject_scores.get("reasoning", 60))
        ca = float(subject_scores.get("current_affairs", 60))

        features = np.array([[hist, pol, apt, reas, ca, total_tests_taken]])
        class_idx = int(self.clf.predict(features)[0])
        probabilities = self.clf.predict_proba(features)[0]

        # Weak areas determination
        scores_map = {
            "History & Culture": hist,
            "Indian Polity & Governance": pol,
            "Quantitative Aptitude": apt,
            "Logical Reasoning": reas,
            "Current Affairs": ca
        }
        sorted_subjects = sorted(scores_map.items(), key=lambda x: x[1])
        weak_areas = [s[0] for s in sorted_subjects if s[1] < 65]
        strong_areas = [s[0] for s in sorted_subjects if s[1] >= 75]

        avg_score = round(float(np.mean([hist, pol, apt, reas, ca])), 1)

        return {
            "readiness_status": self.classes[class_idx],
            "readiness_score": avg_score,
            "readiness_probability": round(float(probabilities[class_idx]) * 100, 1),
            "weak_areas": weak_areas if weak_areas else ["Keep practicing mixed mock papers"],
            "strong_areas": strong_areas if strong_areas else ["Good baseline across general studies"],
            "subject_breakdown": scores_map,
            "model": "Scikit-learn RandomForest Classifier"
        }

readiness_analyzer = ExamReadinessAnalyzer()
