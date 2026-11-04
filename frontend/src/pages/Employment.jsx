import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, Briefcase, Filter, ExternalLink, Building, CheckCircle2, Sparkles } from 'lucide-react';
import CourseFolder from '../components/CourseFolder';
import SolarSystem3D from '../components/SolarSystem3D';
import api from '../api/client';

export default function Employment() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const jobFolders = [
    {
      id: "govt",
      title: "Government Jobs",
      description: "UPSC, SSC, Banking, Railways, and State PSC official notifications.",
      color: "bg-blue-600",
      resourceCount: 120,
      filter: "Government"
    },
    {
      id: "banking",
      title: "Banking & PSUs",
      description: "SBI, IBPS, RBI, ONGC, NTPC, and IOCL career opportunities.",
      color: "bg-purple-600",
      resourceCount: 450,
      filter: "Banking"
    },
    {
      id: "part-time",
      title: "Part-Time & Flexible Shifts",
      description: "Subject matter expert, tuition, and flexible shifts for students.",
      color: "bg-green-600",
      resourceCount: 85,
      isNew: true,
      href: "/employment/part-time"
    },
    {
      id: "internships",
      title: "Government Internships",
      description: "NITI Aayog, Ministry of External Affairs, and RBI research internships.",
      color: "bg-orange-600",
      resourceCount: 60,
      filter: "Internship"
    }
  ];

  const fallbackJobs = [
    {
      id: 1,
      title: "Civil Services Examination 2026 (IAS / IPS / IFS)",
      organization: "Union Public Service Commission (UPSC)",
      category: "Civil Services",
      job_type: "Government",
      location: "All India Cadres",
      vacancies: 1056,
      salary_range: "₹56,100 - ₹2,50,000 (Pay Level 10-18)",
      eligibility: "Graduate degree in any stream. Age 21-32 years.",
      official_url: "https://upsc.gov.in"
    },
    {
      id: 2,
      title: "Probationary Officer (Scale I) - 2026 Batch",
      organization: "State Bank of India (SBI)",
      category: "Banking",
      job_type: "Banking",
      location: "Pan India",
      vacancies: 2000,
      salary_range: "₹65,780/month Basic + DA, HRA, Lease Perks",
      eligibility: "Graduation in any discipline. Age 21-30 years.",
      official_url: "https://sbi.co.in/careers"
    },
    {
      id: 3,
      title: "Assistant Section Officer (Central Secretariat)",
      organization: "Staff Selection Commission (SSC CGL)",
      category: "Administrative",
      job_type: "Government",
      location: "New Delhi",
      vacancies: 980,
      salary_range: "₹44,900 - ₹1,42,400 (Pay Level 7)",
      eligibility: "Bachelor's Degree in any discipline. Age 20-30 years.",
      official_url: "https://ssc.gov.in"
    },
    {
      id: 4,
      title: "Junior Engineer (Signal & Telecommunication)",
      organization: "Indian Railways (RRB JE)",
      category: "Railways",
      job_type: "Government",
      location: "All Railway Zones",
      vacancies: 1200,
      salary_range: "₹35,400 - ₹1,12,400 (Pay Level 6)",
      eligibility: "Degree / Diploma in Electronics / Electrical / CS. Age 18-33.",
      official_url: "https://indianrailways.gov.in"
    }
  ];

  useEffect(() => {
    async function loadJobs() {
      try {
        const res = await api.get('/jobs');
        if (res.data && res.data.length > 0) {
          setJobs(res.data);
        } else {
          setJobs(fallbackJobs);
        }
      } catch (err) {
        setJobs(fallbackJobs);
      } finally {
        setLoading(false);
      }
    }
    loadJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      selectedFilter === "all" ||
      job.job_type.toLowerCase() === selectedFilter.toLowerCase() ||
      job.category.toLowerCase() === selectedFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen relative overflow-x-hidden text-white pt-24 pb-20">
      {/* Background Animated Gradient */}
      <div className="fixed inset-0 -z-50 bg-gradient-to-br from-indigo-950 via-purple-950 to-blue-950 animate-gradient-slow">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px] opacity-25"></div>
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-500/25 rounded-full blur-[120px] animate-blob pointer-events-none" />
        <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[140px] animate-blob animation-delay-2000 pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[20%] w-[400px] h-[400px] bg-pink-500/20 rounded-full blur-[120px] animate-blob animation-delay-4000 pointer-events-none" />

        {/* 3D Cosmic Overlay */}
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
          <SolarSystem3D
            centerText="EMPLOYMENT"
            orbitTerms={["Govt Jobs", "Private", "Internships", "Startups", "MNCs", "Freelance", "Remote"]}
            color="#10b981"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              Verified Public & Private Opportunities
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-emerald-200 to-white mb-4 drop-shadow-2xl">
              Find Your Dream Career
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto backdrop-blur-md bg-white/10 p-4 rounded-3xl border border-white/10 shadow-xl">
              Explore thousands of verified vacancies across government ministries, public sector banks, and state agencies.
            </p>
          </motion.div>

          {/* Search Bar */}
          <div className="mt-8 max-w-2xl mx-auto relative">
            <div className="relative flex items-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-full p-2 shadow-2xl">
              <Search className="w-5 h-5 text-blue-300 ml-4 shrink-0" />
              <input
                type="text"
                placeholder="Search by Designation, Department (e.g. UPSC, SBI, SSC)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent px-3 py-2 text-sm text-white placeholder-blue-200/60 focus:outline-none"
              />
              <button className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 px-6 py-2.5 text-xs font-bold text-white shadow-md shrink-0">
                Search
              </button>
            </div>
          </div>
        </div>

        {/* 4 Category Folders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
          {jobFolders.map((folder, index) => (
            <div key={folder.id} className="relative">
              <CourseFolder
                title={folder.title}
                description={folder.description}
                color={folder.color}
                resourceCount={folder.resourceCount}
                onClick={() => {
                  if (folder.href) {
                    navigate(folder.href);
                  } else {
                    setSelectedFilter(folder.filter || "all");
                  }
                }}
              />
              {folder.isNew && (
                <div className="flex justify-center absolute -top-1 right-3 z-30">
                  <span className="bg-red-500 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-lg border-2 border-white animate-pulse">
                    New Maps 🗺️
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Live Job Postings Directory */}
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
            <h3 className="text-2xl font-black text-white flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-cyan-400" />
              Active Job Notifications ({filteredJobs.length})
            </h3>
            <div className="flex items-center gap-2">
              {["all", "Government", "Banking"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedFilter(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                    selectedFilter.toLowerCase() === cat.toLowerCase()
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-white/5 border border-white/10 text-slate-300 hover:text-white'
                  }`}
                >
                  {cat === "all" ? "All Sectors" : cat}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl hover:border-blue-500/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-2 max-w-xl">
                  <div className="flex items-center gap-2.5">
                    <span className="px-3 py-0.5 rounded-full bg-blue-500/20 text-cyan-300 text-xs font-bold border border-blue-500/30">
                      {job.category || "Government"}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> {job.location}
                    </span>
                  </div>

                  <h4 className="text-xl font-bold text-white">{job.title}</h4>
                  <p className="text-xs font-semibold text-cyan-300 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5" /> {job.organization}
                  </p>

                  <p className="text-xs text-slate-300 leading-relaxed">{job.eligibility}</p>

                  <div className="flex flex-wrap gap-4 text-xs pt-1 font-semibold text-slate-400">
                    <span>Pay Scale: <strong className="text-emerald-400">{job.salary_range}</strong></span>
                    <span>Vacancies: <strong className="text-white">{job.vacancies} Posts</strong></span>
                  </div>
                </div>

                <div className="shrink-0 flex flex-col gap-2">
                  <a
                    href={job.official_url}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all"
                  >
                    Official Notification <ExternalLink className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => alert(`Application checklist generated for ${job.title}!`)}
                    className="px-6 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 hover:text-white transition-colors"
                  >
                    Check Eligibility Checklist
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

