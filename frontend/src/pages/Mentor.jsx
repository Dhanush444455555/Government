import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Bot, Send, User, Sparkles, Lightbulb, BookOpen, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';

export default function Mentor() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Namaste! I am your **AI Personalized Exam Mentor**. I can help you draft a daily study routine, break down complex syllabus topics, review mock test mistakes, and maintain exam motivation. What is your primary focus today?",
      time: "Just now"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const prompts = [
    "Design a 6-month study timetable for UPSC Prelims",
    "How to master Data Interpretation for SBI PO?",
    "Which NCERT books are mandatory for Civil Services?",
    "How to manage negative marking in SSC CGL?"
  ];

  const handleSend = async (text) => {
    const q = (text || input).trim();
    if (!q) return;

    setMessages((p) => [...p, { role: 'user', content: q, time: "Just now" }]);
    setInput("");
    setLoading(true);

    try {
      const res = await api.post('/chat', { message: q, sessionId: "mentor_session" });
      setMessages((p) => [...p, { role: 'assistant', content: res.data.message, time: "Just now" }]);
    } catch (e) {
      setMessages((p) => [
        ...p,
        {
          role: 'assistant',
          content: "Focus on consistent 5-6 hours of daily revision. Practice at least 25 questions every evening and write down mistakes in a dedicated error logbook.",
          time: "Just now"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/guidance')}
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Guidance Center
        </button>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col h-[75vh]">
          {/* Header */}
          <div className="flex items-center gap-3.5 pb-4 border-b border-slate-800">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                AI Personalized Mentor
                <Sparkles className="w-4 h-4 text-yellow-300" />
              </h2>
              <p className="text-xs text-slate-400">Available 24/7 for Exam Counseling & Strategy Formulation</p>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 my-2">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-blue-600/20 border border-blue-500/30 text-cyan-300 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-bl-none shadow-sm'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{m.content}</div>
                </div>
                {m.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-purple-600/20 border border-purple-500/30 text-purple-300 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Bot className="w-4 h-4 text-blue-500 animate-spin" />
                <span>Mentor is drafting advice...</span>
              </div>
            )}
          </div>

          {/* Quick Prompts */}
          {messages.length <= 2 && (
            <div className="px-4 py-2 border-t border-slate-800/80">
              <p className="text-xs font-semibold text-slate-400 mb-2 flex items-center gap-1">
                <Lightbulb className="w-3.5 h-3.5 text-amber-400" /> Suggested queries:
              </p>
              <div className="flex flex-wrap gap-2">
                {prompts.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(p)}
                    className="text-xs px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-blue-500 text-slate-300 hover:text-white transition-colors"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Box */}
          <div className="pt-3 border-t border-slate-800">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask your mentor about books, time management, mock analysis..."
                className="flex-1 bg-slate-950 border border-slate-700 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={() => handleSend()}
                disabled={loading || !input.trim()}
                className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm disabled:opacity-40 flex items-center gap-2 transition-colors shadow-lg shadow-blue-600/30"
              >
                <Send className="w-4 h-4" />
                <span>Send</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

