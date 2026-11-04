from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List, Optional
from backend.app.database import get_db
from backend.app.models.upsc import CivilServicePost, UPSCSyllabusEntry, UPSCCurrentAffairsCategory, UPSCStudyStrategy

router = APIRouter(prefix="/upsc", tags=["UPSC Exam Guidance"])


@router.get("/posts")
def get_civil_service_posts(db: Session = Depends(get_db)):
    posts = db.query(CivilServicePost).order_by(CivilServicePost.prestige_rank).all()
    return [
        {
            "id": p.id,
            "post_name": p.post_name,
            "full_name": p.full_name,
            "service": p.service,
            "cadre": p.cadre,
            "pay_level": p.pay_level,
            "roles": p.roles,
            "eligibility": p.eligibility,
            "posting_areas": p.posting_areas,
            "prestige_rank": p.prestige_rank,
            "vacancy_approx": p.vacancy_approx,
        }
        for p in posts
    ]


@router.get("/syllabus")
def get_upsc_syllabus(stage: Optional[str] = None, db: Session = Depends(get_db)):
    q = db.query(UPSCSyllabusEntry)
    if stage:
        q = q.filter(UPSCSyllabusEntry.stage == stage)
    entries = q.all()

    # Group by stage → paper → subject
    grouped: dict = {}
    for e in entries:
        grouped.setdefault(e.stage, {}).setdefault(e.paper, []).append(
            {
                "id": e.id,
                "subject": e.subject,
                "topic": e.topic,
                "subtopics": e.subtopics,
                "weightage_percent": e.weightage_percent,
                "priority": e.priority,
                "recommended_books": e.recommended_books,
            }
        )
    return grouped


@router.get("/strategy")
def get_study_strategy(stage: Optional[str] = None, db: Session = Depends(get_db)):
    q = db.query(UPSCStudyStrategy)
    if stage:
        q = q.filter(UPSCStudyStrategy.stage == stage)
    strategies = q.all()
    return [
        {
            "id": s.id,
            "stage": s.stage,
            "phase_months": s.phase_months,
            "focus_area": s.focus_area,
            "strategy_text": s.strategy_text,
            "daily_hours": s.daily_hours,
            "key_resources": s.key_resources,
            "milestones": s.milestones,
        }
        for s in strategies
    ]


@router.get("/current-affairs")
def get_current_affairs(relevance: Optional[str] = None, db: Session = Depends(get_db)):
    q = db.query(UPSCCurrentAffairsCategory)
    if relevance:
        q = q.filter(UPSCCurrentAffairsCategory.relevance == relevance)
    items = q.all()
    # Group by category
    grouped: dict = {}
    for item in items:
        grouped.setdefault(item.category, []).append(
            {
                "id": item.id,
                "topic": item.topic,
                "description": item.description,
                "relevance": item.relevance,
                "source_suggestion": item.source_suggestion,
            }
        )
    return grouped


@router.get("/exam-timeline")
def get_exam_timeline():
    """UPSC CSE annual exam timeline — static authoritative data."""
    return {
        "exam": "UPSC Civil Services Examination (CSE)",
        "conducting_body": "Union Public Service Commission",
        "frequency": "Annual",
        "timeline": [
            {"month": "February", "event": "Official Notification Released", "details": "UPSC releases official notification with vacancies, eligibility, and schedule"},
            {"month": "March", "event": "Application Window Opens", "details": "Online application via upsconline.nic.in; last date ~3 weeks after notification"},
            {"month": "June", "event": "Prelims Examination", "details": "2 papers in 1 day — GS Paper I (200 marks) + CSAT Paper II (200 marks, qualifying 33%)"},
            {"month": "July", "event": "Prelims Result", "details": "Shortlist ~12,000–15,000 candidates for Mains"},
            {"month": "September", "event": "DAF (Detailed Application Form) Submission", "details": "Mains-qualified candidates fill DAF choosing optional subject"},
            {"month": "September", "event": "Mains Examination", "details": "9 papers over 5-7 days: Essay, GS I-IV, Optional I-II, and 2 qualifying language papers"},
            {"month": "December", "event": "Mains Result", "details": "~2,500 candidates shortlisted for Personality Test"},
            {"month": "January–April", "event": "Personality Test (Interview)", "details": "Board interviews at UPSC Bhavan, New Delhi — 275 marks"},
            {"month": "May", "event": "Final Result", "details": "Merit list published; candidates allocated to services based on rank and preference"},
            {"month": "August", "event": "Training Begins", "details": "IAS: LBSNAA Mussoorie; IPS: SVPNPA Hyderabad; IFS: NASC Delhi"},
        ],
        "total_marks": 2025,
        "stages": [
            {"name": "Prelims", "marks": 400, "qualifying": True, "note": "Only GS Paper I marks counted for Prelims cut-off"},
            {"name": "Mains", "marks": 1750, "qualifying": False},
            {"name": "Personality Test", "marks": 275, "qualifying": False},
        ],
    }


@router.get("/posts-hierarchy")
def get_posts_hierarchy():
    """Civil Services rank hierarchy for aspirants."""
    return {
        "top_services": [
            {
                "rank": 1, "post": "IAS", "full": "Indian Administrative Service",
                "description": "District Collector → SDM → Secretary to Govt → Chief Secretary",
                "icon": "🏛️"
            },
            {
                "rank": 2, "post": "IFS", "full": "Indian Foreign Service",
                "description": "Third Secretary → Second Secretary → Ambassador/High Commissioner",
                "icon": "🌍"
            },
            {
                "rank": 3, "post": "IPS", "full": "Indian Police Service",
                "description": "ASP → SP → DIG → IGP → DGP",
                "icon": "🚔"
            },
            {
                "rank": 4, "post": "IRS (IT)", "full": "Indian Revenue Service (Income Tax)",
                "description": "ACIT → CIT → CCIT; Handles direct taxes",
                "icon": "💰"
            },
            {
                "rank": 5, "post": "IRS (C&CE)", "full": "Indian Revenue Service (Customs & Central Excise)",
                "description": "Handles indirect taxes, GST enforcement, customs",
                "icon": "🚢"
            },
            {
                "rank": 6, "post": "IRTS", "full": "Indian Railway Traffic Service",
                "description": "Manages railway operations, traffic, and commercial aspects",
                "icon": "🚂"
            },
            {
                "rank": 7, "post": "IRAS", "full": "Indian Railway Accounts Service",
                "description": "Financial management of Indian Railways",
                "icon": "📊"
            },
            {
                "rank": 8, "post": "IPoS", "full": "Indian Postal Service",
                "description": "Manages India Post operations and services",
                "icon": "📬"
            },
        ],
        "group_a_services_count": 24,
        "total_vacancies_approx": "900–1100 per year",
    }
