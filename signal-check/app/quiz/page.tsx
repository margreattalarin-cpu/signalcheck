"use client";

import { useState } from "react";

const SCALE = [
  { value: 1, label: "Never" },
  { value: 2, label: "Rarely" },
  { value: 3, label: "Sometimes" },
  { value: 4, label: "Often" },
  { value: 5, label: "Always" },
];

const CATEGORIES = [
  {
    name: "Integrity",
    questions: [
      "Do they follow through on promises?",
      "Are they honest even when it's uncomfortable?",
      "Do they take responsibility for their mistakes?",
      "Do their actions match their words?",
      "Do they keep your shared information private?",
    ],
  },
  {
    name: "Empathy",
    questions: [
      "Do they listen without interrupting?",
      "Do they acknowledge your feelings without dismissing them?",
      "Do they check in on you during hard times?",
      "Do they try to understand your perspective?",
      "Do they notice when something is wrong without being told?",
    ],
  },
  {
    name: "Stability",
    questions: [
      "Do they suddenly go distant after conflict?",
      "Is their mood consistent and predictable?",
      "Do they handle stress without taking it out on you?",
      "Do they show up reliably in your life?",
      "Do they remain calm during disagreements?",
    ],
  },
  {
    name: "Respect",
    questions: [
      "Do they respect your boundaries?",
      "Do they value your time and commitments?",
      "Do they speak to you with kindness in public and private?",
      "Do they support your goals and independence?",
      "Do they consider your needs when making decisions?",
    ],
  },
];

const TOTAL_QUESTIONS = CATEGORIES.reduce((sum, c) => sum + c.questions.length, 0);

interface CategoryResult {
  name: string;
  average: number;
}

function scoreColor(avg: number) {
  if (avg >= 4) return "text-emerald-600";
  if (avg >= 3) return "text-yellow-600";
  return "text-red-500";
}

function scoreLabel(avg: number) {
  if (avg >= 4.5) return "Excellent";
  if (avg >= 4) return "Good";
  if (avg >= 3) return "Fair";
  if (avg >= 2) return "Concerning";
  return "Poor";
}

export default function QuizPage() {
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(TOTAL_QUESTIONS).fill(null)
  );
  const [results, setResults] = useState<CategoryResult[] | null>(null);

  const setAnswer = (index: number, value: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
    // Clear results when answers change
    setResults(null);
  };

  const allAnswered = answers.every((a) => a !== null);

  const calculate = () => {
    if (!allAnswered) return;
    let offset = 0;
    const computed = CATEGORIES.map((cat) => {
      const slice = answers.slice(offset, offset + cat.questions.length) as number[];
      const avg = slice.reduce((s, v) => s + v, 0) / slice.length;
      offset += cat.questions.length;
      return { name: cat.name, average: Math.round(avg * 10) / 10 };
    });
    setResults(computed);
  };

  let globalIndex = 0;

  return (
    <main className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Relationship Signal Quiz
          </h1>
          <p className="text-slate-500 text-sm">
            Rate each statement from 1 (Never) to 5 (Always).
          </p>
        </div>

        {/* Categories & Questions */}
        <div className="space-y-10">
          {CATEGORIES.map((cat) => (
            <div key={cat.name}>
              {/* Category heading */}
              <div className="flex items-center gap-3 mb-5">
                <h2 className="text-base font-semibold text-slate-800 uppercase tracking-wider">
                  {cat.name}
                </h2>
                <div className="flex-1 h-px bg-slate-200" />
              </div>

              <div className="space-y-6">
                {cat.questions.map((question) => {
                  const idx = globalIndex++;
                  return (
                    <div key={idx} className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                      <p className="text-sm text-slate-700 font-medium mb-4">
                        {idx + 1}. {question}
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        {SCALE.map((s) => {
                          const selected = answers[idx] === s.value;
                          return (
                            <button
                              key={s.value}
                              onClick={() => setAnswer(idx, s.value)}
                              className={`flex flex-col items-center px-3 py-2 rounded-lg border text-xs font-medium transition-all duration-150 min-w-[60px]
                                ${selected
                                  ? "bg-indigo-600 border-indigo-600 text-white shadow-sm"
                                  : "bg-white border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600"
                                }`}
                            >
                              <span className="text-base font-bold leading-none mb-0.5">
                                {s.value}
                              </span>
                              <span className="opacity-80">{s.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Progress indicator */}
        <div className="mt-8 mb-4">
          <div className="flex justify-between text-xs text-slate-400 mb-1.5">
            <span>{answers.filter((a) => a !== null).length} of {TOTAL_QUESTIONS} answered</span>
            {!allAnswered && <span>Please answer all questions to continue</span>}
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 rounded-full transition-all duration-300"
              style={{ width: `${(answers.filter((a) => a !== null).length / TOTAL_QUESTIONS) * 100}%` }}
            />
          </div>
        </div>

        {/* Submit button */}
        <button
          onClick={calculate}
          disabled={!allAnswered}
          className={`w-full py-4 rounded-2xl font-semibold text-sm tracking-wide transition-all duration-200
            ${allAnswered
              ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-100 hover:-translate-y-0.5"
              : "bg-slate-100 text-slate-400 cursor-not-allowed"
            }`}
        >
          Calculate Scores
        </button>

        {/* Results */}
        {results && (
          <div className="mt-8 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800 mb-5 text-center">
              Your Results
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {results.map((r) => (
                <div
                  key={r.name}
                  className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-center"
                >
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">
                    {r.name}
                  </p>
                  <p className={`text-4xl font-black mb-1 ${scoreColor(r.average)}`}>
                    {r.average}
                    <span className="text-sm font-normal text-slate-400">/5</span>
                  </p>
                  <p className={`text-xs font-medium ${scoreColor(r.average)}`}>
                    {scoreLabel(r.average)}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-slate-400 mt-5">
              Scores are averaged across 5 questions per category.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

