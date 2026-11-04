from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional
from backend.app.database import get_db
from backend.app.models.core_cs import CoreCSConcept

router = APIRouter(prefix="/core-cs", tags=["Core CS Concepts (Image: DSA, DBMS, OS, ML)"])

@router.get("/domains")
def get_domains():
    return [
        "Data Structures & Algorithms",
        "DBMS",
        "Operating Systems",
        "Machine Learning"
    ]

@router.get("/concepts")
def get_concepts(domain: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(CoreCSConcept)
    if domain and domain.lower() != "all":
        query = query.filter(CoreCSConcept.domain.ilike(f"%{domain}%"))
    return query.all()

@router.get("/concepts/{concept_id}")
def get_concept_detail(concept_id: int, db: Session = Depends(get_db)):
    c = db.query(CoreCSConcept).filter(CoreCSConcept.id == concept_id).first()
    if not c:
        raise HTTPException(status_code=404, detail="Concept not found")
    return c
