import { useMemo, useState } from "react";
import { AlertTriangle, Quote, Radar } from "lucide-react";
import painPointsData from "../data/painPoints.json";
import feedbackData from "../data/feedback.json";
import type { Feedback, PainPoint } from "../types";
import MetricCard from "../components/MetricCard";
import StatusBadge from "../components/StatusBadge";
import PageHeader from "../components/PageHeader";
import PageDataLineage from "../components/PageDataLineage";

const painPoints = painPointsData as PainPoint[];
const feedback = feedbackData as Feedback[];

export default function PainRadar() {
  const [selectedId, setSelectedId] = useState(painPoints[0].id);
  const selected = painPoints.find((pain) => pain.id === selectedId) ?? painPoints[0];
  const related = useMemo(() => feedback.filter((item) => item.painPointIds.includes(selectedId)), [selectedId]);
  const insightReady = painPoints.filter((pain) => pain.status === "insight_ready").length;

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="03 / Pain Radar" title="用户痛点雷达" icon={Radar}
        description="将已审核公开反馈聚类为痛点与设计信号；频次和严重度用于排序，证据成熟度决定能否进入机会判断。" />
      <PageDataLineage page="pain-radar" />
      <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <MetricCard label="痛点簇" value={painPoints.length} />
        <MetricCard label="Insight Ready" value={insightReady} />
        <MetricCard label="Needs Evidence" value={painPoints.length - insightReady} hint="不进入确定性硬件结论" />
      </section>

      <section className="grid grid-cols-1 items-stretch gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(320px,0.68fr)]">
        <div className="table-shell h-full">
          <table className="data-table">
            <thead><tr><th>痛点簇</th><th>证据</th><th>严重度</th><th>成熟度</th></tr></thead>
            <tbody>{painPoints.map((pain) => (
              <tr key={pain.id} onClick={() => setSelectedId(pain.id)} className={`cursor-pointer ${selectedId === pain.id ? "bg-blue-50/70" : ""}`}>
                <td><div className="font-semibold text-ink">{pain.name}</div><div className="mt-1 text-xs text-slate-500">{pain.cluster}</div></td>
                <td><div className="font-semibold tabular-nums">{pain.evidenceCount}</div><div className="text-xs text-slate-500">{pain.independentSourceCount} independent</div></td>
                <td><div className="w-28"><div className="mb-1 text-xs font-semibold tabular-nums">{pain.severityAvg} / 5</div><div className="progress-track"><div className="progress-fill" style={{ width: `${pain.severityAvg * 20}%` }} /></div></div></td>
                <td><StatusBadge status={pain.status ?? pain.confidence} /></td>
              </tr>
            ))}</tbody>
          </table>
        </div>

        <aside className="panel h-full">
          <div className="flex items-start justify-between gap-3"><div><div className="section-kicker">Selected cluster</div><h3 className="mt-2 text-lg font-semibold text-ink">{selected.name}</h3></div><StatusBadge status={selected.confidence} /></div>
          <p className="mt-4 text-sm leading-6 text-slate-700">{selected.designSignals.join("；")}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">{selected.scenarios.map((scenario) => <span key={scenario} className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-600">{scenario}</span>)}</div>
          {selected.warning ? <div className="mt-5 border-l-2 border-amber-300 pl-3 text-xs leading-5 text-amber-800"><AlertTriangle size={14} className="mb-1" />{selected.warning}</div> : null}
          <div className="mt-5 border-t border-slate-200 pt-4 text-xs leading-5 text-slate-500">飞书血缘：pain_radar · {selected.id}<br />证据记录：{selected.relatedEvidenceIds.join(" / ")}</div>
        </aside>
      </section>

      <section>
        <div className="mb-3 flex items-end justify-between"><div><h3 className="section-title">关联反馈摘要</h3><p className="section-subtitle">仅显示可追溯摘要，不伪造直接引语</p></div><span className="text-xs text-slate-500">{related.length} records</span></div>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">{related.map((item) => <article key={item.id} className="panel"><div className="flex items-center justify-between gap-3"><div className="flex items-center gap-2 text-xs font-semibold text-slate-500"><Quote size={14} />{item.source} · {item.id}</div><StatusBadge status={item.confidence} /></div><p className="mt-3 text-sm leading-6 text-slate-700">{item.rawTextSummary}</p><div className="mt-3 text-xs text-slate-500">{item.scenario} · severity {item.severity}</div></article>)}</div>
      </section>
    </div>
  );
}
