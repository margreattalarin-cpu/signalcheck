"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  // ⭐ Listen for Enter globally
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        router.push("/analyze");
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, [router]);

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="text-center max-w-xl mx-auto space-y-7">

        <div className="inline-flex items-center gap-2 bg-slate-100 border border-slate-200 rounded-full px-4 py-1.5 text-xs font-medium text-slate-500 tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
          Relationship Insights Tool
        </div>

        <h1
          className="text-6xl sm:text-7xl font-black tracking-tight text-slate-900 leading-none"
          style={{ fontFamily: "'Georgia', serif", letterSpacing: "-0.03em" }}
        >
          Signal<span className="text-indigo-500">Check</span>
        </h1>

        <p
          className="text-xl sm:text-2xl text-slate-600 font-light tracking-wide"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          See patterns. <span className="text-slate-400 italic">Not paranoia.</span>
        </p>

        <p className="text-sm text-slate-500 leading-relaxed max-w-sm mx-auto">
          Analyze communication and behavior signals to understand relationship
          dynamics thoughtfully.
        </p>

        <button
          onClick={() => router.push("/analyze")}
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-slate-800 transition"
        >
          Start Analysis
        </button>

        <p className="text-xs text-slate-400 pt-4">
          Press Enter to start
        </p>

      </div>
    </main>
  );
}