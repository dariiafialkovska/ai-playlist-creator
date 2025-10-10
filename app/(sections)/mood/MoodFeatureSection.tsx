"use client";
import { MoodOrb } from "./MoodOrb";
import { MoodFeatureCard } from "./MoodFeatureCard";

const features = [
  {
    title: "Feels, then builds",
    description:
      "You describe the moment. It shapes the sound around it."
  },
  {
    title: "Grows with mood",
    description:
      "Each mix has its own pulse — never static, always alive."
  },
  {
    title: "Crafted in tone, not genre",
    description:
      "Music that starts from atmosphere, not labels."
  }
];

export function MoodFeatureSection() {
  return (
    <section className="py-28 md:py-36">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        {/* Left side: Mood Orb */}
        <div className="flex justify-center relative">
          <MoodOrb />
        </div>

        {/* Right side: Text */}
        <div className="relative z-10">
          {features.map((f, i) => (
            <MoodFeatureCard
              key={f.title}
              title={f.title}
              description={f.description}
              delay={i * 0.2}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
