import React from 'react';
import { motion } from 'framer-motion';
import { Folder, ArrowRight, BookOpen } from 'lucide-react';

export default function CourseFolder({
  title,
  description,
  color = 'bg-blue-500',
  resourceCount = 100,
  onClick
}) {
  const getGradient = (c = '') => {
    if (c.includes('blue')) return 'from-blue-500 via-cyan-500 to-teal-400';
    if (c.includes('purple')) return 'from-purple-500 via-pink-500 to-rose-400';
    if (c.includes('green') || c.includes('emerald')) return 'from-emerald-500 via-green-500 to-lime-400';
    if (c.includes('orange')) return 'from-orange-500 via-amber-500 to-yellow-400';
    if (c.includes('red')) return 'from-red-500 via-rose-500 to-pink-500';
    if (c.includes('indigo')) return 'from-indigo-600 via-violet-600 to-purple-500';
    if (c.includes('teal')) return 'from-teal-500 via-cyan-500 to-blue-500';
    return 'from-blue-500 to-indigo-600';
  };

  const getShadow = (c = '') => {
    if (c.includes('blue')) return 'hover:shadow-blue-500/25';
    if (c.includes('purple')) return 'hover:shadow-purple-500/25';
    if (c.includes('green') || c.includes('emerald')) return 'hover:shadow-emerald-500/25';
    if (c.includes('orange')) return 'hover:shadow-orange-500/25';
    if (c.includes('red')) return 'hover:shadow-red-500/25';
    return 'hover:shadow-indigo-500/25';
  };

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group cursor-pointer perspective-1000 h-full"
      onClick={onClick}
    >
      <div className="relative h-full pt-4">
        {/* 3D Glow layer */}
        <div
          className={`absolute inset-0 bg-gradient-to-br rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 ${getGradient(color)}`}
        />

        {/* Folder Tab */}
        <div
          className={`absolute top-0 left-0 w-2/5 h-6 rounded-t-2xl bg-gradient-to-br shadow-inner ${getGradient(color)}`}
        />

        {/* Folder Body */}
        <div
          className={`relative z-10 bg-white dark:bg-slate-900/90 border border-gray-100 dark:border-slate-800 p-6 rounded-b-3xl rounded-tr-3xl shadow-lg transition-all h-full flex flex-col justify-between overflow-hidden group-hover:shadow-2xl ${getShadow(color)}`}
        >
          {/* Subtle Decorative Gradient Corner */}
          <div
            className={`absolute top-0 right-0 w-36 h-36 bg-gradient-to-br to-transparent rounded-bl-full pointer-events-none opacity-10 ${getGradient(color)}`}
          />

          <div>
            <div className="flex justify-between items-start mb-4">
              <div
                className={`p-3.5 rounded-2xl shadow-md bg-gradient-to-br text-white transform group-hover:rotate-6 transition-transform duration-300 ${getGradient(color)}`}
              >
                <Folder className="w-7 h-7 drop-shadow-sm" />
              </div>
              <span className="text-xs font-bold px-3 py-1 bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 text-gray-700 dark:text-slate-300 rounded-full flex items-center gap-1.5 shadow-sm group-hover:scale-105 transition-transform">
                <BookOpen className="w-3.5 h-3.5 text-blue-500" />
                {resourceCount} resources
              </span>
            </div>

            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
              {title}
            </h3>

            <p className="text-sm font-medium text-gray-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
              {description}
            </p>
          </div>

          <div className="flex items-center text-sm font-bold text-gray-500 dark:text-slate-400 mt-6 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
            <span
              className={`w-7 h-7 rounded-full flex items-center justify-center mr-2 text-white opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 bg-gradient-to-r ${getGradient(color)}`}
            >
              <ArrowRight className="w-4 h-4" />
            </span>
            <span className="opacity-70 group-hover:opacity-100 transition-opacity">
              Open Course
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

