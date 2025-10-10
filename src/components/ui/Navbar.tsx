"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      if (current > lastScrollY && current > 80) setHidden(true);
      else setHidden(false);
      setLastScrollY(current);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50
      border-b border-white/10 backdrop-blur-2xl bg-transparent
      shadow-[0_0_25px_rgba(0,0,0,0.2)]
      transition-transform duration-300 ease-in-out ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 h-[60px] flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-lg font-semibold text-white/90 hover:text-white transition-colors"
        >
          Playlist AI
        </Link>

        {/* Navigation */}
        <Link
          href="/discover"
          className="text-sm text-white/70 hover:text-white transition-all"
        >
          Discover
        </Link>
      </div>
    </nav>
  );
}
