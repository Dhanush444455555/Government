from sqlalchemy import Column, String, Integer, Text, JSON
from backend.app.database import Base

class Course(Base):
    __tablename__ = "courses"

    id = Column(String(50), primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    color = Column(String(50), default="bg-blue-500")
    resource_count = Column(Integer, default=100)
    category = Column(String(100), default="Government Exam")
    modules = Column(JSON, nullable=True)
    videos = Column(JSON, nullable=True)
    formulas = Column(JSON, nullable=True)
    quizzes = Column(JSON, nullable=True)

