import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BrainCircuit, Menu, X, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Courses', href: '/courses' },
    { name: 'Guidance', href: '/guidance' },
    { name: 'Employment', href: '/employment' },
    { name: 'Predictor', href: '/prediction' },
  ];

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-[#0b1120]/90 backdrop-blur-lg border-b border-gray-100 dark:border-slate-800 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-gradient-to-tr from-blue-600 to-purple-600 p-2 rounded-lg text-white group-hover:scale-105 transition-transform shadow-md shadow-blue-500/20">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                GovGuide AI
              </span>
              <span className="text-[9px] font-semibold tracking-wider uppercase text-gray-600 dark:text-gray-400 -mt-1">
                ExamGuru AI
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-7">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href || (link.href !== '/' && location.pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`text-sm font-semibold transition-all px-3 py-1.5 rounded-lg ${
                    isActive
                      ? 'text-blue-600 dark:text-cyan-400 bg-blue-50 dark:bg-cyan-950/40'
                      : 'text-gray-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 hover:bg-gray-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {isAuthenticated ? (
              <div className="relative flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-slate-700">
                {/* User role info */}
                <div className="flex flex-col items-end">
                  <span className="text-xs font-bold text-gray-900 dark:text-white truncate max-w-[120px]">
                    {user?.name}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full capitalize bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300">
                    {user?.role || 'student'} Account
                  </span>
                </div>

                {/* Avatar with Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-1 focus:outline-none"
                  >
                    <img
                      src={user?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=User"}
                      alt={user?.name || "User"}
                      className="w-10 h-10 rounded-full border-2 border-blue-200 dark:border-blue-500/50 hover:border-blue-500 transition-colors shadow-sm"
                    />
                    <ChevronDown className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
                  </button>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-52 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-slate-800 p-2 z-50 text-gray-800 dark:text-slate-200"
                      >
                        <div className="px-3 py-2 border-b border-gray-100 dark:border-slate-800">
                          <p className="text-xs font-bold text-gray-900 dark:text-white truncate">{user?.name}</p>
                          <p className="text-[11px] text-gray-600 dark:text-gray-400 truncate">{user?.email}</p>
                        </div>
                        <Link
                          to="/dashboard"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-200 mt-1"
                        >
                          <LayoutDashboard className="w-4 h-4 text-blue-500" />
                          Student Dashboard
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 text-left transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Log out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-5 py-2 text-sm bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-full font-bold transition-all shadow-md shadow-blue-500/20 transform hover:-translate-y-0.5"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-slate-300 hover:text-blue-600 focus:outline-none p-2 rounded-lg"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-[#0b1120] border-b border-gray-100 dark:border-slate-800 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-cyan-400 hover:bg-blue-50 dark:hover:bg-slate-800/60 transition-colors"
                >
                  {link.name}
                </Link>
              ))}

              <div className="pt-4 border-t border-gray-100 dark:border-slate-800 mt-2">
                {isAuthenticated ? (
                  <div className="flex items-center justify-between px-3 py-2 bg-gray-50 dark:bg-slate-800/50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <img
                        src={user?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=User"}
                        alt={user?.name}
                        className="w-10 h-10 rounded-full border border-blue-200"
                      />
                      <div>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">{user?.name}</p>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full capitalize bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300">
                          {user?.role} Account
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                    >
                      <LogOut className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-colors shadow-md"
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
