# Government-1: Unified Exam Guidance, Placement & ML Platform

A high-performance web platform engineered exclusively with the approved stack: **React.js + Vite** (Frontend), **FastAPI** (Backend), **MySQL / SQLAlchemy** (Database), **Scikit-learn** (Machine Learning), and **C++** (DSA Practice).

---

## 🛠️ Strict Technology Stack

### Frontend
- **React.js 19**
- **Vite 8**
- **JavaScript**
- **Tailwind CSS 4**
- **React Router 7**
- **Axios**
- **Recharts**

### Backend
- **Python 3.11**
- **FastAPI 0.110**
- **Pydantic v2**
- **SQLAlchemy 2.0 ORM**
- **PyJWT & Passlib Authentication**

### Database
- **MySQL 8.0**
- **SQLAlchemy ORM**
- **Alembic Migrations**

### Machine Learning
- **NumPy**
- **Pandas**
- **Scikit-learn**
- **Matplotlib**

### DSA & Placement
- **C++20** standard solutions for all 14 core DSA algorithmic topics.

---

## 🌟 Modules & Features

### 1. Concepts from Uploaded Spec (`/core-cs`)
Integrated coverage of the four core computer science foundations:
- **Data Structures & Algorithms**
- **DBMS**: Relational Algebra, Normalization (1NF, 2NF, 3NF, BCNF), B+ Trees, Transactions & ACID, Indexing, Concurrency control.
- **Operating Systems**: Processes vs Threads, CPU Scheduling, Deadlocks & Coffman Conditions, Memory Virtualization, Paging & TLB.
- **Machine Learning**: Supervised vs Unsupervised, Bias-Variance Tradeoff, L1/L2 Regularization, Precision, Recall, F1-Score, ROC-AUC.

### 2. DSA & Placement Preparation (`/dsa`)
Comprehensive C++ solutions across all 14 mandatory algorithmic domains:
1. Arrays and Strings
2. Two Pointers
3. Sliding Window
4. Binary Search
5. Sorting
6. Recursion
7. Linked Lists
8. Stack and Queue
9. Hashing
10. Trees and Graphs
11. Greedy Algorithms
12. Dynamic Programming
13. Backtracking
14. Heap and Priority Queue

### 3. Practical Machine Learning Features (`/ml-predict`)
1. **Student Performance Prediction**: Scikit-learn Ridge Regression predicting final exam score and clearing probability based on study metrics.
2. **Exam Preparation Performance Analysis**: Scikit-learn Random Forest Classifier evaluating subject mastery and identifying weak areas.
3. **Personalized Course & Exam Recommendations**: TF-IDF Vectorizer + Cosine Similarity content matching engine.
4. **Student Progress Classification**: Scikit-learn Logistic Regression pipeline categorizing student consistency and generating actionable schedules.
5. **Score Trajectory Visualizations**: Matplotlib server-side chart generator emitting clean base64 visual plots.

### 4. Government Exam Catalog & Syllabi (`/exams`)
- Detailed exam patterns, eligibility, and syllabus breakdown for UPSC CSE, State PSCs, IBPS PO, SBI PO, SSC CGL/CHSL, RRB NTPC, and NDA/CDS.
- Curated subject notes and previous year papers.

### 5. Interactive Mock Tests & Real-Time Scoring (`/tests`)
- Timed examination engine with question navigation palette, countdown timer, automated evaluation, and granular answer breakdowns with explanations.

### 6. Public Sector & Government Employment (`/jobs`)
- Real-time job board for Central Ministries, PSUs (NIC, ISRO, DRDO), and academic part-time opportunities with 1-click application submissions.

### 7. Interview Preparation (`/interview`)
- Technical questions, HR behavioral questions, company-wise hiring patterns (NIC, DRDO, TCS, Infosys, Amazon, Microsoft), STAR project presentation guides, and ATS resume engineering blueprints.

### 8. Candidate Dashboard (`/dashboard`)
- Recharts visualizations: Mock test score trend LineChart, subject mastery BarChart, and study time allocation PieChart.

---

## 🚀 Running the Platform

### Start Backend (FastAPI on Port 8000)
```bash
python -m uvicorn backend.app.main:app --port 8000
```

### Start Frontend (React + Vite on Port 5173)
```bash
cd frontend
npm run dev
```

### Seed Initial Database
```bash
python -m backend.seed_data
```

### Run Alembic Migrations
```bash
cd backend
python -m alembic upgrade head
```
