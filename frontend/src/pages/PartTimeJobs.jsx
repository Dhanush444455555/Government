import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, MapPin, Navigation, ExternalLink, Map as MapIcon, Clock, DollarSign, Building } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PartTimeJobs() {
  const navigate = useNavigate();
  const [location, setLocation] = useState("Bangalore");

  const openGoogleMaps = () => {
    window.open(`https://www.google.com/maps/search/part+time+jobs+near+${encodeURIComponent(location)}`, '_blank');
  };

  const jobs = [
    {
      title: "Data Entry & Content Operator",
      company: "QuickTech Administrative Services",
      salary: "₹15,000 - ₹20,000/mo",
      location: location,
      description: "Basic computer knowledge and typing speed of 40 WPM. Flexible 3-hour morning or evening shifts suitable for exam aspirants.",
      tags: ["Data Entry", "Flexible", "Fresher"],
      type: "Part-Time"
    },
    {
      title: "Home Tutor (General Studies & Mathematics)",
      company: "Local Aspirants Network",
      salary: "₹10,000 - ₹15,000/mo",
      location: `${location} - Central`,
      description: "Tutor high school and secondary students in Indian History, Basic Mathematics, and Science for 2 hours daily.",
      tags: ["Teaching", "Tutor", "Exam Prep"],
      type: "Part-Time"
    },
    {
      title: "Delivery & Logistics Executive",
      company: "National Logistics Network",
      salary: "₹22,000 - ₹30,000/mo",
      location: `${location} (Multiple Hubs)`,
      description: "Flexible weekend or evening gig shifts with weekly direct bank payouts and health insurance coverage.",
      tags: ["Logistics", "Flexible Shifts", "Gigs"],
      type: "Flexible Shift"
    },
    {
      title: "Library & Archive Assistant",
      company: "City Reading Room & Book Center",
      salary: "₹12,000/mo",
      location: location,
      description: "Manage book cataloging, silent study environment, and digitize previous exam paper records. Allows 3 hours of quiet study time on duty.",
      tags: ["Library", "Quiet Hours", "Aspirant Friendly"],
      type: "Part-Time"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate('/employment')}
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Employment Hub
        </button>

        {/* Header & Location */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-800 mb-8 gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl sm:text-4xl font-black text-white">
                Part-Time Jobs & Near Me
              </h1>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-500/30">
                Live Feed
              </span>
            </div>
            <p className="text-sm text-slate-400 mt-1">
              Find local flexible shifts, data entry, and tutoring jobs that balance with exam preparation.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 p-2 rounded-2xl">
            <div className="flex items-center gap-2 px-3 text-sm text-slate-300">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter city..."
                className="bg-transparent text-white focus:outline-none text-sm w-36"
              />
            </div>
            <button
              onClick={openGoogleMaps}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Navigation className="w-3.5 h-3.5" /> Locate
            </button>
          </div>
        </div>

        {/* Map Preview Banner */}
        <div
          onClick={openGoogleMaps}
          className="mb-10 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl cursor-pointer hover:border-blue-500/50 transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-cyan-400 flex items-center justify-center group-hover:scale-105 transition-transform">
              <MapIcon className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">
                Interactive Google Maps Search for "{location}"
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Click to explore nearby part-time jobs, student gigs, and verified local openings.
              </p>
            </div>
          </div>
          <span className="px-4 py-2 rounded-xl bg-blue-600 group-hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-md">
            Open Map <ExternalLink className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Job Cards */}
        <div className="space-y-4">
          {jobs.map((job, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-2 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                    {job.type}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {job.location}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white">{job.title}</h3>
                <p className="text-xs font-semibold text-cyan-300 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5" /> {job.company}
                </p>

                <p className="text-xs text-slate-300 leading-relaxed">{job.description}</p>

                <div className="flex flex-wrap gap-2 pt-1">
                  {job.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-[11px] px-2.5 py-0.5 rounded-md bg-slate-950 text-slate-400 border border-slate-800">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="shrink-0 text-right flex flex-col items-end gap-3">
                <span className="text-lg font-black text-emerald-400 block">{job.salary}</span>
                <button
                  onClick={() => alert(`Direct employer contact initiated for ${job.title}!`)}
                  className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-600/30 transition-all"
                >
                  Contact Employer
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

