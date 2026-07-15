import { useMemo, useState } from "react";
import { ArrowRight, Boxes, ChevronDown, Database, ExternalLink, Filter, Link2 } from "lucide-react";
import evidenceSummary from "../data/evidenceSummary.json";
import evidenceSources from "../data/evidenceSources.json";
import evidenceCards from "../data/evidenceCards.json";
import feedback from "../data/feedback.json";
import painPoints from "../data/painPoints.json";
import MetricCard from "../components/MetricCard";
import StatusBadge from "../components/StatusBadge";
import PageHeader from "../components/PageHeader";
import PageDataLineage from "../components/PageDataLineage";
import { Link } from "react-router-dom";

const feedbackById = new Map(feedback.map((item) => [item.id, item]));
const evidenceIdsByCard = new Map(painPoints.map((pain) => [`evidence-${pain.id}`, pain.relatedEvidenceIds]));

export default function EvidencePool() {
  const sourceTypes = ["全部", ...Array.from(new Set(evidenceCards.map((card) => card.type)))];
  const [filter, setFilter] = useState(sourceTypes[0]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const visible = useMemo(() => filter === sourceTypes[0] ? evidenceCards : evidenceCards.filter((card) => card.type === filter), [filter]);
  const chain = [evidenceSummary.ankerSkuCount, evidenceSummary.feedbackCount, evidenceSummary.validPainSampleCount, evidenceCards.length];

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="02 / Evidence Pool" title="证据池概览" icon={Boxes}
        description="公开小样本先经过来源核验与人工审核，再进入痛点、机会和评审链路；当前数据不代表市场全量或安克内部用户总体。"
        action={<Link to="/pain-radar" className="primary-button">查看痛点雷达 <ArrowRight size={15} /></Link>} />

      <PageDataLineage page="evidence-pool" />

      <section className="grid grid-cols-2 gap-3 lg:grid-cols-3 2xl:grid-cols-6">
        <MetricCard label="安克产品" value={evidenceSummary.ankerSkuCount} />
        <MetricCard label="竞品产品" value={evidenceSummary.competitorSkuCount} />
        <MetricCard label="审核反馈" value={evidenceSummary.feedbackCount} />
        <MetricCard label="痛点簇" value={evidenceSummary.validPainSampleCount} />
        <MetricCard label="测评观点" value={evidenceSummary.expertReviewCount} />
        <MetricCard label="可直接引用" value={evidenceSummary.usableQuoteCount} hint="摘要证据，不伪造原声" />
      </section>

      <section>
        <div className="mb-3"><h3 className="section-title">Evidence-to-Decision</h3><p className="section-subtitle">数量是追踪线索，不是结论强度的替代品</p></div>
        <div className="grid grid-cols-1 gap-px overflow-hidden border border-slate-200 bg-slate-200 sm:grid-cols-4">
          {["产品样本", "用户反馈", "痛点簇", "证据卡"].map((label, index) => (
            <div key={label} className="bg-white p-4"><div className="text-2xl font-semibold tabular-nums text-ink">{chain[index]}</div><div className="mt-1 text-xs text-slate-500">{label}</div></div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        {evidenceSources.map((source) => (
          <article key={source.id} className="panel">
            <div className="flex items-start justify-between gap-3"><Database size={18} className="text-blue-700" /><StatusBadge status={source.confidence} /></div>
            <h3 className="mt-4 font-semibold text-ink">{source.name}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{source.purpose}</p>
            <p className="mt-3 border-t border-slate-100 pt-3 text-xs leading-5 text-slate-500">{source.limitations}</p>
          </article>
        ))}
      </section>

      <section>
        <div className="toolbar"><Filter size={14} className="text-slate-400" />{sourceTypes.map((type) => <button key={type} aria-pressed={filter === type} onClick={() => setFilter(type)} className={`filter-button ${filter === type ? "filter-button-active" : ""}`}>{type}</button>)}</div>
        <div className="divide-y divide-slate-200 border-b border-slate-200 bg-white">
          {visible.map((card) => (
            <article key={card.id} className="px-4 py-4">
              <button className="flex w-full items-start justify-between gap-4 text-left" aria-expanded={expanded === card.id} onClick={() => setExpanded(expanded === card.id ? null : card.id)}>
                <div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><span className="font-semibold text-ink">{card.type}</span><StatusBadge status={card.confidence} /><span className="text-xs text-slate-400">{card.id}</span></div><p className="mt-2 text-sm leading-6 text-slate-700">{card.designSignal}</p></div>
                <ChevronDown size={17} className={`mt-1 shrink-0 text-slate-400 transition ${expanded === card.id ? "rotate-180" : ""}`} />
              </button>
              {expanded === card.id ? <div className="mt-3 border-l-2 border-blue-200 pl-4 text-xs text-slate-600"><div className="grid gap-3 sm:grid-cols-3"><div><span className="font-semibold text-slate-700">Feishu records</span><div className="mt-1">verified_user_feedback · {(evidenceIdsByCard.get(card.id) ?? []).join(" / ")}</div></div><div><span className="font-semibold text-slate-700">Pain refs</span><div className="mt-1">{card.relatedPainPoints.join(" / ")}</div></div><div><span className="font-semibold text-slate-700">Page refs</span><div className="mt-1 flex items-center gap-1"><Link2 size={12} />{card.relatedPages.join(" / ")}</div></div></div><div className="mt-3 border-t border-slate-100 pt-3"><div className="font-semibold text-slate-700">Reviewed public sources</div><div className="mt-2 flex flex-wrap gap-2">{(evidenceIdsByCard.get(card.id) ?? []).map((id) => { const item = feedbackById.get(id); return item?.sourceUrl ? <a key={id} href={item.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded border border-slate-200 bg-white px-2 py-1 font-semibold text-blue-700 hover:border-blue-300"><ExternalLink size={11} />{id} · {item.source}</a> : <span key={id}>{id}</span>; })}</div></div></div> : null}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
