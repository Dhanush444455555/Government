import React from 'react';
import { motion } from 'framer-motion';

export default function SolarSystem3D({
  centerText = "PLATFORM",
  orbitTerms = ["Guidance 🤖", "Employment 💼", "Mentorship 🤝", "Mock Tests 📝", "Analytics 📊", "Classes 🎥"],
  color = "#3b82f6"
}) {
  return (
    <div className="relative w-full h-full min-h-[360px] flex items-center justify-center overflow-hidden">
      {/* Background Star Dust Glow */}
      <div
        className="absolute w-72 h-72 rounded-full blur-3xl opacity-30 animate-pulse-glow"
        style={{ backgroundColor: color }}
      />

      {/* Orbit Rings */}
      <div className="absolute w-[340px] h-[340px] rounded-full border border-white/10" />
      <div className="absolute w-[460px] h-[460px] rounded-full border border-white/5" />
      <div className="absolute w-[580px] h-[580px] rounded-full border border-dashed border-white/10" />

      {/* Central Star */}
      <motion.div
        animate={{ scale: [1, 1.06, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="relative z-20 flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 shadow-2xl shadow-blue-500/50 p-1"
      >
        <div className="w-full h-full rounded-full bg-slate-950/80 backdrop-blur-md flex flex-col items-center justify-center p-2 text-center border border-white/30">
          <span className="text-[10px] uppercase tracking-widest text-cyan-300 font-mono font-bold">CORE</span>
          <span className="text-xs font-black text-white tracking-wide">{centerText}</span>
        </div>
      </motion.div>

      {/* Rotating Orbit 1 */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        className="absolute w-[340px] h-[340px] z-10 pointer-events-none"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
            className="px-3 py-1.5 rounded-full bg-slate-900/90 border border-blue-400/40 text-cyan-300 text-xs font-bold shadow-lg shadow-blue-500/20 backdrop-blur-md whitespace-nowrap hover:scale-110 transition-transform"
          >
            {orbitTerms[0] || "Guidance 🤖"}
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 pointer-events-auto">
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
            className="px-3 py-1.5 rounded-full bg-slate-900/90 border border-purple-400/40 text-purple-300 text-xs font-bold shadow-lg shadow-purple-500/20 backdrop-blur-md whitespace-nowrap hover:scale-110 transition-transform"
          >
            {orbitTerms[1] || "Employment 💼"}
          </motion.div>
        </div>
      </motion.div>

      {/* Rotating Orbit 2 */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        className="absolute w-[460px] h-[460px] z-10 pointer-events-none"
      >
        <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
            className="px-3 py-1.5 rounded-full bg-slate-900/90 border border-emerald-400/40 text-emerald-300 text-xs font-bold shadow-lg shadow-emerald-500/20 backdrop-blur-md whitespace-nowrap hover:scale-110 transition-transform"
          >
            {orbitTerms[2] || "Mentorship 🤝"}
          </motion.div>
        </div>

        <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 pointer-events-auto">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
            className="px-3 py-1.5 rounded-full bg-slate-900/90 border border-amber-400/40 text-amber-300 text-xs font-bold shadow-lg shadow-amber-500/20 backdrop-blur-md whitespace-nowrap hover:scale-110 transition-transform"
          >
            {orbitTerms[3] || "Mock Tests 📝"}
          </motion.div>
        </div>
      </motion.div>

      {/* Rotating Orbit 3 */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute w-[580px] h-[580px] z-10 pointer-events-none"
      >
        <div className="absolute top-12 left-16 pointer-events-auto">
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="px-3 py-1.5 rounded-full bg-slate-900/90 border border-pink-400/40 text-pink-300 text-xs font-bold shadow-lg shadow-pink-500/20 backdrop-blur-md whitespace-nowrap hover:scale-110 transition-transform"
          >
            {orbitTerms[4] || "Analytics 📊"}
          </motion.div>
        </div>

        <div className="absolute bottom-12 right-16 pointer-events-auto">
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="px-3 py-1.5 rounded-full bg-slate-900/90 border border-cyan-400/40 text-cyan-300 text-xs font-bold shadow-lg shadow-cyan-500/20 backdrop-blur-md whitespace-nowrap hover:scale-110 transition-transform"
          >
            {orbitTerms[5] || "Classes 🎥"}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

