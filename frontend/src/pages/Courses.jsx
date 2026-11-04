import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, Sparkles, Filter } from 'lucide-react';
import CourseFolder from '../components/CourseFolder';
import api from '../api/client';

export default function Courses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  const fallbackCourses = [
    {
      id: "upsc",
      title: "UPSC Civil Services",
      description: "Comprehensive materials for Prelims and Mains. Includes NCERT summaries, daily current affairs, and CSAT guides.",
      color: "bg-orange-500",
      resourceCount: 1240,
      category: "Civil Services"
    },
    {
      id: "ssc",
      title: "SSC CGL & CHSL",
      description: "Targeted preparation for Staff Selection Commission exams with mock tests and quantitative aptitude shortcuts.",
      color: "bg-blue-500",
      resourceCount: 850,
      category: "Staff Selection"
    },
    {
      id: "banking",
      title: "Banking & Insurance",
      description: "SBI PO, IBPS, and RBI Grade B focused content with banking awareness and data interpretation sets.",
      color: "bg-green-500",
      resourceCount: 920,
      category: "Banking"
    },
    {
      id: "railways",
      title: "Indian Railways (RRB)",
      description: "NTPC and Group D specific study plans specializing in General Science and General Awareness.",
      color: "bg-red-500",
      resourceCount: 650,
      category: "Railways"
    },
    {
      id: "gate",
      title: "GATE & ESE",
      description: "Technical subjects notes for CS, ME, EE, and EC streams along with previous year question papers.",
      color: "bg-purple-500",
      resourceCount: 1500,
      category: "Engineering"
    },
    {
      id: "def",
      title: "Defence (NDA/CDS)",
      description: "Preparation strategy for National Defence Academy and CDS exams with physical training tips.",
      color: "bg-teal-500",
      resourceCount: 430,
      category: "Defence"
    },
  ];

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await api.get('/courses');
        if (res.data && res.data.length > 0) {
          setCourses(res.data);
        } else {
          setCourses(fallbackCourses);
        }
      } catch (err) {
        setCourses(fallbackCourses);
      } finally {
        setLoading(false);
      }
    }
    fetchCourses();
  }, []);

  const categories = [
    { id: "all", name: "All Exams" },
    { id: "Civil Services", name: "UPSC & Civil Services" },
    { id: "Staff Selection", name: "SSC (CGL & CHSL)" },
    { id: "Banking", name: "Banking & Insurance" },
    { id: "Railways", name: "Railways (RRB)" },
    { id: "Defence", name: "Defence (NDA/CDS)" },
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      (course.category && course.category.toLowerCase() === selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Curated Exam Repositories
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight">
              Select Your Exam Course
            </h1>
            <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">
              Browse through our organized repositories of study materials. Pick your path and start preparing with AI.
            </p>
          </motion.div>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8 relative">
          <Search className="absolute left-4 top-3.5 text-slate-400 w-5 h-5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for an exam (e.g., UPSC, SSC, Banking)..."
            className="w-full pl-12 pr-4 py-3.5 bg-slate-900 border border-slate-700 rounded-full text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 shadow-md text-sm"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-14 max-w-3xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              <CourseFolder
                title={course.title}
                description={course.description}
                color={course.color}
                resourceCount={course.resourceCount || 100}
                onClick={() => navigate(`/courses/${course.id}`)}
              />
            </motion.div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            <p className="text-lg">No exam courses found matching your query.</p>
          </div>
        )}
      </div>
    </div>
  );
}

