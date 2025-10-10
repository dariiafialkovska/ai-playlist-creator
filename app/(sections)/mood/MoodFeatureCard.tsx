"use client";
import { motion } from "framer-motion";

export function MoodFeatureCard({
  title,
  description,
  delay
}: {
  title: string;
  description: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="max-w-sm mb-8"
    >
      <h3 className="text-white text-lg font-medium tracking-tight">{title}</h3>
      <p className="text-gray-400 text-sm mt-2 leading-relaxed">{description}</p>
    </motion.div>
  );
}
