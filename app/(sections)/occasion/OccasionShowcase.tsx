"use client";
import Image from "next/image";
import { motion } from "framer-motion";
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
    <section className="relative overflow-visible">
      <Container>
        <div
          className={`flex flex-col ${
            textFirst ? "md:flex-row" : "md:flex-row-reverse"
          } items-center justify-center gap-16 min-h-[80vh]`}
        >
          {/* text */}
          <div
            className={`w-full md:w-1/2 flex flex-col justify-center ${
              textFirst ? "text-left items-start" : "text-right items-end"
            }`}
          >
            <h2
              className={`text-white/80 text-xl md:text-2xl font-normal mb-4 font-base tracking-tight mb-4 bg-clip-text ${
                textFirst ? "md:text-left" : "md:text-right"
              }`}
            >
              {title}
            </h2>
            {subtitle && (
              <p
                className={`text-white/70 text-lg md:text-xl leading-snug max-w-md ${
                  textFirst ? "md:text-left" : "md:text-right"
                }`}
              >
                {subtitle}
              </p>
            )}
          </div>

          {/* image stack */}
          <div
            className={`relative flex w-full md:w-2/3 justify-center ${
              textFirst ? "md:justify-end" : "md:justify-start"
            } overflow-visible`}
          >
            {images.slice(0, 4).map((img, i) => {
              const randomX = (Math.random() - 0.5) * 40; // random scatter
              const randomY = (Math.random() - 0.5) * 40;
              const randomRotate = (Math.random() - 0.5) * 12;

              return (
                <motion.div
                  key={i}
                  drag
                  dragElastic={0.25}
                  dragMomentum={false}
                  whileTap={{ scale: 1.05, rotate: 0 }}
                  whileHover={{
                    y: -8,
                    rotate: randomRotate / 2,
                    scale: 1.03,
                    transition: { type: "spring", stiffness: 150, damping: 12 },
                  }}
                  initial={{
                    rotate: randomRotate,
                    x: randomX,
                    y: randomY,
                  }}
                  className="absolute w-[200px] h-[200px] md:w-[280px] md:h-[280px]
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
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
