"use client";
export function Footer() {
  return (
    <footer
  className="relative border-t border-white/10 text-white/70 text-center text-xs md:text-sm py-10 mb-[140px] backdrop-blur-sm"
      style={{
        backgroundColor: "#0a0610",
        backgroundImage: `
          radial-gradient(circle at 20% 20%, rgba(130,0,255,0.15) 1px, transparent 1px),
          radial-gradient(circle at 80% 30%, rgba(180,0,255,0.12) 1px, transparent 1px),
          radial-gradient(circle at 50% 80%, rgba(80,0,150,0.1) 1px, transparent 1px)
        `,
        backgroundSize: "4px 4px",
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="space-y-3">
        <div className="flex justify-center gap-4 text-white/60">
          {["Home", "Discover", "Generator", "Moods", "About"].map((link) => (
            <span
              key={link}
              className="cursor-pointer hover:text-white transition-colors"
            >
              {link}
            </span>
          ))}
        </div>
        <p className="text-white/50">
          © {new Date().getFullYear()} Playlist AI — All rights reserved
        </p>
      </div>
    </footer>
  );
}
