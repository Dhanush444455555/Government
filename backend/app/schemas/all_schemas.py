from pydantic import BaseModel, EmailStr
from typing import Optional, List, Dict, Any

# Auth Schemas
class UserRegister(BaseModel):
    email: EmailStr
    password: str
    name: Optional[str] = "Student Aspirant"
    target_exam: Optional[str] = "Civil Services (UPSC)"
    education: Optional[str] = "Bachelor's Degree"
    study_hours_per_day: Optional[int] = 4
    gpa: Optional[str] = "7.5"

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
    user: Dict[str, Any]

# ML Schemas
class PerformancePredictRequest(BaseModel):
    mock_score: float
    study_hours: float
    gpa: float
    attempts: int = 0
    revision_rounds: int = 2

class ReadinessAnalysisRequest(BaseModel):
    subject_scores: Dict[str, float]
    total_tests_taken: int = 5

class CourseRecommendRequest(BaseModel):
    user_interests: str
    target_sector: Optional[str] = ""
    education_level: Optional[str] = ""

class ProgressClassifyRequest(BaseModel):
    weekly_hours: float
    tests_completed: int
    avg_score: float
    active_days: int

# Mock Test Submit
class TestSubmissionRequest(BaseModel):
    test_id: int
    answers: Dict[str, str] # question_index -> chosen_option
    time_taken_seconds: int

# Job Application
class JobApplicationRequest(BaseModel):
    job_id: int
    resume_text: Optional[str] = ""
    cover_note: Optional[str] = ""
