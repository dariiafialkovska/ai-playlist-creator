"use client";
import { ExampleCard } from "./ExampleCard";
import { motion } from "framer-motion";

export function ExampleSection({ examples }: { examples: any[] }) {
  if (!examples?.length) return null;

  return (
    <section className="relative py-24 overflow-hidden">
      <h2 className="text-center text-white/90 text-xl font-semibold mb-10">
        Some vibes you can try
      </h2>

      {/* floating animated card grid */}
      <div className="relative flex flex-wrap justify-center gap-6">
        {examples.map((ex, i) => (
          <motion.div
            key={ex.id}
            animate={{
              y: [0, -6, 0],
              x: [0, i % 2 === 0 ? 6 : -6, 0],
            }}
            transition={{
              duration: 6 + i * 0.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ExampleCard
              prompt={ex.prompt}
              description={ex.description}
              delay={i * 0.15}
            />
          </motion.div>
        ))}
      </div>

      {/* subtle glow background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-transparent opacity-40" />
    </section>
  );
}
