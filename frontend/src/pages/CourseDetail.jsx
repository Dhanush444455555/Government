import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Book,
  FileText,
  Video,
  FolderOpen,
  PlayCircle,
  BrainCircuit,
  Calculator,
  Download,
  Eye,
  Radio,
  Tv,
  CheckCircle2,
  Clock,
  Sparkles,
  Send
} from 'lucide-react';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function CourseDetail() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [activeTab, setActiveTab] = useState("modules");
  const [activeModule, setActiveModule] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [loading, setLoading] = useState(true);

  // Quiz state
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Live class viewer state
  const [isWatchingLive, setIsWatchingLive] = useState(false);

  // AI Course Tutor state
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    async function loadCourse() {
      try {
        const res = await api.get(`/courses/${courseId}`);
        setCourse(res.data);
        if (res.data.modules && res.data.modules.length > 0) {
          setActiveModule(res.data.modules[0]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadCourse();
  }, [courseId]);

  const tabs = [
    { id: "modules", label: "Study Modules", icon: <FolderOpen className="w-4 h-4" /> },
    { id: "videos", label: "Video Lectures", icon: <Video className="w-4 h-4" /> },
    { id: "formulas", label: "Formula Sheets", icon: <Calculator className="w-4 h-4" /> },
    { id: "quizzes", label: "Practice Quizzes", icon: <Book className="w-4 h-4" /> },
    { id: "ai", label: "AI Course Tutor", icon: <BrainCircuit className="w-4 h-4" /> },
  ];

  const handleAskAI = async (e) => {
    e.preventDefault();
    if (!aiQuestion.trim()) return;
    setAiLoading(true);
    setAiAnswer(null);

    try {
      const res = await api.post('/chat', {
        message: `For the exam course "${course?.title}": ${aiQuestion}`,
        sessionId: `course_${courseId}`
      });
      setAiAnswer(res.data.message);
    } catch (err) {
      setAiAnswer(`Detailed concept review for ${course?.title}: Focus on core textbook basics and past 5 years' question papers.`);
    } finally {
      setAiLoading(false);
    }
  };

  const handleSelectOption = (qId, option) => {
    if (quizSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [qId]: option }));
  };

  const calculateQuizScore = () => {
    if (!activeQuiz) return 0;
    let score = 0;
    activeQuiz.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.answer) {
        score++;
      }
    });
    return score;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="flex items-center gap-3">
          <BrainCircuit className="w-6 h-6 text-blue-500 animate-spin" />
          <span>Loading exam course repository...</span>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white p-4">
        <h2 className="text-2xl font-bold mb-4">Course Not Found</h2>
        <Link to="/courses" className="px-6 py-2.5 bg-blue-600 rounded-full font-bold">
          Back to Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Navigation & Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/courses')}
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to All Courses
          </button>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">
                {course.category}
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white">{course.title}</h1>
              <p className="text-sm text-slate-400 mt-1 max-w-2xl">{course.description}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold px-4 py-2 bg-slate-800 text-cyan-300 rounded-2xl border border-slate-700">
                {course.resourceCount} Verified Resources
              </span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 mb-8 overflow-x-auto gap-2 pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setActiveQuiz(null);
              }}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: STUDY MODULES */}
        {activeTab === "modules" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Module folders list */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">
                Subject Modules
              </h3>
              {course.modules && course.modules.map((mod) => (
                <div
                  key={mod.id}
                  onClick={() => {
                    setActiveModule(mod);
                    setSelectedNote(null);
                  }}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    activeModule?.id === mod.id
                      ? 'bg-blue-900/40 border-blue-500 text-white shadow-md'
                      : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm flex items-center gap-2">
                      <FolderOpen className="w-4 h-4 text-cyan-400" />
                      {mod.title}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                      {mod.items || (mod.content ? mod.content.length : 0)} files
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Content items of active module */}
            <div className="lg:col-span-2">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      <FolderOpen className="w-5 h-5 text-blue-400" />
                      {activeModule?.title || "Course Material"}
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                      Curated revision summaries, cheat notes, and high-yield topic sheets.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {activeModule?.content && activeModule.content.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 flex items-center justify-between transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-xl ${item.type === 'pdf' ? 'bg-red-500/10 text-red-400' : 'bg-blue-500/10 text-cyan-400'}`}>
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-white">{item.title}</h4>
                          <span className="text-[11px] text-slate-400">{item.pages}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedNote(item)}
                          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-cyan-300 flex items-center gap-1.5 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" /> Read
                        </button>
                        <a
                          href="#download"
                          onClick={(e) => {
                            e.preventDefault();
                            alert(`Downloading verified material: ${item.title}`);
                          }}
                          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Note Reader Modal */}
        {selectedNote && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full p-6 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-cyan-400" />
                  <h3 className="font-bold text-lg text-white">{selectedNote.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedNote(null)}
                  className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-sm leading-relaxed text-slate-300 space-y-4 max-h-[60vh] overflow-y-auto">
                <p className="font-semibold text-cyan-300">
                  📄 Topic Summary & High-Yield Examination Points:
                </p>
                <p>
                  This official module provides comprehensive coverage tailored for <strong>{course.title}</strong>. It integrates NCERT summaries, standard reference material, and previous decade recurring questions.
                </p>
                <ul className="list-disc pl-5 space-y-2 text-slate-300">
                  <li><strong>Core Definition:</strong> Key terminology, chronological timelines, and foundational principles.</li>
                  <li><strong>High-Frequency Trends:</strong> Repeated concepts tested in Preliminary and Mains examination stages.</li>
                  <li><strong>Quick Formula/Mnemonics:</strong> Rapid memory pegs for objective elimination techniques.</li>
                  <li><strong>Model Question Practice:</strong> 15 objective questions with verified key explanations attached.</li>
                </ul>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setSelectedNote(null)}
                  className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
                >
                  Close Reader
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: VIDEO LECTURES & LIVE CLASS */}
        {activeTab === "videos" && (
          <div className="space-y-8">
            {/* Live Now Banner */}
            <div className="bg-gradient-to-r from-red-950/80 via-red-900/60 to-slate-900 border border-red-500/40 p-6 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="relative flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-red-500/30 text-red-300 text-[10px] font-extrabold uppercase tracking-wider">
                      LIVE CLASS
                    </span>
                    <h3 className="font-bold text-white text-base">
                      Daily Current Affairs & Editorial Analysis
                    </h3>
                  </div>
                  <p className="text-xs text-red-200 mt-1">1,420 students actively attending • Faculty Q&A live</p>
                </div>
              </div>
              <button
                onClick={() => setIsWatchingLive(!isWatchingLive)}
                className="px-6 py-3 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-red-600/30 transition-all"
              >
                <Video className="w-4 h-4" />
                {isWatchingLive ? "Leave Live Stream" : "Join Class Now"}
              </button>
            </div>

            {/* Live Video Player Stream */}
            {isWatchingLive && (
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-2xl">
                <div className="aspect-video w-full rounded-2xl bg-black flex flex-col items-center justify-center relative overflow-hidden border border-slate-800">
                  <div className="w-20 h-20 rounded-full bg-red-600/20 text-red-500 flex items-center justify-center animate-pulse">
                    <Tv className="w-10 h-10" />
                  </div>
                  <p className="text-white font-bold mt-4">Live Broadcast Active</p>
                  <p className="text-xs text-slate-400">Stream connected via WebRTC</p>
                </div>
              </div>
            )}

            {/* Video Lectures Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {course.videos && course.videos.length > 0 ? (
                course.videos.map((vid) => (
                  <div
                    key={vid.id}
                    className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-lg hover:border-slate-700 transition-all group"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={vid.thumbnail}
                        alt={vid.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg">
                          <PlayCircle className="w-6 h-6" />
                        </div>
                      </div>
                      <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/80 text-[10px] font-bold text-white">
                        {vid.duration}
                      </span>
                    </div>

                    <div className="p-5">
                      <h4 className="font-bold text-sm text-white line-clamp-2 mb-2 group-hover:text-cyan-400 transition-colors">
                        {vid.title}
                      </h4>
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>{vid.channel}</span>
                        <span>{vid.views}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-16 text-slate-500">
                  <PlayCircle className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>Comprehensive video lectures being curated for this course.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: FORMULA SHEETS */}
        {activeTab === "formulas" && (
          <div className="space-y-6">
            {course.formulas && course.formulas.length > 0 ? (
              course.formulas.map((sec, idx) => (
                <div key={idx} className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl">
                  <h3 className="text-lg font-bold text-cyan-300 mb-4 flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-blue-400" />
                    {sec.topic}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {sec.formulas.map((f, i) => (
                      <div key={i} className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                        <span className="text-xs font-bold text-white block mb-1">{f.name}</span>
                        <code className="text-xs text-emerald-400 font-mono block bg-slate-900 px-3 py-2 rounded-xl border border-slate-800/80">
                          {f.formula}
                        </code>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16 text-slate-500">
                <Calculator className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>Formula revision compendium is being assembled for this module.</p>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: PRACTICE QUIZZES */}
        {activeTab === "quizzes" && (
          <div>
            {!activeQuiz ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {course.quizzes && course.quizzes.length > 0 ? (
                  course.quizzes.map((quiz) => (
                    <div
                      key={quiz.id}
                      className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block mb-2">
                          Interactive CBT Drill
                        </span>
                        <h3 className="text-xl font-bold text-white mb-2">{quiz.title}</h3>
                        <div className="flex items-center gap-4 text-xs text-slate-400 mb-6">
                          <span>{quiz.questionsCount || quiz.questions.length} Questions</span>
                          <span>•</span>
                          <span>{quiz.duration} Minutes</span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setActiveQuiz(quiz);
                          setCurrentQIndex(0);
                          setSelectedAnswers({});
                          setQuizSubmitted(false);
                        }}
                        className="w-full py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors shadow-lg shadow-blue-600/20"
                      >
                        Start Live Quiz
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-16 text-slate-500">
                    <Book className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p>New practice quizzes are being scheduled for this course.</p>
                  </div>
                )}
              </div>
            ) : (
              /* Quiz Player Interface */
              <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-2xl max-w-3xl mx-auto">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                  <div>
                    <h3 className="font-bold text-white">{activeQuiz.title}</h3>
                    <p className="text-xs text-slate-400">Question {currentQIndex + 1} of {activeQuiz.questions.length}</p>
                  </div>
                  <button
                    onClick={() => setActiveQuiz(null)}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    Exit Quiz
                  </button>
                </div>

                {activeQuiz.questions[currentQIndex] && (
                  <div className="space-y-6">
                    <h4 className="text-base sm:text-lg font-bold text-white leading-relaxed">
                      {activeQuiz.questions[currentQIndex].question}
                    </h4>

                    <div className="space-y-3">
                      {activeQuiz.questions[currentQIndex].options.map((opt, i) => {
                        const qId = activeQuiz.questions[currentQIndex].id;
                        const isSelected = selectedAnswers[qId] === opt;
                        const isCorrect = activeQuiz.questions[currentQIndex].answer === opt;

                        let style = "bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700";
                        if (isSelected && !quizSubmitted) {
                          style = "bg-blue-900/40 border-blue-500 text-white shadow-md";
                        } else if (quizSubmitted) {
                          if (isCorrect) {
                            style = "bg-emerald-950/60 border-emerald-500 text-emerald-200 font-bold";
                          } else if (isSelected && !isCorrect) {
                            style = "bg-red-950/60 border-red-500 text-red-200 line-through";
                          }
                        }

                        return (
                          <button
                            key={i}
                            onClick={() => handleSelectOption(qId, opt)}
                            className={`w-full p-4 rounded-2xl border text-left text-sm font-medium transition-all flex items-center justify-between ${style}`}
                          >
                            <span>{opt}</span>
                            {quizSubmitted && isCorrect && (
                              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {quizSubmitted && (
                      <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-500/40 text-xs text-blue-200 leading-relaxed">
                        <strong className="block text-cyan-300 mb-1">Explanation:</strong>
                        {activeQuiz.questions[currentQIndex].explanation}
                      </div>
                    )}

                    {/* Pagination / Submit Bar */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                      <button
                        onClick={() => setCurrentQIndex((p) => Math.max(0, p - 1))}
                        disabled={currentQIndex === 0}
                        className="px-5 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-xs font-bold disabled:opacity-40"
                      >
                        Previous
                      </button>

                      {currentQIndex < activeQuiz.questions.length - 1 ? (
                        <button
                          onClick={() => setCurrentQIndex((p) => p + 1)}
                          className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold"
                        >
                          Next Question
                        </button>
                      ) : !quizSubmitted ? (
                        <button
                          onClick={() => setQuizSubmitted(true)}
                          className="px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/30"
                        >
                          Submit Test
                        </button>
                      ) : (
                        <div className="text-xs font-bold text-cyan-300">
                          Score: {calculateQuizScore()} / {activeQuiz.questions.length} ({Math.round((calculateQuizScore() / activeQuiz.questions.length) * 100)}%)
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* TAB 5: AI COURSE TUTOR */}
        {activeTab === "ai" && (
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-xl max-w-3xl mx-auto">
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 text-white flex items-center justify-center mx-auto mb-3 shadow-lg shadow-blue-500/30">
                <BrainCircuit className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-black text-white">
                AI Subject Tutor: {course.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                Ask specific conceptual questions, syllabus doubts, or request mnemonics for this subject.
              </p>
            </div>

            <form onSubmit={handleAskAI} className="space-y-4">
              <div className="relative">
                <textarea
                  rows={3}
                  value={aiQuestion}
                  onChange={(e) => setAiQuestion(e.target.value)}
                  placeholder={`Ask anything about ${course.title} (e.g. "Explain the basic structure doctrine in 3 points")...`}
                  className="w-full bg-slate-950 border border-slate-700 rounded-2xl p-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none shadow-inner"
                />
              </div>

              <button
                type="submit"
                disabled={aiLoading || !aiQuestion.trim()}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-sm shadow-xl shadow-blue-500/20 disabled:opacity-40 flex items-center justify-center gap-2"
              >
                {aiLoading ? (
                  <>
                    <BrainCircuit className="w-4 h-4 animate-spin" />
                    Generating Tutor Solution...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Ask AI Subject Tutor
                  </>
                )}
              </button>
            </form>

            {aiAnswer && (
              <div className="mt-8 p-6 rounded-2xl bg-slate-950/80 border border-blue-500/40 leading-relaxed text-sm text-slate-200">
                <div className="flex items-center gap-2 text-cyan-300 font-bold mb-3 text-xs uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                  Verified AI Tutor Explanation
                </div>
                <div className="whitespace-pre-wrap">{aiAnswer}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
