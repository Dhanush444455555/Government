import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime
from backend.app.database import Base

class InterviewQuestion(Base):
    __tablename__ = "interview_questions"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    category = Column(String(50), nullable=False) # Technical, HR, Aptitude, Project, Mock
    sub_category = Column(String(100), nullable=True) # e.g. OOPs, System Design, Behavioral, Quant, Verbal
    company = Column(String(100), nullable=True) # General, TCS, Infosys, Amazon, NIC, DRDO
    question = Column(Text, nullable=False)
    answer = Column(Text, nullable=False)
    tips = Column(Text, nullable=True)
    difficulty = Column(String(50), default="Medium")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class AptitudePractice(Base):
    __tablename__ = "aptitude_practices"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    type = Column(String(50), nullable=False) # Quantitative, Logical Reasoning, Verbal Ability
    topic = Column(String(100), nullable=False)
    question = Column(Text, nullable=False)
    options_json = Column(Text, nullable=False) # JSON array of 4 options
    correct_option = Column(String(10), nullable=False) # A, B, C, or D
    explanation = Column(Text, nullable=False)
    formula_used = Column(String(255), nullable=True)
