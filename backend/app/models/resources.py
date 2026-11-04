"""
Study Resources model — links to free textbooks, notes, YouTube playlists.
"""
from sqlalchemy import Column, Integer, String, Text, Boolean
from backend.app.database import Base


class StudyResource(Base):
    __tablename__ = "study_resources"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(300), nullable=False)
    resource_type = Column(String(30), nullable=False)   # youtube | pdf | website | notes
    url = Column(String(500), nullable=False)
    subject = Column(String(150), nullable=False)         # History, Polity, Maths, GK, etc.
    description = Column(Text)
    exam_tags = Column(String(500))                       # comma-separated: UPSC,SSC,Banking
    language = Column(String(20), default="English")
    is_free = Column(Boolean, default=True)
    provider = Column(String(150))                        # NCERT, StudyIQ, Khan Academy, etc.
    thumbnail_emoji = Column(String(10), default="📚")


class GovExam(Base):
    """Extended exam catalog with detailed metadata for every major govt exam."""
    __tablename__ = "gov_exams"

    id = Column(Integer, primary_key=True, index=True)
    category = Column(String(100), nullable=False)         # UPSC | SSC | Banking | Railways | Defence | State PSC | Teaching | Insurance
    exam_name = Column(String(200), nullable=False)
    full_name = Column(String(300), nullable=False)
    conducting_body = Column(String(200))
    vacancies_approx = Column(String(100))
    eligibility_age = Column(String(100))
    eligibility_education = Column(String(200))
    exam_pattern = Column(Text)                            # stages, marks breakdown
    syllabus_summary = Column(Text)
    official_website = Column(String(300))
    notification_month = Column(String(50))
    exam_month = Column(String(50))
    salary_range = Column(String(150))
    difficulty = Column(String(20), default="High")        # High | Medium | Low
    popular_rank = Column(Integer, default=99)
