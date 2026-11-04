import json
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.app.database import get_db
from backend.app.models.mock_test import MockTest, TestResult
from backend.app.schemas.all_schemas import TestSubmissionRequest

router = APIRouter(prefix="/mock-tests", tags=["Mock Tests"])

@router.get("/")
def get_mock_tests(exam_id: int = None, db: Session = Depends(get_db)):
    query = db.query(MockTest)
    if exam_id:
        query = query.filter(MockTest.exam_id == exam_id)
    tests = query.all()
    # parse questions count
    results = []
    for t in tests:
        q_list = json.loads(t.questions_json) if t.questions_json else []
        results.append({
            "id": t.id,
            "title": t.title,
            "description": t.description,
            "exam_id": t.exam_id,
            "duration_minutes": t.duration_minutes,
            "total_marks": t.total_marks,
            "total_questions": len(q_list)
        })
    return results

@router.get("/{test_id}")
def get_mock_test(test_id: int, db: Session = Depends(get_db)):
    t = db.query(MockTest).filter(MockTest.id == test_id).first()
    if not t:
        raise HTTPException(status_code=404, detail="Mock test not found")
    questions = json.loads(t.questions_json) if t.questions_json else []
    return {
        "id": t.id,
        "title": t.title,
        "description": t.description,
        "duration_minutes": t.duration_minutes,
        "total_marks": t.total_marks,
        "questions": questions
    }

@router.post("/submit")
def submit_mock_test(req: TestSubmissionRequest, db: Session = Depends(get_db)):
    test = db.query(MockTest).filter(MockTest.id == req.test_id).first()
    if not test:
        raise HTTPException(status_code=404, detail="Mock test not found")

    questions = json.loads(test.questions_json) if test.questions_json else []
    total_q = len(questions)
    if total_q == 0:
        total_q = 1
    
    marks_per_q = test.total_marks / total_q
    score = 0.0
    detailed_eval = []

    for idx, q in enumerate(questions):
        user_ans = req.answers.get(str(idx), "").strip().upper()
        correct_ans = q.get("correct_answer", "").strip().upper()
        is_correct = (user_ans == correct_ans)
        if is_correct:
            score += marks_per_q
        detailed_eval.append({
            "question_index": idx,
            "question": q.get("question"),
            "user_answer": user_ans,
            "correct_answer": correct_ans,
            "is_correct": is_correct,
            "explanation": q.get("explanation", "")
        })

    percentage = round((score / test.total_marks) * 100, 1)

    result = TestResult(
        user_id=1, # Default user or authenticated user
        mock_test_id=test.id,
        score=score,
        total_marks=test.total_marks,
        percentage=percentage,
        time_taken_seconds=req.time_taken_seconds,
        answers_json=json.dumps(req.answers),
        feedback=f"Scored {score:.1f}/{test.total_marks} ({percentage}%). Evaluated via Automated Scoring."
    )
    db.add(result)
    db.commit()
    db.refresh(result)

    return {
        "result_id": result.id,
        "score": score,
        "total_marks": test.total_marks,
        "percentage": percentage,
        "time_taken_seconds": req.time_taken_seconds,
        "detailed_eval": detailed_eval
    }
