"use client";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { Container } from "@/src/components/layout/Container";

type Props = {
  title: string;
  subtitle?: string;
  images: string[];
  align?: "left" | "right";
};

export function OccasionShowcase({
  title,
  subtitle,
  images,
  align = "left",
}: Props) {
  const textFirst = align === "left";

  return (
    <Container>
      <section
        className={`relative flex flex-col ${
          textFirst ? "md:flex-row" : "md:flex-row-reverse"
        } items-center justify-center
        px-8 md:px-16 py-32 gap-16 min-h-[90vh] overflow-visible`}
      >
        {/* text */}
        <div
          className={`max-w-md flex flex-col justify-center h-full ${
            textFirst ? "text-left md:text-left" : "text-right md:text-right"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4 leading-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-white/70 text-lg md:text-xl leading-snug">
              {subtitle}
            </p>
          )}
        </div>

        {/* image stack */}
        <div
          className={`relative flex w-full md:w-1/2 justify-center ${
            textFirst ? "md:justify-end" : "md:justify-start"
          } overflow-visible`}
        >
          {images.slice(0, 4).map((img, i) => (
            <motion.div
              key={i}
              drag
              dragElastic={0.25}
              dragMomentum={false}
              whileTap={{ scale: 1.05, rotate: 0 }}
              whileHover={{
                y: -8,
                rotate: (i % 2 === 0 ? -2 : 2),
                scale: 1.03,
                transition: { type: "spring", stiffness: 150, damping: 12 },
              }}
              initial={{
                rotate: i % 2 === 0 ? -8 + i * 2 : 8 - i * 2,
                y: i * 15,
              }}
              className="absolute w-[240px] h-[240px] md:w-[280px] md:h-[280px]
                         rounded-xl overflow-hidden cursor-grab active:cursor-grabbing
                         border border-white/5
                         shadow-[0_8px_32px_rgba(0,0,0,0.3)]
                         transition-transform"
              style={{
                zIndex: images.length - i,
                [textFirst ? "left" : "right"]: `${i * 80}px`,
              }}
            >
              <Image
                src={img}
                alt={`Occasion image ${i + 1}`}
                fill
                className="object-cover rounded-xl select-none pointer-events-none"
                draggable={false}
              />
            </motion.div>
          ))}
        </div>
      </section>
    </Container>
  );
}
