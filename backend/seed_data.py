import json
from backend.app.database import SessionLocal, engine, Base
import backend.app.models
from backend.app.models.user import User
from backend.app.models.exam import ExamCategory, Exam, StudyMaterial, PreviousPaper
from backend.app.models.mock_test import MockTest
from backend.app.models.job import Job
from backend.app.models.course import Course
from backend.app.models.interview import InterviewQuestion, AptitudePractice
from backend.app.core.security import get_password_hash
from backend.seed_upsc import seed_upsc_data
from backend.seed_resources import seed_resources
from backend.app.routers.courses import DEFAULT_COURSES

def seed_database():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    # Seed Default Users
    if not db.query(User).filter(User.email == "student@government.in").first():
        default_user = User(
            email="student@government.in",
            hashed_password=get_password_hash("password123"),
            name="Aspirant Candidate",
            target_exam="Civil Services (UPSC)",
            education="B.Tech Computer Science / B.A. Administration",
            study_hours_per_day=6,
            gpa="8.2",
            attempts=1
        )
        db.add(default_user)
        db.commit()

    if not db.query(User).filter(User.email == "teacher@government.in").first():
        teacher_user = User(
            email="teacher@government.in",
            hashed_password=get_password_hash("password123"),
            name="Senior Faculty",
            target_exam="All Government Examinations",
            education="M.A. Public Administration, UGC NET Qualified",
            study_hours_per_day=8,
            gpa="9.0",
            attempts=0
        )
        db.add(teacher_user)
        db.commit()

    # Seed Exam Categories
    if db.query(ExamCategory).count() == 0:
        categories = [
            ExamCategory(name="Civil Services", description="UPSC CSE, State PSC for IAS, IPS, IRS, and administrative services.", icon="government", color="blue"),
            ExamCategory(name="Banking", description="IBPS PO, SBI PO, RBI Grade B, and Clerk recruitment examinations.", icon="bank", color="emerald"),
            ExamCategory(name="Railways", description="RRB NTPC, RRB JE, and Group D examinations for Indian Railways.", icon="train", color="amber"),
            ExamCategory(name="Defense", description="NDA, CDS, AFCAT, and CAPF for Indian Armed Forces.", icon="shield", color="rose"),
            ExamCategory(name="Staff Selection", description="SSC CGL, CHSL, MTS, CPO, and Constable GD.", icon="award", color="purple"),
            ExamCategory(name="Engineering", description="GATE, ESE (IES), State Engineering Services, PSU recruitments.", icon="cpu", color="indigo"),
        ]
        db.add_all(categories)
        db.commit()

    # Seed Courses
    if db.query(Course).count() == 0:
        for c in DEFAULT_COURSES:
            course = Course(
                id=c["id"],
                title=c["title"],
                description=c["description"],
                color=c["color"],
                resource_count=c["resource_count"],
                category=c["category"],
                modules=c.get("modules", []),
                videos=c.get("videos", []),
                formulas=c.get("formulas", []),
                quizzes=c.get("quizzes", [])
            )
            db.add(course)
        db.commit()

    # Seed Mock Tests
    if db.query(MockTest).count() == 0:
        tests = [
            MockTest(
                title="UPSC Prelims GS Paper 1 All-India Mock Test",
                exam_category="Civil Services",
                duration_minutes=120,
                total_marks=200,
                difficulty="Hard",
                is_active=True,
                questions_json=json.dumps([
                    {
                        "id": 1,
                        "question": "Which Article of the Indian Constitution empowers the President to grant pardons?",
                        "options": ["Article 72", "Article 161", "Article 123", "Article 143"],
                        "answer": "Article 72",
                        "explanation": "Article 72 of the Constitution empowers the President of India to grant pardons, reprieves, respites or remissions of punishment."
                    },
                    {
                        "id": 2,
                        "question": "The concept of 'Basic Structure' of the Indian Constitution was propounded in which landmark case?",
                        "options": ["Golaknath Case (1967)", "Kesavananda Bharati Case (1973)", "Minerva Mills Case (1980)", "Maneka Gandhi Case (1978)"],
                        "answer": "Kesavananda Bharati Case (1973)",
                        "explanation": "The doctrine of Basic Structure was laid down by the 13-judge constitutional bench in Kesavananda Bharati v. State of Kerala (1973)."
                    },
                    {
                        "id": 3,
                        "question": "Which of the following passes connects Srinagar with Leh?",
                        "options": ["Zoji La Pass", "Shipki La", "Nathu La", "Bara-lacha La"],
                        "answer": "Zoji La Pass",
                        "explanation": "Zoji La is a high mountain pass in the Himalayas, in the Indian Union Territory of Ladakh connecting Srinagar to Leh."
                    },
                    {
                        "id": 4,
                        "question": "Who was the Viceroy of India during the Partition of Bengal in 1905?",
                        "options": ["Lord Curzon", "Lord Ripon", "Lord Minto", "Lord Chelmsford"],
                        "answer": "Lord Curzon",
                        "explanation": "Lord Curzon announced the Partition of Bengal on 19 July 1905 and implemented it on 16 October 1905."
                    },
                    {
                        "id": 5,
                        "question": "Which parameter is NOT included in calculating the Multidimensional Poverty Index (MPI)?",
                        "options": ["Health", "Education", "Standard of Living", "Per Capita Foreign Currency Reserve"],
                        "answer": "Per Capita Foreign Currency Reserve",
                        "explanation": "Global MPI evaluates 3 dimensions: Health, Education, and Standard of Living."
                    }
                ])
            ),
            MockTest(
                title="SSC CGL Tier 1 Quantitative Aptitude & Reasoning Sprint",
                exam_category="Staff Selection",
                duration_minutes=60,
                total_marks=100,
                difficulty="Medium",
                is_active=True,
                questions_json=json.dumps([
                    {
                        "id": 1,
                        "question": "If a + b + c = 0, what is the value of (a³ + b³ + c³) / (3abc)?",
                        "options": ["0", "1", "3", "-1"],
                        "answer": "1",
                        "explanation": "Since a + b + c = 0 implies a³ + b³ + c³ = 3abc, dividing by 3abc yields 1."
                    },
                    {
                        "id": 2,
                        "question": "A sum doubles in 5 years at Simple Interest. In how many years will it become 4 times?",
                        "options": ["10 years", "12 years", "15 years", "20 years"],
                        "answer": "15 years",
                        "explanation": "For 4 times at SI, interest needed is 3P. Each P takes 5 years, so 3 * 5 = 15 years."
                    }
                ])
            ),
            MockTest(
                title="SBI PO Preliminary Full Speed Test",
                exam_category="Banking",
                duration_minutes=60,
                total_marks=100,
                difficulty="Medium",
                is_active=True,
                questions_json=json.dumps([
                    {
                        "id": 1,
                        "question": "What is the primary objective of the Reserve Bank of India's Monetary Policy Framework?",
                        "options": ["Price Stability while keeping in mind growth", "Maximizing Bank Profits", "Fixing Exchange Rates", "Printing maximum currency notes"],
                        "answer": "Price Stability while keeping in mind growth",
                        "explanation": "Under the RBI Act 1934, the primary objective is to maintain price stability while keeping in mind the objective of growth."
                    }
                ])
            )
        ]
        db.add_all(tests)
        db.commit()

    # Seed Active Government Jobs
    if db.query(Job).count() == 0:
        jobs = [
            Job(
                title="Assistant Executive Engineer (Group A Gazetted)",
                organization="Central Public Works Department (CPWD)",
                category="Engineering",
                job_type="Government",
                location="All India",
                vacancies=450,
                salary_range="₹56,100 - ₹1,77,500 (Pay Level 10)",
                eligibility="B.E. / B.Tech in Civil, Electrical or Mechanical Engineering. Age 21-30 years.",
                official_url="https://upsc.gov.in",
                is_active=True
            ),
            Job(
                title="Probationary Officer (Scale I) - 2026 Batch",
                organization="State Bank of India (SBI)",
                category="Banking",
                job_type="Banking",
                location="Pan India",
                vacancies=2000,
                salary_range="₹65,780/month Basic + DA, HRA, Medical, Lease Perks",
                eligibility="Graduation in any discipline from a recognized University. Age 21-30 years.",
                official_url="https://sbi.co.in/careers",
                is_active=True
            ),
            Job(
                title="Assistant Section Officer (Central Secretariat)",
                organization="Staff Selection Commission (SSC CGL)",
                category="Administrative",
                job_type="Government",
                location="New Delhi",
                vacancies=980,
                salary_range="₹44,900 - ₹1,42,400 (Pay Level 7)",
                eligibility="Bachelor's Degree in any discipline. Age 20-30 years.",
                official_url="https://ssc.gov.in",
                is_active=True
            ),
            Job(
                title="Junior Engineer (Signal & Telecommunication)",
                organization="Indian Railways (RRB JE)",
                category="Railways",
                job_type="Government",
                location="All Railway Zones",
                vacancies=1200,
                salary_range="₹35,400 - ₹1,12,400 (Pay Level 6)",
                eligibility="Diploma or Degree in Electronics / Electrical / Computer Science Engineering.",
                official_url="https://indianrailways.gov.in",
                is_active=True
            ),
            Job(
                title="Civil Services Examination (IAS / IPS / IFS)",
                organization="Union Public Service Commission (UPSC)",
                category="Civil Services",
                job_type="Government",
                location="All India Cadres",
                vacancies=1056,
                salary_range="₹56,100 - ₹2,50,000 (Cabinet Secretary apex)",
                eligibility="Graduate degree in any stream. Age 21-32 years (Relaxations for reserved categories).",
                official_url="https://upsc.gov.in",
                is_active=True
            )
        ]
        db.add_all(jobs)
        db.commit()

    # Seed UPSC & Resources
    seed_upsc_data(db)
    seed_resources(db)

    db.close()
    print("Database seeding completed cleanly!")

if __name__ == "__main__":
    seed_database()
