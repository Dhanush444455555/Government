from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from backend.app.database import get_db
from backend.app.models.resources import StudyResource, GovExam

router = APIRouter(prefix="/resources", tags=["Study Resources & All Government Exams"])


@router.get("/study-materials")
def get_study_resources(
    resource_type: Optional[str] = Query(None, description="youtube | pdf | website | notes"),
    subject: Optional[str] = Query(None),
    exam_tag: Optional[str] = Query(None, description="UPSC | SSC | Banking | Railways | Defence | State PSC"),
    db: Session = Depends(get_db)
):
    q = db.query(StudyResource)
    if resource_type:
        q = q.filter(StudyResource.resource_type == resource_type)
    if subject:
        q = q.filter(StudyResource.subject.ilike(f"%{subject}%"))
    if exam_tag:
        q = q.filter(StudyResource.exam_tags.ilike(f"%{exam_tag}%"))
    items = q.all()

    # Group by subject
    grouped: dict = {}
    for r in items:
        grouped.setdefault(r.subject, []).append({
            "id": r.id,
            "title": r.title,
            "resource_type": r.resource_type,
            "url": r.url,
            "description": r.description,
            "exam_tags": r.exam_tags.split(",") if r.exam_tags else [],
            "language": r.language,
            "is_free": r.is_free,
            "provider": r.provider,
            "thumbnail_emoji": r.thumbnail_emoji,
        })
    return grouped


@router.get("/youtube-playlists")
def get_youtube_playlists(
    subject: Optional[str] = Query(None),
    exam_tag: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    q = db.query(StudyResource).filter(StudyResource.resource_type == "youtube")
    if subject:
        q = q.filter(StudyResource.subject.ilike(f"%{subject}%"))
    if exam_tag:
        q = q.filter(StudyResource.exam_tags.ilike(f"%{exam_tag}%"))
    items = q.all()
    return [{
        "id": r.id,
        "title": r.title,
        "url": r.url,
        "subject": r.subject,
        "description": r.description,
        "exam_tags": r.exam_tags.split(",") if r.exam_tags else [],
        "provider": r.provider,
        "thumbnail_emoji": r.thumbnail_emoji,
    } for r in items]


@router.get("/textbooks")
def get_free_textbooks(
    subject: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    q = db.query(StudyResource).filter(StudyResource.resource_type.in_(["pdf", "website"]))
    if subject:
        q = q.filter(StudyResource.subject.ilike(f"%{subject}%"))
    items = q.all()
    return [{
        "id": r.id,
        "title": r.title,
        "url": r.url,
        "subject": r.subject,
        "description": r.description,
        "exam_tags": r.exam_tags.split(",") if r.exam_tags else [],
        "provider": r.provider,
        "language": r.language,
        "thumbnail_emoji": r.thumbnail_emoji,
    } for r in items]


# ─── All Government Exams ────────────────────────────────────────────────────

@router.get("/gov-exams")
def get_all_gov_exams(
    category: Optional[str] = Query(None, description="UPSC | SSC | Banking | Railways | Defence | State PSC | Teaching | Insurance"),
    db: Session = Depends(get_db)
):
    q = db.query(GovExam)
    if category:
        q = q.filter(GovExam.category == category)
    q = q.order_by(GovExam.popular_rank)
    exams = q.all()

    grouped: dict = {}
    for e in exams:
        grouped.setdefault(e.category, []).append({
            "id": e.id,
            "exam_name": e.exam_name,
            "full_name": e.full_name,
            "conducting_body": e.conducting_body,
            "vacancies_approx": e.vacancies_approx,
            "eligibility_age": e.eligibility_age,
            "eligibility_education": e.eligibility_education,
            "exam_pattern": e.exam_pattern,
            "syllabus_summary": e.syllabus_summary,
            "official_website": e.official_website,
            "notification_month": e.notification_month,
            "exam_month": e.exam_month,
            "salary_range": e.salary_range,
            "difficulty": e.difficulty,
        })
    return grouped


@router.get("/gov-exams/categories")
def get_exam_categories(db: Session = Depends(get_db)):
    from sqlalchemy import distinct
    cats = db.query(distinct(GovExam.category)).order_by(GovExam.category).all()
    return [c[0] for c in cats]
