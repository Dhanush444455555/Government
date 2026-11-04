import datetime
from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, ForeignKey, Float
from sqlalchemy.orm import relationship
from backend.app.database import Base

class MockTest(Base):
    __tablename__ = "mock_tests"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    exam_id = Column(Integer, ForeignKey("exams.id"), nullable=False)
    duration_minutes = Column(Integer, default=60)
    total_marks = Column(Integer, default=100)
    questions_json = Column(Text, nullable=False) # JSON encoded questions & options
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    exam = relationship("Exam", back_populates="mock_tests")
    results = relationship("TestResult", back_populates="mock_test", cascade="all, delete-orphan")

class TestResult(Base):
    __tablename__ = "test_results"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    mock_test_id = Column(Integer, ForeignKey("mock_tests.id"), nullable=False)
    score = Column(Float, nullable=False)
    total_marks = Column(Float, nullable=False)
    percentage = Column(Float, nullable=False)
    time_taken_seconds = Column(Integer, default=0)
    answers_json = Column(Text, nullable=True) # User submitted answers
    feedback = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="test_results")
    mock_test = relationship("MockTest", back_populates="results")
