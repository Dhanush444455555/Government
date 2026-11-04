from backend.app.database import Base
from backend.app.models.user import User
from backend.app.models.exam import ExamCategory, Exam, StudyMaterial, PreviousPaper
from backend.app.models.mock_test import MockTest, TestResult
from backend.app.models.job import Job, JobApplication
from backend.app.models.course import Course
from backend.app.models.interview import InterviewQuestion, AptitudePractice
from backend.app.models.upsc import CivilServicePost, UPSCSyllabusEntry, UPSCCurrentAffairsCategory, UPSCStudyStrategy
from backend.app.models.resources import StudyResource, GovExam

__all__ = [
    "Base",
    "User",
    "ExamCategory",
    "Exam",
    "StudyMaterial",
    "PreviousPaper",
    "MockTest",
    "TestResult",
    "Job",
    "JobApplication",
    "Course",
    "InterviewQuestion",
    "AptitudePractice",
    "CivilServicePost",
    "UPSCSyllabusEntry",
    "UPSCCurrentAffairsCategory",
    "UPSCStudyStrategy",
    "StudyResource",
    "GovExam",
]
