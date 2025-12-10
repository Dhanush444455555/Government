"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  MessageCircle, 
  Send, 
  X, 
  Minimize2, 
  Maximize2,
  Bot,
  User,
  Lightbulb,
  BookOpen,
  Briefcase,
  Clock
} from "lucide-react";

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface ChatbotProps {
  isOpen?: boolean;
  onToggle?: () => void;
  initialMessage?: string;
}

export default function Chatbot({ isOpen: initialIsOpen = false, onToggle, initialMessage }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(initialIsOpen);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestedQuestions = [
    "How should I start preparing for UPSC?",
    "What are the best strategies for banking exams?",
    "Can you help me create a study schedule?",
    "What are the career options in government sector?",
    "How to improve time management for exams?"
  ];

  useEffect(() => {
    if (initialMessage && !messages.length) {
      handleSendMessage(initialMessage);
    }
  }, [initialMessage]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const generateSessionId = () => {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  const handleSendMessage = async (message?: string) => {
    const messageToSend = message || inputMessage.trim();
    if (!messageToSend) return;

    const userMessage: Message = {
      role: 'user',
      content: messageToSend,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const currentSessionId = sessionId || generateSessionId();
      if (!sessionId) {
        setSessionId(currentSessionId);
      }

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageToSend,
          sessionId: currentSessionId
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.message,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, assistantMessage]);

    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: "I apologize, but I'm having trouble connecting right now. Please try again in a moment.",
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleToggle = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    setIsMinimized(false);
    onToggle?.();
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSuggestedQuestion = (question: string) => {
    handleSendMessage(question);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={handleToggle}
          size="lg"
          className="rounded-full w-14 h-14 shadow-lg bg-blue-600 hover:bg-blue-700"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[90vw]">
      <Card className="shadow-2xl border-0">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="w-5 h-5" />
              <CardTitle className="text-lg font-semibold">ExamGuru AI Assistant</CardTitle>
              <Badge variant="secondary" className="bg-green-500 text-white text-xs">
                Online
              </Badge>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:bg-blue-700 p-1 h-8 w-8"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleToggle}
                className="text-white hover:bg-blue-700 p-1 h-8 w-8"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0">
            <ScrollArea className="h-96 p-4">
              {messages.length === 0 && (
                <div className="text-center py-8">
                  <Bot className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Welcome to ExamGuru AI!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    I'm here to help you with government exam preparation and career guidance.
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Try asking:</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {suggestedQuestions.map((question, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleSuggestedQuestion(question)}
                          className="text-xs h-auto py-2 px-3 whitespace-normal text-left"
                        >
                          {question}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-4 flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      <div className="flex-shrink-0 mt-1">
                        {message.role === 'user' ? (
                          <User className="w-4 h-4" />
                        ) : (
                          <Bot className="w-4 h-4" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm whitespace-pre-wrap">
                          {message.content}
                        </p>
                        <p
                          className={`text-xs mt-1 ${
                            message.role === 'user'
                              ? 'text-blue-100'
                              : 'text-gray-500'
                          }`}
                        >
                          {formatTimestamp(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start mb-4">
                  <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                    <div className="flex items-center space-x-2">
                      <Bot className="w-4 h-4 text-gray-600" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </ScrollArea>

            <div className="border-t border-gray-200 p-4">
              <div className="flex space-x-2">
                <Input
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about exam preparation..."
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button
                  onClick={() => handleSendMessage()}
                  disabled={isLoading || !inputMessage.trim()}
                  size="icon"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex items-center justify-center mt-2 space-x-4 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <BookOpen className="w-3 h-3" />
                  <span>Exam Guidance</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Briefcase className="w-3 h-3" />
                  <span>Career Support</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Lightbulb className="w-3 h-3" />
                  <span>Study Tips</span>
                </div>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}