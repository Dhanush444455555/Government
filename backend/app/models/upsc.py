from sqlalchemy import Column, Integer, String, Text, Float, Enum
from backend.app.database import Base
import enum


class ExamStage(str, enum.Enum):
    prelims = "prelims"
    mains = "mains"
    interview = "interview"
    foundation = "foundation"


class CivilServicePost(Base):
    __tablename__ = "civil_service_posts"

    id = Column(Integer, primary_key=True, index=True)
    post_name = Column(String(100), nullable=False)           # IAS, IPS, IFS, IRS, etc.
    full_name = Column(String(200), nullable=False)
    service = Column(String(150), nullable=False)             # Indian Administrative Service
    cadre = Column(String(100))                               # State/Central cadre
    pay_level = Column(String(50))                            # Pay matrix level
    roles = Column(Text)                                      # Responsibilities description
    eligibility = Column(Text)                                # Age, education, attempts
    posting_areas = Column(Text)                              # Where posted
    prestige_rank = Column(Integer)                           # 1=highest
    vacancy_approx = Column(String(50))                       # Approximate annual vacancies


class UPSCSyllabusEntry(Base):
    __tablename__ = "upsc_syllabus"

    id = Column(Integer, primary_key=True, index=True)
    stage = Column(String(20), nullable=False)                # prelims / mains / interview
    paper = Column(String(100), nullable=False)               # GS Paper I, Essay, CSAT, etc.
    subject = Column(String(150), nullable=False)             # History, Polity, etc.
    topic = Column(String(200), nullable=False)
    subtopics = Column(Text)                                  # JSON list as text
    weightage_percent = Column(Float, default=0.0)            # Approx % of questions
    priority = Column(String(20), default="high")             # high / medium / low
    recommended_books = Column(Text)                          # Comma-separated books


class UPSCCurrentAffairsCategory(Base):
    __tablename__ = "upsc_current_affairs"

    id = Column(Integer, primary_key=True, index=True)
    category = Column(String(100), nullable=False)            # Economy, Polity, Environment
    topic = Column(String(200), nullable=False)
    description = Column(Text)
    relevance = Column(String(50), default="high")            # high / medium
    source_suggestion = Column(String(200))                   # The Hindu, PIB, etc.


class UPSCStudyStrategy(Base):
    __tablename__ = "upsc_strategies"

    id = Column(Integer, primary_key=True, index=True)
    stage = Column(String(50), nullable=False)                # Foundation, Prelims, Mains, Interview
    phase_months = Column(String(50))                         # e.g. "Month 1-3"
    focus_area = Column(String(200), nullable=False)
    strategy_text = Column(Text, nullable=False)
    daily_hours = Column(Float, default=8.0)
    key_resources = Column(Text)
    milestones = Column(Text)
