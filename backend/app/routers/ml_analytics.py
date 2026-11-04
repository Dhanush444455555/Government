from fastapi import APIRouter
from backend.app.schemas.all_schemas import (
    PerformancePredictRequest,
    ReadinessAnalysisRequest,
    CourseRecommendRequest,
    ProgressClassifyRequest
)
from backend.app.ml.performance_predictor import predictor
from backend.app.ml.readiness_analyzer import readiness_analyzer
from backend.app.ml.recommender import course_recommender
from backend.app.ml.progress_classifier import progress_classifier
from backend.app.ml.chart_service import generate_performance_chart

router = APIRouter(prefix="/ml", tags=["Machine Learning"])

@router.post("/predict-performance")
def predict_student_performance(req: PerformancePredictRequest):
    """Practical ML Feature 1: Student performance prediction using Scikit-learn Ridge Regression."""
    return predictor.predict(
        mock_score=req.mock_score,
        study_hours=req.study_hours,
        gpa=req.gpa,
        attempts=req.attempts,
        revision_rounds=req.revision_rounds
    )

@router.post("/analyze-readiness")
def analyze_exam_readiness(req: ReadinessAnalysisRequest):
    """Practical ML Feature 2: Exam preparation performance analysis using Scikit-learn Random Forest."""
    return readiness_analyzer.analyze(
        subject_scores=req.subject_scores,
        total_tests_taken=req.total_tests_taken
    )

@router.post("/recommend-courses")
def recommend_courses(req: CourseRecommendRequest):
    """Practical ML Feature 3: Personalized course/exam recommendations using TF-IDF & Cosine Similarity."""
    recommendations = course_recommender.recommend(
        user_interests=req.user_interests,
        target_sector=req.target_sector or "",
        education_level=req.education_level or ""
    )
    return {"recommendations": recommendations, "engine": "Scikit-learn TF-IDF Vectorizer + Cosine Similarity"}

@router.post("/classify-progress")
def classify_student_progress(req: ProgressClassifyRequest):
    """Practical ML Feature 4: Student progress classification using Scikit-learn Logistic Regression."""
    return progress_classifier.classify(
        weekly_hours=req.weekly_hours,
        tests_completed=req.tests_completed,
        avg_score=req.avg_score,
        active_days=req.active_days
    )

@router.get("/chart/score-trend")
def get_chart_image(scores: str = "45,55,62,70,78,85"):
    """Generates a Matplotlib performance trajectory chart as base64 string."""
    score_list = [float(x.strip()) for x in scores.split(",") if x.strip()]
    chart_base64 = generate_performance_chart(score_list)
    return {"chart_base64": chart_base64}
