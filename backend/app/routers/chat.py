from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
import re

router = APIRouter(prefix="/chat", tags=["AI Chatbot"])

class ChatRequest(BaseModel):
    message: str
    sessionId: Optional[str] = None

class ChatResponse(BaseModel):
    message: str
    sessionId: str

def generate_ai_guidance_reply(prompt: str) -> str:
    p = prompt.lower()

    if "upsc" in p or "ias" in p or "ips" in p:
        return (
            "🌟 **UPSC Civil Services Preparation Strategy:**\n\n"
            "1. **Foundations (Months 1-3):** Master NCERT textbooks (Class 6-12) for History, Geography, Polity, and Economics.\n"
            "2. **Standard Core Books (Months 4-8):** Indian Polity by M. Laxmikanth, Modern History by Spectrum/Bipin Chandra, Geography by GC Leong, Economy by Ramesh Singh or Nitin Singhania.\n"
            "3. **Current Affairs:** Read *The Hindu* or *The Indian Express* daily, coupled with monthly compilations.\n"
            "4. **Prelims Focus:** Solve at least 40+ mock tests and 10 years of UPSC PYQs (Previous Year Questions).\n"
            "5. **Mains Answer Writing:** Start daily answer writing practice early for GS Papers 1 to 4 and your optional subject."
        )
    elif "bank" in p or "sbi" in p or "ibps" in p or "rbi" in p:
        return (
            "🏦 **Banking Exams Strategy (SBI PO / IBPS PO / Clerk / RBI):**\n\n"
            "1. **Quantitative Aptitude:** Master speed math shortcuts (Vedic math, tables up to 30, squares up to 50, cubes up to 30, fraction-to-percentage conversions). High weightage: Data Interpretation (DI), Arithmetic (Profit & Loss, SI/CI, Time & Work).\n"
            "2. **Reasoning Ability:** Practice 5-10 Puzzles and Seating Arrangement sets daily. Master Syllogisms, Inequalities, and Coding-Decoding.\n"
            "3. **General & Banking Awareness:** Read daily banking news, RBI monetary policy rates (Repo, Reverse Repo, CRR, SLR), and schemes like PMJDY, Mudra, etc.\n"
            "4. **Mock Tests:** Take timed sectional tests. Accuracy > Speed in banking preliminary cutoffs."
        )
    elif "ssc" in p or "cgl" in p or "chsl" in p:
        return (
            "🎯 **SSC CGL / CHSL Preparation Blueprint:**\n\n"
            "1. **Maths (Quant):** Cover Advanced Maths (Algebra, Geometry, Trigonometry, Mensuration) and Arithmetic. Previous year questions (PYQs) repeat extensively.\n"
            "2. **English Language:** Focus on Neetu Singh Vol 1 for grammar rules. Learn 20 idioms and one-word substitutions daily from Black Book.\n"
            "3. **General Intelligence:** High scoring section. Aim for 45+ marks out of 50 through regular mock drills.\n"
            "4. **General Awareness:** Focus on Static GK (Dances, Festivals, National Parks, Rivers, Articles) and Science."
        )
    elif "railway" in p or "rrb" in p or "ntpc" in p:
        return (
            "🚆 **Railway Recruitment (RRB NTPC & Group D):**\n\n"
            "1. **General Science:** NCERT Class 9 & 10 Science carries massive weightage in Railways.\n"
            "2. **Mathematics:** Focus on basic arithmetic, number systems, BODMAS, and basic statistics (mean, median, mode).\n"
            "3. **General Awareness:** Current affairs of the past 12 months, Railway history, budget allocations, and major infrastructure projects."
        )
    elif "study schedule" in p or "schedule" in p or "routine" in p or "time management" in p:
        return (
            "⏰ **Recommended 8-Hour Study Schedule for Working / Full-Time Aspirants:**\n\n"
            "• **06:00 AM - 08:00 AM (2 hrs):** Newspaper Analysis & Daily Current Affairs notes.\n"
            "• **09:30 AM - 12:30 PM (3 hrs):** Core Subject Study (Polity / History / Economics - theory & conceptual reading).\n"
            "• **02:30 PM - 04:30 PM (2 hrs):** Aptitude / Quantitative practice or GS Mains Answer Writing.\n"
            "• **05:30 PM - 06:30 PM (1 hr):** Timed Sectional Mock Test & instant error analysis.\n"
            "• **09:00 PM - 10:00 PM (1 hr):** Active Recall & Day's Revision before bed."
        )
    elif "job" in p or "career" in p or "option" in p or "employment" in p:
        return (
            "💼 **Top Career Paths in the Government Sector:**\n\n"
            "1. **Civil Services (UPSC CSE):** IAS, IPS, IFS, IRS, IAAS - policy making, district administration, foreign diplomacy.\n"
            "2. **Public Sector Banks:** Probationary Officer (SBI, PNB, BOB) with rapid promotions, housing loans, and executive perks.\n"
            "3. **Staff Selection Commission (SSC):** Income Tax Inspector, Central Excise / GST Inspector, CBI Sub-Inspector, Ministry Assistants (MEA, CSS).\n"
            "4. **Defense & Paramilitary:** NDA, CDS, AFCAT, CAPF (AC) - prestigious uniform services.\n"
            "5. **State Administrative Services (State PSCs):** Deputy Collector (DSP / BDO / Tehsildar)."
        )
    else:
        return (
            f"Hello! I am your **GovGuide AI Assistant**. I can help you with:\n\n"
            "• **Custom Study Roadmaps:** Tailored for UPSC CSE, SSC CGL, Banking (SBI/IBPS), Railways, and Defense.\n"
            "• **Syllabus & Material Recommendations:** Best books, NCERT guides, and standard notes.\n"
            "• **Mock Test Analytics & Score Boosters:** Targeted methods to crack preliminary & mains cutoffs.\n"
            "• **Government Job Alerts & Eligibility:** Clear guidance on age limits, qualifications, and exam stages.\n\n"
            "Feel free to ask a specific question about your target exam, daily study routine, or career goals!"
        )

@router.post("")
@router.post("/")
def chat_with_ai(req: ChatRequest):
    reply = generate_ai_guidance_reply(req.message)
    session_id = req.sessionId or "session_default"
    return ChatResponse(message=reply, sessionId=session_id)

