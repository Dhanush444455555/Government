import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

class CourseRecommender:
    def __init__(self):
        # Catalog of government exams and specialized courses with metadata
        self.catalog = [
            {
                "id": 1,
                "title": "UPSC Civil Services Comprehensive Program",
                "category": "Civil Services",
                "level": "Advanced",
                "description": "General Studies, CSAT, Essay, Indian Polity, Modern History, Ethics and Current Affairs for IAS, IPS, IFS aspirants.",
                "keywords": "upsc civil services ias ips polity history geography current affairs administration essay graduate"
            },
            {
                "id": 2,
                "title": "State PSC Foundation Course",
                "category": "State PSC",
                "level": "Intermediate",
                "description": "State civil services preparation covering state general knowledge, revenue administration, land reforms, and state governance.",
                "keywords": "state psc sppsc mppsc uppsc state administrative service revenue officer graduate"
            },
            {
                "id": 3,
                "title": "IBPS PO & SBI PO Banking Mastery",
                "category": "Banking",
                "level": "Intermediate",
                "description": "Intensive Quantitative Aptitude, Data Interpretation, Reasoning, Banking Awareness, Financial Economics, and English Comprehension.",
                "keywords": "banking ibps po sbi po clerk quant reasoning financial awareness math aptitude speed test"
            },
            {
                "id": 4,
                "title": "RRB NTPC & Group D Railways Fastrack",
                "category": "Railways",
                "level": "Beginner",
                "description": "Railway recruitment preparation focusing on General Science (Physics, Chemistry, Biology), Mathematics, and General Awareness.",
                "keywords": "railways rrb ntpc group d science physics chemistry biology basic math 10th 12th diploma"
            },
            {
                "id": 5,
                "title": "SSC CGL & CHSL Tier-I & Tier-II Masterclass",
                "category": "Staff Selection",
                "level": "Intermediate",
                "description": "Comprehensive preparation for central government ministry positions. Quantitative aptitude, English grammar, general intelligence.",
                "keywords": "ssc cgl chsl staff selection commission central ministries auditor income tax inspector quant reasoning"
            },
            {
                "id": 6,
                "title": "NDA & CDS Defense Officer Gateway",
                "category": "Defense",
                "level": "Intermediate",
                "description": "Rigorous training for Army, Navy, and Air Force officer exams. Mathematics, General Ability Test, and SSB Interview guidance.",
                "keywords": "defense nda cds army navy air force ssb interview mathematics physical fitness leadership"
            },
            {
                "id": 7,
                "title": "CTET & State TET Teaching Certification",
                "category": "Teaching",
                "level": "Beginner",
                "description": "Child development and pedagogy, language comprehension, mathematics, and environmental studies for school teachers.",
                "keywords": "teaching ctet tet b.ed child pedagogy education school teacher primary secondary"
            },
            {
                "id": 8,
                "title": "Government IT & Technical Officer (NIC/DRDO/ISRO)",
                "category": "Engineering & IT",
                "level": "Advanced",
                "description": "Technical syllabus for Scientist B and Technical Assistant posts: Data Structures, Algorithms, DBMS, Operating Systems, C++.",
                "keywords": "engineering it computer science nic drdo isro dsa dbms os c++ algorithms scientist b btech"
            }
        ]

        self.df = pd.DataFrame(self.catalog)
        self.vectorizer = TfidfVectorizer(stop_words="english")
        self.tfidf_matrix = self.vectorizer.fit_transform(self.df["keywords"])

    def recommend(self, user_interests: str, target_sector: str = "", education_level: str = "") -> list:
        query = f"{user_interests} {target_sector} {education_level}".strip()
        if not query:
            query = "general studies aptitude"

        query_vec = self.vectorizer.transform([query])
        sim_scores = cosine_similarity(query_vec, self.tfidf_matrix).flatten()

        top_indices = sim_scores.argsort()[::-1][:4]

        recommendations = []
        for idx in top_indices:
            item = self.catalog[idx].copy()
            item["match_percentage"] = round(float(sim_scores[idx]) * 100, 1)
            if item["match_percentage"] < 10.0:
                item["match_percentage"] = 55.0 # baseline relevance
            recommendations.append(item)

        return recommendations

course_recommender = CourseRecommender()
