# ExamGuru AI (GovGuide AI) - Unified Platform for Government Exam Guidance & Employment Support

A modern full-stack web platform built exactly matching [govern-delta.vercel.app](https://govern-delta.vercel.app/), powered by **React** (Frontend), **Python FastAPI** (Backend), **MySQL / SQLAlchemy** (Database), and **Scikit-learn** (Machine Learning).

---

## 🛠️ Technology Stack

### 🎨 Frontend
- **React.js 19** + **Vite 8**
- **Tailwind CSS 4**
- **React Router 7**
- **Framer Motion** (3D cosmic orbit, smooth animations, and folder interactions)
- **Lucide Icons** & **Recharts**
- **Axios** HTTP client

### ⚙️ Backend
- **Python 3.11**
- **FastAPI 0.110** (Asynchronous High-Performance API)
- **Pydantic v2** & `pydantic-settings`
- **Uvicorn** ASGI Server
- **PyJWT & Passlib (bcrypt)** for secure authentication

### 🗄️ Database
- **MySQL 8.0** via **PyMySQL** & **SQLAlchemy 2.0 ORM**
- Seamless local fallback to SQLite if MySQL service is not booted

### 🧠 Machine Learning & Analytics
- **Scikit-learn** (Ridge Regression & Random Forest performance probability predictor)
- **NumPy & Pandas** data processing

---

## 🌟 Modules & Features (Matching govern-delta.vercel.app)

1. **Home (`/`)**:
   - Hero: *"Unlock Your Government Dream"* with dynamic animated gradient background and glowing blur blobs.
   - Live macOS-style system terminal preview `/system/core/dashboard` with interactive cosmic orbit showcasing platform modules.
   - Power-Packed Features: AI Exam Guidance, Employment Support, Smart Study Materials, Community Mentorship.
   - Success stories & testimonials.

2. **Courses Catalog & Detailed Classroom (`/courses`, `/courses/:courseId`)**:
   - Interactive 3D Folder cards for UPSC, SSC, Banking, Railways, GATE, and Defence.
   - Course detail tabs:
     - 📁 **Study Modules & Notes** (Indus Valley, Vedic Age, Polity, Geography, Economy)
     - 🎥 **Video Lectures** (YouTube marathons, editorial analyses, Live Class view)
     - 🧮 **Formula Sheets** (Articles index, speed math shortcuts, economic formulas)
     - 📝 **Practice Quizzes** (Interactive CBT mock quizzes with immediate explanations)
     - 🤖 **AI Course Tutor** (Instant subject-specific doubt solver)

3. **AI Guidance Center (`/guidance`)**:
   - 🤖 **AI Personalized Mentor (`/guidance/mentor`)**: 24/7 AI mentor chat for strategy, schedules, and book suggestions.
   - 🧠 **Career Path Recommender (`/guidance/recommender`)**: ML-powered tool analyzing Degree, GPA, and interest to suggest ideal exam trajectories.
   - 📚 **Smart Study Materials (`/guidance/materials`)**: Searchable repository of NCERT summaries and reference guides with online reader.
   - 📝 **Live Mock Tests (`/guidance/tests`)**: Full-length CBT test simulations with timer, answer key, and score calculations.
   - 🤝 **Community & Mentorship (`/guidance/community`)**: Aspirant discussions and topper tips.

4. **Employment Hub (`/employment`, `/employment/part-time`)**:
   - Real-time directory of active government notifications (UPSC, SBI PO, SSC CGL, RRB JE).
   - Category filtering (Civil Services, Banking, Engineering, Administrative).
   - **Part-Time & Near Me (`/employment/part-time`)**: Local student-friendly tutoring, data entry, and flexible shifts with interactive Google Maps integration.

5. **AI Exam Probability Predictor (`/prediction`)**:
   - Machine learning cutoff probability estimator.
   - Inputs: Graduation CGPA, Daily Study Hours, Average Mock Test Score, Target Exam.
   - Circular progress SVG probability gauge with color-coded verdict and AI recommendations.

6. **Student & Faculty Dashboard (`/dashboard`)**:
   - Countdown to upcoming exams (e.g. UPSC Prelims: 114 days).
   - Study time logged, mock test average, enrolled course progress bars.

7. **Floating AI Chatbot**:
   - Available everywhere on the platform for instant exam guidance, study schedule creation, and job notification queries.

8. **Authentication (`/login`)**:
   - Student & Teacher role switcher with one-click demo login or standard credentials.

---

## 🚀 Running Locally

### 1. Start the Python FastAPI Backend:
```bash
# In the project root:
pip install -r backend/requirements.txt
python -m uvicorn backend.app.main:app --reload --port 8000
```

### 2. Start the React Vite Frontend:
```bash
# In a second terminal:
cd frontend
npm install
npm run dev
```

Visit **[http://localhost:5173](http://localhost:5173)** in your browser.
