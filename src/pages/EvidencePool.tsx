import evidenceSummary from "../data/evidenceSummary.json";
import evidenceSources from "../data/evidenceSources.json";
import evidenceCards from "../data/evidenceCards.json";
import MetricCard from "../components/MetricCard";
import StatusBadge from "../components/StatusBadge";

export default function EvidencePool() {
  return (
    <div className="space-y-6">
      <section>
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-anker">
          Evidence Pool
        </div>
        <h2 className="mt-2 text-3xl font-semibold text-ink">证据池概览</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
          页面从本地 JSON 读取公开小样本数据，用于证明后续判断来自可追溯证据池。
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
        <MetricCard label="安克 SKU" value={evidenceSummary.ankerSkuCount} />
        <MetricCard label="竞品 SKU" value={evidenceSummary.competitorSkuCount} />
        <MetricCard label="用户反馈" value={evidenceSummary.feedbackCount} />
        <MetricCard label="有效痛点" value={evidenceSummary.validPainSampleCount} />
        <MetricCard label="测评观点" value={evidenceSummary.expertReviewCount} />
        <MetricCard label="可引用原声" value={evidenceSummary.usableQuoteCount} />
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        {evidenceSources.map((source) => (
          <article key={source.id} className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-semibold text-ink">{source.name}</h3>
              <StatusBadge status={source.confidence} />
            </div>
            <p className="mt-2 text-sm text-slate-600">{source.purpose}</p>
            <p className="mt-2 text-xs text-slate-500">{source.limitations}</p>
          </article>
        ))}
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5">
        <h3 className="text-lg font-semibold text-ink">Evidence-to-Decision Chain</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-4">
          {["Public Evidence", "Pain Tags", "Opportunity Gaps", "Draft PRD"].map((step) => (
            <div key={step} className="rounded-md bg-slate-50 p-3 text-sm font-medium text-slate-700">
              {step}
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        {evidenceCards.map((card) => (
          <article key={card.id} className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-ink">{card.type}</span>
              <StatusBadge status={card.confidence} />
            </div>
            <p className="mt-2 text-sm text-slate-600">{card.designSignal}</p>
            <p className="mt-2 text-xs text-slate-500">{card.relatedPages.join(" / ")}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
