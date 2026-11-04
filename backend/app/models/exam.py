import datetime
from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, ForeignKey
from sqlalchemy.orm import relationship
from backend.app.database import Base

class ExamCategory(Base):
    __tablename__ = "exam_categories"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(100), unique=True, nullable=False)
    description = Column(Text, nullable=True)
    icon = Column(String(50), default="government")
    color = Column(String(50), default="blue")
    is_active = Column(Boolean, default=True)

    exams = relationship("Exam", back_populates="category", cascade="all, delete-orphan")

class Exam(Base):
    __tablename__ = "exams"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    category_id = Column(Integer, ForeignKey("exam_categories.id"), nullable=False)
    exam_type = Column(String(50), default="government") # government, banking, railway, defense
    level = Column(String(50), default="National")
    duration = Column(Integer, default=120) # in minutes
    total_marks = Column(Integer, default=200)
    passing_marks = Column(Integer, default=100)
    eligibility = Column(Text, nullable=True)
    pattern = Column(Text, nullable=True)
    syllabus = Column(Text, nullable=True)
    official_website = Column(String(255), nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    category = relationship("ExamCategory", back_populates="exams")
    study_materials = relationship("StudyMaterial", back_populates="exam", cascade="all, delete-orphan")
    previous_papers = relationship("PreviousPaper", back_populates="exam", cascade="all, delete-orphan")
    mock_tests = relationship("MockTest", back_populates="exam", cascade="all, delete-orphan")

class StudyMaterial(Base):
    __tablename__ = "study_materials"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    subject = Column(String(100), nullable=False)
    chapter = Column(String(100), nullable=True)
    difficulty = Column(String(50), default="Medium") # Easy, Medium, Hard
    type = Column(String(50), default="notes") # notes, formula, video, pdf
    content = Column(Text, nullable=True)
    exam_id = Column(Integer, ForeignKey("exams.id"), nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    exam = relationship("Exam", back_populates="study_materials")

class PreviousPaper(Base):
    __tablename__ = "previous_papers"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    title = Column(String(255), nullable=False)
    year = Column(Integer, nullable=False)
    exam_id = Column(Integer, ForeignKey("exams.id"), nullable=False)
    total_questions = Column(Integer, default=100)
    solution_summary = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    exam = relationship("Exam", back_populates="previous_papers")
