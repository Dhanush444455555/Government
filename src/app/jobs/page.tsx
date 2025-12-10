"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  Building, 
  DollarSign,
  Clock,
  ExternalLink,
  Briefcase,
  Users,
  FileText,
  CheckCircle,
  AlertCircle,
  Star,
  TrendingUp,
  Heart,
  Share2,
  Bookmark,
  Eye,
  ArrowRight,
  ChevronDown,
  Grid,
  List,
  Zap,
  Shield,
  Globe,
  Target,
  BarChart3,
  Bell
} from "lucide-react";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string;
  salary: string;
  jobType: string;
  category: string;
  deadline: string | null;
  applicationUrl: string;
  postedAt: string;
  _count: {
    applications: number;
  };
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedJobType, setSelectedJobType] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<string>("date");
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    "Government", "Banking", "Railway", "Defense", "Teaching", 
    "Engineering", "Healthcare", "IT", "Administrative", "Police"
  ];

  const jobTypes = [
    { value: "government", label: "Government", icon: "🏛️", color: "from-blue-500 to-blue-600" },
    { value: "private", label: "Private", icon: "🏢", color: "from-green-500 to-green-600" },
    { value: "contract", label: "Contract", icon: "📋", color: "from-purple-500 to-purple-600" },
    { value: "temporary", label: "Temporary", icon: "⏰", color: "from-orange-500 to-orange-600" },
    { value: "permanent", label: "Permanent", icon: "🔒", color: "from-indigo-500 to-indigo-600" }
  ];

  const locations = [
    "Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata", 
    "Hyderabad", "Pune", "Ahmedabad", "Jaipur", "Lucknow"
  ];

  const sortOptions = [
    { value: "date", label: "Latest First" },
    { value: "salary", label: "Highest Salary" },
    { value: "deadline", label: "Urgent Deadlines" },
    { value: "popularity", label: "Most Popular" }
  ];

  useEffect(() => {
    fetchJobs();
  }, [selectedCategory, selectedJobType, selectedLocation, sortBy]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (selectedCategory) params.append('category', selectedCategory);
      if (selectedJobType) params.append('jobType', selectedJobType);
      if (selectedLocation) params.append('location', selectedLocation);
      
      const response = await fetch(`/api/jobs?${params}`);
      const data = await response.json();
      
      // Sort jobs based on selected option
      let sortedJobs = data.jobs || [];
      switch (sortBy) {
        case 'salary':
          sortedJobs.sort((a, b) => {
            const salaryA = parseInt(a.salary?.replace(/[^0-9]/g, '') || '0');
            const salaryB = parseInt(b.salary?.replace(/[^0-9]/g, '') || '0');
            return salaryB - salaryA;
          });
          break;
        case 'deadline':
          sortedJobs.sort((a, b) => {
            if (!a.deadline) return 1;
            if (!b.deadline) return -1;
            return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
          });
          break;
        case 'popularity':
          sortedJobs.sort((a, b) => b._count.applications - a._count.applications);
          break;
        default:
          sortedJobs.sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime());
      }
      
      setJobs(sortedJobs);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getDaysRemaining = (deadline: string | null) => {
    if (!deadline) return null;
    const today = new Date();
    const targetDate = new Date(deadline);
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const getJobTypeColor = (jobType: string) => {
    const type = jobTypes.find(t => t.value === jobType);
    return type?.color || "from-gray-500 to-gray-600";
  };

  const toggleSaveJob = (jobId: string) => {
    const newSavedJobs = new Set(savedJobs);
    if (newSavedJobs.has(jobId)) {
      newSavedJobs.delete(jobId);
    } else {
      newSavedJobs.add(jobId);
    }
    setSavedJobs(newSavedJobs);
  };

  const shareJob = (job: Job) => {
    if (navigator.share) {
      navigator.share({
        title: job.title,
        text: `${job.title} at ${job.company}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const getSalaryRange = (salary: string) => {
    if (!salary) return "Not disclosed";
    const numbers = salary.match(/\\d+/g);
    if (numbers && numbers.length >= 2) {
      return `₹${parseInt(numbers[0]).toLocaleString('en-IN')} - ₹${parseInt(numbers[1]).toLocaleString('en-IN')}`;
    }
    return salary;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Briefcase className="w-8 h-8 text-green-600" />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Employment Opportunities
                </h1>
                <p className="text-gray-600 text-sm">Find your dream government and private sector jobs</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="hover:scale-105 transition-transform duration-200"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="hover:scale-105 transition-transform duration-200"
              >
                <List className="w-4 h-4" />
              </Button>
              <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                <FileText className="w-4 h-4 mr-2" />
                Upload Resume
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
                  <p className="text-sm font-medium text-gray-600 mb-1">Active Jobs</p>
                  <p className="text-3xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300">
                    {jobs.length}
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-xl group-hover:bg-green-200 group-hover:scale-110 transition-all duration-300">
                  <Briefcase className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105 border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Government</p>
                  <p className="text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    {jobs.filter(job => job.jobType === 'government').length}
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-xl group-hover:bg-blue-200 group-hover:scale-110 transition-all duration-300">
                  <Building className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105 border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">New Today</p>
                  <p className="text-3xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                    {jobs.filter(job => {
                      const today = new Date().toDateString();
                      return new Date(job.postedAt).toDateString() === today;
                    }).length}
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-xl group-hover:bg-purple-200 group-hover:scale-110 transition-all duration-300">
                  <Zap className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105 border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Closing Soon</p>
                  <p className="text-3xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                    {jobs.filter(job => {
                      const days = getDaysRemaining(job.deadline);
                      return days !== null && days <= 7;
                    }).length}
                  </p>
                </div>
                <div className="p-3 bg-orange-100 rounded-xl group-hover:bg-orange-200 group-hover:scale-110 transition-all duration-300">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center text-xl">
                <Search className="w-5 h-5 mr-3 text-green-600" />
                Find Your Dream Job
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="hover:bg-green-50 transition-colors duration-200"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
                <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search jobs by title, company, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 hover:border-green-300 focus:border-green-500 transition-colors duration-200"
                />
              </div>
              
              {showFilters && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-in slide-in-from-top duration-300">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="hover:border-green-300 focus:border-green-500 transition-colors duration-200">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedJobType} onValueChange={setSelectedJobType}>
                    <SelectTrigger className="hover:border-green-300 focus:border-green-500 transition-colors duration-200">
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Types</SelectItem>
                      {jobTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.icon} {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger className="hover:border-green-300 focus:border-green-500 transition-colors duration-200">
                      <SelectValue placeholder="All Locations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Locations</SelectItem>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="hover:border-green-300 focus:border-green-500 transition-colors duration-200">
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
              )}
            </div>
          </CardContent>
        </Card>

        {/* Jobs List/Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Latest Opportunities ({filteredJobs.length})
            </h2>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Bell className="w-4 h-4" />
              <span>Get job alerts</span>
            </div>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-600 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-green-600 rounded-full animate-bounce delay-100"></div>
                <div className="w-3 h-3 bg-green-600 rounded-full animate-bounce delay-200"></div>
              </div>
              <p className="text-gray-600 mt-4">Finding amazing opportunities...</p>
            </div>
          ) : filteredJobs.length === 0 ? (
            <Card className="text-center py-12 border-0">
              <CardContent>
                <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
                <p className="text-gray-600">Try adjusting your filters or search terms</p>
              </CardContent>
            </Card>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => (
                <Card 
                  key={job.id} 
                  className="group hover:shadow-xl transition-all duration-500 hover:scale-105 border-0 overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${getJobTypeColor(job.jobType)} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Badge className={`bg-gradient-to-r ${getJobTypeColor(job.jobType)} text-white border-0 px-3 py-1 text-xs font-semibold`}>
                          {job.jobType}
                        </Badge>
                        <Badge className="bg-gradient-to-r from-gray-500 to-gray-600 text-white border-0 px-3 py-1 text-xs font-semibold">
                          {job.category}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleSaveJob(job.id)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                        >
                          <Heart className={`w-4 h-4 ${savedJobs.has(job.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'} group-hover:scale-110 transition-transform duration-300`} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => shareJob(job)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                        >
                          <Share2 className="w-4 h-4 text-gray-400 group-hover:scale-110 transition-transform duration-300" />
                        </Button>
                      </div>
                    </div>
                    <CardTitle className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300 line-clamp-2">
                      {job.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 mb-3 group-hover:text-gray-700 transition-colors duration-300">
                      {job.company}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="flex items-center text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                        <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                        {job.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                        <DollarSign className="w-4 h-4 mr-2 text-green-500" />
                        {getSalaryRange(job.salary)}
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4 line-clamp-3 group-hover:text-gray-800 transition-colors duration-300">
                      {job.description}
                    </p>

                    {job.deadline && (
                      <div className="mb-4">
                        {(() => {
                          const days = getDaysRemaining(job.deadline);
                          return days !== null && days <= 7 ? (
                            <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-3">
                              <div className="flex items-center text-red-800">
                                <AlertCircle className="w-4 h-4 mr-2" />
                                <span className="font-medium">
                                  {days === 0 ? 'Last day!' : `${days} days left`}
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
                          <Users className="w-4 h-4 mr-1" />
                          {job._count.applications}
                        </div>
                        <div className="flex items-center group-hover:text-gray-700 transition-colors duration-300">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(job.postedAt)}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="hover:bg-green-50 hover:border-green-300 transition-all duration-200 hover:scale-105 group"
                        >
                          <Eye className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                          View
                        </Button>
                        <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 transition-all duration-200 hover:scale-105 group">
                          Apply Now
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <Card 
                  key={job.id} 
                  className="group hover:shadow-xl transition-all duration-500 hover:scale-[1.02] border-0"
                >
                  <div className="flex">
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Badge className={`bg-gradient-to-r ${getJobTypeColor(job.jobType)} text-white border-0 px-4 py-2 text-sm font-semibold`}>
                            {job.jobType}
                          </Badge>
                          <Badge className="bg-gradient-to-r from-gray-500 to-gray-600 text-white border-0 px-4 py-2 text-sm font-semibold">
                            {job.category}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleSaveJob(job.id)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                          >
                            <Heart className={`w-5 h-5 ${savedJobs.has(job.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'} group-hover:scale-110 transition-transform duration-300`} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => shareJob(job)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                          >
                            <Share2 className="w-5 h-5 text-gray-400 group-hover:scale-110 transition-transform duration-300" />
                          </Button>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors duration-300">
                        {job.title}
                      </h3>
                      <p className="text-gray-600 mb-3 group-hover:text-gray-700 transition-colors duration-300">
                        {job.company}
                      </p>
                      <p className="text-gray-700 leading-relaxed mb-4 group-hover:text-gray-800 transition-colors duration-300">
                        {job.description}
                      </p>
                      <div className="flex items-center space-x-6 text-sm text-gray-600 mb-4">
                        <div className="flex items-center group-hover:text-gray-800 transition-colors duration-300">
                          <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                          {job.location}
                        </div>
                        <div className="flex items-center group-hover:text-gray-800 transition-colors duration-300">
                          <DollarSign className="w-4 h-4 mr-2 text-green-500" />
                          {getSalaryRange(job.salary)}
                        </div>
                        <div className="flex items-center group-hover:text-gray-800 transition-colors duration-300">
                          <Calendar className="w-4 h-4 mr-2 text-orange-500" />
                          {job.deadline ? formatDate(job.deadline) : 'No deadline'}
                        </div>
                        <div className="flex items-center group-hover:text-gray-800 transition-colors duration-300">
                          <Users className="w-4 h-4 mr-2 text-purple-500" />
                          {job._count.applications} applications
                        </div>
                      </div>
                      {job.deadline && (
                        <div className="mb-4">
                          {(() => {
                            const days = getDaysRemaining(job.deadline);
                            return days !== null && days <= 7 ? (
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
                            Posted {formatDate(job.postedAt)}
                          </span>
                        </div>
                        <div className="flex space-x-3">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="hover:bg-green-50 hover:border-green-300 transition-all duration-200 hover:scale-105 group"
                          >
                            <Eye className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                            Details
                          </Button>
                          <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 transition-all duration-200 hover:scale-105 group">
                            Apply Now
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