import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime
from backend.app.database import Base

class CoreCSConcept(Base):
    __tablename__ = "core_cs_concepts"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    domain = Column(String(50), nullable=False) # "Data Structures & Algorithms", "DBMS", "Operating Systems", "Machine Learning"
    topic = Column(String(150), nullable=False) # e.g. "ACID Properties & Transactions", "Virtual Memory & Paging", "Bias-Variance Tradeoff"
    summary = Column(Text, nullable=False)
    detailed_explanation = Column(Text, nullable=False)
    key_takeaways = Column(Text, nullable=True) # JSON or markdown list
    interview_frequency = Column(String(50), default="High") # High, Medium, Very High
    sample_questions = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
