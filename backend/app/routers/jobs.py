from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional
from backend.app.database import get_db
from backend.app.models.job import Job, JobApplication
from backend.app.schemas.all_schemas import JobApplicationRequest

router = APIRouter(prefix="/jobs", tags=["Employment & Jobs"])

@router.get("/")
def get_jobs(
    job_type: Optional[str] = None,
    category: Optional[str] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Job).filter(Job.is_active == True)
    if job_type and job_type.lower() != "all":
        query = query.filter(Job.job_type.ilike(f"%{job_type}%"))
    if category and category.lower() != "all":
        query = query.filter(Job.category.ilike(f"%{category}%"))
    if search:
        query = query.filter(Job.title.ilike(f"%{search}%") | Job.organization.ilike(f"%{search}%"))
    
    return query.order_by(Job.posted_at.desc()).all()

@router.get("/{job_id}")
def get_job(job_id: int, db: Session = Depends(get_db)):
    job = db.query(Job).filter(Job.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job

@router.post("/apply")
def apply_to_job(req: JobApplicationRequest, db: Session = Depends(get_db)):
    job = db.query(Job).filter(Job.id == req.job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    application = JobApplication(
        user_id=1,
        job_id=job.id,
        status="Submitted",
        resume_text=req.resume_text,
        cover_note=req.cover_note
    )
    db.add(application)
    db.commit()
    db.refresh(application)
    return {
        "success": True,
        "application_id": application.id,
        "message": f"Successfully submitted application for '{job.title}' at {job.organization}!"
    }
