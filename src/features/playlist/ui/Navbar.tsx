"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      // hide only after scrolling down a bit
      if (current > lastScrollY && current > 80) setHidden(true);
      else setHidden(false);
      setLastScrollY(current);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 border-b border-gray-800 
      backdrop-blur bg-gradient-to-b from-black/80 to-black/60 
      text-white transition-transform duration-300 ease-in-out ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 h-[60px] flex items-center justify-between">
        {/* Logo / title */}
        <Link
          href="/"
          className="text-lg font-medium hover:text-gray-300 transition-colors"
        >
          Playlist AI
        </Link>

        {/* Navigation link */}
        <Link
          href="/discover"
          className="text-sm opacity-80 hover:opacity-100 hover:border-b border-gray-500 transition-all"
        >
          Discover
        </Link>
      </div>
    </nav>
  );
}
