"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, HelpCircle, Trophy, PlayCircle } from "lucide-react";

interface Quiz {
    id: string;
    title: string;
    questionsCount: number;
    duration: string;
    difficulty: "Easy" | "Medium" | "Hard";
}

interface QuizListProps {
    quizzes: Quiz[];
    onStartQuiz: (quizId: string) => void;
}

export default function QuizList({ quizzes, onStartQuiz }: QuizListProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quizzes.map((quiz) => (
                <Card key={quiz.id} className="hover:shadow-lg transition-shadow border-l-4 border-l-purple-500">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{quiz.title}</h3>
                                <div className="flex gap-4 text-sm text-gray-500">
                                    <span className="flex items-center gap-1">
                                        <HelpCircle className="w-4 h-4" /> {quiz.questionsCount} Qs
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" /> {quiz.duration} mins
                                    </span>
                                    <span className={`px-2 py-0.5 rounded text-xs font-medium self-center ${quiz.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                                            quiz.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-red-100 text-red-700'
                                        }`}>
                                        {quiz.difficulty}
                                    </span>
                                </div>
                            </div>
                            <div className="p-3 bg-purple-100 rounded-full text-purple-600">
                                <Trophy className="w-6 h-6" />
                            </div>
                        </div>

                        <Button
                            className="w-full bg-purple-600 hover:bg-purple-700 gap-2"
                            onClick={() => onStartQuiz(quiz.id)}
                        >
                            <PlayCircle className="w-4 h-4" /> Start Quiz
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
