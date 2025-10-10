"use client";
import { motion } from "framer-motion";

export function MoodOrb() {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{
        scale: [0.95, 1.02, 0.97, 1],
        opacity: 1,
        background: [
          "radial-gradient(circle at 30% 30%, #9b5de5, #1e1e2f)",
          "radial-gradient(circle at 60% 40%, #00bbf9, #1e1e2f)",
          "radial-gradient(circle at 40% 70%, #fee440, #1e1e2f)",
          "radial-gradient(circle at 30% 30%, #9b5de5, #1e1e2f)"
        ],
      }}
      transition={{
        duration: 16,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] rounded-full blur-2xl shadow-[0_0_80px_20px_rgba(255,255,255,0.05)]"
    />
  );
}
