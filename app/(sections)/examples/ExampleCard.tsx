"use client";
import { motion } from "framer-motion";
import { GlassCard } from "@/src/components/ui/GlassCard";
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
    >
      <GlassCard className="w-[220px] h-[160px] flex flex-col justify-between">
        <h3 className="text-sm font-medium text-white">{prompt}</h3>
        <p className="text-xs text-gray-400 leading-snug">{description}</p>
      </GlassCard>
    </motion.div>
  );
}
