"""
Seed all government exams + study resources (free textbook links + YouTube playlists).
"""
from backend.app.models.resources import StudyResource, GovExam


def seed_resources(db):
    if db.query(GovExam).count() > 0:
        print("  Resources already seeded — skipping.")
        return

    # ─────────────────────────────────────────────────────────────────────────
    # 1. ALL GOVERNMENT EXAMS
    # ─────────────────────────────────────────────────────────────────────────
    exams = [
        # ── UPSC ─────────────────────────────────────────────────────────────
        GovExam(
            category="UPSC", exam_name="UPSC CSE", popular_rank=1,
            full_name="Union Public Service Commission Civil Services Examination",
            conducting_body="Union Public Service Commission (UPSC)",
            vacancies_approx="900–1100 per year",
            eligibility_age="21–32 (Gen), 21–35 (OBC), 21–37 (SC/ST)",
            eligibility_education="Any graduate from recognised university",
            exam_pattern="3 stages: Prelims (GS+CSAT, 400 marks) → Mains (9 papers, 1750 marks) → Personality Test (275 marks) = 2025 total",
            syllabus_summary="History, Polity, Geography, Economy, Environment, S&T, Current Affairs; Ethics, Essay; Optional subject",
            official_website="https://upsc.gov.in",
            notification_month="February", exam_month="June (Prelims), September (Mains)",
            salary_range="₹56,100 – ₹2,25,000 (IAS/IPS/IFS)", difficulty="Very High"
        ),
        GovExam(
            category="UPSC", exam_name="UPSC CDS", popular_rank=2,
            full_name="Combined Defence Services Examination",
            conducting_body="Union Public Service Commission (UPSC)",
            vacancies_approx="400–500 per year",
            eligibility_age="19–25 (varies by academy)",
            eligibility_education="Graduation (IMA/AFA), 12th pass (NA/OTA)",
            exam_pattern="2 stages: Written (English, GK, Maths) → SSB Interview",
            syllabus_summary="English, General Knowledge, Elementary Mathematics (for IMA/AFA/NA)",
            official_website="https://upsc.gov.in",
            notification_month="November / June", exam_month="February / November",
            salary_range="₹56,100 – ₹2,00,000 (Lt. Colonel equivalent)", difficulty="High"
        ),
        GovExam(
            category="UPSC", exam_name="UPSC CAPF AC", popular_rank=3,
            full_name="Central Armed Police Forces Assistant Commandant",
            conducting_body="Union Public Service Commission (UPSC)",
            vacancies_approx="200–300 per year",
            eligibility_age="20–25",
            eligibility_education="Any graduation",
            exam_pattern="Written (Paper I: GK/Current Affairs 250m, Paper II: Essay 150m) → Physical/Medical → Interview 150m",
            syllabus_summary="Current affairs, Indian Polity, History, Geography, GS; Essay writing",
            official_website="https://upsc.gov.in",
            notification_month="April", exam_month="August",
            salary_range="₹56,100 – ₹1,77,500", difficulty="High"
        ),
        GovExam(
            category="UPSC", exam_name="NDA", popular_rank=4,
            full_name="National Defence Academy & Naval Academy Examination",
            conducting_body="Union Public Service Commission (UPSC)",
            vacancies_approx="400–450 per year",
            eligibility_age="16.5–19.5",
            eligibility_education="10+2 / Class 12 (PCM for Army/Navy/AF)",
            exam_pattern="Written (Maths 300m + GK 600m) → SSB Interview 900m",
            syllabus_summary="Mathematics (Algebra, Trigonometry, Calculus, Statistics), English, GK, Physics, Chemistry, Geography",
            official_website="https://upsc.gov.in",
            notification_month="January / June", exam_month="April / September",
            salary_range="₹56,100 – ₹1,77,500 (after commissioning)", difficulty="High"
        ),
        # ── SSC ──────────────────────────────────────────────────────────────
        GovExam(
            category="SSC", exam_name="SSC CGL", popular_rank=5,
            full_name="Staff Selection Commission Combined Graduate Level",
            conducting_body="Staff Selection Commission (SSC)",
            vacancies_approx="7,000–15,000 per year",
            eligibility_age="18–32 (varies by post)",
            eligibility_education="Any graduation",
            exam_pattern="Tier I (CBT 100 Qs 200m, 60 min) → Tier II (CBT Paper-I 390m, Paper-II Mains for JSO/AAO) → Document Verification",
            syllabus_summary="Quantitative Aptitude, English, GI & Reasoning, GK & Current Affairs; Statistics/Finance for specific posts",
            official_website="https://ssc.gov.in",
            notification_month="November", exam_month="Tier I: July, Tier II: September",
            salary_range="₹25,500 – ₹92,300 (varies by post)", difficulty="Medium"
        ),
        GovExam(
            category="SSC", exam_name="SSC CHSL", popular_rank=6,
            full_name="Staff Selection Commission Combined Higher Secondary Level",
            conducting_body="Staff Selection Commission (SSC)",
            vacancies_approx="3,000–6,000 per year",
            eligibility_age="18–27",
            eligibility_education="10+2 / Class 12 pass",
            exam_pattern="Tier I (CBT 100 Qs 200m) → Tier II (Descriptive Paper 100m + Skill Test)",
            syllabus_summary="Quantitative Aptitude, English Language, GI & Reasoning, GK",
            official_website="https://ssc.gov.in",
            notification_month="December", exam_month="March",
            salary_range="₹19,900 – ₹63,200 (LDC/JSA/PA/SA)", difficulty="Medium"
        ),
        GovExam(
            category="SSC", exam_name="SSC CPO", popular_rank=7,
            full_name="Staff Selection Commission Central Police Organisations",
            conducting_body="Staff Selection Commission (SSC)",
            vacancies_approx="1,000–2,000 per year",
            eligibility_age="20–25",
            eligibility_education="Any graduation",
            exam_pattern="Paper I (200 Qs, 200m, 2hrs CBT) → PET/PMT → Paper II (200 Qs English, 200m) → Medical",
            syllabus_summary="GI & Reasoning, GK, Quantitative Aptitude, English; Physical standards required",
            official_website="https://ssc.gov.in",
            notification_month="February", exam_month="June",
            salary_range="₹35,400 – ₹1,12,400 (SI in CAPF)", difficulty="Medium"
        ),
        GovExam(
            category="SSC", exam_name="SSC MTS", popular_rank=8,
            full_name="Staff Selection Commission Multi-Tasking Staff",
            conducting_body="Staff Selection Commission (SSC)",
            vacancies_approx="10,000–15,000 per year",
            eligibility_age="18–25",
            eligibility_education="Matriculation (10th pass)",
            exam_pattern="CBT Session I (Numeracy/Math 20 Qs + Reasoning 20 Qs) + Session II (GK 25 Qs + English 25 Qs)",
            syllabus_summary="Basic Mathematics, Reasoning, General Knowledge, English Language",
            official_website="https://ssc.gov.in",
            notification_month="February", exam_month="June–August",
            salary_range="₹18,000 – ₹56,900", difficulty="Low"
        ),
        GovExam(
            category="SSC", exam_name="SSC JE", popular_rank=9,
            full_name="Staff Selection Commission Junior Engineer",
            conducting_body="Staff Selection Commission (SSC)",
            vacancies_approx="1,000–1,500 per year",
            eligibility_age="18–32",
            eligibility_education="Diploma or Degree in Engineering (Civil/Electrical/Mechanical)",
            exam_pattern="Paper I (CBT: GI + GK + Technical 200m, 2hrs) → Paper II (Conventional: Technical 300m, 2hrs)",
            syllabus_summary="Engineering fundamentals (Civil/Electrical/Mech), GK, Reasoning",
            official_website="https://ssc.gov.in",
            notification_month="March", exam_month="October",
            salary_range="₹35,400 – ₹1,12,400", difficulty="Medium"
        ),
        # ── Banking ──────────────────────────────────────────────────────────
        GovExam(
            category="Banking", exam_name="IBPS PO", popular_rank=10,
            full_name="Institute of Banking Personnel Selection Probationary Officer",
            conducting_body="IBPS",
            vacancies_approx="3,000–5,000 per year",
            eligibility_age="20–30",
            eligibility_education="Any graduation",
            exam_pattern="Prelims (100 Qs, 100m, 60 min) → Mains (155 Qs + Descriptive 25m = 225 total, 180 min) → Interview",
            syllabus_summary="Reasoning, Quantitative Aptitude, English, Computer Awareness, Banking/Economy GK",
            official_website="https://ibps.in",
            notification_month="August", exam_month="October (Prelims), November (Mains)",
            salary_range="₹36,000 – ₹63,840 (CTC ~₹8.5 LPA)", difficulty="High"
        ),
        GovExam(
            category="Banking", exam_name="IBPS Clerk", popular_rank=11,
            full_name="IBPS Clerical Cadre Recruitment",
            conducting_body="IBPS",
            vacancies_approx="6,000–12,000 per year",
            eligibility_age="20–28",
            eligibility_education="Any graduation",
            exam_pattern="Prelims (100 Qs, 100m, 60 min) → Mains (190 Qs, 160m, 160 min)",
            syllabus_summary="Reasoning, Quantitative Aptitude, English, Computer, GK/Current Affairs",
            official_website="https://ibps.in",
            notification_month="September", exam_month="December (Prelims), January (Mains)",
            salary_range="₹19,900 – ₹47,920 (CTC ~₹4.5 LPA)", difficulty="Medium"
        ),
        GovExam(
            category="Banking", exam_name="SBI PO", popular_rank=12,
            full_name="State Bank of India Probationary Officer",
            conducting_body="State Bank of India (SBI)",
            vacancies_approx="1,500–2,500 per year",
            eligibility_age="21–30",
            eligibility_education="Any graduation",
            exam_pattern="Prelims (100 Qs, 100m) → Mains (200 Qs Data Analysis+Reasoning+English+GA+Descriptive) → GD + Interview",
            syllabus_summary="Data Analysis, Reasoning, English, Banking GK, Current Affairs; Letter/Essay writing",
            official_website="https://sbi.co.in/careers",
            notification_month="April", exam_month="June (Prelims), July (Mains)",
            salary_range="₹41,960 – ₹85,920 (CTC ~₹14 LPA)", difficulty="High"
        ),
        GovExam(
            category="Banking", exam_name="SBI Clerk", popular_rank=13,
            full_name="State Bank of India Junior Associates (Clerical Cadre)",
            conducting_body="State Bank of India (SBI)",
            vacancies_approx="8,000–15,000 per year",
            eligibility_age="20–28",
            eligibility_education="Any graduation",
            exam_pattern="Prelims (100 Qs, 100m, 60 min) → Mains (190 Qs, 160 min)",
            syllabus_summary="Reasoning, Quantitative Aptitude, English, GK/Current Affairs, Computer",
            official_website="https://sbi.co.in/careers",
            notification_month="January", exam_month="March (Prelims), May (Mains)",
            salary_range="₹26,000 – ₹65,000 (CTC ~₹5.5 LPA)", difficulty="Medium"
        ),
        GovExam(
            category="Banking", exam_name="RBI Grade B", popular_rank=14,
            full_name="Reserve Bank of India Grade B Officer",
            conducting_body="Reserve Bank of India (RBI)",
            vacancies_approx="200–400 per year",
            eligibility_age="21–30",
            eligibility_education="Any graduation (60% marks)",
            exam_pattern="Phase I (200 Qs 200m — Reasoning+English+Quant+GA) → Phase II (Economics+Finance+Management+English Descriptive) → Interview",
            syllabus_summary="Economics Policy, Social Issues, Finance, Management, Current Affairs, ESI (Economic and Social Issues)",
            official_website="https://rbi.org.in/Scripts/Opportunities.aspx",
            notification_month="March", exam_month="June (Phase I), July (Phase II)",
            salary_range="₹55,000 – ₹1,12,550 (CTC ~₹16 LPA)", difficulty="Very High"
        ),
        GovExam(
            category="Banking", exam_name="NABARD Grade A", popular_rank=15,
            full_name="National Bank for Agriculture and Rural Development Assistant Manager",
            conducting_body="NABARD",
            vacancies_approx="150–200 per year",
            eligibility_age="21–30",
            eligibility_education="Graduation (Economics/CS/Agri/MBA preferred)",
            exam_pattern="Phase I (CBT: Reasoning 20+English 40+Quant 20+ESI 40+Agriculture 40 = 170 Qs) → Phase II (Descriptive) → Interview",
            syllabus_summary="Economic & Social Issues, Agriculture & Rural Development, Current Affairs, Descriptive English",
            official_website="https://nabard.org/careers.aspx",
            notification_month="February", exam_month="April",
            salary_range="₹44,500 – ₹89,050", difficulty="High"
        ),
        # ── Railways ─────────────────────────────────────────────────────────
        GovExam(
            category="Railways", exam_name="RRB NTPC", popular_rank=16,
            full_name="Railway Recruitment Board Non-Technical Popular Categories",
            conducting_body="Railway Recruitment Board (RRB)",
            vacancies_approx="10,000–40,000 per year",
            eligibility_age="18–33 (varies by post)",
            eligibility_education="Graduation or 12th pass depending on post",
            exam_pattern="CBT 1 (100 Qs, 90 min) → CBT 2 (120 Qs, 90 min) → Skill Test / CBAT → Document Verification",
            syllabus_summary="Mathematics, Reasoning & Computer Aptitude, General Awareness (History, Polity, Railways GK)",
            official_website="https://indianrailways.gov.in/railwayboard/",
            notification_month="February", exam_month="Phase-wise throughout year",
            salary_range="₹19,900 – ₹92,300 (varies by post)", difficulty="Medium"
        ),
        GovExam(
            category="Railways", exam_name="RRB Group D", popular_rank=17,
            full_name="Railway Recruitment Board Level 1 (Group D)",
            conducting_body="Railway Recruitment Board (RRB)",
            vacancies_approx="50,000–1,00,000 per cycle",
            eligibility_age="18–33",
            eligibility_education="10th pass + ITI certificate",
            exam_pattern="CBT (100 Qs 90 min) → PET (Physical Efficiency Test) → Document Verification",
            syllabus_summary="Mathematics, Reasoning, General Science, GK & Current Affairs",
            official_website="https://indianrailways.gov.in",
            notification_month="February", exam_month="Phase-wise throughout year",
            salary_range="₹18,000 – ₹56,900", difficulty="Low"
        ),
        GovExam(
            category="Railways", exam_name="RRB ALP", popular_rank=18,
            full_name="Railway Recruitment Board Assistant Loco Pilot",
            conducting_body="Railway Recruitment Board (RRB)",
            vacancies_approx="5,000–20,000 per cycle",
            eligibility_age="18–28",
            eligibility_education="10th + ITI (relevant trade) or Diploma/Degree in Engineering",
            exam_pattern="CBT 1 (75 Qs, 60 min) → CBT 2 (Part A: 100 Qs + Part B Trade syllabus 75 Qs) → CBAT (Aptitude Test)",
            syllabus_summary="Maths, Reasoning, GK, Basic Science & Engineering, Relevant Trade Topics",
            official_website="https://indianrailways.gov.in",
            notification_month="February", exam_month="Phase-wise throughout year",
            salary_range="₹19,900 – ₹63,200", difficulty="Medium"
        ),
        GovExam(
            category="Railways", exam_name="RRB JE", popular_rank=19,
            full_name="Railway Recruitment Board Junior Engineer",
            conducting_body="Railway Recruitment Board (RRB)",
            vacancies_approx="10,000–15,000 per cycle",
            eligibility_age="18–33",
            eligibility_education="Diploma or Degree in Engineering",
            exam_pattern="CBT 1 (100 Qs 90 min) → CBT 2 (150 Qs 120 min — Technical) → Document Verification",
            syllabus_summary="Technical subjects (Civil/Mech/Electrical/Electronics), Maths, GK, Reasoning",
            official_website="https://indianrailways.gov.in",
            notification_month="January", exam_month="May",
            salary_range="₹35,400 – ₹1,12,400", difficulty="Medium"
        ),
        # ── Defence ──────────────────────────────────────────────────────────
        GovExam(
            category="Defence", exam_name="AFCAT", popular_rank=20,
            full_name="Air Force Common Admission Test",
            conducting_body="Indian Air Force",
            vacancies_approx="200–300 per cycle",
            eligibility_age="20–26 (Flying), 20–26 (Ground Duty Technical/Non-Technical)",
            eligibility_education="Graduation (B.E/B.Tech for Technical; Any graduate for Non-Technical)",
            exam_pattern="AFCAT (100 Qs 120 min: GK+Military+Reasoning+Maths+English) → EKT for Technical → AFSB Interview",
            syllabus_summary="General Knowledge, Military Awareness, Verbal Ability, Numerical Ability, Reasoning",
            official_website="https://afcat.cdac.in",
            notification_month="June / December", exam_month="August / February",
            salary_range="₹56,100 – ₹2,00,000 (Flying Branch)", difficulty="High"
        ),
        GovExam(
            category="Defence", exam_name="Indian Coast Guard", popular_rank=21,
            full_name="Indian Coast Guard Assistant Commandant / Navik / Yantrik",
            conducting_body="Indian Coast Guard",
            vacancies_approx="300–500 per year",
            eligibility_age="Varies (18–25 for Navik, 21–25 for Officers)",
            eligibility_education="10th/12th/Diploma/Graduation depending on post",
            exam_pattern="Written Test → Physical Test → Medical → Interview",
            syllabus_summary="Maths, GK, English, Reasoning; Technical subjects for Yantrik",
            official_website="https://joinindiancoastguard.cdac.in",
            notification_month="Quarterly", exam_month="Quarterly",
            salary_range="₹21,700 – ₹1,77,500", difficulty="High"
        ),
        # ── State PSC ────────────────────────────────────────────────────────
        GovExam(
            category="State PSC", exam_name="UPPSC PCS", popular_rank=22,
            full_name="Uttar Pradesh Public Service Commission Provincial Civil Service",
            conducting_body="Uttar Pradesh Public Service Commission (UPPSC)",
            vacancies_approx="500–700 per year",
            eligibility_age="21–40 (Gen), relaxation for reserved categories",
            eligibility_education="Any graduation",
            exam_pattern="Prelims (GS Paper I 150 Qs 200m + GS Paper II/CSAT 100 Qs 200m) → Mains (8 papers, 1500m) → Interview (100m)",
            syllabus_summary="Similar to UPSC CSE but with UP-specific content in History, Geography, Culture",
            official_website="https://uppsc.up.nic.in",
            notification_month="March", exam_month="October (Prelims), February (Mains)",
            salary_range="₹56,100 – ₹2,25,000 (IAS equivalent state ranks)", difficulty="High"
        ),
        GovExam(
            category="State PSC", exam_name="BPSC", popular_rank=23,
            full_name="Bihar Public Service Commission Combined Competitive Examination",
            conducting_body="Bihar Public Service Commission (BPSC)",
            vacancies_approx="400–600 per year",
            eligibility_age="20–37 (Gen)",
            eligibility_education="Any graduation",
            exam_pattern="Prelims (150 Qs, 150m) → Mains (3 papers: GS I + GS II + Optional 300m each) → Interview",
            syllabus_summary="GK including Bihar-specific, Modern History, Geography, Polity, Economy, S&T",
            official_website="https://bpsc.bih.nic.in",
            notification_month="Varies", exam_month="Varies",
            salary_range="₹44,900 – ₹1,42,400", difficulty="High"
        ),
        GovExam(
            category="State PSC", exam_name="MPPSC", popular_rank=24,
            full_name="Madhya Pradesh Public Service Commission State Service Examination",
            conducting_body="Madhya Pradesh Public Service Commission",
            vacancies_approx="300–500 per year",
            eligibility_age="21–40 (Gen)",
            eligibility_education="Any graduation",
            exam_pattern="Prelims (2 papers) → Mains (6 papers) → Interview",
            syllabus_summary="MP-specific content, GK, Polity, History, Geography, Economy",
            official_website="https://mppsc.mp.gov.in",
            notification_month="February", exam_month="June",
            salary_range="₹44,900 – ₹1,42,400", difficulty="High"
        ),
        GovExam(
            category="State PSC", exam_name="TNPSC Group I", popular_rank=25,
            full_name="Tamil Nadu Public Service Commission Group I Services",
            conducting_body="Tamil Nadu Public Service Commission (TNPSC)",
            vacancies_approx="100–200 per year",
            eligibility_age="21–32 (OC), relaxation for reserved",
            eligibility_education="Any graduation",
            exam_pattern="Prelims (200 Qs, 300m, 3hrs) → Mains (Descriptive 6 papers) → Oral Test",
            syllabus_summary="General Studies (History, Polity, Economy, S&T, Geography), Aptitude with TN-specific content, Tamil language",
            official_website="https://www.tnpsc.gov.in",
            notification_month="Varies", exam_month="Varies",
            salary_range="₹56,100 – ₹2,25,000 (IAS equivalent)", difficulty="High"
        ),
        GovExam(
            category="State PSC", exam_name="KPSC KAS", popular_rank=26,
            full_name="Karnataka Public Service Commission Administrative Service",
            conducting_body="Karnataka Public Service Commission (KPSC)",
            vacancies_approx="150–250 per year",
            eligibility_age="21–35 (Gen)",
            eligibility_education="Any graduation",
            exam_pattern="Prelims → Mains (5 papers) → Interview",
            syllabus_summary="GS with Karnataka-specific content, Kannada language, Constitution, History, Economy",
            official_website="https://kpsc.kar.nic.in",
            notification_month="Varies", exam_month="Varies",
            salary_range="₹44,900 – ₹1,42,400", difficulty="High"
        ),
        GovExam(
            category="State PSC", exam_name="MPSC", popular_rank=27,
            full_name="Maharashtra Public Service Commission State Service Exam",
            conducting_body="Maharashtra Public Service Commission (MPSC)",
            vacancies_approx="300–500 per year",
            eligibility_age="19–38 (Gen)",
            eligibility_education="Any graduation",
            exam_pattern="Prelims → Mains (6 papers) → Interview",
            syllabus_summary="Maharashtra-specific content, GS, Marathi language mandatory",
            official_website="https://mpsc.gov.in",
            notification_month="January", exam_month="April",
            salary_range="₹44,900 – ₹1,42,400", difficulty="High"
        ),
        # ── Teaching ─────────────────────────────────────────────────────────
        GovExam(
            category="Teaching", exam_name="CTET", popular_rank=28,
            full_name="Central Teacher Eligibility Test",
            conducting_body="Central Board of Secondary Education (CBSE)",
            vacancies_approx="Multiple lakh candidates qualify; KVS/NVS/Army Schools use this",
            eligibility_age="No upper age limit for appearing",
            eligibility_education="D.El.Ed / B.Ed with minimum marks",
            exam_pattern="Paper I (for Class 1-5): 150 Qs, 150m — Paper II (for Class 6-8): 150 Qs, 150m",
            syllabus_summary="Child Development & Pedagogy, Language I & II, EVS/Maths (Paper I), Subject-specific (Paper II)",
            official_website="https://ctet.nic.in",
            notification_month="Twice a year (June / December)", exam_month="August / January",
            salary_range="₹35,400 – ₹1,12,400 (after KVS/NVS selection)", difficulty="Medium"
        ),
        GovExam(
            category="Teaching", exam_name="KVS PGT/TGT/PRT", popular_rank=29,
            full_name="Kendriya Vidyalaya Sangathan Teacher Recruitment",
            conducting_body="Kendriya Vidyalaya Sangathan (KVS)",
            vacancies_approx="3,000–8,000 per year",
            eligibility_age="PRT: up to 30, TGT: up to 35, PGT: up to 40",
            eligibility_education="PRT: Graduation + D.El.Ed; TGT: Graduation in subject + B.Ed; PGT: Post-graduation in subject + B.Ed",
            exam_pattern="Written Test (Part I: GK+Reasoning+Computer 20 Qs each + Part II: English/Hindi 10 Qs each + Part III: Subject 100 Qs) → Interview",
            syllabus_summary="Subject-specific content + pedagogy + GK + Reasoning",
            official_website="https://kvsangathan.nic.in",
            notification_month="Varies", exam_month="Varies",
            salary_range="₹35,400 – ₹1,51,100 (PGT)", difficulty="Medium"
        ),
        # ── Insurance ────────────────────────────────────────────────────────
        GovExam(
            category="Insurance", exam_name="LIC AAO", popular_rank=30,
            full_name="Life Insurance Corporation of India Assistant Administrative Officer",
            conducting_body="Life Insurance Corporation of India (LIC)",
            vacancies_approx="300–700 per year",
            eligibility_age="21–30",
            eligibility_education="Any graduation (CA/CS/FICWAI for some streams)",
            exam_pattern="Prelims (70 Qs 100m 60 min) → Mains (300 Qs 300m 90 min) → Interview",
            syllabus_summary="Reasoning, Quantitative Aptitude, GK/Current Affairs, English; Insurance & Financial Market GK",
            official_website="https://licindia.in",
            notification_month="January", exam_month="March (Prelims), May (Mains)",
            salary_range="₹32,795 – ₹69,460 (CTC ~₹8.5 LPA)", difficulty="High"
        ),
        GovExam(
            category="Insurance", exam_name="NIACL AO", popular_rank=31,
            full_name="New India Assurance Company Administrative Officer",
            conducting_body="New India Assurance Company (NIACL)",
            vacancies_approx="200–400 per year",
            eligibility_age="21–30",
            eligibility_education="Any graduation",
            exam_pattern="Phase I CBT (Reasoning 40 + English 30 + Quant 30 = 100 Qs, 90 min) → Phase II (Reasoning 40 + English 40 + GK 40 + Tech/Bio 60) → Interview",
            syllabus_summary="Reasoning, Quantitative Aptitude, English, Insurance GK, Financial Market Awareness",
            official_website="https://newindia.co.in",
            notification_month="August", exam_month="October",
            salary_range="₹32,795 – ₹65,000 (CTC ~₹10 LPA)", difficulty="High"
        ),
    ]
    db.add_all(exams)

    # ─────────────────────────────────────────────────────────────────────────
    # 2. STUDY RESOURCES — Free Textbooks & Notes (PDF / Website)
    # ─────────────────────────────────────────────────────────────────────────
    textbooks = [
        # NCERT Books
        StudyResource(title="NCERT Class 6 History — Our Pasts I", resource_type="pdf", url="https://ncert.nic.in/textbook.php?fhss1=0-7", subject="History", description="Foundation for UPSC Ancient History — Harappan civilisation, Vedic age, early kingdoms", exam_tags="UPSC,SSC,State PSC", provider="NCERT", thumbnail_emoji="📖", is_free=True),
        StudyResource(title="NCERT Class 7 History — Our Pasts II", resource_type="pdf", url="https://ncert.nic.in/textbook.php?ghss1=0-10", subject="History", description="Medieval India — Sultanates, Mughal Empire, regional kingdoms", exam_tags="UPSC,SSC,State PSC", provider="NCERT", thumbnail_emoji="📖", is_free=True),
        StudyResource(title="NCERT Class 8 History — Our Pasts III", resource_type="pdf", url="https://ncert.nic.in/textbook.php?hhss1=0-12", subject="History", description="Modern India — British rule, 1857, reform movements, nationalism", exam_tags="UPSC,SSC,State PSC", provider="NCERT", thumbnail_emoji="📖", is_free=True),
        StudyResource(title="NCERT Class 11 Indian Constitution at Work", resource_type="pdf", url="https://ncert.nic.in/textbook.php?leps1=0-10", subject="Polity", description="Fundamental text for Indian Constitution, FR, DPSP, Parliament, Judiciary", exam_tags="UPSC,SSC,Banking,State PSC", provider="NCERT", thumbnail_emoji="📖", is_free=True),
        StudyResource(title="NCERT Class 12 Political Science — Contemporary World Politics", resource_type="pdf", url="https://ncert.nic.in/textbook.php?leps2=0-9", subject="International Relations", description="Bipolar world, South Asia, UN, globalisation — key for UPSC GS II", exam_tags="UPSC,State PSC", provider="NCERT", thumbnail_emoji="📖", is_free=True),
        StudyResource(title="NCERT Class 11 Indian Economic Development", resource_type="pdf", url="https://ncert.nic.in/textbook.php?kedr1=0-10", subject="Economy", description="Planning, Agriculture, Poverty, Human Capital, Rural Development — UPSC Economy foundation", exam_tags="UPSC,SSC,Banking,State PSC", provider="NCERT", thumbnail_emoji="📖", is_free=True),
        StudyResource(title="NCERT Class 12 Macroeconomics", resource_type="pdf", url="https://ncert.nic.in/textbook.php?leec1=0-6", subject="Economy", description="National Income, Money & Banking, Determination of Income, Balance of Payments", exam_tags="UPSC,Banking,State PSC", provider="NCERT", thumbnail_emoji="📖", is_free=True),
        StudyResource(title="NCERT Class 11 Fundamentals of Physical Geography", resource_type="pdf", url="https://ncert.nic.in/textbook.php?kefg1=0-8", subject="Geography", description="Earth structure, Geomorphology, Climatology, Oceanography — UPSC GS I Geography", exam_tags="UPSC,SSC,State PSC", provider="NCERT", thumbnail_emoji="📖", is_free=True),
        StudyResource(title="NCERT Class 11 India — Physical Environment", resource_type="pdf", url="https://ncert.nic.in/textbook.php?kefg2=0-7", subject="Geography", description="India's physiography, drainage, climate, natural vegetation", exam_tags="UPSC,SSC,State PSC,Railways", provider="NCERT", thumbnail_emoji="📖", is_free=True),
        StudyResource(title="NCERT Class 12 Biology — Biotechnology & Ecology", resource_type="pdf", url="https://ncert.nic.in/textbook.php?lebo1=0-16", subject="Science & Technology", description="Biotechnology principles, Ecology and Environment — UPSC GS III S&T", exam_tags="UPSC,SSC", provider="NCERT", thumbnail_emoji="📖", is_free=True),
        # Free Standard Notes / Websites
        StudyResource(title="Insights on India — Free UPSC Study Material", resource_type="website", url="https://www.insightsonindia.com", subject="General Studies", description="Comprehensive UPSC notes, daily current affairs, Mains answer writing, test series info", exam_tags="UPSC,State PSC", provider="Insights IAS", thumbnail_emoji="🌐", is_free=True),
        StudyResource(title="Vision IAS Free Articles & Monthly CA", resource_type="website", url="https://www.visionias.in/resources/", subject="Current Affairs", description="Free monthly current affairs, PT365, Mains365, topic-wise notes", exam_tags="UPSC,State PSC", provider="Vision IAS", thumbnail_emoji="🌐", is_free=True),
        StudyResource(title="PRS India — Parliament & Bills Tracker", resource_type="website", url="https://prsindia.org", subject="Polity", description="Track all Bills in Parliament, Committee reports, state legislation — essential for UPSC GS II", exam_tags="UPSC,State PSC", provider="PRS Legislative Research", thumbnail_emoji="🌐", is_free=True),
        StudyResource(title="PIB (Press Information Bureau) — Government Schemes", resource_type="website", url="https://pib.gov.in", subject="Current Affairs", description="Official government press releases — flagship schemes, policy announcements, ministry updates", exam_tags="UPSC,SSC,Banking,Railways,State PSC", provider="Government of India", thumbnail_emoji="🌐", is_free=True),
        StudyResource(title="Economic Survey 2023-24 — Free PDF", resource_type="pdf", url="https://www.indiabudget.gov.in/economicsurvey/", subject="Economy", description="Annual economic survey — GDP growth, sector analysis, policy recommendations. Must-read for UPSC GS III & Banking", exam_tags="UPSC,Banking,State PSC", provider="Ministry of Finance", thumbnail_emoji="📄", is_free=True),
        StudyResource(title="Union Budget 2024-25 Highlights", resource_type="pdf", url="https://www.indiabudget.gov.in", subject="Economy", description="Budget speech, key allocations, new schemes — critical for all government exams", exam_tags="UPSC,SSC,Banking,State PSC", provider="Ministry of Finance", thumbnail_emoji="📄", is_free=True),
        StudyResource(title="Mrunal Economy Notes — Free", resource_type="website", url="https://mrunal.org/economy", subject="Economy", description="Simplified economy notes for UPSC CSE — Trade, Agriculture, Budget, RBI, Industry. Excellent for mains too", exam_tags="UPSC,Banking,State PSC", provider="Mrunal Patel", thumbnail_emoji="🌐", is_free=True),
        StudyResource(title="Shankar IAS Environment PDF", resource_type="pdf", url="https://www.shankarias.in/study-materials", subject="Environment", description="Most popular Environment book for UPSC — Ecology, Biodiversity, Climate Change, Environment Acts", exam_tags="UPSC,State PSC", provider="Shankar IAS Academy", thumbnail_emoji="📄", is_free=False),
        StudyResource(title="ForumIAS Free UPSC Notes", resource_type="website", url="https://forumias.com/blog/", subject="General Studies", description="Daily current affairs, GS notes, Mains answer writing resources, test series", exam_tags="UPSC,State PSC", provider="ForumIAS", thumbnail_emoji="🌐", is_free=True),
        StudyResource(title="Bankersadda Free Banking Study Material", resource_type="website", url="https://www.bankersadda.com/study-materials/", subject="Banking GK", description="Free study material for IBPS PO/Clerk, SBI PO, RBI Grade B — Banking Awareness, GK", exam_tags="Banking", provider="Adda247", thumbnail_emoji="🌐", is_free=True),
        StudyResource(title="SSC Adda Free Study Material", resource_type="website", url="https://www.sscadda.com/study-material/", subject="Quantitative Aptitude", description="Free PDFs for SSC CGL/CHSL — Maths, Reasoning, English, GK topic-wise", exam_tags="SSC", provider="Adda247", thumbnail_emoji="🌐", is_free=True),
        StudyResource(title="Oliveboard Free Mock Tests & Notes", resource_type="website", url="https://www.oliveboard.in/free-study-material/", subject="Reasoning", description="Free study notes and mock tests for SSC, Banking, Railways, Insurance exams", exam_tags="SSC,Banking,Railways,Insurance", provider="Oliveboard", thumbnail_emoji="🌐", is_free=True),
        StudyResource(title="Testbook Free Railway & SSC Notes", resource_type="website", url="https://testbook.com/blog/study-material/", subject="General Knowledge", description="Topic-wise free notes for RRB NTPC, Group D, SSC exams", exam_tags="Railways,SSC", provider="Testbook", thumbnail_emoji="🌐", is_free=True),
    ]

    # ─────────────────────────────────────────────────────────────────────────
    # 3. YOUTUBE PLAYLISTS / CHANNELS
    # ─────────────────────────────────────────────────────────────────────────
    youtube = [
        # UPSC
        StudyResource(title="StudyIQ IAS — Free UPSC Lectures", resource_type="youtube", url="https://www.youtube.com/@StudyIQ", subject="General Studies", description="Best free UPSC lectures on History, Polity, Geography, Economy, Current Affairs. Daily 1-hour sessions", exam_tags="UPSC,State PSC", provider="StudyIQ", thumbnail_emoji="▶️", is_free=True),
        StudyResource(title="Unacademy IAS — Free Prelims & Mains", resource_type="youtube", url="https://www.youtube.com/@UnacademyIAS", subject="General Studies", description="Free UPSC classes by top educators — GS Paper I-IV, Current Affairs, Answer Writing", exam_tags="UPSC", provider="Unacademy", thumbnail_emoji="▶️", is_free=True),
        StudyResource(title="BYJU'S IAS — UPSC Preparation", resource_type="youtube", url="https://www.youtube.com/@ByjusIASPreparation", subject="General Studies", description="Comprehensive UPSC preparation — History, Polity, Geography, Economy lectures", exam_tags="UPSC,State PSC", provider="BYJU'S", thumbnail_emoji="▶️", is_free=True),
        StudyResource(title="Mrunal Patel — Economy & GS for UPSC", resource_type="youtube", url="https://www.youtube.com/@MrunalPatel", subject="Economy", description="Mrunal's famous economy and GS lectures — Budget, RBI, Trade, Agriculture with simplified diagrams", exam_tags="UPSC,Banking,State PSC", provider="Mrunal Patel", thumbnail_emoji="▶️", is_free=True),
        StudyResource(title="Drishti IAS — Hindi UPSC Preparation", resource_type="youtube", url="https://www.youtube.com/@drishtiias", subject="General Studies", description="Complete UPSC preparation in Hindi — History, Geography, Polity, Economy, Environment, Current Affairs", exam_tags="UPSC,State PSC", provider="Drishti IAS", thumbnail_emoji="▶️", is_free=True),
        StudyResource(title="RSTV / Sansad TV — Government Affairs", resource_type="youtube", url="https://www.youtube.com/@sansadtv", subject="Current Affairs", description="Parliamentary debates, policy discussions, government scheme explanations — essential for UPSC current affairs", exam_tags="UPSC,State PSC", provider="Sansad TV", thumbnail_emoji="▶️", is_free=True),
        StudyResource(title="Unacademy — Ethics & Essay UPSC GS IV", resource_type="youtube", url="https://www.youtube.com/results?search_query=UPSC+GS4+Ethics+Unacademy+free", subject="Ethics", description="UPSC GS Paper IV Ethics — Case studies, Emotional Intelligence, Public Administration, Probity", exam_tags="UPSC", provider="Unacademy", thumbnail_emoji="▶️", is_free=True),
        # SSC
        StudyResource(title="StudyIQ SSC — CGL/CHSL/CPO", resource_type="youtube", url="https://www.youtube.com/@StudyIQSSC", subject="Quantitative Aptitude", description="SSC CGL, CHSL, CPO preparation — Maths, Reasoning, English, GK free lectures", exam_tags="SSC", provider="StudyIQ", thumbnail_emoji="▶️", is_free=True),
        StudyResource(title="Mahendras — SSC & Banking", resource_type="youtube", url="https://www.youtube.com/@MahendrasOfficialChannel", subject="Reasoning", description="Free classes for SSC CGL, IBPS PO/Clerk, RRB — Reasoning, Quantitative Aptitude, English", exam_tags="SSC,Banking,Railways", provider="Mahendras", thumbnail_emoji="▶️", is_free=True),
        # Banking
        StudyResource(title="Adda247 — IBPS PO, SBI PO, RBI Grade B", resource_type="youtube", url="https://www.youtube.com/@adda247", subject="Banking GK", description="Free banking exam preparation — IBPS PO, SBI PO, RBI Grade B, LIC AAO. Daily quizzes and lectures", exam_tags="Banking,Insurance", provider="Adda247", thumbnail_emoji="▶️", is_free=True),
        StudyResource(title="Oliveboard — Banking & Insurance Exams", resource_type="youtube", url="https://www.youtube.com/@OliveboardExams", subject="Banking GK", description="Free classes for IBPS, SBI, RBI, LIC, NICL — Current Affairs, Banking Awareness, GK", exam_tags="Banking,Insurance", provider="Oliveboard", thumbnail_emoji="▶️", is_free=True),
        # Railways
        StudyResource(title="StudyIQ Railways — RRB NTPC & Group D", resource_type="youtube", url="https://www.youtube.com/results?search_query=StudyIQ+RRB+NTPC+free+lectures", subject="General Knowledge", description="Free preparation for RRB NTPC, Group D, ALP — GK, Maths, Reasoning, Science", exam_tags="Railways", provider="StudyIQ", thumbnail_emoji="▶️", is_free=True),
        StudyResource(title="PW (Physics Wallah) — SSC & Railways Maths", resource_type="youtube", url="https://www.youtube.com/@PhysicsWallah", subject="Mathematics", description="Alakh Pandey's simple explanations for Maths and Science — useful for Railways, SSC, NDA", exam_tags="Railways,SSC,Defence", provider="Physics Wallah", thumbnail_emoji="▶️", is_free=True),
        # Defence
        StudyResource(title="Unacademy Defence — NDA, CDS, AFCAT", resource_type="youtube", url="https://www.youtube.com/results?search_query=Unacademy+NDA+CDS+free+2024", subject="General Knowledge", description="Free NDA, CDS, AFCAT preparation — Maths, GK, English, Current Affairs", exam_tags="Defence,UPSC", provider="Unacademy Defence", thumbnail_emoji="▶️", is_free=True),
        # Math & Reasoning (All Exams)
        StudyResource(title="Sumit Sir Maths — Tricks for All Exams", resource_type="youtube", url="https://www.youtube.com/results?search_query=Sumit+Sir+maths+tricks+government+exam", subject="Mathematics", description="Shortcut tricks for Maths — Percentage, Profit-Loss, Time-Work, Speed-Distance. For SSC, Banking, Railways", exam_tags="SSC,Banking,Railways,UPSC", provider="Various", thumbnail_emoji="▶️", is_free=True),
        StudyResource(title="English with Rani Ma'am — Grammar & Comprehension", resource_type="youtube", url="https://www.youtube.com/results?search_query=English+for+government+exam+free+classes", subject="English", description="English grammar and comprehension for all government exams — Error spotting, Fill in blanks, Reading comprehension", exam_tags="SSC,Banking,Railways,UPSC", provider="Various", thumbnail_emoji="▶️", is_free=True),
        # Khan Academy
        StudyResource(title="Khan Academy India — Free Math & Science", resource_type="youtube", url="https://www.youtube.com/@khanacademyhindi", subject="Mathematics", description="Free world-class education — Maths, Science explained simply in Hindi. Great foundation for all exams", exam_tags="SSC,Railways,Defence,Banking", provider="Khan Academy", thumbnail_emoji="▶️", is_free=True),
        # Current Affairs
        StudyResource(title="The Hindu Analysis — Daily for UPSC/SSC", resource_type="youtube", url="https://www.youtube.com/results?search_query=The+Hindu+analysis+for+UPSC+free+2024", subject="Current Affairs", description="Daily newspaper analysis of The Hindu — International affairs, Economy, Polity, Environment for UPSC", exam_tags="UPSC,Banking,SSC,State PSC", provider="Various Educators", thumbnail_emoji="▶️", is_free=True),
        # State PSC
        StudyResource(title="StudyIQ State PCS — Hindi Belt PSC Prep", resource_type="youtube", url="https://www.youtube.com/@StudyIQStatePCS", subject="General Studies", description="UPPSC, BPSC, MPPSC, MPSC preparation — state-specific GS, Current Affairs, interview guidance", exam_tags="State PSC", provider="StudyIQ", thumbnail_emoji="▶️", is_free=True),
    ]

    db.add_all(textbooks + youtube)
    db.commit()
    print(f"  [OK] Resources seeded: {len(exams)} gov exams, {len(textbooks)} textbook/website links, {len(youtube)} YouTube resources")
