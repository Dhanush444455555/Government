"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, BrainCircuit, User, LogOut, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout, isAuthenticated } = useAuth();

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Courses", href: "/courses" },
        { name: "Guidance", href: "/guidance" },
        { name: "Employment", href: "/employment" },
        { name: "Predictor", href: "/prediction" },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="bg-gradient-to-tr from-blue-600 to-purple-600 p-2 rounded-lg text-white group-hover:scale-105 transition-transform">
                            <BrainCircuit className="w-6 h-6" />
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                            GovGuide AI
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}

                        {isAuthenticated ? (
                            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                                {/* Explicit Role Badge */}
                                <div className="flex flex-col items-end">
                                    <span className="text-sm font-semibold text-gray-900">{user?.name}</span>
                                    <Badge variant={user?.role === 'teacher' ? 'default' : 'secondary'} className="text-[10px] h-5 px-2 capitalize bg-blue-100 text-blue-700 hover:bg-blue-200 border-0">
                                        {user?.role} Account
                                    </Badge>
                                </div>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 hover:bg-transparent">
                                            <Avatar className="h-10 w-10 border-2 border-blue-100 hover:border-blue-300 transition-colors">
                                                <AvatarImage src={user?.avatar} alt={user?.name} />
                                                <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56" align="end" forceMount>
                                        <DropdownMenuLabel className="font-normal">
                                            <div className="flex flex-col space-y-1">
                                                <p className="text-sm font-medium leading-none">{user?.name}</p>
                                                <p className="text-xs leading-none text-muted-foreground">
                                                    {user?.email || (user?.role === 'student' ? 'student@example.com' : 'teacher@example.com')}
                                                </p>
                                            </div>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={logout} className="text-red-600 focus:text-red-600 cursor-pointer">
                                            <LogOut className="mr-2 h-4 w-4" />
                                            <span>Log out</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 transform hover:-translate-y-0.5"
                            >
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-600 hover:text-blue-600 focus:outline-none"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="pt-4 border-t border-gray-100 mt-2">
                                {isAuthenticated ? (
                                    <div className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-10 w-10">
                                                <AvatarImage src={user?.avatar} />
                                                <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="text-sm font-bold text-gray-900">{user?.name}</p>
                                                <Badge variant={user?.role === 'teacher' ? 'default' : 'secondary'} className="text-[10px] px-1.5 h-4 capitalize">
                                                    {user?.role}
                                                </Badge>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="icon" onClick={logout} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                                            <LogOut className="w-5 h-5" />
                                        </Button>
                                    </div>
                                ) : (
                                    <Link
                                        href="/login"
                                        onClick={() => setIsOpen(false)}
                                        className="block w-full text-center px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-colors shadow-md"
                                    >
                                        Login / Sign Up
                                    </Link>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
