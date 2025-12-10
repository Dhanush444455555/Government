"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Briefcase, 
  TrendingUp, 
  Calendar,
  Clock,
  Target,
  Award,
  BarChart3,
  FileText,
  CheckCircle,
  AlertCircle,
  Star,
  User,
  Settings,
  Bell,
  Zap,
  Users,
  ArrowRight,
  Play,
  Pause,
  Volume2,
  Download,
  Eye,
  Heart,
  Share2,
  ChevronRight,
  Activity,
  Trophy,
  Flame,
  Shield,
  Globe,
  Lightbulb
} from "lucide-react";

export default function DashboardPage() {
  const [userStats, setUserStats] = useState({
    studyHours: 45,
    completedTests: 12,
    averageScore: 78,
    savedMaterials: 23,
    appliedJobs: 8,
    interviewScheduled: 2,
    streak: 7,
    rank: 127
  });

  const [recentActivity] = useState([
    {
      id: 1,
      type: 'study',
      title: 'Completed UPSC Prelims Mock Test',
      description: 'Scored 145/200 marks - Great improvement!',
      time: '2 hours ago',
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
      color: 'green',
      action: 'View Results'
    },
    {
      id: 2,
      type: 'job',
      title: 'Applied for SBI PO Position',
      description: 'Application submitted successfully',
      time: '5 hours ago',
      icon: <Briefcase className="w-5 h-5 text-blue-600" />,
      color: 'blue',
      action: 'Track Status'
    },
    {
      id: 3,
      type: 'study',
      title: 'Saved Banking Study Material',
      description: 'Added to favorites',
      time: '1 day ago',
      icon: <BookOpen className="w-5 h-5 text-purple-600" />,
      color: 'purple',
      action: 'Continue Reading'
    },
    {
      id: 4,
      type: 'achievement',
      title: '7-Day Study Streak! 🔥',
      description: 'Keep up the amazing work',
      time: '2 days ago',
      icon: <Flame className="w-5 h-5 text-orange-600" />,
      color: 'orange',
      action: 'Share Achievement'
    }
  ]);

  const [upcomingEvents] = useState([
    {
      id: 1,
      title: 'UPSC Prelims Exam',
      date: '2024-06-16',
      type: 'exam',
      daysLeft: 45,
      priority: 'high',
      icon: '📝'
    },
    {
      id: 2,
      title: 'IBPS PO Interview',
      date: '2024-03-15',
      type: 'interview',
      daysLeft: 15,
      priority: 'medium',
      icon: '💼'
    },
    {
      id: 3,
      title: 'RRB Group D Exam',
      date: '2024-08-17',
      type: 'exam',
      daysLeft: 108,
      priority: 'low',
      icon: '🚂'
    }
  ]);

  const [savedMaterials] = useState([
    {
      id: 1,
      title: 'UPSC History Notes',
      subject: 'History',
      progress: 75,
      lastAccessed: '2 days ago',
      difficulty: 'Advanced',
      estimatedTime: '4 hours',
      icon: '📚'
    },
    {
      id: 2,
      title: 'Banking Awareness Guide',
      subject: 'Banking',
      progress: 60,
      lastAccessed: '1 week ago',
      difficulty: 'Intermediate',
      estimatedTime: '2 hours',
      icon: '🏦'
    },
    {
      id: 3,
      title: 'Quantitative Aptitude Practice',
      subject: 'Mathematics',
      progress: 90,
      lastAccessed: '3 days ago',
      difficulty: 'Beginner',
      estimatedTime: '1 hour',
      icon: '🔢'
    }
  ]);

  const [activeTab, setActiveTab] = useState('overview');
  const [notifications, setNotifications] = useState(3);

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-yellow-500';
    if (progress >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'from-red-500 to-red-600';
      case 'medium': return 'from-yellow-500 to-orange-500';
      case 'low': return 'from-green-500 to-green-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'study': return <BookOpen className="w-5 h-5" />;
      case 'job': return <Briefcase className="w-5 h-5" />;
      case 'achievement': return <Trophy className="w-5 h-5" />;
      default: return <Activity className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-xs text-white font-bold">7</span>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Welcome back, Student!</h1>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
                    Rank #{userStats.rank}
                  </Badge>
                  <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
                    <Flame className="w-3 h-3 mr-1" />
                    {userStats.streak} day streak
                  </Badge>
                </div>
                <p className="text-gray-600">Track your progress and achieve your goals</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" className="hover:scale-105 transition-transform duration-200 relative">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
                {notifications > 0 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-bold">{notifications}</span>
                  </div>
                )}
              </Button>
              <Button variant="outline" size="sm" className="hover:scale-105 transition-transform duration-200">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Study Hours</p>
                  <p className="text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    {userStats.studyHours}
                  </p>
                  <div className="flex items-center mt-2 text-green-600">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium">+5% this week</span>
                  </div>
                </div>
                <div className="p-3 bg-blue-100 rounded-xl group-hover:bg-blue-200 group-hover:scale-110 transition-all duration-300">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Tests Completed</p>
                  <p className="text-3xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300">
                    {userStats.completedTests}
                  </p>
                  <div className="flex items-center mt-2 text-green-600">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium">+2 this week</span>
                  </div>
                </div>
                <div className="p-3 bg-green-100 rounded-xl group-hover:bg-green-200 group-hover:scale-110 transition-all duration-300">
                  <FileText className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Average Score</p>
                  <p className="text-3xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                    {userStats.averageScore}%
                  </p>
                  <div className="flex items-center mt-2 text-green-600">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium">+3% improvement</span>
                  </div>
                </div>
                <div className="p-3 bg-purple-100 rounded-xl group-hover:bg-purple-200 group-hover:scale-110 transition-all duration-300">
                  <BarChart3 className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Jobs Applied</p>
                  <p className="text-3xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                    {userStats.appliedJobs}
                  </p>
                  <div className="flex items-center mt-2 text-blue-600">
                    <Briefcase className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium">2 interviews</span>
                  </div>
                </div>
                <div className="p-3 bg-orange-100 rounded-xl group-hover:bg-orange-200 group-hover:scale-110 transition-all duration-300">
                  <Briefcase className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress Overview */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <TrendingUp className="w-5 h-5 mr-3 text-blue-600" />
                  Your Progress
                </CardTitle>
                <CardDescription>Track your preparation journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Overall Preparation</span>
                      <span className="text-sm text-gray-600">68%</span>
                    </div>
                    <Progress value={68} className="h-3" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Study Materials</span>
                        <span className="text-sm text-gray-600">75%</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Mock Tests</span>
                        <span className="text-sm text-gray-600">60%</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Interview Prep</span>
                      <span className="text-sm text-gray-600">45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Application Skills</span>
                      <span className="text-sm text-gray-600">82%</span>
                    </div>
                    <Progress value={82} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Activity className="w-5 h-5 mr-3 text-purple-600" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Your latest learning and application activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div 
                      key={activity.id} 
                      className="flex items-start space-x-3 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300 group cursor-pointer"
                    >
                      <div className={`p-2 rounded-lg bg-${activity.color}-100 group-hover:bg-${activity.color}-200 group-hover:scale-110 transition-all duration-300`}>
                        {activity.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                            {activity.title}
                          </p>
                          <Badge variant="outline" className="text-xs group-hover:bg-blue-50 transition-colors duration-300">
                            {activity.action}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                          {activity.description}
                        </p>
                        <p className="text-xs text-gray-500 mt-1 group-hover:text-gray-600 transition-colors duration-300">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Upcoming Events */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Calendar className="w-5 h-5 mr-3 text-orange-600" />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div 
                      key={event.id} 
                      className="border-l-4 border-l-blue-500 pl-4 group-hover:border-l-blue-600 transition-colors duration-300"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                          {event.icon} {event.title}
                        </span>
                        <Badge 
                          className={`bg-gradient-to-r ${getPriorityColor(event.priority)} text-white border-0 text-xs group-hover:scale-110 transition-transform duration-300`}
                        >
                          {event.daysLeft === 0 ? 'Today!' : `${event.daysLeft} days`}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                        {new Date(event.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Saved Materials */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <BookOpen className="w-5 h-5 mr-3 text-green-600" />
                  Saved Materials
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {savedMaterials.map((material) => (
                    <div 
                      key={material.id} 
                      className="p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300 group cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl">{material.icon}</span>
                          <div>
                            <span className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                              {material.title}
                            </span>
                            <Badge variant="outline" className="text-xs ml-2">
                              {material.difficulty}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Button variant="ghost" size="sm" className="p-1 hover:bg-blue-50 rounded">
                            <Heart className="w-4 h-4 text-red-500" />
                          </Button>
                          <Button variant="ghost" size="sm" className="p-1 hover:bg-blue-50 rounded">
                            <Share2 className="w-4 h-4 text-blue-500" />
                          </Button>
                        </div>
                      </div>
                      <div className="mb-2">
                        <div className="flex justify-between mb-1">
                          <span className="text-xs text-gray-600">Progress</span>
                          <span className="text-xs text-gray-600">{material.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(material.progress)}`}
                            style={{ width: `${material.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Subject: {material.subject}</span>
                        <span>Est. {material.estimatedTime}</span>
                      </div>
                      <div className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
                        Last accessed {material.lastAccessed}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Zap className="w-5 h-5 mr-3 text-blue-600" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full justify-start hover:scale-105 transition-transform duration-200 group">
                    <Play className="w-4 h-4 mr-3 group-hover:scale-110 transition-transform duration-300" />
                    Continue Studying
                    <ArrowRight className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                  <Button variant="outline" className="w-full justify-start hover:scale-105 transition-transform duration-200 group">
                    <FileText className="w-4 h-4 mr-3 group-hover:scale-110 transition-transform duration-300" />
                    Take Mock Test
                    <ArrowRight className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                  <Button variant="outline" className="w-full justify-start hover:scale-105 transition-transform duration-200 group">
                    <Briefcase className="w-4 h-4 mr-3 group-hover:scale-110 transition-transform duration-300" />
                    Browse Jobs
                    <ArrowRight className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                  <Button variant="outline" className="w-full justify-start hover:scale-105 transition-transform duration-200 group">
                    <Users className="w-4 h-4 mr-3 group-hover:scale-110 transition-transform duration-300" />
                    Find Mentor
                    <ArrowRight className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}