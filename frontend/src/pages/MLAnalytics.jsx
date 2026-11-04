import React, { useState, useEffect } from 'react';
import api from '../api/client';
import {
  BrainCircuit,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  BarChart3,
  Award,
  BookOpen,
  ArrowRight,
  RefreshCw,
  Sliders,
  Compass,
  LineChart
} from 'lucide-react';

export default function MLAnalytics() {
  const [activeTab, setActiveTab] = useState('prediction');

  // Feature 1: Performance Prediction
  const [mockScore, setMockScore] = useState(65);
  const [studyHours, setStudyHours] = useState(6);
  const [gpa, setGpa] = useState(7.8);
  const [attempts, setAttempts] = useState(1);
  const [predictionResult, setPredictionResult] = useState(null);
  const [predictLoading, setPredictLoading] = useState(false);

  // Feature 2: Readiness Analysis
  const [subjectScores, setSubjectScores] = useState({
    history: 70,
    polity: 65,
    aptitude: 58,
    reasoning: 74,
    current_affairs: 60
  });
  const [testsTaken, setTestsTaken] = useState(8);
  const [readinessResult, setReadinessResult] = useState(null);
  const [readinessLoading, setReadinessLoading] = useState(false);

  // Feature 3: Course Recommender
  const [userInterests, setUserInterests] = useState("polity history governance administration");
  const [targetSector, setTargetSector] = useState("Civil Services");
  const [recommendations, setRecommendations] = useState([]);
  const [recLoading, setRecLoading] = useState(false);

  // Feature 4: Student Progress Classification
  const [weeklyHours, setWeeklyHours] = useState(24);
  const [testsCompleted, setTestsCompleted] = useState(6);
  const [avgScore, setAvgScore] = useState(72);
  const [activeDays, setActiveDays] = useState(20);
  const [progressResult, setProgressResult] = useState(null);
  const [progressLoading, setProgressLoading] = useState(false);

  // Matplotlib Chart
  const [chartBase64, setChartBase64] = useState(null);

  useEffect(() => {
    handlePredict();
    handleAnalyzeReadiness();
    handleRecommend();
    handleClassifyProgress();
    fetchChart();
  }, []);

  const handlePredict = async () => {
    setPredictLoading(true);
    try {
      const res = await api.post('/ml/predict-performance', {
        mock_score: parseFloat(mockScore),
        study_hours: parseFloat(studyHours),
        gpa: parseFloat(gpa),
        attempts: parseInt(attempts),
        revision_rounds: 2
      });
      setPredictionResult(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setPredictLoading(false);
    }
  };

  const handleAnalyzeReadiness = async () => {
    setReadinessLoading(true);
    try {
      const res = await api.post('/ml/analyze-readiness', {
        subject_scores: subjectScores,
        total_tests_taken: parseInt(testsTaken)
      });
      setReadinessResult(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setReadinessLoading(false);
    }
  };

  const handleRecommend = async () => {
    setRecLoading(true);
    try {
      const res = await api.post('/ml/recommend-courses', {
        user_interests: userInterests,
        target_sector: targetSector
      });
      setRecommendations(res.data.recommendations);
    } catch (e) {
      console.error(e);
    } finally {
      setRecLoading(false);
    }
  };

  const handleClassifyProgress = async () => {
    setProgressLoading(true);
    try {
      const res = await api.post('/ml/classify-progress', {
        weekly_hours: parseFloat(weeklyHours),
        tests_completed: parseInt(testsCompleted),
        avg_score: parseFloat(avgScore),
        active_days: parseInt(activeDays)
      });
      setProgressResult(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setProgressLoading(false);
    }
  };

  const fetchChart = async () => {
    try {
      const res = await api.get('/ml/chart/score-trend?scores=45,52,61,68,76,84');
      setChartBase64(res.data.chart_base64);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Title */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-1">
          <BrainCircuit className="w-4 h-4" /> Scikit-Learn • NumPy • Pandas • Matplotlib
        </div>
        <h1 className="text-3xl font-extrabold text-white">
          Practical Machine Learning Performance Intelligence
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Standard statistical learning models powering performance forecasting, exam readiness classification, and content recommendations.
        </p>
      </div>

      {/* 4 Feature Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {[
          { id: 'prediction', label: '1. Score Predictor', desc: 'Ridge Regression' },
          { id: 'readiness', label: '2. Readiness Analyzer', desc: 'Random Forest' },
          { id: 'recommend', label: '3. Course Recommender', desc: 'TF-IDF Similarity' },
          { id: 'progress', label: '4. Progress Classifier', desc: 'Logistic Regression' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`p-4 rounded-xl border text-left transition-all ${
              activeTab === tab.id
                ? 'bg-blue-600/20 border-cyan-400 text-white shadow-lg shadow-cyan-950/20'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <span className="block text-xs font-bold">{tab.label}</span>
            <span className="text-[10px] text-cyan-400 font-mono">{tab.desc}</span>
          </button>
        ))}
      </div>

      {/* Tab 1: Student Performance Prediction (Ridge Regression) */}
      {activeTab === 'prediction' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" /> Student Metric Attributes
            </h2>

            <div>
              <div className="flex justify-between text-xs text-slate-300 font-medium mb-1">
                <span>Recent Mock Test Score</span>
                <span className="font-mono text-cyan-400 font-bold">{mockScore} / 100</span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                value={mockScore}
                onChange={(e) => setMockScore(e.target.value)}
                className="w-full accent-cyan-400"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-300 font-medium mb-1">
                <span>Daily Dedicated Study Hours</span>
                <span className="font-mono text-cyan-400 font-bold">{studyHours} hrs/day</span>
              </div>
              <input
                type="range"
                min="1"
                max="14"
                value={studyHours}
                onChange={(e) => setStudyHours(e.target.value)}
                className="w-full accent-cyan-400"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-300 font-medium mb-1">
                <span>Graduation / Academic GPA</span>
                <span className="font-mono text-cyan-400 font-bold">{gpa} / 10.0</span>
              </div>
              <input
                type="range"
                min="5.0"
                max="10.0"
                step="0.1"
                value={gpa}
                onChange={(e) => setGpa(e.target.value)}
                className="w-full accent-cyan-400"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-300 font-medium mb-1">
                <span>Prior Exam Attempts</span>
                <span className="font-mono text-cyan-400 font-bold">{attempts}</span>
              </div>
              <input
                type="range"
                min="0"
                max="5"
                value={attempts}
                onChange={(e) => setAttempts(e.target.value)}
                className="w-full accent-cyan-400"
              />
            </div>

            <button
              onClick={handlePredict}
              disabled={predictLoading}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs shadow-md shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${predictLoading ? 'animate-spin' : ''}`} />
              Run Ridge Regression Prediction
            </button>
          </div>

          {/* Prediction Result Display */}
          <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
            {predictionResult ? (
              <div className="space-y-6">
                <div className="border-b border-slate-800 pb-4">
                  <span className="text-[11px] font-mono uppercase text-cyan-400 font-bold">
                    {predictionResult.model_type}
                  </span>
                  <h3 className="text-xl font-black text-white mt-1">Predicted Exam Outcome</h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
                    <span className="text-xs text-slate-400 block">Forecast Final Score</span>
                    <span className="text-3xl font-black text-cyan-400 mt-1 block">
                      {predictionResult.predicted_score} <span className="text-xs text-slate-500">/ 100</span>
                    </span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
                    <span className="text-xs text-slate-400 block">Clearing Probability</span>
                    <span className="text-3xl font-black text-emerald-400 mt-1 block">
                      {predictionResult.passing_probability}%
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Candidate Readiness Tier:</span>
                    <strong className="text-white">{predictionResult.performance_tier}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Optimal Daily Study Schedule:</span>
                    <strong className="text-cyan-400">{predictionResult.recommended_daily_hours} Hours / Day</strong>
                  </div>
                </div>

                {/* Trajectory Chart Embed */}
                {chartBase64 && (
                  <div>
                    <span className="text-xs font-mono font-bold text-slate-300 block mb-2 flex items-center gap-1.5">
                      <LineChart className="w-3.5 h-3.5 text-cyan-400" /> Matplotlib Score Progression Visualization
                    </span>
                    <img
                      src={`data:image/png;base64,${chartBase64}`}
                      alt="Student Performance Trajectory"
                      className="w-full rounded-xl border border-slate-800"
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center text-xs text-slate-500">
                Adjust metrics and click "Run Ridge Regression Prediction"
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Exam Preparation Performance Analysis (Random Forest) */}
      {activeTab === 'readiness' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-400" /> Subject Accuracy Percentages
            </h2>

            {Object.keys(subjectScores).map((subj) => (
              <div key={subj}>
                <div className="flex justify-between text-xs text-slate-300 capitalize mb-1">
                  <span>{subj.replace('_', ' ')}</span>
                  <span className="font-mono text-emerald-400 font-bold">{subjectScores[subj]}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={subjectScores[subj]}
                  onChange={(e) => setSubjectScores({ ...subjectScores, [subj]: parseFloat(e.target.value) })}
                  className="w-full accent-emerald-400"
                />
              </div>
            ))}

            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Completed Mock Tests</span>
                <span className="font-mono text-emerald-400 font-bold">{testsTaken}</span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                value={testsTaken}
                onChange={(e) => setTestsTaken(e.target.value)}
                className="w-full accent-emerald-400"
              />
            </div>

            <button
              onClick={handleAnalyzeReadiness}
              disabled={readinessLoading}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/30 flex items-center justify-center gap-2"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${readinessLoading ? 'animate-spin' : ''}`} />
              Run Random Forest Readiness Analysis
            </button>
          </div>

          <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            {readinessResult ? (
              <div className="space-y-5">
                <div className="border-b border-slate-800 pb-4">
                  <span className="text-[11px] font-mono uppercase text-emerald-400 font-bold">
                    {readinessResult.model}
                  </span>
                  <h3 className="text-xl font-black text-white mt-1">Readiness Classification</h3>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
                  <span className="text-xs text-slate-400">Classified Status</span>
                  <p className="text-xl font-black text-emerald-400 mt-1">{readinessResult.readiness_status}</p>
                  <span className="text-xs font-mono text-slate-400 mt-1 block">
                    Model Confidence: {readinessResult.readiness_probability}%
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40">
                  <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block mb-1">
                    Areas Requiring Revision:
                  </span>
                  <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
                    {readinessResult.weak_areas.map((w, idx) => (
                      <li key={idx}>{w}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/40">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                    Strongest Performance Pillars:
                  </span>
                  <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
                    {readinessResult.strong_areas.map((s, idx) => (
                      <li key={idx}>{s}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}

      {/* Tab 3: Personalized Course Recommendations (TF-IDF Similarity) */}
      {activeTab === 'recommend' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <Compass className="w-4 h-4 text-purple-400" /> TF-IDF & Cosine Similarity Matcher
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Describe Your Strengths, Focus Topics & Interests
                </label>
                <input
                  type="text"
                  value={userInterests}
                  onChange={(e) => setUserInterests(e.target.value)}
                  placeholder="e.g. aptitude, reasoning, constitution, banking, software"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Target Sector</label>
                <select
                  value={targetSector}
                  onChange={(e) => setTargetSector(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
                >
                  <option value="Civil Services">Civil Services</option>
                  <option value="Banking">Banking</option>
                  <option value="Railways">Railways</option>
                  <option value="Defense">Defense</option>
                  <option value="Engineering & IT">Engineering & IT</option>
                </select>
              </div>
            </div>
            <button
              onClick={handleRecommend}
              disabled={recLoading}
              className="mt-4 px-6 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md shadow-purple-600/30 flex items-center gap-2"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${recLoading ? 'animate-spin' : ''}`} />
              Compute TF-IDF Similarity Recommendations
            </button>
          </div>

          {/* Recommendations Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendations.map((rec) => (
              <div key={rec.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-purple-500/40 transition-all shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-950 text-purple-300">
                    {rec.category}
                  </span>
                  <span className="text-xs font-mono font-bold text-cyan-400">
                    {rec.match_percentage}% Relevance
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white">{rec.title}</h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{rec.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Student Progress Classification (Logistic Regression) */}
      {activeTab === 'progress' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h2 className="text-base font-bold text-white mb-2">Weekly Effort & Consistency Input</h2>

            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Weekly Study Hours:</span>
                <span className="font-mono text-cyan-400 font-bold">{weeklyHours} hrs</span>
              </div>
              <input
                type="range"
                min="5"
                max="60"
                value={weeklyHours}
                onChange={(e) => setWeeklyHours(e.target.value)}
                className="w-full accent-cyan-400"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Monthly Active Study Days:</span>
                <span className="font-mono text-cyan-400 font-bold">{activeDays} / 30</span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                value={activeDays}
                onChange={(e) => setActiveDays(e.target.value)}
                className="w-full accent-cyan-400"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Tests Completed:</span>
                <span className="font-mono text-cyan-400 font-bold">{testsCompleted}</span>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                value={testsCompleted}
                onChange={(e) => setTestsCompleted(e.target.value)}
                className="w-full accent-cyan-400"
              />
            </div>

            <button
              onClick={handleClassifyProgress}
              disabled={progressLoading}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs shadow-md shadow-blue-600/30 flex items-center justify-center gap-2"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${progressLoading ? 'animate-spin' : ''}`} />
              Classify Progress (Logistic Regression)
            </button>
          </div>

          <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            {progressResult ? (
              <div className="space-y-4">
                <div className="border-b border-slate-800 pb-3">
                  <span className="text-[11px] font-mono uppercase text-cyan-400 font-bold">
                    {progressResult.model_type}
                  </span>
                  <h3 className="text-xl font-black text-white mt-1">Classification Results</h3>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-xs text-slate-400 block mb-1">Status Tier</span>
                  <p className="text-lg font-black text-white">{progressResult.progress_category}</p>
                  <span className="text-xs text-emerald-400 font-mono">
                    Model Confidence: {progressResult.confidence_percentage}%
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-900/40">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                    Personalized Action Plan:
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {progressResult.personalized_action_plan}
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
