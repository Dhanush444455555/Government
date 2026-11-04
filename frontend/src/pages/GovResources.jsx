import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Globe,
  FileText,
  Search,
  Filter,
  ExternalLink,
  GraduationCap,
  Sparkles,
  Shield,
  Layers,
  ArrowUpRight,
  BookmarkCheck,
  Video
} from 'lucide-react';
import axios from 'axios';

const YoutubeIcon = ({ className = "w-5 h-5 text-red-500" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export default function GovResources() {
  const [activeSection, setActiveSection] = useState('textbooks'); // textbooks | youtube | all_exams
  const [textbooks, setTextbooks] = useState([]);
  const [youtubePlaylists, setYoutubePlaylists] = useState([]);
  const [govExams, setGovExams] = useState({});
  const [selectedExamCategory, setSelectedExamCategory] = useState('All');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      setLoading(true);
      const [tbRes, ytRes, examsRes] = await Promise.all([
        axios.get('/api/resources/textbooks').catch(() => ({ data: [] })),
        axios.get('/api/resources/youtube-playlists').catch(() => ({ data: [] })),
        axios.get('/api/resources/gov-exams').catch(() => ({ data: {} })),
      ]);

      setTextbooks(tbRes.data || []);
      setYoutubePlaylists(ytRes.data || []);
      setGovExams(examsRes.data || {});
    } catch (err) {
      console.error('Failed to load resources:', err);
    } finally {
      setLoading(false);
    }
  };

  const subjectsList = ['All', 'History', 'Polity', 'Economy', 'Geography', 'Science & Technology', 'Mathematics', 'Reasoning', 'General Studies', 'Banking GK', 'Current Affairs'];

  const filteredTextbooks = textbooks.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.provider?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject === 'All' || item.subject.toLowerCase().includes(selectedSubject.toLowerCase());
    return matchesSearch && matchesSubject;
  });

  const filteredYoutube = youtubePlaylists.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.provider?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject === 'All' || item.subject.toLowerCase().includes(selectedSubject.toLowerCase());
    return matchesSearch && matchesSubject;
  });

  const allExamEntries = Object.entries(govExams);
  const filteredExamEntries = selectedExamCategory === 'All'
    ? allExamEntries
    : allExamEntries.filter(([cat]) => cat === selectedExamCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-cyan-950 border border-indigo-800/40 p-8 sm:p-12 mb-10 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-semibold tracking-wide border border-cyan-500/30">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            COMPREHENSIVE LEARNING REPOSITORY
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            All Government Exams & Free Study Library
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            One-stop portal supporting all major Indian government examinations (UPSC, SSC, Banking, Railways, Defence, State PSCs, Teaching, Insurance). Read official NCERT textbooks & verified notes, and watch curated YouTube lecture playlists for every subject.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-semibold text-slate-300">
            <span className="px-3 py-1 rounded-lg bg-slate-800/90 border border-slate-700">📖 Free NCERT Textbooks</span>
            <span className="px-3 py-1 rounded-lg bg-slate-800/90 border border-slate-700">▶️ YouTube Playlist Links</span>
            <span className="px-3 py-1 rounded-lg bg-slate-800/90 border border-slate-700">🏛️ 30+ Central & State Exams</span>
            <span className="px-3 py-1 rounded-lg bg-slate-800/90 border border-slate-700">🌐 Official Application Portals</span>
          </div>
        </div>
      </div>

      {/* Main Mode Toggle Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <button
          onClick={() => setActiveSection('textbooks')}
          className={`flex items-center justify-center gap-3 p-4 rounded-2xl border font-bold text-sm sm:text-base transition-all ${
            activeSection === 'textbooks'
              ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-transparent shadow-lg shadow-blue-500/25 scale-[1.02]'
              : 'bg-slate-900/90 text-slate-300 border-slate-800 hover:bg-slate-800/80 hover:border-slate-700'
          }`}
        >
          <BookOpen className="w-5 h-5 text-cyan-300" />
          <span>Free Textbooks & Notes ({textbooks.length})</span>
        </button>

        <button
          onClick={() => setActiveSection('youtube')}
          className={`flex items-center justify-center gap-3 p-4 rounded-2xl border font-bold text-sm sm:text-base transition-all ${
            activeSection === 'youtube'
              ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white border-transparent shadow-lg shadow-red-500/25 scale-[1.02]'
              : 'bg-slate-900/90 text-slate-300 border-slate-800 hover:bg-slate-800/80 hover:border-slate-700'
          }`}
        >
          <YoutubeIcon className="w-5 h-5 text-red-400" />
          <span>YouTube Learning Hub ({youtubePlaylists.length})</span>
        </button>

        <button
          onClick={() => setActiveSection('all_exams')}
          className={`flex items-center justify-center gap-3 p-4 rounded-2xl border font-bold text-sm sm:text-base transition-all ${
            activeSection === 'all_exams'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-transparent shadow-lg shadow-emerald-500/25 scale-[1.02]'
              : 'bg-slate-900/90 text-slate-300 border-slate-800 hover:bg-slate-800/80 hover:border-slate-700'
          }`}
        >
          <Shield className="w-5 h-5 text-emerald-300" />
          <span>All Gov Exams Directory (31)</span>
        </button>
      </div>

      {/* Filter / Search Bar for Textbooks and YouTube */}
      {(activeSection === 'textbooks' || activeSection === 'youtube') && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 mb-8 space-y-4 shadow-lg">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Search by title, subject, NCERT book or topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
              >
                Clear
              </button>
            )}
          </div>

          {/* Subject Filter Chips */}
          <div className="flex overflow-x-auto gap-2 pb-1 scrollbar-none">
            {subjectsList.map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedSubject(sub)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                  selectedSubject === sub
                    ? 'bg-cyan-500 text-black font-bold shadow'
                    : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-700'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 1: Free Textbooks & Notes */}
      {activeSection === 'textbooks' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-cyan-400" />
              Standard Textbooks & Official Notes ({filteredTextbooks.length})
            </h2>
            <span className="text-xs text-slate-400">100% Free & Open Access Resources</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTextbooks.map((book) => (
              <div
                key={book.id}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-cyan-500/50 hover:bg-slate-850 transition shadow-lg group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      {book.subject}
                    </span>
                    <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                      <BookmarkCheck className="w-3.5 h-3.5" /> {book.provider}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-white group-hover:text-cyan-300 transition line-clamp-2">
                    {book.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                    {book.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {book.exam_tags?.map((tag, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 uppercase font-semibold">
                    {book.resource_type.toUpperCase()} • Free
                  </span>
                  <a
                    href={book.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold transition shadow"
                  >
                    <span>Read / Open</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 2: YouTube Learning Hub */}
      {activeSection === 'youtube' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <YoutubeIcon className="w-5 h-5 text-red-400" />
              Curated YouTube Playlists & Video Lessons ({filteredYoutube.length})
            </h2>
            <span className="text-xs text-slate-400">Direct Links to Learn from Top Educators</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredYoutube.map((yt) => (
              <div
                key={yt.id}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-red-500/50 hover:bg-slate-850 transition shadow-lg group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-red-500/20 text-red-300 border border-red-500/30">
                      {yt.subject}
                    </span>
                    <span className="text-xs text-slate-300 font-semibold flex items-center gap-1">
                      <Video className="w-3.5 h-3.5 text-red-400" /> {yt.provider}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-white group-hover:text-red-300 transition line-clamp-2">
                    {yt.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                    {yt.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {yt.exam_tags?.map((tag, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-semibold">
                    Free Video Playlist
                  </span>
                  <a
                    href={yt.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-semibold transition shadow-md shadow-red-600/30"
                  >
                    <span>Watch on YouTube</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 3: All Gov Exams Directory */}
      {activeSection === 'all_exams' && (
        <div className="space-y-6">
          {/* Category Filter */}
          <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-none">
            {['All', 'UPSC', 'SSC', 'Banking', 'Railways', 'Defence', 'State PSC', 'Teaching', 'Insurance'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedExamCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                  selectedExamCategory === cat
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                    : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grouped Exams */}
          <div className="space-y-8">
            {filteredExamEntries.map(([category, examsList]) => (
              <div key={category} className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Shield className="w-5 h-5 text-emerald-400" />
                    {category} Examinations ({examsList.length})
                  </h3>
                  <span className="text-xs text-slate-400 font-medium">Official Recruitment Details</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {examsList.map((exam) => (
                    <div
                      key={exam.id}
                      className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-slate-700 transition shadow-lg"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800/80">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-lg font-bold text-white">{exam.exam_name}</h4>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                              {exam.difficulty}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mt-0.5">{exam.full_name}</p>
                        </div>

                        <div className="text-right shrink-0">
                          <div className="text-xs text-slate-400">Pay Scale</div>
                          <div className="text-xs font-bold text-emerald-400">{exam.salary_range}</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
                        <div>
                          <span className="text-slate-400 block font-semibold">Eligibility Age:</span>
                          <span className="text-slate-200">{exam.eligibility_age}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block font-semibold">Annual Vacancies:</span>
                          <span className="text-cyan-400 font-medium">{exam.vacancies_approx}</span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-slate-400 block font-semibold">Education Required:</span>
                          <span className="text-slate-200">{exam.eligibility_education}</span>
                        </div>
                      </div>

                      <div className="text-xs text-slate-300 space-y-1.5">
                        <div>
                          <span className="font-semibold text-slate-200">Exam Pattern: </span>
                          <span className="text-slate-300">{exam.exam_pattern}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-slate-200">Syllabus Overview: </span>
                          <span className="text-slate-300">{exam.syllabus_summary}</span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                        <div className="text-[11px] text-slate-400">
                          Notification: <span className="text-slate-200 font-medium">{exam.notification_month}</span> • Exam: <span className="text-slate-200 font-medium">{exam.exam_month}</span>
                        </div>
                        {exam.official_website && (
                          <a
                            href={exam.official_website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-400 rounded-lg text-xs font-semibold transition border border-slate-700"
                          >
                            <span>Official Portal</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
