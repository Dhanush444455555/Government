"""
UPSC-specific seed data: Civil Service Posts, Full Syllabus, Study Strategies, Current Affairs.
Call seed_upsc_data(db) from seed_data.py
"""
from backend.app.models.upsc import CivilServicePost, UPSCSyllabusEntry, UPSCCurrentAffairsCategory, UPSCStudyStrategy


def seed_upsc_data(db):
    # Skip if already seeded
    if db.query(CivilServicePost).count() > 0:
        print("  UPSC data already seeded — skipping.")
        return

    # ─────────────────────────────────────────────────────────────────────────
    # 1. Civil Service Posts
    # ─────────────────────────────────────────────────────────────────────────
    posts = [
        CivilServicePost(
            post_name="IAS", full_name="Indian Administrative Service",
            service="All India Service", cadre="State/UT cadre",
            pay_level="Level 10–17 (₹56,100 – ₹2,25,000)",
            roles="District Collector, SDM, Secretary to State Govt, Additional Secretary/Secretary to Govt of India, Chief Secretary",
            eligibility="Age 21–32 (Gen), 21–35 (OBC), 21–37 (SC/ST). Min Graduation. Max 6 attempts (Gen), 9 (OBC), Unlimited (SC/ST)",
            posting_areas="District administration, State secretariat, Central ministries, Public sector undertakings, International organisations (on deputation)",
            prestige_rank=1, vacancy_approx="~180 per year"
        ),
        CivilServicePost(
            post_name="IFS", full_name="Indian Foreign Service",
            service="Central Service Group A", cadre="Central",
            pay_level="Level 10–17 (₹56,100 – ₹2,25,000 + Foreign Allowance)",
            roles="Third Secretary → Second Secretary → First Secretary → Counsellor → Deputy High Commissioner → Ambassador/High Commissioner",
            eligibility="Same as IAS; must have studied Physics/Chemistry/Maths/Botany/Zoology/Statistics/Geology/Anthropology/Agriculture/Economics/Commerce or any Arts subject",
            posting_areas="Indian Embassies, High Commissions, Consulates worldwide; MEA headquarters New Delhi",
            prestige_rank=2, vacancy_approx="~30–35 per year"
        ),
        CivilServicePost(
            post_name="IPS", full_name="Indian Police Service",
            service="All India Service", cadre="State cadre",
            pay_level="Level 10–17 (₹56,100 – ₹2,25,000)",
            roles="ASP → SP → SSP → DIG → IG → ADGP → DGP; Central deputation: CBI, IB, NSG, CRPF, BSF",
            eligibility="Age 21–32 (Gen), 21–35 (OBC), 21–37 (SC/ST). Min Graduation.",
            posting_areas="State Police Forces, Central Armed Police Forces, Intelligence Bureau, CBI, NSG, SPG",
            prestige_rank=3, vacancy_approx="~200 per year"
        ),
        CivilServicePost(
            post_name="IRS (IT)", full_name="Indian Revenue Service (Income Tax)",
            service="Central Service Group A", cadre="Central",
            pay_level="Level 10–15 (₹56,100 – ₹1,82,200)",
            roles="ACIT → CIT → CCIT → Pr. CCIT; Handles direct tax administration",
            eligibility="Same as IAS",
            posting_areas="Income Tax Department across India; CBDT; Ministry of Finance",
            prestige_rank=4, vacancy_approx="~60 per year"
        ),
        CivilServicePost(
            post_name="IRS (C&CE)", full_name="Indian Revenue Service (Customs & Central Excise)",
            service="Central Service Group A", cadre="Central",
            pay_level="Level 10–15 (₹56,100 – ₹1,82,200)",
            roles="Superintendent → AC → DC → Commissioner; Handles indirect taxes, GST, Customs",
            eligibility="Same as IAS",
            posting_areas="Customs houses at ports/airports, GST Commissionerates, CBIC, Ministry of Finance",
            prestige_rank=5, vacancy_approx="~55 per year"
        ),
        CivilServicePost(
            post_name="IRTS", full_name="Indian Railway Traffic Service",
            service="Central Service Group A", cadre="Railway zones",
            pay_level="Level 10–15",
            roles="Traffic Assistant → DRM → GM; Manages operations, punctuality, commercial aspects of Indian Railways",
            eligibility="Same as IAS",
            posting_areas="Railway zones across India, Railway Board",
            prestige_rank=6, vacancy_approx="~30 per year"
        ),
        CivilServicePost(
            post_name="IRAS", full_name="Indian Railway Accounts Service",
            service="Central Service Group A", cadre="Railway zones",
            pay_level="Level 10–15",
            roles="Accounts Officer → Sr. Accounts Officer → FA&CAO; Financial management of Indian Railways",
            eligibility="Same as IAS",
            posting_areas="Railway zones, Railway Board, Finance Ministry",
            prestige_rank=7, vacancy_approx="~20 per year"
        ),
        CivilServicePost(
            post_name="IPoS", full_name="Indian Postal Service",
            service="Central Service Group A", cadre="Postal circles",
            pay_level="Level 10–15",
            roles="ASP → SP → SSP → Postmaster General → Chief Postmaster General; Manages India Post",
            eligibility="Same as IAS",
            posting_areas="Postal circles across India, Department of Posts, Ministry of Communications",
            prestige_rank=8, vacancy_approx="~25 per year"
        ),
        CivilServicePost(
            post_name="IAAS", full_name="Indian Audit and Accounts Service",
            service="Central Service Group A", cadre="Central",
            pay_level="Level 10–15",
            roles="Audits government accounts; works under Comptroller and Auditor General of India",
            eligibility="Same as IAS",
            posting_areas="AG offices across states, CAG office New Delhi",
            prestige_rank=9, vacancy_approx="~15 per year"
        ),
        CivilServicePost(
            post_name="IDAS", full_name="Indian Defence Accounts Service",
            service="Central Service Group A", cadre="Central",
            pay_level="Level 10–15",
            roles="Financial management and audit of Defence expenditure",
            eligibility="Same as IAS",
            posting_areas="Defence Finance, Controller General of Defence Accounts, Ministry of Defence",
            prestige_rank=10, vacancy_approx="~15 per year"
        ),
    ]
    db.add_all(posts)

    # ─────────────────────────────────────────────────────────────────────────
    # 2. UPSC Syllabus Entries — Prelims GS Paper I
    # ─────────────────────────────────────────────────────────────────────────
    prelims_gs1 = [
        ("History", "Indian History", "Ancient India", "Indus Valley Civilisation, Vedic Age, Mahajanapadas, Mauryan Empire, Gupta Period", 8.0, "high", "NCERT Class 6-12, R.S. Sharma Ancient India"),
        ("History", "Indian History", "Medieval India", "Delhi Sultanate, Mughal Empire, Bhakti & Sufi Movement, Vijayanagara Empire, Maratha Empire", 6.0, "high", "NCERT Class 11, Satish Chandra Medieval India"),
        ("History", "Indian History", "Modern India", "British rule, 1857 Revolt, Socio-religious reforms, Freedom movement, Partition", 10.0, "high", "Spectrum Modern India by Rajiv Ahir, Bipin Chandra India's Struggle for Independence"),
        ("Polity", "Indian Polity", "Constitutional Framework", "Preamble, Fundamental Rights, Directive Principles, Fundamental Duties, Constitutional Amendments", 12.0, "high", "M. Laxmikanth Indian Polity, D.D. Basu"),
        ("Polity", "Indian Polity", "Union & State Executive", "President, PM, Council of Ministers, Governor, CM, Federal structure", 7.0, "high", "M. Laxmikanth Indian Polity"),
        ("Polity", "Indian Polity", "Legislature & Judiciary", "Parliament, State Legislatures, Supreme Court, High Courts, Constitutional bodies", 7.0, "high", "M. Laxmikanth Indian Polity"),
        ("Geography", "Indian & World Geography", "Physical Geography", "Geomorphology, Climatology, Oceanography, Biogeography", 8.0, "high", "NCERT Class 11 Physical Geography, Majid Husain"),
        ("Geography", "Indian & World Geography", "Indian Geography", "Physiography, Drainage, Climate, Soils, Natural Vegetation, Agriculture, Industries", 10.0, "high", "NCERT Class 11-12 India: Physical & Human Environment"),
        ("Economy", "Indian Economy", "Planning & Development", "Five Year Plans, NITI Aayog, Sustainable Development Goals", 5.0, "medium", "Ramesh Singh Indian Economy, Economic Survey"),
        ("Economy", "Indian Economy", "Monetary & Fiscal Policy", "RBI, Inflation, Banking system, Union Budget, Fiscal deficit, Subsidies", 8.0, "high", "Ramesh Singh Indian Economy, The Hindu Economy articles"),
        ("Economy", "Indian Economy", "Agriculture & Industry", "Green Revolution, Land reforms, MSP, Sector contributions to GDP", 5.0, "medium", "Economic Survey, PIB"),
        ("Environment", "Environment & Ecology", "Biodiversity", "Ecosystems, Biodiversity hotspots, IUCN categories, Protected areas in India", 8.0, "high", "Shankar IAS Environment, NCERT Class 12 Biology"),
        ("Environment", "Environment & Ecology", "Climate Change & Pollution", "UNFCCC, Paris Agreement, GHGs, Environmental Acts, NGT", 6.0, "high", "Shankar IAS Environment, PIB"),
        ("Science", "General Science", "Physics & Chemistry Basics", "Laws of motion, Basic chemistry, Everyday science phenomena", 4.0, "medium", "NCERT Class 8-10 Science"),
        ("Science", "General Science", "Biology & Health", "Diseases, Nutrition, Human body, Biotechnology basics", 5.0, "high", "NCERT Class 8-12 Biology"),
        ("Current Affairs", "Current Events", "National & International", "Government schemes, Awards, Sports, Summits, Recent appointments, Constitutional changes", 15.0, "high", "The Hindu, Indian Express, PIB, PRS India"),
    ]

    csat_entries = [
        ("CSAT", "CSAT Paper II", "Reading Comprehension", "Passages with comprehension questions — inferential, factual, vocabulary", 25.0, "high", "Previous Year UPSC CSAT papers, Arihant CSAT"),
        ("CSAT", "CSAT Paper II", "Logical Reasoning", "Analogies, Odd-one-out, Series completion, Coding-decoding, Blood relations", 20.0, "high", "Previous Year UPSC CSAT papers"),
        ("CSAT", "CSAT Paper II", "Quantitative Aptitude", "Percentages, Profit-Loss, Time-Work, Speed-Distance, Averages, Data Interpretation", 20.0, "high", "R.S. Aggarwal, Previous Year papers"),
        ("CSAT", "CSAT Paper II", "Data Sufficiency", "Mathematical and logical statements with sufficiency check", 10.0, "medium", "Previous Year papers"),
        ("CSAT", "CSAT Paper II", "Decision Making", "Situational analysis problems with ethical scenarios", 10.0, "medium", "Previous Year papers"),
    ]

    # Mains GS Papers
    mains_gs = [
        ("mains", "GS Paper I", "History", "Indian Heritage and Culture — Art forms, Architecture, Literature from ancient to modern", 15.0, "high", "NCERT, Nitin Singhania Indian Art and Culture"),
        ("mains", "GS Paper I", "History", "Freedom Struggle — various stages and social, economic, ideological perspectives", 20.0, "high", "Bipin Chandra India's Struggle for Independence"),
        ("mains", "GS Paper I", "History", "Post-independence India — reorganisation, Nehruvian era, Green Revolution, Emergency", 15.0, "high", "Bipin Chandra India Since Independence"),
        ("mains", "GS Paper I", "Geography", "World Geography — Physical, Social, Economic; resources and industries", 20.0, "high", "NCERT, Majid Husain Geography"),
        ("mains", "GS Paper I", "Society", "Salient Features of Indian Society, Diversity, Role of Women, Urbanisation, Communalism", 15.0, "high", "NCERT Sociology, Haralambos"),
        ("mains", "GS Paper II", "Polity", "Indian Constitution, Governance, Political Parties, Pressure Groups", 25.0, "high", "M. Laxmikanth, Sanjay Kumar"),
        ("mains", "GS Paper II", "Social Justice", "Welfare schemes, Health, Education, Poverty alleviation, Vulnerable sections", 20.0, "high", "PIB, Economic Survey"),
        ("mains", "GS Paper II", "International Relations", "India's foreign policy, Bilateral relations, International organisations (UN, WTO, IMF)", 25.0, "high", "Rajiv Sikri, Surendra Kumar, The Hindu editorials"),
        ("mains", "GS Paper III", "Economy", "Indian Economy, Planning, Mobilisation of resources, Agriculture, Food processing", 25.0, "high", "Ramesh Singh, Economic Survey"),
        ("mains", "GS Paper III", "Science & Technology", "Role in nation-building, Indigenisation, Defence technology, Space, Biotech", 20.0, "high", "NCERT, Science Reporter, PIB"),
        ("mains", "GS Paper III", "Environment", "Conservation, Environmental pollution, Disaster management, Linkages with development", 20.0, "high", "Shankar IAS Environment"),
        ("mains", "GS Paper III", "Internal Security", "Linkages of organised crime with terrorism, Border management, Cyber security", 15.0, "high", "IDSA reports, PIB"),
        ("mains", "GS Paper IV", "Ethics", "Ethics and human interface, Attitude, Aptitude, Emotional intelligence, Probity in governance", 40.0, "high", "Lexicon Ethics by Chronicle IAS, G. Subba Rao"),
        ("mains", "Essay", "Essay", "Two essays — one from Part A (abstract/philosophical) and one from Part B (socio-political-economic)", 100.0, "high", "Previous Year essays, Daily newspaper editorials"),
    ]

    syllabus_rows = []
    for s, p, sub, t, w, pri, books in prelims_gs1:
        syllabus_rows.append(UPSCSyllabusEntry(stage="prelims", paper="GS Paper I", subject=s, topic=t, subtopics=None, weightage_percent=w, priority=pri, recommended_books=books))
    for s, p, sub, t, w, pri, books in csat_entries:
        syllabus_rows.append(UPSCSyllabusEntry(stage="prelims", paper=p, subject=sub, topic=t, subtopics=None, weightage_percent=w, priority=pri, recommended_books=books))
    for stage, paper, sub, t, w, pri, books in mains_gs:
        syllabus_rows.append(UPSCSyllabusEntry(stage=stage, paper=paper, subject=sub, topic=t, subtopics=None, weightage_percent=w, priority=pri, recommended_books=books))

    db.add_all(syllabus_rows)

    # ─────────────────────────────────────────────────────────────────────────
    # 3. Study Strategies
    # ─────────────────────────────────────────────────────────────────────────
    strategies = [
        UPSCStudyStrategy(
            stage="Foundation",
            phase_months="Month 1-4",
            focus_area="NCERT & Static Subjects",
            strategy_text=(
                "Read all NCERT textbooks from Class 6-12 for History, Geography, Polity, Economics, Science & Technology. "
                "Build a strong foundation before attempting any standard reference books. "
                "Make short notes for each chapter. Avoid coaching material at this stage. "
                "Target: Complete all relevant NCERTs and start one standard reference book per subject."
            ),
            daily_hours=8.0,
            key_resources="NCERT Class 6-12 (History, Geography, Polity, Economics, Science)",
            milestones="Complete all NCERT by Month 3; Start M. Laxmikanth by Month 4"
        ),
        UPSCStudyStrategy(
            stage="Foundation",
            phase_months="Month 5-8",
            focus_area="Standard Reference Books",
            strategy_text=(
                "Deep-dive into standard books: M. Laxmikanth (Polity), Spectrum Modern India, Shankar IAS Environment, "
                "Ramesh Singh Indian Economy, Majid Husain Geography. "
                "Start following The Hindu and Indian Express daily (1-1.5 hours). "
                "Attempt UPSC Previous Year Questions (PYQ) chapter-wise to understand question patterns. "
                "Join a Current Affairs source (Insights on India / Vision IAS monthly magazine)."
            ),
            daily_hours=9.0,
            key_resources="M. Laxmikanth, Spectrum, Shankar IAS, Ramesh Singh, The Hindu",
            milestones="Complete all standard books; PYQ analysis done for all subjects"
        ),
        UPSCStudyStrategy(
            stage="Prelims",
            phase_months="Month 9-12",
            focus_area="Mock Tests & Revision",
            strategy_text=(
                "Attempt full-length Prelims mock tests weekly (both GS + CSAT). "
                "Target: 100+ questions in GS Paper I with 65%+ accuracy. "
                "Revise all static subjects at least twice. "
                "Focus heavily on Current Affairs of last 12-18 months. "
                "Do topic-wise tests for weak areas. "
                "CSAT: Ensure 33% minimum; practice Reading Comprehension daily. "
                "Avoid new topics 2 weeks before exam — only revision."
            ),
            daily_hours=10.0,
            key_resources="InsightsonIndia test series, ForumIAS, PYQ sets, Vision IAS Current Affairs",
            milestones="Weekly mocks with 65%+ accuracy; Current Affairs of 18 months complete"
        ),
        UPSCStudyStrategy(
            stage="Mains",
            phase_months="Month 1-3 after Prelims",
            focus_area="Answer Writing & GS Depth",
            strategy_text=(
                "Start Mains preparation immediately after Prelims without waiting for result. "
                "Practice answer writing daily — minimum 3 answers per day. "
                "Study GS I-IV in depth with focus on analytical writing. "
                "Ethics (GS IV): Study case studies thoroughly; practice value-based answers. "
                "Essay: Write 2 full-length essays per week on abstract and socio-political topics. "
                "Optional subject: Complete at least one reading of both papers."
            ),
            daily_hours=10.0,
            key_resources="Mrunal Economy, Baliyan's Ethics notes, Test Series (Insights/ForumIAS), PYQ Mains papers",
            milestones="500+ answers written; Optional syllabus first reading done"
        ),
        UPSCStudyStrategy(
            stage="Mains",
            phase_months="Month 4-6 after Prelims",
            focus_area="Optional Subject & Mocks",
            strategy_text=(
                "Deepen optional subject preparation — aim for 280+ marks (out of 500). "
                "Join a Mains Test Series and get answers evaluated. "
                "Current Affairs integration into Mains answers is critical. "
                "GS Paper II (Governance & IR): Link current events with constitutional provisions. "
                "GS Paper III (Economy & S&T): Focus on government schemes, economic data from Economic Survey. "
                "DAF preparation — introspect your background, interests, achievements."
            ),
            daily_hours=10.0,
            key_resources="Optional coaching notes/books, Economic Survey, ARC Reports, Mains test series",
            milestones="2 full Mains mock tests; Optional subject complete with revision"
        ),
        UPSCStudyStrategy(
            stage="Interview",
            phase_months="1-2 months before interview",
            focus_area="Personality Test Preparation",
            strategy_text=(
                "UPSC Personality Test (Interview) is 275 marks and assesses personality, not just knowledge. "
                "Thoroughly study your DAF — every word can be questioned. "
                "Know your home state deeply: geography, culture, economy, problems, government schemes. "
                "Current affairs of last 6 months — especially burning national issues. "
                "Practice mock interviews with mentors or coaching institutes. "
                "Be aware of your optional subject basics. "
                "Develop a balanced, nuanced perspective on controversial issues. "
                "Body language: confident but humble. Dress formally."
            ),
            daily_hours=8.0,
            key_resources="DAF introspection, Fake interview sessions, Current affairs, State-specific knowledge",
            milestones="5+ mock interviews done; DAF preparation complete; Current affairs up to date"
        ),
    ]
    db.add_all(strategies)

    # ─────────────────────────────────────────────────────────────────────────
    # 4. Current Affairs Categories
    # ─────────────────────────────────────────────────────────────────────────
    ca_items = [
        # Economy
        ("Economy", "Union Budget Analysis", "Annual budget — revenue/capital expenditure, fiscal deficit, key announcements, sector allocations", "high", "PIB, Ministry of Finance"),
        ("Economy", "RBI Monetary Policy", "Repo rate, Reverse Repo, CRR, SLR changes; Inflation targeting; MPC decisions", "high", "RBI.org.in, Economic Survey"),
        ("Economy", "Economic Survey", "Government's annual economic review: GDP growth, sectoral performance, policy recommendations", "high", "Ministry of Finance, PRS India"),
        ("Economy", "Global Indices & Rankings", "Ease of Doing Business, Global Hunger Index, Human Development Index, Press Freedom Index, Corruption Perceptions Index", "high", "World Bank, UNDP, Transparency International"),
        ("Economy", "Government Flagship Schemes", "PM-KISAN, Ayushman Bharat, Pradhan Mantri Awas Yojana, Make in India, PLI Scheme updates", "high", "PIB, MyScheme.gov.in"),
        # Polity & Governance
        ("Polity & Governance", "Constitutional Amendments", "Recent amendments, their implications for governance and rights", "high", "PRS India, Loksabha.nic.in"),
        ("Polity & Governance", "Supreme Court Landmark Judgments", "Important SC rulings on fundamental rights, environment, criminal law", "high", "LiveLaw, Bar & Bench, SC website"),
        ("Polity & Governance", "Election Commission & Elections", "Model Code of Conduct, State elections results, Electoral reforms", "high", "ECI website, The Hindu"),
        ("Polity & Governance", "Parliamentary Proceedings", "Bills passed, Question Hour highlights, Parliamentary Committees reports", "high", "PRS India, Loksabha.nic.in"),
        # Environment
        ("Environment", "Climate Change Summits", "COP meetings, NDC updates, Net Zero commitments, Green Finance", "high", "UNFCCC, Ministry of Environment"),
        ("Environment", "Species & Protected Areas", "New species discovered, Wildlife sanctuaries/NPs added, IUCN status changes", "high", "MoEFCC, WWF India"),
        ("Environment", "Disaster Events & Management", "Cyclones, Floods, Earthquakes — NDMA response, lessons for governance", "high", "NDMA.gov.in, IMD"),
        # International Relations
        ("International Relations", "India-US Relations", "Strategic partnerships, Defence deals, Trade disputes, Technology transfers", "high", "MEA, The Hindu, Indian Express"),
        ("International Relations", "India-China Border", "LAC disputes, Galwan valley, Doklam, border infrastructure development", "high", "IDSA, Manohar Parrikar IDS"),
        ("International Relations", "India-Pakistan Relations", "LoC situation, SAARC, Trade status, People-to-people contact", "medium", "MEA, IDSA"),
        ("International Relations", "BRICS, SCO, G20, Quad", "India's role in multilateral forums, key outcomes of summits", "high", "MEA, Ministry of External Affairs"),
        # Science & Technology
        ("Science & Technology", "ISRO Space Missions", "Chandrayaan, Gaganyaan, PSLV/GSLV launches, OneWeb deployment", "high", "ISRO.gov.in, PIB"),
        ("Science & Technology", "Defence R&D", "DRDO projects, Tejas, INS vessels commissioned, Agni/BrahMos tests", "high", "PIB, Ministry of Defence"),
        ("Science & Technology", "AI & Digital India", "Digital India milestones, UPI achievements, National AI strategy, Data Protection Bill", "high", "MeitY, PIB"),
        # Social Issues
        ("Social Issues", "Education Policy", "NEP 2020 implementation, Digital education initiatives, School/College enrollment", "high", "Ministry of Education, PIB"),
        ("Social Issues", "Health & Pandemic Preparedness", "Disease outbreaks, Universal Health Coverage, Ayushman Bharat progress", "high", "Ministry of Health, WHO India"),
        ("Social Issues", "Women & Child Development", "Women safety laws, Beti Bachao Beti Padhao, Child nutrition schemes", "high", "WCD Ministry, NFHS data"),
    ]
    ca_rows = [
        UPSCCurrentAffairsCategory(category=cat, topic=topic, description=desc, relevance=rel, source_suggestion=src)
        for cat, topic, desc, rel, src in ca_items
    ]
    db.add_all(ca_rows)

    db.commit()
    print(f"  [OK] UPSC data seeded: {len(posts)} posts, {len(syllabus_rows)} syllabus entries, {len(strategies)} strategies, {len(ca_rows)} CA categories")
