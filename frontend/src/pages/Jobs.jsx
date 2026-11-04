import React, { useState, useEffect } from 'react';
import api from '../api/client';
import {
  Briefcase,
  MapPin,
  Calendar,
  IndianRupee,
  Building2,
  Search,
  CheckCircle2,
  Send,
  X,
  ExternalLink
} from 'lucide-react';

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [resumeText, setResumeText] = useState('');
  const [coverNote, setCoverNote] = useState('');
  const [applySuccess, setApplySuccess] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, [filterType]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filterType !== 'all') params.job_type = filterType;
      if (search) params.search = search;
      const res = await api.get('/jobs/', { params });
      setJobs(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (e) => {
    e.preventDefault();
    if (!selectedJob) return;
    try {
      const res = await api.post('/jobs/apply', {
        job_id: selectedJob.id,
        resume_text: resumeText,
        cover_note: coverNote
      });
      setApplySuccess(res.data.message);
      setTimeout(() => {
        setApplySuccess(null);
        setSelectedJob(null);
        setResumeText('');
        setCoverNote('');
      }, 2500);
    } catch (err) {
      alert("Application submission failed.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
          <Briefcase className="w-8 h-8 text-cyan-400" />
          Government & Public Sector Employment Portal
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Verified central and state government recruitment notices, PSU openings, and academic part-time opportunities.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchJobs()}
            placeholder="Search by role or department..."
            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {['all', 'Government', 'PSU', 'Part-Time'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap capitalize transition-all ${
                filterType === type
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {type} Opportunities
            </button>
          ))}
        </div>
      </div>

      {/* Jobs Grid */}
      {loading ? (
        <div className="text-xs text-slate-500 py-12 text-center">Loading openings...</div>
      ) : jobs.length === 0 ? (
        <div className="text-xs text-slate-500 py-12 text-center bg-slate-900/40 rounded-2xl border border-slate-800">
          No job openings found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((j) => (
            <div
              key={j.id}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500/40 transition-all shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border uppercase ${
                    j.job_type === 'Government' ? 'bg-blue-950/60 border-blue-800 text-blue-400' :
                    j.job_type === 'PSU' ? 'bg-purple-950/60 border-purple-800 text-purple-400' :
                    'bg-emerald-950/60 border-emerald-800 text-emerald-400'
                  }`}>
                    {j.job_type}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                    <Calendar className="w-3 h-3 text-amber-400" /> Deadline: {j.deadline || 'Rolling'}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white">{j.title}</h3>
                <p className="text-xs font-semibold text-cyan-400 flex items-center gap-1.5 mt-1">
                  <Building2 className="w-3.5 h-3.5" /> {j.organization}
                </p>

                <p className="text-xs text-slate-300 mt-3 leading-relaxed">{j.description}</p>

                <div className="mt-4 pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" /> {j.location}
                  </span>
                  <span className="flex items-center gap-1.5 font-mono text-emerald-400 font-semibold">
                    <IndianRupee className="w-3.5 h-3.5" /> {j.salary_range || 'Government Pay Matrix'}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <button
                  onClick={() => setSelectedJob(j)}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs shadow-md shadow-blue-600/20 transition-transform hover:scale-[1.02]"
                >
                  Apply Online
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Application Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[11px] font-mono text-cyan-400 uppercase font-bold tracking-wider">Candidate Application</span>
            <h2 className="text-lg font-black text-white mt-1">{selectedJob.title}</h2>
            <p className="text-xs text-slate-400">{selectedJob.organization}</p>

            {applySuccess ? (
              <div className="my-8 p-4 rounded-xl bg-emerald-950/60 border border-emerald-800 text-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                <p className="text-xs font-bold text-emerald-300">{applySuccess}</p>
              </div>
            ) : (
              <form onSubmit={handleApply} className="mt-5 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Resume Summary / Academic Qualifications
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    placeholder="e.g. B.Tech Graduate, 8.2 CGPA, 2 years UPSC General Studies preparation..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Statement of Interest / Cover Note
                  </label>
                  <textarea
                    rows={2}
                    value={coverNote}
                    onChange={(e) => setCoverNote(e.target.value)}
                    placeholder="Briefly state your motivation for this position..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs shadow-lg shadow-blue-600/30 flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" /> Submit Official Application
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
