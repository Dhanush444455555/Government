from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional
from backend.app.database import get_db
from backend.app.models.interview import InterviewQuestion, AptitudePractice

router = APIRouter(prefix="/interview", tags=["Interview Preparation"])

@router.get("/questions")
def get_interview_questions(
    category: Optional[str] = None, # Technical, HR, Project, Mock
    company: Optional[str] = None,
    sub_category: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(InterviewQuestion)
    if category and category.lower() != "all":
        query = query.filter(InterviewQuestion.category.ilike(f"%{category}%"))
    if company and company.lower() != "all":
        query = query.filter(InterviewQuestion.company.ilike(f"%{company}%"))
    if sub_category:
        query = query.filter(InterviewQuestion.sub_category.ilike(f"%{sub_category}%"))
    return query.all()

@router.get("/aptitude")
def get_aptitude_practice(apt_type: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(AptitudePractice)
    if apt_type and apt_type.lower() != "all":
        query = query.filter(AptitudePractice.type.ilike(f"%{apt_type}%"))
    return query.all()

@router.get("/company-list")
def get_companies():
    return [
        {"name": "NIC (National Informatics Centre)", "type": "Government IT PSU", "rounds": "Online Test (DSA/CS) -> Technical Interview -> HR"},
        {"name": "ISRO (Scientist/Engineer 'SC')", "type": "Government Aerospace", "rounds": "Written Exam (GATE Level) -> Rigorous Technical Interview"},
        {"name": "DRDO (RAC Scientist 'B')", "type": "Defense R&D", "rounds": "GATE Score Screening -> Descriptive/Subjective Interview"},
        {"name": "TCS (National Qualifier Test)", "type": "IT Services", "rounds": "Cognitive + Programming MCQs + 2 Hands-on Coding -> TR -> HR"},
        {"name": "Infosys (Specialist Programmer)", "type": "IT Enterprise", "rounds": "Coding Assessment (DSA/DP) -> Technical Deep Dive -> HR"},
        {"name": "Amazon", "type": "Product & Cloud", "rounds": "OA (2 Coding) -> 3 Technical (DSA/System Design) -> Bar Raiser (LP)"},
        {"name": "Microsoft", "type": "Product & Cloud", "rounds": "Codility OA -> 4 Rounds (DSA, Low Level Design, Problem Solving)"}
    ]

@router.get("/resume-guide")
def get_resume_guide():
    return {
        "title": "Government & Tech Placement ATS Resume Blueprint",
        "sections": [
            {
                "section": "Contact & Links",
                "rules": "Include Full Name, Professional Email, Phone, LinkedIn, and GitHub/Portfolio links. Keep on single top header."
            },
            {
                "section": "Core Technical Skills",
                "rules": "Group by: Languages (C++, Python, SQL), CS Fundamentals (DSA, DBMS, OS), Frameworks (React, FastAPI), Developer Tools (Git, MySQL)."
            },
            {
                "section": "Projects (STAR Method)",
                "rules": "Situation, Task, Action, Result. Highlight metrics: 'Built FastAPI backend with MySQL, improving latency by 35% with indexed queries.'"
            },
            {
                "section": "Education & Certifications",
                "rules": "College Name, Degree, CGPA/Percentage, Graduation Year, Government or NPTEL certifications."
            }
        ],
        "action_verbs": [
            "Architected", "Engineered", "Optimized", "Implemented", "Refactored", "Automated", "Deployed"
        ]
    }
