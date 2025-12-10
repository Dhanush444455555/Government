"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  BookOpen, 
  Award, 
  Users,
  TrendingUp,
  FileText,
  Download,
  Play,
  ChevronRight,
  Star,
  Target,
  BarChart3,
  Zap,
  AlertCircle,
  CheckCircle,
  Heart,
  Share2,
  Bookmark,
  ExternalLink,
  ArrowRight,
  X,
  Menu,
  GraduationCap,
  Lightbulb,
  Globe,
  Shield
} from "lucide-react";

interface Exam {
  id: string;
  title: string;
  description: string;
  examType: string;
  level: string;
  duration: number;
  totalMarks: number;
  passingMarks: number;
  examDate: string | null;
  lastDateToApply: string | null;
  category: {
    id: string;
    name: string;
    color: string;
  };
  _count: {
    studyMaterials: number;
    mockTests: number;
    previousPapers: number;
  };
}

interface ExamCategory {
  id: string;
  name: string;
  description: string;
  color: string;
  _count: {
    exams: number;
  };
}

export default function ExamsPage() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [categories, setCategories] = useState<ExamCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedExamType, setSelectedExamType] = useState<string>("");
  const [selectedLevel, setSelectedLevel] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<string>("date");
  const [savedExams, setSavedExams] = useState<Set<string>>(new Set());
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const examTypes = [
    { value: "government", label: "Government", icon: "🏛️", color: "from-blue-500 to-blue-600" },
    { value: "banking", label: "Banking", icon: "🏦", color: "from-green-500 to-green-600" },
    { value: "railway", label: "Railway", icon: "🚂", color: "from-purple-500 to-purple-600" },
    { value: "defense", label: "Defense", icon: "⚔️", color: "from-red-500 to-red-600" },
    { value: "teaching", label: "Teaching", icon: "📚", color: "from-yellow-500 to-yellow-600" },
    { value: "engineering", label: "Engineering", icon: "⚙️", color: "from-indigo-500 to-indigo-600" }
  ];

  const levels = [
    { value: "beginner", label: "Beginner", color: "from-green-500 to-emerald-500" },
    { value: "intermediate", label: "Intermediate", color: "from-yellow-500 to-orange-500" },
    { value: "advanced", label: "Advanced", color: "from-red-500 to-pink-500" }
  ];

  const sortOptions = [
    { value: "date", label: "Latest First" },
    { value: "name", label: "Alphabetical" },
    { value: "popularity", label: "Most Popular" },
    { value: "deadline", label: "Urgent Deadlines" }
  ];

  useEffect(() => {
    fetchCategories();
    fetchExams();
  }, [selectedCategory, selectedExamType, selectedLevel, sortBy]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/exam-categories');
      const data = await response.json();
      setCategories(data.categories || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchExams = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (selectedCategory) params.append('category', selectedCategory);
      if (selectedExamType) params.append('examType', selectedExamType);
      if (selectedLevel) params.append('level', selectedLevel);
      
      const response = await fetch(`/api/exams?${params}`);
      const data = await response.json();
      
      // Sort exams based on selected option
      let sortedExams = data.exams || [];
      switch (sortBy) {
        case 'name':
          sortedExams.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'deadline':
          sortedExams.sort((a, b) => {
            if (!a.lastDateToApply) return 1;
            if (!b.lastDateToApply) return -1;
            return new Date(a.lastDateToApply).getTime() - new Date(b.lastDateToApply).getTime();
          });
          break;
        case 'popularity':
          sortedExams.sort((a, b) => b._count.mockTests - a._count.mockTests);
          break;
        default:
          sortedExams.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
      }
      
      setExams(sortedExams);
    } catch (error) {
      console.error('Error fetching exams:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredExams = exams.filter(exam => 
    exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exam.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not announced";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getDaysRemaining = (dateString: string | null) => {
    if (!dateString) return null;
    const today = new Date();
    const targetDate = new Date(dateString);
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const toggleSaveExam = (examId: string) => {
    const newSavedExams = new Set(savedExams);
    if (newSavedExams.has(examId)) {
      newSavedExams.delete(examId);
    } else {
      newSavedExams.add(examId);
    }
    setSavedExams(newSavedExams);
  };

  const shareExam = (exam: Exam) => {
    if (navigator.share) {
      navigator.share({
        title: exam.title,
        text: exam.description,
        url: window.location.href
      });
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const getExamTypeColor = (examType: string) => {
    const type = examTypes.find(t => t.value === examType);
    return type?.color || "from-gray-500 to-gray-600";
  };

  const getLevelColor = (level: string) => {
    const lvl = levels.find(l => l.value === level);
    return lvl?.color || "from-gray-500 to-gray-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <GraduationCap className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Exam Guidance
                </h1>
                <p className="text-gray-600 text-sm">Comprehensive preparation for government exams</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="hover:scale-105 transition-transform duration-200"
              >
                <div className="grid grid-cols-2 gap-1 w-4 h-4">
                  <div className="w-1.5 h-1.5 bg-current rounded-sm"></div>
                  <div className="w-1.5 h-1.5 bg-current rounded-sm"></div>
                  <div className="w-1.5 h-1.5 bg-current rounded-sm"></div>
                  <div className="w-1.5 h-1.5 bg-current rounded-sm"></div>
                </div>
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="hover:scale-105 transition-transform duration-200"
              >
                <div className="space-y-1 w-4 h-4">
                  <div className="w-full h-0.5 bg-current rounded-sm"></div>
                  <div className="w-full h-0.5 bg-current rounded-sm"></div>
                  <div className="w-full h-0.5 bg-current rounded-sm"></div>
                </div>
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Target className="w-4 h-4 mr-2" />
                Set Goal
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105 border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Total Exams</p>
                  <p className="text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    {exams.length}
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-xl group-hover:bg-blue-200 group-hover:scale-110 transition-all duration-300">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105 border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Categories</p>
                  <p className="text-3xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300">
                    {categories.length}
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-xl group-hover:bg-green-200 group-hover:scale-110 transition-all duration-300">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105 border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Study Materials</p>
                  <p className="text-3xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                    {exams.reduce((sum, exam) => sum + exam._count.studyMaterials, 0)}
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-xl group-hover:bg-purple-200 group-hover:scale-110 transition-all duration-300">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105 border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Mock Tests</p>
                  <p className="text-3xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                    {exams.reduce((sum, exam) => sum + exam._count.mockTests, 0)}
                  </p>
                </div>
                <div className="p-3 bg-orange-100 rounded-xl group-hover:bg-orange-200 group-hover:scale-110 transition-all duration-300">
                  <BarChart3 className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Filter className="w-5 h-5 mr-3 text-blue-600" />
              Advanced Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search exams..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 hover:border-blue-300 focus:border-blue-500 transition-colors duration-200"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="hover:border-blue-300 focus:border-blue-500 transition-colors duration-200">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name} ({category._count.exams})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedExamType} onValueChange={setSelectedExamType}>
                <SelectTrigger className="hover:border-blue-300 focus:border-blue-500 transition-colors duration-200">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Types</SelectItem>
                  {examTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.icon} {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="hover:border-blue-300 focus:border-blue-500 transition-colors duration-200">
                  <SelectValue placeholder="All Levels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Levels</SelectItem>
                  {levels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="hover:border-blue-300 focus:border-blue-500 transition-colors duration-200">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Card 
                key={category.id} 
                className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-0"
                onClick={() => setSelectedCategory(category.name)}
              >
                <CardContent className="pt-6 pb-4 text-center">
                  <Badge className={`mb-3 ${category.color} text-white border-0 px-4 py-2 font-semibold shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {category.name}
                  </Badge>
                  <div className="text-sm text-gray-600 font-medium group-hover:text-gray-800 transition-colors duration-300">
                    {category._count.exams} exams
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Exams List/Grid */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Available Exams ({filteredExams.length})
          </h2>
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce delay-100"></div>
                <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce delay-200"></div>
              </div>
              <p className="text-gray-600 mt-4">Loading amazing exams...</p>
            </div>
          ) : filteredExams.length === 0 ? (
            <Card className="text-center py-12 border-0">
              <CardContent>
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No exams found</h3>
                <p className="text-gray-600">Try adjusting your filters or search terms</p>
              </CardContent>
            </Card>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExams.map((exam) => (
                <Card 
                  key={exam.id} 
                  className="group hover:shadow-xl transition-all duration-500 hover:scale-105 border-0 overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${getExamTypeColor(exam.examType)} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Badge className={`bg-gradient-to-r ${getExamTypeColor(exam.examType)} text-white border-0 px-3 py-1 text-xs font-semibold`}>
                          {exam.examType}
                        </Badge>
                        <Badge className={`bg-gradient-to-r ${getLevelColor(exam.level)} text-white border-0 px-3 py-1 text-xs font-semibold`}>
                          {exam.level}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleSaveExam(exam.id)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                        >
                          <Heart className={`w-4 h-4 ${savedExams.has(exam.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'} group-hover:scale-110 transition-transform duration-300`} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => shareExam(exam)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                        >
                          <Share2 className="w-4 h-4 text-gray-400 group-hover:scale-110 transition-transform duration-300" />
                        </Button>
                      </div>
                    </div>
                    <CardTitle className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                      {exam.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300 line-clamp-3">
                      {exam.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="flex items-center text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                        <Clock className="w-4 h-4 mr-2 text-blue-500" />
                        {exam.duration} mins
                      </div>
                      <div className="flex items-center text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                        <Award className="w-4 h-4 mr-2 text-green-500" />
                        {exam.totalMarks} marks
                      </div>
                      <div className="flex items-center text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                        <Target className="w-4 h-4 mr-2 text-purple-500" />
                        {exam.passingMarks} to pass
                      </div>
                      <div className="flex items-center text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                        <Calendar className="w-4 h-4 mr-2 text-orange-500" />
                        {formatDate(exam.examDate)}
                      </div>
                    </div>

                    {exam.lastDateToApply && (
                      <div className="mb-4">
                        {(() => {
                          const days = getDaysRemaining(exam.lastDateToApply);
                          return days !== null && days <= 30 ? (
                            <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-3">
                              <div className="flex items-center text-red-800">
                                <AlertCircle className="w-4 h-4 mr-2" />
                                <span className="font-medium">
                                  {days === 0 ? 'Last day to apply!' : `${days} days left to apply`}
                                </span>
                              </div>
                            </div>
                          ) : null;
                        })()}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center group-hover:text-gray-700 transition-colors duration-300">
                          <FileText className="w-4 h-4 mr-1" />
                          {exam._count.studyMaterials}
                        </div>
                        <div className="flex items-center group-hover:text-gray-700 transition-colors duration-300">
                          <BarChart3 className="w-4 h-4 mr-1" />
                          {exam._count.mockTests}
                        </div>
                        <div className="flex items-center group-hover:text-gray-700 transition-colors duration-300">
                          <Download className="w-4 h-4 mr-1" />
                          {exam._count.previousPapers}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 hover:scale-105 group"
                        >
                          <BookOpen className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                          Study
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 hover:scale-105 group"
                        >
                          <Play className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                          Practice
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredExams.map((exam) => (
                <Card 
                  key={exam.id} 
                  className="group hover:shadow-xl transition-all duration-500 hover:scale-[1.02] border-0"
                >
                  <div className="flex">
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Badge className={`bg-gradient-to-r ${getExamTypeColor(exam.examType)} text-white border-0 px-4 py-2 text-sm font-semibold`}>
                            {exam.examType}
                          </Badge>
                          <Badge className={`bg-gradient-to-r ${getLevelColor(exam.level)} text-white border-0 px-4 py-2 text-sm font-semibold`}>
                            {exam.level}
                          </Badge>
                          <Badge className="bg-gradient-to-r from-gray-500 to-gray-600 text-white border-0 px-4 py-2 text-sm font-semibold">
                            {exam.category.name}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleSaveExam(exam.id)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                          >
                            <Heart className={`w-5 h-5 ${savedExams.has(exam.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'} group-hover:scale-110 transition-transform duration-300`} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => shareExam(exam)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                          >
                            <Share2 className="w-5 h-5 text-gray-400 group-hover:scale-110 transition-transform duration-300" />
                          </Button>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                        {exam.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-4 group-hover:text-gray-700 transition-colors duration-300">
                        {exam.description}
                      </p>
                      <div className="flex items-center space-x-6 text-sm text-gray-600 mb-4">
                        <div className="flex items-center group-hover:text-gray-800 transition-colors duration-300">
                          <Clock className="w-4 h-4 mr-2 text-blue-500" />
                          {exam.duration} minutes
                        </div>
                        <div className="flex items-center group-hover:text-gray-800 transition-colors duration-300">
                          <Award className="w-4 h-4 mr-2 text-green-500" />
                          {exam.totalMarks} marks
                        </div>
                        <div className="flex items-center group-hover:text-gray-800 transition-colors duration-300">
                          <Target className="w-4 h-4 mr-2 text-purple-500" />
                          {exam.passingMarks} passing
                        </div>
                        <div className="flex items-center group-hover:text-gray-800 transition-colors duration-300">
                          <Calendar className="w-4 h-4 mr-2 text-orange-500" />
                          {formatDate(exam.examDate)}
                        </div>
                      </div>
                      {exam.lastDateToApply && (
                        <div className="mb-4">
                          {(() => {
                            const days = getDaysRemaining(exam.lastDateToApply);
                            return days !== null && days <= 30 ? (
                              <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-3 inline-block">
                                <div className="flex items-center text-red-800">
                                  <AlertCircle className="w-4 h-4 mr-2" />
                                  <span className="font-medium">
                                    {days === 0 ? 'Last day to apply!' : `${days} days left`}
                                  </span>
                                </div>
                              </div>
                            ) : null;
                          })()}
                        </div>
                      )}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                          <span className="group-hover:text-gray-700 transition-colors duration-300">
                            {exam._count.studyMaterials} materials
                          </span>
                          <span className="group-hover:text-gray-700 transition-colors duration-300">
                            {exam._count.mockTests} mock tests
                          </span>
                          <span className="group-hover:text-gray-700 transition-colors duration-300">
                            {exam._count.previousPapers} papers
                          </span>
                        </div>
                        <div className="flex space-x-3">
                          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 hover:scale-105 group">
                            View Details
                            <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}