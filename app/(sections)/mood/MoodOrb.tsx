"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

export function MoodOrb() {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      "--x": ["30%", "60%", "40%", "30%"],
      "--y": ["30%", "40%", "70%", "30%"],
      "--c1": ["#9b5de5", "#00bbf9", "#fee440", "#9b5de5"],
      "--c2": ["#1e1e2f", "#1e1e2f", "#1e1e2f", "#1e1e2f"],
      transition: {
        duration: 16,
        repeat: Infinity,
        ease: "easeInOut",
      },
    });
  }, [controls]);

  return (
    <motion.div
      animate={controls}
      initial={{ scale: 0.95, opacity: 1 }}
      className="w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] rounded-full blur-2xl 
                 shadow-[0_0_80px_20px_rgba(255,255,255,0.05)]"
      style={{
        background:
          "radial-gradient(circle at var(--x,30%) var(--y,30%), var(--c1,#9b5de5), var(--c2,#1e1e2f))",
      }}
    />
  );
}
