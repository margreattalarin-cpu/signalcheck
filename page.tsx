"use client";

const textScore = 60;
const behaviorScore = 40;

function classify(score: number): string {
  if (score <= 25) return "Secure Communicator";
  if (score <= 50) return "Inconsistent but Non-Manipulative";
  if (score <= 75) return "Avoidant / Emotionally Distant";
  return "High Pattern Risk";
}

function classifyColor(score: number): string {
  if (score <= 25) return "text-emerald-600";
  if (score <= 50) return "text-yellow-600";
  if (score <= 75) return "text-orange-500";
  return "text-red-600";
}

function classifyBg(score: number): string {
  if (score <= 25) return "bg-emerald-50 border-emerald-200";
  if (score <= 50) return "bg-yellow-50 border-yellow-200";
  if (score <= 75) return "bg-orange-50 border-orange-200";
  return "bg-red-50 border-red-200";
}

export default function ResultPage() {
  const finalScore = 0.5 * textScore + 0.5 * behaviorScore;
  const label = classify(finalScore);

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
            Your Analysis
          </p>
          <h1 className="text-3xl font-bold text-slate-900">Result Summary</h1>
        </div>

        {/* Card */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          {/* Score breakdown */}
          <div className="divide-y divide-slate-100">
            <ScoreRow label="Text Score" value={textScore} />
            <ScoreRow label="Behavior Score" value={behaviorScore} />
            <div className="flex items-center justify-between px-6 py-4 bg-slate-50">
              <span className="text-sm font-semibold text-slate-700">Final Score</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-slate-900">{finalScore}</span>
                <span className="text-sm text-slate-400 font-normal">/ 100</span>
              </div>
            </div>
          </div>

          {/* Classification */}
          <div className="px-6 py-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
              Classification
            </p>
            <div className={`rounded-xl border px-5 py-4 ${classifyBg(finalScore)}`}>
              <p className={`text-lg font-bold ${classifyColor(finalScore)}`}>
                {label}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Based on a weighted average of text and behavior signals.
              </p>
            </div>
          </div>

          {/* Score bar */}
          <div className="px-6 pb-6">
            <div className="flex justify-between text-xs text-slate-400 mb-1.5">
              <span>0</span>
              <span>Risk Score</span>
              <span>100</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  finalScore <= 25
                    ? "bg-emerald-500"
                    : finalScore <= 50
                    ? "bg-yellow-500"
                    : finalScore <= 75
                    ? "bg-orange-500"
                    : "bg-red-500"
                }`}
                style={{ width: `${finalScore}%` }}
              />
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          Scores are simulated. Connect real data to personalize your results.
        </p>
      </div>
    </main>
  );
}

function ScoreRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between px-6 py-4">
      <span className="text-sm text-slate-600">{label}</span>
      <div className="flex items-center gap-3">
        <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-400 rounded-full"
            style={{ width: `${value}%` }}
          />
        </div>
        <span className="text-sm font-semibold text-slate-800 w-8 text-right">
          {value}
        </span>
      </div>
    </div>
  );
}
