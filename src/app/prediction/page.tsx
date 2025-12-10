"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Loader2, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react";

export default function PredictionPage() {
    const [formData, setFormData] = useState({
        gpa: "8.5",
        studyHours: 6,
        mockScore: 75,
        attempts: 0,
    });
    const [prediction, setPrediction] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    const handlePredict = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setPrediction(null);

        try {
            const res = await fetch("/api/predict", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            setPrediction(data.probability);
        } catch (error) {
            console.error("Prediction failed", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        AI Exam Probability Predictor
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Leverage our advanced Machine Learning model to estimate your chances of success based on your current preparation metrics.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Input Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Card className="border-gray-200 shadow-lg h-full">
                            <CardHeader>
                                <CardTitle>Enter Your Metrics</CardTitle>
                                <CardDescription>Be honest for the most accurate prediction.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handlePredict} className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="gpa">Graduation GPA (CGPA)</Label>
                                        <Input
                                            id="gpa"
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            max="10"
                                            value={formData.gpa}
                                            onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-4">
                                        <Label>Daily Study Hours: {formData.studyHours}</Label>
                                        <Slider
                                            value={[formData.studyHours]}
                                            min={0}
                                            max={16}
                                            step={0.5}
                                            onValueChange={(val) => setFormData({ ...formData, studyHours: val[0] })}
                                            className="py-4"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="mock">Average Mock Test Score (%)</Label>
                                        <Input
                                            id="mock"
                                            type="number"
                                            min="0"
                                            max="100"
                                            value={formData.mockScore}
                                            onChange={(e) => setFormData({ ...formData, mockScore: Number(e.target.value) })}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="attempts">Previous Attempts</Label>
                                        <Input
                                            id="attempts"
                                            type="number"
                                            min="0"
                                            value={formData.attempts}
                                            onChange={(e) => setFormData({ ...formData, attempts: Number(e.target.value) })}
                                        />
                                    </div>

                                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
                                        {loading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...
                                            </>
                                        ) : (
                                            <>
                                                <TrendingUp className="mr-2 h-4 w-4" /> Predict Probability
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Result Display */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Card className={`h-full border-gray-200 shadow-lg flex items-center justify-center relative overflow-hidden ${prediction !== null ? 'bg-white' : 'bg-gray-100'}`}>
                            {prediction === null && !loading && (
                                <div className="text-center text-gray-400 p-8">
                                    <TrendingUp className="w-16 h-16 mx-auto mb-4 opacity-20" />
                                    <p>Fill out the form to see your prediction</p>
                                </div>
                            )}

                            {loading && (
                                <div className="text-center">
                                    <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
                                    <p className="text-gray-600 font-medium animate-pulse">Running ML Model...</p>
                                </div>
                            )}

                            {prediction !== null && !loading && (
                                <div className="text-center w-full p-8 relative z-10">
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ type: "spring", stiffness: 200 }}
                                    >
                                        <div className="inline-flex items-center justify-center w-40 h-40 rounded-full border-8 border-gray-100 bg-white shadow-xl mb-6 relative">
                                            <svg className="w-full h-full transform -rotate-90">
                                                <circle
                                                    cx="80"
                                                    cy="80"
                                                    r="70"
                                                    stroke="currentColor"
                                                    strokeWidth="10"
                                                    fill="transparent"
                                                    className="text-gray-100"
                                                />
                                                <circle
                                                    cx="80"
                                                    cy="80"
                                                    r="70"
                                                    stroke="currentColor"
                                                    strokeWidth="10"
                                                    fill="transparent"
                                                    strokeDasharray={440}
                                                    strokeDashoffset={440 - (440 * prediction) / 100}
                                                    className={`${prediction > 70 ? "text-green-500" : prediction > 40 ? "text-yellow-500" : "text-red-500"} transition-all duration-1000 ease-out`}
                                                />
                                            </svg>
                                            <span className="absolute text-4xl font-bold text-gray-800">{prediction}%</span>
                                        </div>

                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                            {prediction > 70 ? "Excellent Chance!" : prediction > 40 ? "Good Attempt" : "Needs Improvement"}
                                        </h3>
                                        <p className="text-gray-600 mb-6">
                                            {prediction > 70
                                                ? "Your preparation metrics suggest a high probability of clearing the cutoff!"
                                                : "Focus on increasing your mock scores and daily study hours to improve your odds."}
                                        </p>

                                        <div className="bg-blue-50 text-blue-800 p-4 rounded-lg text-sm text-left">
                                            <div className="flex items-start gap-2">
                                                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                                                <p><strong>Recommendation:</strong> Based on the model, increasing your study time by 2 hours could boost this score by ~15%.</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            )}
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
