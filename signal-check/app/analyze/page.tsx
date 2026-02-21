"use client";

import { useState } from "react";

interface AnalysisResult {
  wordCount: number;
  score: number;
}

export default function AnalyzePage() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);

  // ⭐ Main analysis logic
  const analyze = () => {
    const lower = text.toLowerCase();
    const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

    let score = 0;

    if (lower.includes("you always")) score += 15;
    if (lower.includes("you never")) score += 15;
    if (lower.includes("you're imagining")) score += 20;
    if (lower.includes("that never happened")) score += 20;
    if (wordCount > 250) score += 10;
    if (lower.includes("no matter what i do")) score += 10;
    if (lower.includes("i'm trying my best")) score += 8;
    if (lower.includes("why is this such a big issue")) score += 10;
    if (lower.includes("you should trust me")) score += 10;
    if (lower.includes("feels like i'm being blamed")) score += 10;
    if (lower.includes("i just wish you")) score += 5;
    if (lower.includes("you know how stressful")) score += 8;
    if (lower.includes("things have been stressful")) score += 8;

    score = Math.min(score, 100);

    setResult({ wordCount, score });
  };

  // ⭐ Form submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    analyze();
  };

  // ⭐ UI helpers
  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-red-600";
    if (score >= 40) return "text-yellow-600";
    return "text-green-600";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 70) return "High Risk";
    if (score >= 40) return "Moderate Risk";
    return "Low Risk";
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* HEADER */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Text Communication Analyzer
          </h1>
          <p className="text-gray-500 text-sm">
            Paste a message below to analyze its communication patterns.
          </p>
        </div>

        {/* INPUT CARD */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-4">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700"
          >
            Paste your message
          </label>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* TEXTAREA */}
            <textarea
              id="message"
              rows={10}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.ctrlKey) {
                  e.preventDefault();
                  analyze();
                }
              }}
              placeholder="Paste the message you'd like to analyze here..."
              className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none transition"
            />

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-colors duration-200 text-sm tracking-wide"
            >
              Analyze Communication
            </button>

            <p className="text-xs text-gray-400 text-center">
              Tip: Press <b>Ctrl + Enter</b> to analyze quickly
            </p>
          </form>
        </div>

        {/* RESULTS */}
        {result && (
          <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-5">
            <h2 className="text-lg font-semibold text-gray-800">
              Analysis Results
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                  Word Count
                </p>
                <p className="text-3xl font-bold text-gray-800">
                  {result.wordCount}
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                  Risk Score
                </p>
                <p
                  className={`text-3xl font-bold ${getScoreColor(
                    result.score
                  )}`}
                >
                  {result.score}
                  <span className="text-base font-normal text-gray-400">
                    /100
                  </span>
                </p>
              </div>
            </div>

            <div
              className={`rounded-xl px-4 py-3 text-sm font-medium ${
                result.score >= 70
                  ? "bg-red-50 text-red-700 border border-red-200"
                  : result.score >= 40
                  ? "bg-yellow-50 text-yellow-700 border border-yellow-200"
                  : "bg-green-50 text-green-700 border border-green-200"
              }`}
            >
              Assessment:{" "}
              <span className="font-semibold">
                {getScoreLabel(result.score)}
              </span>
              {result.score === 0 && " — No concerning patterns detected."}
              {result.score > 0 &&
                result.score < 40 &&
                " — Minor patterns present."}
              {result.score >= 40 &&
                result.score < 70 &&
                " — Some concerning communication patterns found."}
              {result.score >= 70 &&
                " — Multiple high-risk communication patterns detected."}
            </div>

            {result.wordCount > 250 && (
              <p className="text-xs text-gray-400">
                ⚠ Message length exceeded 250 words — over-justification
                indicator applied.
              </p>
            )}
          </div>
        )}
      </div>
    </main>
  );
}