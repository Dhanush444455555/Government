import React, { useState, useEffect } from 'react';
import api from '../api/client';
import {
  GraduationCap,
  Clock,
  Award,
  CheckCircle2,
  XCircle,
  HelpCircle,
  AlertCircle,
  RotateCcw,
  Send,
  ChevronLeft,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

export default function MockTests() {
  const [tests, setTests] = useState([]);
  const [activeTest, setActiveTest] = useState(null);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [testResult, setTestResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      const res = await api.get('/mock-tests/');
      setTests(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  // Timer effect
  useEffect(() => {
    let timer;
    if (activeTest && !testResult && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            submitTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [activeTest, testResult, timeRemaining]);

  const startTest = async (testId) => {
    try {
      const res = await api.get(`/mock-tests/${testId}`);
      setActiveTest(res.data);
      setCurrentQIndex(0);
      setAnswers({});
      setTestResult(null);
      setTimeRemaining(res.data.duration_minutes * 60);
    } catch (e) {
      alert("Error loading mock test.");
    }
  };

  const handleSelectOption = (optionChar) => {
    setAnswers({
      ...answers,
      [currentQIndex]: optionChar
    });
  };

  const submitTest = async () => {
    if (!activeTest) return;
    setIsSubmitting(true);
    try {
      const timeTaken = (activeTest.duration_minutes * 60) - timeRemaining;
      const res = await api.post('/mock-tests/submit', {
        test_id: activeTest.id,
        answers: answers,
        time_taken_seconds: Math.max(timeTaken, 1)
      });
      setTestResult(res.data);
    } catch (e) {
      alert("Submission error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
          <GraduationCap className="w-8 h-8 text-cyan-400" />
          Interactive Mock Tests & Real-Time Evaluation
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Exam-grade simulation with real-time countdown, negative marking logic, and granular post-test analytics.
        </p>
      </div>

      {!activeTest ? (
        /* Test Selection Cards */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tests.map((t) => (
            <div
              key={t.id}
              className="bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-6 transition-all shadow-lg flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-950/60 border border-blue-800 text-blue-400">
                  Full Length Mock
                </span>
                <h3 className="text-base font-bold text-white mt-2">{t.title}</h3>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{t.description}</p>
                <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-300 font-mono">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-amber-400" /> {t.duration_minutes} Mins</span>
                  <span className="flex items-center gap-1"><Award className="w-3.5 h-3.5 text-cyan-400" /> {t.total_marks} Marks</span>
                  <span>{t.total_questions} Questions</span>
                </div>
              </div>
              <button
                onClick={() => startTest(t.id)}
                className="mt-6 w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs transition-transform hover:scale-[1.02] shadow-md shadow-blue-600/20"
              >
                Start Timed Test
              </button>
            </div>
          ))}
        </div>
      ) : testResult ? (
        /* Post-Test Result & Review Screen */
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
            <div>
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">Test Completed</span>
              <h2 className="text-2xl font-black text-white">{activeTest.title}</h2>
            </div>
            <button
              onClick={() => { setActiveTest(null); setTestResult(null); }}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Back to Test List
            </button>
          </div>

          {/* Score Summary Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
              <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Your Score</span>
              <p className="text-3xl font-black text-cyan-400 mt-1">{testResult.score} <span className="text-xs text-slate-500">/ {testResult.total_marks}</span></p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
              <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Percentage</span>
              <p className="text-3xl font-black text-emerald-400 mt-1">{testResult.percentage}%</p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
              <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Time Taken</span>
              <p className="text-3xl font-black text-amber-400 mt-1">{Math.floor(testResult.time_taken_seconds / 60)}m {testResult.time_taken_seconds % 60}s</p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
              <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Cutoff Status</span>
              <p className="text-xl font-bold mt-2 text-white">
                {testResult.percentage >= 60 ? (
                  <span className="text-emerald-400">PASSED</span>
                ) : (
                  <span className="text-rose-400">BELOW CUTOFF</span>
                )}
              </p>
            </div>
          </div>

          {/* Detailed Question Review */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Detailed Solution Breakdown</h3>
            {testResult.detailed_eval.map((item, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl border ${
                  item.is_correct
                    ? 'bg-emerald-950/20 border-emerald-900/50'
                    : 'bg-rose-950/20 border-rose-900/50'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-400">Q{idx + 1}.</span>
                    <span className="text-xs font-semibold text-white">{item.question}</span>
                  </div>
                  {item.is_correct ? (
                    <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-bold whitespace-nowrap">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[11px] text-rose-400 font-bold whitespace-nowrap">
                      <XCircle className="w-3.5 h-3.5" /> Incorrect
                    </span>
                  )}
                </div>
                <div className="mt-2 text-xs flex flex-wrap gap-4 text-slate-300">
                  <span>Your Answer: <strong className={item.is_correct ? 'text-emerald-400' : 'text-rose-400'}>{item.user_answer || 'Skipped'}</strong></span>
                  <span>Correct Option: <strong className="text-cyan-400">{item.correct_answer}</strong></span>
                </div>
                {item.explanation && (
                  <p className="mt-2 text-xs text-slate-400 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                    <strong className="text-slate-300">Explanation:</strong> {item.explanation}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Live Test Taking Interface */
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
          {/* Top Bar with Timer */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-800 gap-4 mb-6">
            <div>
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">{activeTest.title}</span>
              <h2 className="text-sm font-semibold text-slate-300 mt-1">
                Question {currentQIndex + 1} of {activeTest.questions.length}
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <div className={`px-4 py-2 rounded-xl border flex items-center gap-2 font-mono text-sm font-bold ${
                timeRemaining < 300 ? 'bg-rose-950/40 border-rose-800 text-rose-400 animate-pulse' : 'bg-slate-950 border-slate-700 text-cyan-400'
              }`}>
                <Clock className="w-4 h-4" />
                <span>{formatTime(timeRemaining)}</span>
              </div>
              <button
                onClick={submitTest}
                disabled={isSubmitting}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/30 transition-transform hover:scale-105 flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" /> Submit Test
              </button>
            </div>
          </div>

          {/* Question Body */}
          {activeTest.questions[currentQIndex] && (
            <div className="space-y-6">
              <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl">
                <span className="text-xs font-bold text-cyan-400 block mb-2 font-mono">QUESTION {currentQIndex + 1}</span>
                <p className="text-base text-white font-medium leading-relaxed">
                  {activeTest.questions[currentQIndex].question}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {activeTest.questions[currentQIndex].options.map((opt, optIdx) => {
                  const optionChar = opt.trim().charAt(0).toUpperCase();
                  const isSelected = answers[currentQIndex] === optionChar;
                  return (
                    <div
                      key={optIdx}
                      onClick={() => handleSelectOption(optionChar)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center gap-3 text-sm ${
                        isSelected
                          ? 'bg-blue-950/60 border-cyan-400 text-white shadow-md'
                          : 'bg-slate-950/40 border-slate-800 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-mono ${
                        isSelected ? 'bg-cyan-400 text-slate-950' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {optionChar}
                      </div>
                      <span className="font-medium">{opt}</span>
                    </div>
                  );
                })}
              </div>

              {/* Navigation & Question Palette */}
              <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentQIndex((prev) => Math.max(0, prev - 1))}
                    disabled={currentQIndex === 0}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs text-slate-200 font-semibold flex items-center gap-1"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" /> Previous
                  </button>
                  <button
                    onClick={() => setCurrentQIndex((prev) => Math.min(activeTest.questions.length - 1, prev + 1))}
                    disabled={currentQIndex === activeTest.questions.length - 1}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs text-slate-200 font-semibold flex items-center gap-1"
                  >
                    Next <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Question Bubbles Palette */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  {activeTest.questions.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentQIndex(i)}
                      className={`w-7 h-7 rounded-lg text-xs font-mono font-bold transition-all ${
                        currentQIndex === i
                          ? 'bg-cyan-500 text-slate-950 ring-2 ring-cyan-400'
                          : answers[i]
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
