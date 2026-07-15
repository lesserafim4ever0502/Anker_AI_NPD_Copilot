import { useEffect, useState } from "react";
import { AlertTriangle, CheckCircle2, FileText, Send, Shield, Target } from "lucide-react";
import proposalPrd from "../data/proposalPrd.json";
import pendingConfirmations from "../data/pendingConfirmations.json";
import StatusBadge from "../components/StatusBadge";
import PageHeader from "../components/PageHeader";
import PageDataLineage from "../components/PageDataLineage";
import { Link, useSearchParams } from "react-router-dom";

const tabs = ["Scope", "Evidence", "Validation"] as const;

export default function ProposalPrd() {
  const [searchParams] = useSearchParams();
  const requestedTab = searchParams.get("tab");
  const initialTab = tabs.find((item) => item === requestedTab) ?? tabs[0];
  const [tab, setTab] = useState<(typeof tabs)[number]>(initialTab);
  const [handoff, setHandoff] = useState(false);
  const candidatePending = pendingConfirmations.filter((item) => proposalPrd.pendingConfirmationIds.includes(item.id));
  const p0 = proposalPrd.mvpFeatures.filter((feature) => feature.priority === "P0");

  useEffect(() => {
    const nextTab = tabs.find((item) => item === requestedTab);
    if (nextTab) setTab(nextTab);
  }, [requestedTab]);

  return (
    <div className="space-y-6">
      <PageHeader eyebrow={`06 / Proposal PRD · ${proposalPrd.version}`} title={proposalPrd.title} icon={FileText}
        description={proposalPrd.oneSentence}
        action={<button onClick={() => setHandoff(true)} className="primary-button"><Send size={15} /> 预览 Mock Handoff</button>} />

      <PageDataLineage page="proposal-prd" />

      <section className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-4">
        <StatusBadge status={proposalPrd.status} /><StatusBadge status={proposalPrd.decisionState} /><StatusBadge status={proposalPrd.confidence} />
        <span className="ml-auto text-xs text-slate-500">{candidatePending.length} candidate confirmations</span>
      </section>

      {handoff ? <section className="flex flex-col justify-between gap-3 border border-teal-200 bg-teal-50 p-4 text-sm text-teal-900 sm:flex-row sm:items-center"><div><div className="flex items-center gap-2 font-semibold"><CheckCircle2 size={17} /> Mock handoff prepared</div><p className="mt-1 text-xs leading-5">仅更新当前页面展示状态；未调用飞书 API，也未读取任何授权信息。</p></div><Link to="/feishu-workflow" className="secondary-button shrink-0">查看飞书协作资产</Link></section> : null}

      <nav className="toolbar" aria-label="PRD sections" role="tablist">{tabs.map((item) => <button key={item} role="tab" aria-selected={tab === item} onClick={() => setTab(item)} className={`filter-button ${tab === item ? "filter-button-active" : ""}`}>{item}</button>)}</nav>

      {tab === "Scope" ? <>
        <section className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
          <article className="panel"><div className="section-kicker"><Target size={14} /> Product positioning</div><p className="mt-3 text-sm leading-7 text-slate-700">{proposalPrd.positioning}</p><div className="mt-5 grid gap-4 sm:grid-cols-2"><div><h3 className="text-xs font-semibold text-slate-500">Target users</h3><ul className="mt-2 space-y-2 text-sm text-slate-700">{proposalPrd.targetUsers.map((item) => <li key={item}>· {item}</li>)}</ul></div><div><h3 className="text-xs font-semibold text-slate-500">Jobs to be done</h3><ul className="mt-2 space-y-2 text-sm text-slate-700">{proposalPrd.jobsToBeDone.map((item) => <li key={item}>· {item}</li>)}</ul></div></div></article>
          <aside className="panel-muted"><div className="section-kicker"><Shield size={14} /> Non-goals</div><ul className="mt-3 space-y-3 text-sm leading-6 text-slate-700">{proposalPrd.outOfScope.map((item) => <li key={item} className="border-l-2 border-slate-300 pl-3">{item}</li>)}</ul></aside>
        </section>
        <section><div className="mb-3 flex items-end justify-between"><div><h3 className="section-title">P0 rules MVP</h3><p className="section-subtitle">有限拓扑、可追溯、允许返回未知</p></div><span className="text-xs text-slate-500">{p0.length} P0 features</span></div><div className="grid grid-cols-1 gap-px overflow-hidden border border-slate-200 bg-slate-200 md:grid-cols-2">{p0.map((feature, index) => <article key={feature.feature} className="bg-white p-4"><div className="flex items-start gap-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-blue-50 text-xs font-semibold text-blue-700">{index + 1}</span><div><h4 className="font-semibold text-ink">{feature.feature}</h4><p className="mt-2 text-sm leading-6 text-slate-600">{feature.value}</p><div className="mt-2 text-xs text-slate-400">{feature.relatedPainPoint}</div></div></div></article>)}</div></section>
      </> : null}

      {tab === "Evidence" ? <section className="grid grid-cols-1 gap-5 lg:grid-cols-2"><article className="panel"><div className="section-kicker">Evidence summary</div><h3 className="mt-3 section-title">Stage-Gate</h3><p className="mt-2 text-sm leading-6 text-slate-700">{proposalPrd.evidenceSummary.gateSummary}</p><h3 className="mt-5 section-title">Product committee</h3><p className="mt-2 text-sm leading-6 text-slate-700">{proposalPrd.evidenceSummary.agentSummary}</p><div className="mt-5 border-l-2 border-amber-300 pl-3 text-xs leading-5 text-slate-600">{proposalPrd.evidenceSummary.limitations}</div></article><article className="warning-panel"><div className="section-kicker text-amber-700"><AlertTriangle size={14} /> Pending confirmations</div><div className="mt-4 space-y-4">{candidatePending.map((item) => <div key={item.id} className="border-b border-amber-200 pb-4 last:border-0 last:pb-0"><div className="flex items-start justify-between gap-3"><h4 className="text-sm font-semibold text-ink">{item.title}</h4><StatusBadge status={item.status} /></div><p className="mt-2 text-xs leading-5 text-slate-700">{item.description}</p><p className="mt-2 text-xs font-semibold text-amber-800">Owner · {item.ownerRole.join(" / ")}</p></div>)}</div></article></section> : null}

      {tab === "Validation" ? <>
        <section className="grid grid-cols-1 gap-4 lg:grid-cols-2"><article className="panel"><div className="section-kicker">Proposed success metrics</div><div className="mt-4 divide-y divide-slate-100">{proposalPrd.successMetrics.map((metric) => <div key={metric.metric} className="grid grid-cols-1 gap-2 py-3 sm:grid-cols-[minmax(0,1fr)_auto]"><div><h4 className="text-sm font-semibold text-ink">{metric.metric}</h4><p className="mt-1 text-xs leading-5 text-slate-500">{metric.measurement}</p></div><div className="text-left sm:text-right"><div className="font-semibold tabular-nums text-blue-700">{metric.proposedTarget}</div><StatusBadge status={metric.status} /></div></div>)}</div></article><article className="danger-panel"><div className="section-kicker text-red-700">Risk register</div><div className="mt-4 space-y-4">{proposalPrd.risks.map((item) => <div key={item.id}><div className="flex items-center gap-2"><StatusBadge status={item.level} /><h4 className="text-sm font-semibold text-ink">{item.risk}</h4></div><p className="mt-1 pl-0 text-xs leading-5 text-slate-600 sm:pl-[58px]">{item.mitigation}</p></div>)}</div></article></section>
        <section><div className="mb-3"><h3 className="section-title">Validation plan</h3><p className="section-subtitle">任一边界测试出现无依据确定性结论，即视为 Fail</p></div><div className="grid grid-cols-1 gap-3 lg:grid-cols-3">{proposalPrd.validationPlan.map((item) => <article key={item.id} className="panel"><div className="text-xs font-semibold text-blue-700">{item.method}</div><h4 className="mt-2 font-semibold text-ink">{item.scope}</h4><p className="mt-3 border-t border-slate-100 pt-3 text-xs leading-5 text-slate-600">{item.decisionRule}</p></article>)}</div></section>
      </> : null}
    </div>
  );
}
