from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional, List
from backend.app.database import get_db
from backend.app.models.course import Course

router = APIRouter(prefix="/courses", tags=["Exam Courses"])

# Standard comprehensive initial course catalog
DEFAULT_COURSES = [
    {
        "id": "upsc",
        "title": "UPSC Civil Services",
        "description": "Comprehensive materials for Prelims and Mains. Includes NCERT summaries, daily current affairs, and CSAT guides.",
        "color": "bg-orange-500",
        "resource_count": 1240,
        "category": "Civil Services",
        "modules": [
            {
                "id": "hist",
                "title": "Indian History & Culture",
                "type": "folder",
                "items": 12,
                "color": "text-orange-600 bg-orange-50",
                "content": [
                    {"title": "Indus Valley Civilization & Harappan Culture", "type": "pdf", "pages": "12 pages"},
                    {"title": "Vedic Age & Mahajanapadas Era", "type": "note", "pages": "Summary Notes"},
                    {"title": "Mauryan Empire & Ashoka's Dhamma", "type": "pdf", "pages": "18 pages"},
                    {"title": "Gupta Period & Golden Age of India", "type": "pdf", "pages": "15 pages"},
                    {"title": "Delhi Sultanate & Administration", "type": "note", "pages": "Key Points"},
                    {"title": "Mughal Architecture & Art Forms", "type": "pdf", "pages": "Visual Guide"},
                    {"title": "Advent of Europeans & British Rule", "type": "pdf", "pages": "Timeline"},
                    {"title": "Revolt of 1857: Causes & Legacy", "type": "note", "pages": "Critical Analysis"},
                    {"title": "Indian National Congress (1885-1947)", "type": "pdf", "pages": "Session Compendium"},
                    {"title": "Gandhian Era & Mass Movements", "type": "pdf", "pages": "Freedom Struggle"},
                    {"title": "Partition and Independence 1947", "type": "note", "pages": "Historical Archive"},
                    {"title": "Post-Independence Consolidation", "type": "pdf", "pages": "10 pages"}
                ]
            },
            {
                "id": "geo",
                "title": "Physical & Indian Geography",
                "type": "folder",
                "items": 8,
                "color": "text-green-600 bg-green-50",
                "content": [
                    {"title": "Solar System & Planetary Geology", "type": "pdf", "pages": "Diagrams & Maps"},
                    {"title": "Geomorphology: Plate Tectonics & Volcanism", "type": "pdf", "pages": "20 pages"},
                    {"title": "Climatology: Atmospheric Circulation & Monsoons", "type": "note", "pages": "Illustrated"},
                    {"title": "Oceanography: Currents, Tides & Marine Ecology", "type": "pdf", "pages": "Currents Atlas"},
                    {"title": "Indian Physiography & Drainage Systems", "type": "pdf", "pages": "River Basins"},
                    {"title": "Soils and Vegetation of India", "type": "note", "pages": "Soil Classification"},
                    {"title": "Agriculture, Crops & Land Use Patterns", "type": "pdf", "pages": "Data Factsheet"},
                    {"title": "Mineral & Energy Resources Distribution", "type": "pdf", "pages": "Economic Geography"}
                ]
            },
            {
                "id": "pol",
                "title": "Indian Polity & Constitution",
                "type": "folder",
                "items": 10,
                "color": "text-blue-600 bg-blue-50",
                "content": [
                    {"title": "Preamble & Salient Features of Constitution", "type": "note", "pages": "Summary"},
                    {"title": "Fundamental Rights (Articles 12-35)", "type": "pdf", "pages": "Landmark Cases"},
                    {"title": "Directive Principles of State Policy & Duties", "type": "pdf", "pages": "Articles 36-51A"},
                    {"title": "Union Executive: President & Prime Minister", "type": "note", "pages": "Constitutional Roles"},
                    {"title": "Parliamentary System & Legislative Process", "type": "pdf", "pages": "Bills & Procedures"},
                    {"title": "Supreme Court & Judicial Review Doctrine", "type": "pdf", "pages": "Jurisdiction Guide"},
                    {"title": "Federal Structure & Centre-State Relations", "type": "note", "pages": "Emergency Provisions"},
                    {"title": "Panchayati Raj & Local Self Governance", "type": "pdf", "pages": "73rd & 74th Amendments"},
                    {"title": "Constitutional & Non-Constitutional Bodies", "type": "pdf", "pages": "UPSC, EC, CAG, CVC"},
                    {"title": "Electoral Reforms and Representation of People Act", "type": "note", "pages": "Key Provisions"}
                ]
            },
            {
                "id": "eco",
                "title": "Indian Economy & Budget",
                "type": "folder",
                "items": 8,
                "color": "text-emerald-600 bg-emerald-50",
                "content": [
                    {"title": "National Income Accounting: GDP, GNP, NNP", "type": "pdf", "pages": "Concepts & Trends"},
                    {"title": "Monetary Policy & Reserve Bank of India", "type": "note", "pages": "Repo Rate & Inflation"},
                    {"title": "Fiscal Policy, Taxation & GST Framework", "type": "pdf", "pages": "Budget Analysis"},
                    {"title": "Poverty Alleviation & Inclusive Growth", "type": "note", "pages": "NITI Aayog Reports"},
                    {"title": "Banking Sector Reforms & NPA Resolution", "type": "pdf", "pages": "IBC & Basel III"},
                    {"title": "External Sector & Balance of Payments", "type": "pdf", "pages": "Trade Policy"},
                    {"title": "Infrastructure, Industry & Service Sectors", "type": "note", "pages": "Make in India"},
                    {"title": "Union Budget & Economic Survey Highlights", "type": "pdf", "pages": "Annual Summary"}
                ]
            }
        ],
        "videos": [
            {
                "id": "v1",
                "title": "Complete Indian Polity by M. Laxmikanth (Revision)",
                "channel": "ExamGuru UPSC",
                "duration": "3h 45m",
                "views": "1.4M views",
                "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                "thumbnail": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80"
            },
            {
                "id": "v2",
                "title": "Modern Indian History Marathon: Plassey to Partition",
                "channel": "ExamGuru UPSC",
                "duration": "4h 10m",
                "views": "890K views",
                "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                "thumbnail": "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=600&q=80"
            },
            {
                "id": "v3",
                "title": "Geography of India: Mapping Rivers, Mountains & Climate",
                "channel": "ExamGuru UPSC",
                "duration": "2h 30m",
                "views": "620K views",
                "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                "thumbnail": "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80"
            }
        ],
        "formulas": [
            {
                "topic": "Indian Polity Quick Articles Index",
                "formulas": [
                    {"name": "Right to Equality", "formula": "Articles 14 to 18 of Indian Constitution"},
                    {"name": "Right to Constitutional Remedies", "formula": "Article 32 (Heart and Soul according to Dr. Ambedkar)"},
                    {"name": "President's Rule & National Emergency", "formula": "Article 352 (National), Article 356 (State), Article 360 (Financial)"},
                    {"name": "Constitutional Amendment Power", "formula": "Article 368 with 2/3rd Special Majority"}
                ]
            },
            {
                "topic": "Macroeconomics Formulas & Ratios",
                "formulas": [
                    {"name": "GDP at Market Price", "formula": "GDP_MP = C + I + G + (X - M)"},
                    {"name": "Fiscal Deficit", "formula": "Total Expenditure - (Revenue Receipts + Non-debt Capital Receipts)"},
                    {"name": "Revenue Deficit", "formula": "Revenue Expenditure - Revenue Receipts"},
                    {"name": "Primary Deficit", "formula": "Fiscal Deficit - Interest Payments"}
                ]
            }
        ],
        "quizzes": [
            {
                "id": "upsc-q1",
                "title": "UPSC Prelims GS Paper 1 Mini-Mock",
                "questionsCount": 5,
                "duration": 10,
                "questions": [
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
                        "explanation": "Global MPI evaluates 3 dimensions: Health (Nutrition, Child mortality), Education (Years of schooling, Attendance), and Standard of Living."
                    }
                ]
            }
        ]
    },
    {
        "id": "ssc",
        "title": "SSC CGL & CHSL",
        "description": "Targeted preparation for Staff Selection Commission exams with mock tests and quantitative aptitude shortcuts.",
        "color": "bg-blue-500",
        "resource_count": 850,
        "category": "Staff Selection",
        "modules": [
            {
                "id": "quant",
                "title": "Quantitative Aptitude",
                "type": "folder",
                "items": 10,
                "color": "text-blue-600 bg-blue-50",
                "content": [
                    {"title": "Number System & Divisibility Rules", "type": "note", "pages": "Shortcuts Sheet"},
                    {"title": "Percentages, Profit & Loss Masterclass", "type": "pdf", "pages": "15 pages"},
                    {"title": "Time, Speed, Distance & Trains", "type": "pdf", "pages": "Relative Speed Rules"},
                    {"title": "Simple & Compound Interest Tricks", "type": "note", "pages": "Effective Rate Method"},
                    {"title": "Algebraic Identities & Factorization", "type": "pdf", "pages": "Formula Compendium"},
                    {"title": "Geometry: Triangles, Circles & Chords", "type": "pdf", "pages": "Theorems Sheet"},
                    {"title": "Trigonometry & Heights and Distances", "type": "note", "pages": "Quadrant Table"},
                    {"title": "Mensuration 2D & 3D Volume Formulas", "type": "pdf", "pages": "Formula Atlas"}
                ]
            },
            {
                "id": "reasoning",
                "title": "General Intelligence & Reasoning",
                "type": "folder",
                "items": 8,
                "color": "text-purple-600 bg-purple-50",
                "content": [
                    {"title": "Analogy, Classification & Odd One Out", "type": "note", "pages": "Rule Book"},
                    {"title": "Series Completion: Number & Alphabetical", "type": "pdf", "pages": "Pattern Bank"},
                    {"title": "Coding-Decoding & Substitution", "type": "note", "pages": "Quick Decoding"},
                    {"title": "Blood Relations & Coded Hierarchy", "type": "pdf", "pages": "Family Tree Maps"},
                    {"title": "Syllogisms & Venn Diagram Methods", "type": "note", "pages": "100-50 Rule"},
                    {"title": "Direction Sense Test & Spatial Orientation", "type": "pdf", "pages": "Coordinate Rules"}
                ]
            }
        ],
        "videos": [
            {
                "id": "sv1",
                "title": "SSC CGL Complete Quantitative Aptitude Marathon",
                "channel": "ExamGuru SSC",
                "duration": "5h 15m",
                "views": "2.1M views",
                "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                "thumbnail": "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80"
            }
        ],
        "formulas": [
            {
                "topic": "Quantitative Aptitude Quick Shortcuts",
                "formulas": [
                    {"name": "Algebra Identity 1", "formula": "a³ + b³ + c³ - 3abc = (a+b+c)(a²+b²+c² - ab - bc - ca)"},
                    {"name": "Algebra Special Case", "formula": "If a + b + c = 0, then a³ + b³ + c³ = 3abc"},
                    {"name": "Successive Percentage Change", "formula": "Net Change% = (x + y + xy/100)%"},
                    {"name": "Difference between CI & SI for 2 Years", "formula": "Difference = P * (R / 100)²"}
                ]
            }
        ],
        "quizzes": [
            {
                "id": "ssc-q1",
                "title": "SSC CGL Tier-1 Speed Quiz",
                "questionsCount": 4,
                "duration": 8,
                "questions": [
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
                        "explanation": "At SI: (N-1) = RT/100. For double, N-1=1 -> 1 in 5 yrs. For 4 times, N-1=3 -> 3 * 5 = 15 years."
                    }
                ]
            }
        ]
    },
    {
        "id": "banking",
        "title": "Banking & Insurance",
        "description": "SBI PO, IBPS, and RBI Grade B focused content with banking awareness and data interpretation sets.",
        "color": "bg-green-500",
        "resource_count": 920,
        "category": "Banking",
        "modules": [
            {
                "id": "bank_aware",
                "title": "Banking Awareness & RBI Regulations",
                "type": "folder",
                "items": 8,
                "color": "text-green-600 bg-green-50",
                "content": [
                    {"title": "History of Indian Banking & Nationalization", "type": "pdf", "pages": "Timeline"},
                    {"title": "RBI Monetary Policy Tools (CRR, SLR, Repo)", "type": "note", "pages": "Key Terms"},
                    {"title": "Negotiable Instruments Act & Cheques", "type": "pdf", "pages": "Legal Guide"},
                    {"title": "Financial Inclusion: PMJDY, Priority Sector", "type": "note", "pages": "Schemes"}
                ]
            }
        ],
        "videos": [
            {
                "id": "bv1",
                "title": "RBI Grade B & SBI PO Complete Banking Awareness",
                "channel": "ExamGuru Banking",
                "duration": "3h 20m",
                "views": "740K views",
                "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                "thumbnail": "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?auto=format&fit=crop&w=600&q=80"
            }
        ],
        "formulas": [
            {
                "topic": "Financial & Banking Ratios",
                "formulas": [
                    {"name": "Cash Reserve Ratio (CRR)", "formula": "Percentage of Net Demand and Time Liabilities (NDTL) kept with RBI"},
                    {"name": "Statutory Liquidity Ratio (SLR)", "formula": "Reserve requirement liquid assets held by banks before lending"},
                    {"name": "Capital Adequacy Ratio (CAR)", "formula": "(Tier 1 Capital + Tier 2 Capital) / Risk Weighted Assets"}
                ]
            }
        ],
        "quizzes": []
    },
    {
        "id": "railways",
        "title": "Indian Railways (RRB)",
        "description": "NTPC and Group D specific study plans specializing in General Science and General Awareness.",
        "color": "bg-red-500",
        "resource_count": 650,
        "category": "Railways",
        "modules": [
            {
                "id": "rrb_sci",
                "title": "General Science (Physics, Chem, Bio)",
                "type": "folder",
                "items": 6,
                "color": "text-red-600 bg-red-50",
                "content": [
                    {"title": "Newtonian Mechanics & Gravitation", "type": "pdf", "pages": "Formula & Practice"},
                    {"title": "Periodic Table & Chemical Bonding", "type": "note", "pages": "Important Elements"},
                    {"title": "Human Anatomy, Diseases & Vitamins", "type": "pdf", "pages": "Visual Guide"}
                ]
            }
        ],
        "videos": [],
        "formulas": [],
        "quizzes": []
    },
    {
        "id": "gate",
        "title": "GATE & ESE",
        "description": "Technical subjects notes for CS, ME, EE, and EC streams along with previous year question papers.",
        "color": "bg-purple-500",
        "resource_count": 1500,
        "category": "Engineering",
        "modules": [
            {
                "id": "gate_math",
                "title": "Engineering Mathematics & Aptitude",
                "type": "folder",
                "items": 6,
                "color": "text-purple-600 bg-purple-50",
                "content": [
                    {"title": "Linear Algebra: Eigenvalues & Vector Spaces", "type": "pdf", "pages": "Key Proofs"},
                    {"title": "Calculus: Limits, Maxima-Minima & Integrals", "type": "pdf", "pages": "Problems"},
                    {"title": "Probability & Combinatorics for GATE", "type": "note", "pages": "Formulas"}
                ]
            }
        ],
        "videos": [],
        "formulas": [],
        "quizzes": []
    },
    {
        "id": "def",
        "title": "Defence (NDA/CDS)",
        "description": "Preparation strategy for National Defence Academy and CDS exams with physical training tips.",
        "color": "bg-teal-500",
        "resource_count": 430,
        "category": "Defence",
        "modules": [
            {
                "id": "def_gat",
                "title": "General Ability & SSB Interview Strategy",
                "type": "folder",
                "items": 5,
                "color": "text-teal-600 bg-teal-50",
                "content": [
                    {"title": "SSB 5-Day Selection Process Handbook", "type": "pdf", "pages": "Complete Guide"},
                    {"title": "Psychology Tests (TAT, WAT, SRT, SD) Prep", "type": "note", "pages": "Sample Prompts"},
                    {"title": "Officer Like Qualities (15 OLQs) Breakdown", "type": "pdf", "pages": "Key Traits"}
                ]
            }
        ],
        "videos": [],
        "formulas": [],
        "quizzes": []
    }
]

