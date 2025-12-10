import Link from "next/link";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                            GovGuide AI
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Empowering aspirants with AI-driven guidance for government exams and employment opportunities.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-4">Platform</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
                            <li><Link href="/courses" className="hover:text-blue-400 transition-colors">Courses</Link></li>
                            <li><Link href="/guidance" className="hover:text-blue-400 transition-colors">AI Guidance</Link></li>
                            <li><Link href="/employment" className="hover:text-blue-400 transition-colors">Employment</Link></li>
                            <li><Link href="/prediction" className="hover:text-blue-400 transition-colors">Predictor</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-4">Resources</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="#" className="hover:text-blue-400 transition-colors">Exam Syllabus</Link></li>
                            <li><Link href="#" className="hover:text-blue-400 transition-colors">Study Materials</Link></li>
                            <li><Link href="#" className="hover:text-blue-400 transition-colors">Success Stories</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-4">Connect</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-blue-400 transition-colors"><Twitter className="w-5 h-5" /></a>
                            <a href="#" className="hover:text-blue-400 transition-colors"><Linkedin className="w-5 h-5" /></a>
                            <a href="#" className="hover:text-blue-400 transition-colors"><Github className="w-5 h-5" /></a>
                            <a href="#" className="hover:text-blue-400 transition-colors"><Mail className="w-5 h-5" /></a>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
                    <p>© {new Date().getFullYear()} GovGuide AI. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
