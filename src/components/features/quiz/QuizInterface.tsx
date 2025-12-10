"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { CheckCircle2, XCircle, ChevronRight, RotateCcw, Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface Question {
    id: number;
    text: string;
    options: string[];
    correctAnswer: number; // Index of correct option
}

interface QuizInterfaceProps {
    quizTitle: string;
    questions: Question[];
    onExit: () => void;
}

export default function QuizInterface({ quizTitle, questions, onExit }: QuizInterfaceProps) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);

    const handleOptionSelect = (index: number) => {
        if (isAnswered) return;
        setSelectedOption(index);
    };

    const handleSubmitAnswer = () => {
        if (selectedOption === null) return;

        setIsAnswered(true);
        if (selectedOption === questions[currentQuestion].correctAnswer) {
            setScore(score + 1);
        }
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedOption(null);
            setIsAnswered(false);
        } else {
            setShowResult(true);
        }
    };

    const handleRetry = () => {
        setCurrentQuestion(0);
        setSelectedOption(null);
        setIsAnswered(false);
        setScore(0);
        setShowResult(false);
    };

    if (showResult) {
        const percentage = Math.round((score / questions.length) * 100);
        return (
            <Card className="max-w-xl mx-auto text-center p-8 border-none shadow-none">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                >
                    <div className="inline-flex p-4 rounded-full bg-yellow-100 text-yellow-600 mb-6">
                        <Award className="w-16 h-16" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Completed!</h2>
                    <p className="text-gray-500 mb-8">You scored {score} out of {questions.length}</p>

                    <div className="text-5xl font-bold text-blue-600 mb-8">{percentage}%</div>

                    <div className="flex gap-4 justify-center">
                        <Button variant="outline" onClick={handleRetry} className="gap-2">
                            <RotateCcw className="w-4 h-4" /> Retry
                        </Button>
                        <Button onClick={onExit} className="bg-blue-600 hover:bg-blue-700 gap-2">
                            <ChevronRight className="w-4 h-4" /> Back to Course
                        </Button>
                    </div>
                </motion.div>
            </Card>
        );
    }

    const question = questions[currentQuestion];

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-6 flex justify-between items-center text-sm text-gray-500">
                <span>Question {currentQuestion + 1} of {questions.length}</span>
                <span>Score: {score}</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-gray-100 rounded-full mb-8 overflow-hidden">
                <motion.div
                    className="h-full bg-blue-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                />
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentQuestion}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                >
                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle className="text-xl leading-relaxed">{question.text}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {question.options.map((option, index) => {
                                let optionStyle = "border-gray-200 hover:bg-gray-50";
                                if (isAnswered) {
                                    if (index === question.correctAnswer) {
                                        optionStyle = "bg-green-50 border-green-500 text-green-700";
                                    } else if (index === selectedOption) {
                                        optionStyle = "bg-red-50 border-red-500 text-red-700";
                                    } else {
                                        optionStyle = "opacity-50";
                                    }
                                } else if (selectedOption === index) {
                                    optionStyle = "border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-600";
                                }

                                return (
                                    <button
                                        key={index}
                                        onClick={() => handleOptionSelect(index)}
                                        disabled={isAnswered}
                                        className={cn(
                                            "w-full text-left p-4 rounded-lg border-2 transition-all duration-200 flex justify-between items-center",
                                            optionStyle
                                        )}
                                    >
                                        <span className="font-medium">{option}</span>
                                        {isAnswered && index === question.correctAnswer && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                                        {isAnswered && index === selectedOption && index !== question.correctAnswer && <XCircle className="w-5 h-5 text-red-600" />}
                                    </button>
                                );
                            })}
                        </CardContent>
                    </Card>
                </motion.div>
            </AnimatePresence>

            <div className="flex justify-end">
                {!isAnswered ? (
                    <Button
                        onClick={handleSubmitAnswer}
                        disabled={selectedOption === null}
                        className="w-full sm:w-auto text-lg px-8 py-6"
                    >
                        Submit Answer
                    </Button>
                ) : (
                    <Button
                        onClick={handleNext}
                        className="w-full sm:w-auto text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700"
                    >
                        {currentQuestion < questions.length - 1 ? "Next Question" : "View Results"} <ChevronRight className="ml-2 w-5 h-5" />
                    </Button>
                )}
            </div>
        </div>
    );
}
