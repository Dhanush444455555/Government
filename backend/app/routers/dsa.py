from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional
from backend.app.database import get_db
from backend.app.models.dsa import DsaProblem

router = APIRouter(prefix="/dsa", tags=["DSA and Placement Preparation"])

@router.get("/topics")
def get_dsa_topics():
    topics = [
        "Arrays and Strings",
        "Two Pointers",
        "Sliding Window",
        "Binary Search",
        "Sorting",
        "Recursion",
        "Linked Lists",
        "Stack and Queue",
        "Hashing",
        "Trees and Graphs",
        "Greedy Algorithms",
        "Dynamic Programming",
        "Backtracking",
        "Heap and Priority Queue"
    ]
    return topics

@router.get("/problems")
def get_dsa_problems(topic: Optional[str] = None, difficulty: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(DsaProblem)
    if topic and topic.lower() != "all":
        query = query.filter(DsaProblem.topic.ilike(f"%{topic}%"))
    if difficulty and difficulty.lower() != "all":
        query = query.filter(DsaProblem.difficulty.ilike(f"%{difficulty}%"))
    return query.all()

@router.get("/problems/{problem_id}")
def get_dsa_problem_detail(problem_id: int, db: Session = Depends(get_db)):
    prob = db.query(DsaProblem).filter(DsaProblem.id == problem_id).first()
    if not prob:
        raise HTTPException(status_code=404, detail="Problem not found")
    return prob
