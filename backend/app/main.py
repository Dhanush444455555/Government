from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.core.config import settings
from backend.app.database import engine, Base
import backend.app.models # ensures models registered with Base

# Routers
from backend.app.routers import (
    auth,
    exams,
    courses,
    mock_tests,
    jobs,
    predict,
    chat,
    ml_analytics,
    interview,
    upsc,
    resources
)

# Auto-create all tables on startup
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="ExamGuru AI - Unified Platform for Government Exam Guidance & Employment Support",
    version=settings.VERSION,
    description="Backend API for ExamGuru AI: Government Exam Guidance, Employment Support, Scikit-learn ML Predictions & MySQL Database."
)

# Enable CORS for Vite frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount Routers
app.include_router(auth.router, prefix=settings.API_V1_STR)
app.include_router(exams.router, prefix=settings.API_V1_STR)
app.include_router(courses.router, prefix=settings.API_V1_STR)
app.include_router(mock_tests.router, prefix=settings.API_V1_STR)
app.include_router(jobs.router, prefix=settings.API_V1_STR)
app.include_router(predict.router, prefix=settings.API_V1_STR)
app.include_router(chat.router, prefix=settings.API_V1_STR)
app.include_router(ml_analytics.router, prefix=settings.API_V1_STR)
app.include_router(interview.router, prefix=settings.API_V1_STR)
app.include_router(upsc.router, prefix=settings.API_V1_STR)
app.include_router(resources.router, prefix=settings.API_V1_STR)

@app.get("/")
def root():
    return {
        "status": "online",
        "app": "ExamGuru AI - Unified Platform for Government Exam Guidance & Employment Support",
        "version": settings.VERSION,
        "stack": "FastAPI + SQLAlchemy + MySQL + Scikit-Learn + Vite React"
    }

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "database": "MySQL / SQLAlchemy Active",
        "machine_learning": "Scikit-Learn Ready",
        "auth": "JWT Active"
    }
