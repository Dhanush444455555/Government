import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, context } = body;

    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    let reply = "";
    const lowerMsg = message.toLowerCase();

    // Context-sensitive greeting
    if (!context && (lowerMsg.includes("hello") || lowerMsg.includes("hi"))) {
      reply = "Hello! I am your **AI Exam Guide**. Need help with UPSC, SSC, or Banking exams?";
    }

    // Quiz Logic
    else if (lowerMsg.includes("quiz") || lowerMsg.includes("test me")) {
      const questions = [
        "Which article of the Indian Constitution deals with **Untouchability**?\n\nA) Article 16\nB) Article 17\nC) Article 18\nD) Article 21",
        "Who was the *Viceroy of India* during the **Partition of Bengal (1905)**?\n\nA) Lord Curzon\nB) Lord Dalhousie\nC) Lord Canning\nD) Lord Rippon",
        "What is the chemical formula for **Baking Soda**?\n\nA) Na2CO3\nB) NaHCO3\nC) NaCl\nD) NaOH"
      ];
      const randomQ = questions[Math.floor(Math.random() * questions.length)];
      reply = `Here is a practice question for you:\n\n${randomQ}`;
    }

    // Answer Evaluation (Mock)
    else if (lowerMsg === "b" || lowerMsg.includes("option b")) {
      reply = "✅ **Correct!** Great job.\n\n*Explanation:* Article 17 abolishes 'untouchability' and forbids its practice in any form. \n\nWant another one?";
    }
    else if (["a", "c", "d"].includes(lowerMsg) || lowerMsg.includes("option")) {
      reply = "❌ **Incorrect.** Try again! (Hint: It relates to fundamental rights against exploitation/equality).";
    }

    // Syllabus & Info (Markdown Enhanced)
    else if (lowerMsg.includes("syllabus")) {
      reply = `### Syllabus Overview for **${context || 'Government Exams'}**\n\n1. **General Studies**: History, Geography, Polity, Economics.\n2. **Aptitude**: Quantitative, Reasoning, Data Interpretation.\n3. **Current Affairs**: National & International events.\n\n> *Tip: Focus on NCERTs for basics!*`;
    }

    // Default Fallback
    else {
      reply = `I can help you with:\n- **Syllabus & Strategy**\n- **Topic Explanations**\n- **Mock Quizzes**\n\nJust type *"Quiz me"* to start a quick test, or ask me about any topic like *"Explain inflation"*!`;
    }

    return NextResponse.json({ reply });

  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', reply: "I'm having a bit of trouble thinking right now. Please try again." },
      { status: 500 }
    );
  }
}