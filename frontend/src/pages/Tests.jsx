import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Award, CheckCircle2, AlertCircle, Play, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';

export default function Tests() {
  const navigate = useNavigate();
  const [tests, setTests] = useState([]);
  const [activeTest, setActiveTest] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  const fallbackTests = [
    {
      id: 1,
      title: "UPSC Civil Services Prelims General Studies Mock Test",
      category: "Civil Services",
      duration: 20,
      total_marks: 200,
      difficulty: "Hard",
      questions: [
        {
          id: 1,
          question: "Which Article of the Indian Constitution empowers the President to grant pardons?",
          options: ["Article 72", "Article 161", "Article 123", "Article 143"],
          answer: "Article 72",
          explanation: "Article 72 empowers the President of India to grant pardons, reprieves, respites, or remissions of punishment."
        },
        {
          id: 2,
          question: "The concept of 'Basic Structure' of the Indian Constitution was propounded in which landmark case?",
          options: ["Golaknath Case (1967)", "Kesavananda Bharati Case (1973)", "Minerva Mills Case (1980)", "Maneka Gandhi Case (1978)"],
          answer: "Kesavananda Bharati Case (1973)",
          explanation: "The doctrine of Basic Structure was laid down by the 13-judge constitutional bench in Kesavananda Bharati v. State of Kerala (1973)."
        },
        {
          id: 3,
          question: "Which of the following passes connects Srinagar with Leh?",
          options: ["Zoji La Pass", "Shipki La", "Nathu La", "Bara-lacha La"],
          answer: "Zoji La Pass",
          explanation: "Zoji La is a high mountain pass in the Himalayas connecting Srinagar to Leh in Ladakh."
        },
        {
          id: 4,
          question: "Who was the Viceroy of India during the Partition of Bengal in 1905?",
          options: ["Lord Curzon", "Lord Ripon", "Lord Minto", "Lord Chelmsford"],
          answer: "Lord Curzon",
          explanation: "Lord Curzon promulgated the partition of the province of Bengal in 1905."
        }
      ]
    },
    {
      id: 2,
      title: "SSC CGL Tier 1 Quantitative Aptitude Sprint Test",
      category: "Staff Selection",
      duration: 15,
      total_marks: 100,
      difficulty: "Medium",
      questions: [
        {
          id: 101,
          question: "If a + b + c = 0, what is the value of (a³ + b³ + c³) / (3abc)?",
          options: ["0", "1", "3", "-1"],
          answer: "1",
          explanation: "Since a + b + c = 0 implies a³ + b³ + c³ = 3abc, dividing by 3abc yields 1."
        },
        {
          id: 102,
          question: "A sum doubles in 5 years at Simple Interest. In how many years will it become 4 times?",
          options: ["10 years", "12 years", "15 years", "20 years"],
          answer: "15 years",
          explanation: "At SI, to become 4 times requires 3P interest. Each P takes 5 years, so 3 * 5 = 15 years."
        }
      ]
    },
    {
      id: 3,
      title: "SBI PO Preliminary Banking Awareness & Speed Drill",
      category: "Banking",
      duration: 15,
      total_marks: 100,
      difficulty: "Medium",
      questions: [
        {
          id: 201,
          question: "What is the primary objective of the Reserve Bank of India's Monetary Policy Framework?",
          options: ["Price Stability while keeping in mind growth", "Maximizing Bank Profits", "Fixing Exchange Rates", "Printing maximum currency notes"],
          answer: "Price Stability while keeping in mind growth",
          explanation: "Under the RBI Act 1934, the primary objective is maintaining price stability while keeping in mind the objective of growth."
        }
      ]
    }
  ];

  useEffect(() => {
    async function fetchTests() {
      try {
        const res = await api.get('/mock-tests');
        if (res.data && res.data.length > 0) {
          // Parse questions_json if string
          const parsed = res.data.map(t => ({
            ...t,
            duration: t.duration_minutes || 20,
            questions: typeof t.questions_json === 'string' ? JSON.parse(t.questions_json) : (t.questions || fallbackTests[0].questions)
          }));
          setTests(parsed);
        } else {
          setTests(fallbackTests);
        }
      } catch (e) {
        setTests(fallbackTests);
      } finally {
        setLoading(false);
      }
    }
    fetchTests();
  }, []);

  const handleSelectAnswer = (qId, option) => {
    if (submitted) return;
    setUserAnswers((prev) => ({ ...prev, [qId]: option }));
  };

  const calculateScore = () => {
    if (!activeTest) return 0;
    let score = 0;
    activeTest.questions.forEach((q) => {
      if (userAnswers[q.id] === q.answer) {
        score++;
      }
    });
    return score;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => {
            if (activeTest) {
              setActiveTest(null);
            } else {
              navigate('/guidance');
            }
          }}
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> {activeTest ? "Back to All Tests" : "Back to Guidance Center"}
        </button>

        {!activeTest ? (
          <div>
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs font-bold uppercase tracking-wider mb-4">
                <Award className="w-4 h-4" />
                Live Real-Time CBT Portal
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-white mb-3">
                Live Government Mock Tests
              </h1>
              <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
                Full-length simulations with real exam interfaces, negative marking, timer tracking, and instant score solutions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tests.map((test) => (
                <div
                  key={test.id}
                  className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between hover:border-slate-700 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 rounded-full bg-blue-500/20 text-cyan-300 text-[10px] font-bold uppercase tracking-wider">
                        {test.category || "CBT Exam"}
                      </span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                        {test.difficulty || "Medium"}
                      </span>
                    </div>

                    <h3 className="font-bold text-lg text-white mb-2">{test.title}</h3>

                    <div className="flex items-center gap-4 text-xs text-slate-400 mb-6">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {test.duration} mins
                      </span>
                      <span>•</span>
                      <span>{test.questions ? test.questions.length : 5} questions</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setActiveTest(test);
                      setCurrentIdx(0);
                      setUserAnswers({});
                      setSubmitted(false);
                    }}
                    className="w-full py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all"
                  >
                    <Play className="w-4 h-4" /> Start Mock Test
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Active Test Runner */
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 mb-6 gap-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                  {activeTest.category} CBT
                </span>
                <h2 className="text-xl font-bold text-white">{activeTest.title}</h2>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold flex items-center gap-1.5 border border-slate-700">
                  <Clock className="w-3.5 h-3.5 text-yellow-400" />
                  {activeTest.duration} Minutes
                </span>
              </div>
            </div>

            {activeTest.questions && activeTest.questions[currentIdx] && (
              <div className="space-y-6">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Question {currentIdx + 1} of {activeTest.questions.length}</span>
                  <span>Marks: +2.0 / -0.66</span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
                  {activeTest.questions[currentIdx].question}
                </h3>

                {/* Options */}
                <div className="space-y-3">
                  {activeTest.questions[currentIdx].options.map((opt, i) => {
                    const qId = activeTest.questions[currentIdx].id;
                    const isSelected = userAnswers[qId] === opt;
                    const isCorrect = activeTest.questions[currentIdx].answer === opt;

                    let style = "bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700";
                    if (isSelected && !submitted) {
                      style = "bg-blue-900/40 border-blue-500 text-white shadow-md";
                    } else if (submitted) {
                      if (isCorrect) {
                        style = "bg-emerald-950/60 border-emerald-500 text-emerald-200 font-bold";
                      } else if (isSelected && !isCorrect) {
                        style = "bg-red-950/60 border-red-500 text-red-200 line-through";
                      }
                    }

                    return (
                      <button
                        key={i}
                        onClick={() => handleSelectAnswer(qId, opt)}
                        className={`w-full p-4 rounded-2xl border text-left text-sm font-medium transition-all flex items-center justify-between ${style}`}
                      >
                        <span>{opt}</span>
                        {submitted && isCorrect && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {submitted && (
                  <div className="p-4 rounded-2xl bg-blue-950/50 border border-blue-500/40 text-xs text-blue-200 leading-relaxed">
                    <strong className="block text-cyan-300 mb-1">Explanation & Syllabus Anchor:</strong>
                    {activeTest.questions[currentIdx].explanation}
                  </div>
                )}

                {/* Bottom Navigation */}
                <div className="flex items-center justify-between pt-6 border-t border-slate-800">
                  <button
                    onClick={() => setCurrentIdx((p) => Math.max(0, p - 1))}
                    disabled={currentIdx === 0}
                    className="px-5 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-xs font-bold disabled:opacity-40"
                  >
                    Previous
                  </button>

                  {currentIdx < activeTest.questions.length - 1 ? (
                    <button
                      onClick={() => setCurrentIdx((p) => p + 1)}
                      className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
                    >
                      Next Question
                    </button>
                  ) : !submitted ? (
                    <button
                      onClick={() => setSubmitted(true)}
                      className="px-7 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-lg shadow-emerald-600/30"
                    >
                      Submit Exam
                    </button>
                  ) : (
                    <div className="text-sm font-bold text-cyan-300">
                      Final Score: {calculateScore()} / {activeTest.questions.length} (
                      {Math.round((calculateScore() / activeTest.questions.length) * 100)}%)
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

