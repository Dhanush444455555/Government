from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional
from backend.app.database import get_db
from backend.app.models.exam import ExamCategory, Exam, StudyMaterial, PreviousPaper

router = APIRouter(prefix="/exams", tags=["Government Exams"])

@router.get("/categories")
def get_categories(db: Session = Depends(get_db)):
    categories = db.query(ExamCategory).all()
    return categories

@router.get("/")
def get_exams(category_id: Optional[int] = None, search: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(Exam)
    if category_id:
        query = query.filter(Exam.category_id == category_id)
    if search:
        query = query.filter(Exam.title.ilike(f"%{search}%"))
    exams = query.all()
    return exams

@router.get("/{exam_id}")
def get_exam_detail(exam_id: int, db: Session = Depends(get_db)):
    exam = db.query(Exam).filter(Exam.id == exam_id).first()
    if not exam:
        raise HTTPException(status_code=404, detail="Exam not found")
    return exam

@router.get("/{exam_id}/materials")
def get_materials(exam_id: int, subject: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(StudyMaterial).filter(StudyMaterial.exam_id == exam_id)
    if subject:
        query = query.filter(StudyMaterial.subject.ilike(f"%{subject}%"))
    return query.all()

@router.get("/{exam_id}/papers")
def get_previous_papers(exam_id: int, db: Session = Depends(get_db)):
    return db.query(PreviousPaper).filter(PreviousPaper.exam_id == exam_id).all()
