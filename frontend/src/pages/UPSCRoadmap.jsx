import React, { useState, useEffect } from 'react';
import {
  Award,
  Shield,
  BookOpen,
  Calendar,
  Compass,
  FileText,
  Clock,
  CheckCircle2,
  TrendingUp,
  ExternalLink,
  ChevronRight,
  Filter,
  Bookmark,
  Sparkles
} from 'lucide-react';
import axios from 'axios';

export default function UPSCRoadmap() {
  const [activeTab, setActiveTab] = useState('posts'); // posts | syllabus | strategy | timeline | current_affairs
  const [posts, setPosts] = useState([]);
  const [syllabus, setSyllabus] = useState({});
  const [strategies, setStrategies] = useState([]);
  const [timeline, setTimeline] = useState(null);
  const [currentAffairs, setCurrentAffairs] = useState({});
  const [selectedPost, setSelectedPost] = useState(null);
  const [syllabusStage, setSyllabusStage] = useState('prelims');
  const [strategyStage, setStrategyStage] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUPSCData();
  }, []);

  const fetchUPSCData = async () => {
    try {
      setLoading(true);
      const [postsRes, syllabusRes, strategyRes, timelineRes, caRes] = await Promise.all([
        axios.get('/api/upsc/posts').catch(() => ({ data: [] })),
        axios.get('/api/upsc/syllabus').catch(() => ({ data: {} })),
        axios.get('/api/upsc/strategy').catch(() => ({ data: [] })),
        axios.get('/api/upsc/exam-timeline').catch(() => ({ data: null })),
        axios.get('/api/upsc/current-affairs').catch(() => ({ data: {} })),
      ]);

      setPosts(postsRes.data || []);
      if (postsRes.data && postsRes.data.length > 0) {
        setSelectedPost(postsRes.data[0]);
      }
      setSyllabus(syllabusRes.data || {});
      setStrategies(strategyRes.data || []);
      setTimeline(timelineRes.data);
      setCurrentAffairs(caRes.data || {});
    } catch (err) {
      console.error('Failed to load UPSC data:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Hero Banner dedicated to IAS/IPS */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 border border-blue-800/40 p-8 sm:p-12 mb-10 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold tracking-wide border border-blue-500/30">
              <Shield className="w-4 h-4 text-cyan-400" />
              PREMIER CIVIL SERVICES HUB • UPSC CSE
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              IAS & IPS Preparation Portal
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Master the Union Public Service Commission Civil Services Examination. Complete stage-by-stage guidance, post-wise eligibility & hierarchies, official syllabus breakdown, and expert roadmap for India's most prestigious career.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="px-3 py-1 bg-slate-800/90 text-cyan-400 text-xs rounded-lg border border-slate-700 font-medium">
                🏛️ IAS (District Collector)
              </span>
              <span className="px-3 py-1 bg-slate-800/90 text-blue-400 text-xs rounded-lg border border-slate-700 font-medium">
                🚔 IPS (Superintendent of Police)
              </span>
              <span className="px-3 py-1 bg-slate-800/90 text-emerald-400 text-xs rounded-lg border border-slate-700 font-medium">
                🌍 IFS (Diplomat / Foreign Service)
              </span>
              <span className="px-3 py-1 bg-slate-800/90 text-amber-400 text-xs rounded-lg border border-slate-700 font-medium">
                💰 IRS (Revenue & Tax)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 shrink-0">
            <div className="bg-slate-900/80 backdrop-blur border border-blue-500/30 p-4 rounded-2xl text-center">
              <div className="text-3xl font-extrabold text-cyan-400">2025</div>
              <div className="text-xs text-slate-400 mt-1 uppercase font-semibold">Total Marks</div>
            </div>
            <div className="bg-slate-900/80 backdrop-blur border border-blue-500/30 p-4 rounded-2xl text-center">
              <div className="text-3xl font-extrabold text-blue-400">3 Stages</div>
              <div className="text-xs text-slate-400 mt-1 uppercase font-semibold">Prelims-Mains-PT</div>
            </div>
            <div className="bg-slate-900/80 backdrop-blur border border-blue-500/30 p-4 rounded-2xl text-center">
              <div className="text-3xl font-extrabold text-amber-400">~1,000</div>
              <div className="text-xs text-slate-400 mt-1 uppercase font-semibold">Annual Vacancies</div>
            </div>
            <div className="bg-slate-900/80 backdrop-blur border border-blue-500/30 p-4 rounded-2xl text-center">
              <div className="text-3xl font-extrabold text-emerald-400">24 Services</div>
              <div className="text-xs text-slate-400 mt-1 uppercase font-semibold">Group A & B</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex overflow-x-auto gap-2 pb-4 mb-8 border-b border-slate-800 scrollbar-none">
        {[
          { id: 'posts', label: 'Civil Service Posts (IAS/IPS)', icon: Award },
          { id: 'syllabus', label: 'Official Syllabus Breakdown', icon: BookOpen },
          { id: 'strategy', label: 'Preparation Roadmap', icon: Compass },
          { id: 'timeline', label: 'Annual Exam Timeline', icon: Calendar },
          { id: 'current_affairs', label: 'High-Yield Current Affairs', icon: TrendingUp },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-[1.02]'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab 1: Civil Service Posts (IAS, IPS, IFS, etc.) */}
      {activeTab === 'posts' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Post Selector List */}
            <div className="lg:col-span-1 space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 px-1">
                Select Civil Service Cadre
              </h3>
              <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
                {posts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => setSelectedPost(p)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      selectedPost?.id === p.id
                        ? 'bg-blue-950/70 border-cyan-500/60 shadow-md shadow-blue-500/20'
                        : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-base text-white tracking-wide">
                        {p.post_name}
                      </span>
                      <span className="px-2 py-0.5 rounded text-xs font-semibold bg-slate-800 text-cyan-400 border border-slate-700">
                        Rank #{p.prestige_rank}
                      </span>
                    </div>
                    <div className="text-xs text-slate-300 mt-1 line-clamp-1">{p.full_name}</div>
                    <div className="text-[11px] text-slate-400 mt-2 flex items-center justify-between">
                      <span>{p.service}</span>
                      <span className="text-emerald-400 font-medium">{p.vacancy_approx}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Post Detailed Card */}
            {selectedPost && (
              <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                  <div>
                    <div className="inline-block px-3 py-1 rounded-md text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 mb-2">
                      {selectedPost.service}
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">
                      {selectedPost.post_name} — {selectedPost.full_name}
                    </h2>
                    <p className="text-slate-400 text-sm mt-1">Cadre Allocation: {selectedPost.cadre}</p>
                  </div>
                  <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 text-right shrink-0">
                    <div className="text-xs text-slate-400">Pay Matrix</div>
                    <div className="text-sm font-semibold text-emerald-400">{selectedPost.pay_level}</div>
                    <div className="text-[11px] text-slate-400 mt-1">Annual Openings: {selectedPost.vacancy_approx}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-950/60 rounded-xl p-5 border border-slate-800/80">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2 mb-3">
                      <Shield className="w-4 h-4" /> Key Roles & Responsibilities
                    </h4>
                    <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                      {selectedPost.roles}
                    </p>
                  </div>

                  <div className="bg-slate-950/60 rounded-xl p-5 border border-slate-800/80">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-2 mb-3">
                      <CheckCircle2 className="w-4 h-4" /> Eligibility & Criteria
                    </h4>
                    <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                      {selectedPost.eligibility}
                    </p>
                  </div>
                </div>

                <div className="bg-slate-950/60 rounded-xl p-5 border border-slate-800/80">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-2 mb-2">
                    <Compass className="w-4 h-4" /> Posting Areas & Career Trajectory
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {selectedPost.posting_areas}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-blue-900/20 border border-blue-800/40 flex items-center justify-between">
                  <div className="text-xs text-blue-200">
                    🎯 Aiming for <span className="font-bold text-white">{selectedPost.post_name}</span>? Check out syllabus & strategy tabs.
                  </div>
                  <button
                    onClick={() => setActiveTab('syllabus')}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold transition"
                  >
                    View Syllabus →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Syllabus Breakdown */}
      {activeTab === 'syllabus' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-semibold uppercase">Exam Stage:</span>
              <button
                onClick={() => setSyllabusStage('prelims')}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${
                  syllabusStage === 'prelims'
                    ? 'bg-blue-600 text-white shadow'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Prelims (Objective)
              </button>
              <button
                onClick={() => setSyllabusStage('mains')}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${
                  syllabusStage === 'mains'
                    ? 'bg-blue-600 text-white shadow'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Mains (Descriptive)
              </button>
            </div>
            <div className="text-xs text-slate-400">
              {syllabusStage === 'prelims'
                ? 'GS Paper I (200m) + CSAT Paper II (200m Qualifying 33%)'
                : '9 Written Papers (1750 Marks) + Personality Test (275 Marks)'}
            </div>
          </div>

          {/* Syllabus Items */}
          <div className="space-y-6">
            {syllabus[syllabusStage] ? (
              Object.entries(syllabus[syllabusStage]).map(([paperName, entries]) => (
                <div key={paperName} className="bg-slate-900/80 rounded-2xl border border-slate-800 overflow-hidden shadow-lg">
                  <div className="bg-slate-800/80 px-6 py-4 border-b border-slate-700 flex items-center justify-between">
                    <h3 className="font-bold text-lg text-white flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-cyan-400" />
                      {paperName}
                    </h3>
                    <span className="text-xs font-medium px-2.5 py-1 bg-slate-900 text-slate-300 rounded-full border border-slate-700">
                      {entries.length} Core Modules
                    </span>
                  </div>

                  <div className="p-6 divide-y divide-slate-800/80 space-y-4">
                    {entries.map((item) => (
                      <div key={item.id} className="pt-4 first:pt-0">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                              {item.subject}
                            </span>
                            <h4 className="text-base font-semibold text-white">{item.topic}</h4>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-cyan-400 font-medium">
                              Weightage: ~{item.weightage_percent}%
                            </span>
                            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded uppercase ${
                              item.priority === 'high' ? 'bg-red-500/20 text-red-300 border border-red-500/30' : 'bg-amber-500/20 text-amber-300'
                            }`}>
                              {item.priority} Priority
                            </span>
                          </div>
                        </div>

                        {item.recommended_books && (
                          <div className="mt-2.5 text-xs text-slate-300 bg-slate-950/50 p-2.5 rounded-lg border border-slate-800/80 flex items-start gap-2">
                            <Bookmark className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                            <div>
                              <span className="font-semibold text-slate-200">Recommended Textbooks: </span>
                              {item.recommended_books}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-slate-400">Loading syllabus data...</div>
            )}
          </div>
        </div>
      )}

      {/* Tab 3: Preparation Strategy Roadmap */}
      {activeTab === 'strategy' && (
        <div className="space-y-6">
          <div className="flex gap-2">
            {['All', 'Foundation', 'Prelims', 'Mains', 'Interview'].map((stage) => (
              <button
                key={stage}
                onClick={() => setStrategyStage(stage)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                  strategyStage === stage
                    ? 'bg-blue-600 text-white shadow'
                    : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {stage} Stage
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {strategies
              .filter((s) => strategyStage === 'All' || s.stage.toLowerCase() === strategyStage.toLowerCase())
              .map((strat) => (
                <div
                  key={strat.id}
                  className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 transition shadow-lg"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                        {strat.stage} • {strat.phase_months}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                        <Clock className="w-3.5 h-3.5 text-cyan-400" /> {strat.daily_hours} hrs/day
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white">{strat.focus_area}</h3>
                    <p className="text-sm text-slate-300 leading-relaxed">{strat.strategy_text}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800/80 space-y-2">
                    <div className="text-xs text-slate-400">
                      <span className="font-semibold text-slate-300">Key Resources:</span> {strat.key_resources}
                    </div>
                    {strat.milestones && (
                      <div className="text-xs text-emerald-400 flex items-center gap-1.5 font-medium">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span>Milestone: {strat.milestones}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Tab 4: Annual Exam Timeline */}
      {activeTab === 'timeline' && timeline && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {timeline.stages?.map((stage, i) => (
              <div key={i} className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 text-center">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Stage {i + 1}</div>
                <div className="text-2xl font-black text-white mt-1">{stage.name}</div>
                <div className="text-3xl font-extrabold text-cyan-400 mt-2">{stage.marks} Marks</div>
                <div className="text-xs text-slate-400 mt-2">{stage.note || (stage.qualifying ? 'Qualifying' : 'Counted in Final Merit')}</div>
              </div>
            ))}
          </div>

          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6 sm:p-8">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-400" />
              12-Month UPSC Cycle Timeline
            </h3>

            <div className="relative border-l-2 border-blue-600/40 ml-4 sm:ml-6 space-y-8">
              {timeline.timeline?.map((item, idx) => (
                <div key={idx} className="relative pl-6 sm:pl-8 group">
                  <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-blue-500 border-4 border-slate-900 group-hover:scale-125 transition-transform" />
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                    <span className="text-sm font-bold text-cyan-400 uppercase tracking-wide min-w-[130px]">
                      {item.month}
                    </span>
                    <h4 className="text-base font-bold text-white">{item.event}</h4>
                  </div>
                  <p className="text-sm text-slate-300 mt-1">{item.details}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: High-Yield Current Affairs */}
      {activeTab === 'current_affairs' && (
        <div className="space-y-6">
          <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-white text-base">UPSC Current Affairs Categories</h3>
              <p className="text-xs text-slate-400 mt-0.5">High-yield themes frequently asked in GS Prelims & Mains</p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30">
              Verified Sources
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(currentAffairs).map(([category, items]) => (
              <div key={category} className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-lg">
                <h4 className="text-base font-bold text-cyan-400 pb-2 border-b border-slate-800 flex items-center justify-between">
                  <span>{category}</span>
                  <span className="text-xs text-slate-400 font-normal">{items.length} Essential Themes</span>
                </h4>

                <div className="space-y-3">
                  {items.map((theme) => (
                    <div key={theme.id} className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm text-slate-200">{theme.topic}</span>
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                          {theme.relevance}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">{theme.description}</p>
                      {theme.source_suggestion && (
                        <div className="text-[11px] text-blue-400 pt-1">
                          Source: <span className="text-slate-300">{theme.source_suggestion}</span>
                        </div>
                      )}
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
