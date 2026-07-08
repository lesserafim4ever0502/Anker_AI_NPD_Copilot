import painPointsData from "../data/painPoints.json";
import feedbackData from "../data/feedback.json";
import type { Feedback, PainPoint } from "../types";
import MetricCard from "../components/MetricCard";
import StatusBadge from "../components/StatusBadge";

const painPoints = painPointsData as PainPoint[];
const feedback = feedbackData as Feedback[];

export default function PainRadar() {
  return (
    <div className="space-y-6">
      <section>
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-anker">
          Pain Radar
        </div>
        <h2 className="mt-2 text-3xl font-semibold text-ink">用户痛点雷达</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
          将公开反馈样本转为痛点标签、严重度和设计信号；当前仍需人工复核。
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {painPoints.slice(0, 3).map((pain) => (
          <MetricCard
            key={pain.id}
            label={pain.cluster}
            value={pain.name}
            hint={`频次 ${pain.frequency} · 严重度 ${pain.severityAvg}`}
          />
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        {painPoints.map((pain) => (
          <article key={pain.id} className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-semibold text-ink">{pain.name}</h3>
              <StatusBadge status={pain.confidence} />
            </div>
            <p className="mt-2 text-sm text-slate-600">{pain.designSignals.join("；")}</p>
            <p className="mt-2 text-xs text-slate-500">{pain.scenarios.join(" / ")}</p>
          </article>
        ))}
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5">
        <h3 className="text-lg font-semibold text-ink">公开反馈样本占位</h3>
        <div className="mt-4 space-y-3">
          {feedback.map((item) => (
            <div key={item.id} className="rounded-md bg-slate-50 p-3 text-sm text-slate-700">
              <div className="font-medium text-ink">{item.source} · {item.scenario}</div>
              <div className="mt-1">{item.rawTextSummary}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