@router.get("/")
def get_courses(category: Optional[str] = None, db: Session = Depends(get_db)):
    # Try fetching from DB first
    db_courses = db.query(Course).all()
    if db_courses and len(db_courses) > 0:
        courses = [
            {
                "id": c.id,
                "title": c.title,
                "description": c.description,
                "color": c.color,
                "resourceCount": c.resource_count,
                "category": c.category
            }
            for c in db_courses
        ]
        if category and category.lower() != "all":
            courses = [c for c in courses if c.get("category", "").lower() == category.lower()]
        return courses

    # Fallback to rich DEFAULT_COURSES
    courses = [
        {
            "id": c["id"],
            "title": c["title"],
            "description": c["description"],
            "color": c["color"],
            "resourceCount": c["resource_count"],
            "category": c["category"]
        }
        for c in DEFAULT_COURSES
    ]
    if category and category.lower() != "all":
        courses = [c for c in courses if c.get("category", "").lower() == category.lower()]
    return courses

@router.get("/{course_id}")
def get_course_detail(course_id: str, db: Session = Depends(get_db)):
    db_course = db.query(Course).filter(Course.id == course_id).first()
    if db_course:
        return {
            "id": db_course.id,
            "title": db_course.title,
            "description": db_course.description,
            "color": db_course.color,
            "resourceCount": db_course.resource_count,
            "category": db_course.category,
            "modules": db_course.modules or [],
            "videos": db_course.videos or [],
            "formulas": db_course.formulas or [],
            "quizzes": db_course.quizzes or []
        }

    # Match in default courses
    for c in DEFAULT_COURSES:
        if c["id"].lower() == course_id.lower():
            return {
                "id": c["id"],
                "title": c["title"],
                "description": c["description"],
                "color": c["color"],
                "resourceCount": c["resource_count"],
                "category": c["category"],
                "modules": c.get("modules", []),
                "videos": c.get("videos", []),
                "formulas": c.get("formulas", []),
                "quizzes": c.get("quizzes", [])
            }
    
    raise HTTPException(status_code=404, detail="Course not found")

