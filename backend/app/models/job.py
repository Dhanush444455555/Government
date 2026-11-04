import datetime
from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, ForeignKey
from sqlalchemy.orm import relationship
from backend.app.database import Base

class Job(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    title = Column(String(255), nullable=False)
    organization = Column(String(255), nullable=False)
    location = Column(String(255), default="All India")
    job_type = Column(String(50), default="Government") # Government, PSU, Part-Time, Contract
    category = Column(String(100), default="Civil Services")
    salary_range = Column(String(100), nullable=True)
    description = Column(Text, nullable=True)
    eligibility = Column(Text, nullable=True)
    deadline = Column(String(100), nullable=True)
    application_link = Column(String(255), nullable=True)
    is_active = Column(Boolean, default=True)
    posted_at = Column(DateTime, default=datetime.datetime.utcnow)

    applications = relationship("JobApplication", back_populates="job", cascade="all, delete-orphan")

class JobApplication(Base):
    __tablename__ = "job_applications"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    job_id = Column(Integer, ForeignKey("jobs.id"), nullable=False)
    status = Column(String(50), default="Submitted") # Submitted, Under Review, Interview, Selected, Rejected
    resume_text = Column(Text, nullable=True)
    cover_note = Column(Text, nullable=True)
    applied_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="job_applications")
    job = relationship("Job", back_populates="applications")
