import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime
from backend.app.database import Base

class DsaProblem(Base):
    __tablename__ = "dsa_problems"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    topic = Column(String(100), nullable=False, index=True) # e.g. Arrays and Strings, Dynamic Programming
    title = Column(String(255), nullable=False)
    difficulty = Column(String(50), default="Medium") # Easy, Medium, Hard
    description = Column(Text, nullable=False)
    constraints = Column(Text, nullable=True)
    examples = Column(Text, nullable=True) # JSON or markdown string of input/output
    cpp_solution = Column(Text, nullable=False) # Idiomatic C++ solution code
    time_complexity = Column(String(50), default="O(N)")
    space_complexity = Column(String(50), default="O(1)")
    explanation = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
