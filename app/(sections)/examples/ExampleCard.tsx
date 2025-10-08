"use client";
import { motion } from "framer-motion";

type Props = {
  prompt: string;
  description: string;
  delay: number;
};

export function ExampleCard({ prompt, description, delay }: Props) {
  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.05, rotate: 1 }}
      className="p-5 w-[220px] h-[160px] bg-white/10 backdrop-blur-md border border-white/20 
                 rounded-2xl shadow-lg cursor-pointer hover:bg-white/20 transition-colors
                 flex flex-col justify-between"
    >
      <h3 className="text-sm font-medium text-white">{prompt}</h3>
      <p className="text-xs text-gray-400 leading-snug">{description}</p>
    </motion.div>
  );
}
