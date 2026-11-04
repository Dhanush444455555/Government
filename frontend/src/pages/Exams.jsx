import React, { useState, useEffect } from 'react';
import api from '../api/client';
import {
  BookOpen,
  Search,
  Calendar,
  Clock,
  Award,
  ExternalLink,
  FileText,
  Filter,
  CheckCircle2,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export default function Exams() {
  const [categories, setCategories] = useState([]);
  const [exams, setExams] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [search, setSearch] = useState('');
  const [activeExam, setActiveExam] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
    fetchExams();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await api.get('/exams/categories');
      setCategories(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchExams = async (catId = null, query = '') => {
    setLoading(true);
    try {
      const params = {};
      if (catId) params.category_id = catId;
      if (query) params.search = query;
      const res = await api.get('/exams/', { params });
      setExams(res.data);
      if (res.data.length > 0 && !activeExam) {
        selectExam(res.data[0]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const selectExam = async (exam) => {
    setActiveExam(exam);
    try {
      const matRes = await api.get(`/exams/${exam.id}/materials`);
      setMaterials(matRes.data);
    } catch (e) {
      setMaterials([]);
    }
  };

  const handleCategoryClick = (catId) => {
    if (selectedCategory === catId) {
      setSelectedCategory(null);
      fetchExams(null, search);
    } else {
      setSelectedCategory(catId);
      fetchExams(catId, search);
    }
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearch(val);
    fetchExams(selectedCategory, val);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-cyan-400" />
          Government Exams & Comprehensive Syllabi
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Explore official guidelines, exam patterns, eligibility requirements, and curated notes for major Indian competitive exams.
        </p>
      </div>

      {/* Search and Category Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search exam name (e.g. UPSC, IBPS, SSC)..."
            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 transition-colors"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          <button
            onClick={() => handleCategoryClick(null)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === null
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Exams List (4 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <h2 className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-2">Available Exams</h2>
          {loading ? (
            <div className="text-xs text-slate-500 py-8 text-center">Loading exam catalog...</div>
          ) : exams.length === 0 ? (
            <div className="text-xs text-slate-500 py-8 text-center bg-slate-900/40 rounded-xl border border-slate-800">
              No exams found matching your criteria.
            </div>
          ) : (
            exams.map((ex) => {
              const isSelected = activeExam?.id === ex.id;
              return (
                <div
                  key={ex.id}
                  onClick={() => selectExam(ex)}
                  className={`p-4 rounded-xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-blue-950/40 border-cyan-500/50 shadow-lg shadow-cyan-950/30'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-cyan-400 font-semibold">
                        {ex.exam_type}
                      </span>
                      <h3 className="text-sm font-bold text-white mt-1.5">{ex.title}</h3>
                      <p className="text-xs text-slate-400 line-clamp-2 mt-1">{ex.description}</p>
                    </div>
                    <ChevronRight className={`w-4 h-4 mt-1 transition-transform ${isSelected ? 'text-cyan-400 translate-x-0.5' : 'text-slate-600'}`} />
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-amber-400" /> {ex.duration} Mins</span>
                    <span className="flex items-center gap-1"><Award className="w-3 h-3 text-cyan-400" /> Total {ex.total_marks} Marks</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Detail Pane (7 cols) */}
        <div className="lg:col-span-7">
          {activeExam ? (
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <div className="border-b border-slate-800 pb-5">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                  <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-cyan-950/60 border border-cyan-800/60 text-cyan-400">
                    Level: {activeExam.level}
                  </span>
                  {activeExam.official_website && (
                    <a
                      href={activeExam.official_website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-blue-400 hover:text-cyan-400 flex items-center gap-1 transition-colors"
                    >
                      Official Website <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
                <h2 className="text-xl font-black text-white">{activeExam.title}</h2>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">{activeExam.description}</p>
              </div>

              {/* Eligibility & Pattern */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl">
                  <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Eligibility Criteria
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{activeExam.eligibility || 'Graduation degree required.'}</p>
                </div>
                <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl">
                  <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-cyan-400" /> Examination Pattern
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{activeExam.pattern || 'Multiple choice prelims followed by descriptive mains.'}</p>
                </div>
              </div>

              {/* Detailed Syllabus */}
              <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl">
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">
                  Detailed Syllabus Outline
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">{activeExam.syllabus}</p>
              </div>

              {/* Study Materials for this Exam */}
              <div>
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Curated Study Notes & Modules
                </h4>
                {materials.length === 0 ? (
                  <p className="text-xs text-slate-500 italic">No notes added for this exam yet.</p>
                ) : (
                  <div className="space-y-3">
                    {materials.map((mat) => (
                      <div key={mat.id} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-cyan-300">{mat.title}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                            {mat.subject} • {mat.difficulty}
                          </span>
                        </div>
                        <p className="text-slate-400 mt-1">{mat.description}</p>
                        {mat.content && (
                          <div className="mt-2.5 p-3 rounded-lg bg-black/40 border border-slate-800/80 font-mono text-[11px] text-slate-300 whitespace-pre-line">
                            {mat.content}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center bg-slate-900/40 rounded-2xl border border-slate-800 text-xs text-slate-500">
              Select an exam from the left catalog to inspect syllabus and details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
