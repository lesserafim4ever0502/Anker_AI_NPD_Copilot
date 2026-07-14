import { useMemo, useState } from "react";
import { AlertOctagon, ChevronDown, Scale, ShieldAlert, Users } from "lucide-react";
import candidatesData from "../data/candidates.json";
import gateEvaluationsData from "../data/gateEvaluations.json";
import agentEvaluationsData from "../data/agentEvaluations.json";
import killCriteria from "../data/killCriteria.json";
import evaluationSummaryData from "../data/evaluationSummary.json";
import type { AgentEvaluation, CandidateNP, EvaluationSummary, GateEvaluation } from "../types";
import StatusBadge, { getStatusLabel } from "../components/StatusBadge";
import PageHeader from "../components/PageHeader";
import PageDataLineage from "../components/PageDataLineage";

const candidates = candidatesData as CandidateNP[];
const gates = gateEvaluationsData as GateEvaluation[];
const agents = agentEvaluationsData as AgentEvaluation[];
const summaries = evaluationSummaryData as EvaluationSummary[];

export default function Evaluation() {
  const [candidateId, setCandidateId] = useState(candidates[0].id);
  const [openGate, setOpenGate] = useState<string | null>(gates[0].gateId);
  const candidate = candidates.find((item) => item.id === candidateId) ?? candidates[0];
  const summary = summaries.find((item) => item.candidateId === candidateId) ?? summaries[0];
  const candidateGates = useMemo(() => gates.filter((gate) => gate.candidateId === candidateId), [candidateId]);
  const candidateAgents = agents.filter((agent) => agent.candidateId === candidateId);
  const triggeredKill = killCriteria.filter((item) => (item.triggeredCandidates as string[]).includes(candidateId));

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="05 / Stage-Gate Review" title="Stage-Gate + 产品委员会" icon={Scale}
        description="先看证据理由、阻断项与反对意见，再看加权分数。Fail Gate 与 Kill Criteria 不会被平均分覆盖。" />

      <PageDataLineage page="evaluation" />

      <section className="grid grid-cols-1 gap-3 xl:grid-cols-3">{candidates.map((item) => {
        const itemSummary = summaries.find((value) => value.candidateId === item.id)!;
        return <button key={item.id} aria-pressed={candidateId === item.id} onClick={() => { setCandidateId(item.id); setOpenGate(null); }} className={`panel text-left transition ${candidateId === item.id ? "border-blue-300 shadow-[inset_3px_0_0_#2f80ed]" : "hover:border-slate-300"}`}><div className="flex items-start justify-between gap-3"><h3 className="font-semibold leading-6 text-ink">{item.name}</h3><StatusBadge status={itemSummary.gateResult} /></div><p className="mt-3 text-xs leading-5 text-slate-600">{item.mainRisk}</p><div className="mt-4 flex items-end justify-between"><span className="text-xs text-slate-500">Weighted score</span><span className="text-xl font-semibold tabular-nums text-ink">{itemSummary.weightedScore.toFixed(2)}</span></div></button>;
      })}</section>

      <section className="grid grid-cols-1 items-stretch gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="h-full">
          <div className="mb-3 flex items-end justify-between"><div><h3 className="section-title">Gate reasons & evidence</h3><p className="section-subtitle">{candidate.name} · {candidateGates.length} gates</p></div><StatusBadge status={summary.gateResult} /></div>
          <div className="divide-y divide-slate-200 border-y border-slate-200 bg-white">{candidateGates.map((gate) => {
            const key = `${gate.candidateId}-${gate.gateId}`;
            return <article key={key} className="px-4 py-4"><button className="flex w-full items-start justify-between gap-4 text-left" aria-expanded={openGate === gate.gateId} onClick={() => setOpenGate(openGate === gate.gateId ? null : gate.gateId)}><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><span className="font-semibold text-ink">{gate.gateName}</span><StatusBadge status={gate.status} /><StatusBadge status={gate.confidence} /></div><p className="mt-2 text-sm leading-6 text-slate-700">{gate.reason}</p></div><div className="flex shrink-0 items-center gap-2"><span className="text-lg font-semibold tabular-nums text-ink">{gate.score.toFixed(1)}</span><ChevronDown size={16} className={`text-slate-400 transition ${openGate === gate.gateId ? "rotate-180" : ""}`} /></div></button>{openGate === gate.gateId ? <div className="mt-3 grid gap-3 border-l-2 border-blue-200 pl-4 text-xs leading-5 sm:grid-cols-2"><div><span className="font-semibold">Decision impact</span><p className="mt-1 text-slate-600">{gate.decisionImpact}</p></div><div><span className="font-semibold">Evidence refs</span><p className="mt-1 text-slate-600">{gate.evidenceRefs.join(" / ")}</p></div></div> : null}</article>;
          })}</div>
        </div>
        <aside className="self-start overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm">
          <section className={`p-5 ${summary.blockingIssues.length ? "bg-red-50" : "bg-amber-50"}`}><div className="section-kicker"><ShieldAlert size={14} /> Decision summary</div><h3 className="mt-2 text-lg font-semibold text-ink">{getStatusLabel(summary.decision)}</h3>{summary.blockingIssues.length ? <div className="mt-4"><div className="text-xs font-semibold text-red-700">Blocking issues</div>{summary.blockingIssues.map((item) => <p key={item} className="mt-2 text-sm text-red-900">{item}</p>)}</div> : null}<div className="mt-4"><div className="text-xs font-semibold text-amber-700">Warnings</div>{summary.warnings.map((item) => <p key={item} className="mt-2 text-sm text-slate-700">{item}</p>)}</div><p className="mt-4 border-t border-current/10 pt-3 text-xs leading-5 text-slate-600">{summary.nextAction}</p><div className="mt-3 text-[11px] text-slate-500">飞书：gate_evaluations / product_committee_reviews</div></section>
          <section className={`border-t border-slate-200 p-5 ${triggeredKill.length ? "bg-red-50" : "bg-slate-50"}`}><div className="section-kicker"><AlertOctagon size={14} /> Kill Criteria</div>{killCriteria.map((item) => <div key={item.id} className={`mt-3 border-l-2 pl-3 text-xs leading-5 ${(item.triggeredCandidates as string[]).includes(candidateId) ? "border-red-500 text-red-900" : "border-slate-300 text-slate-600"}`}>{item.rule}</div>)}</section>
        </aside>
      </section>

      <section><div className="mb-3 flex items-end justify-between"><div><h3 className="section-title">产品委员会异议</h3><p className="section-subtitle">保留跨职能判断，不呈现为聊天记录</p></div><span className="flex items-center gap-1 text-xs text-slate-500"><Users size={14} /> {candidateAgents.length} roles</span></div>{candidateAgents.length ? <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">{candidateAgents.map((agent) => <article key={`${agent.candidateId}-${agent.agentName}`} className="panel"><div className="flex items-start justify-between gap-3"><div><h4 className="font-semibold text-ink">{agent.agentName}</h4><p className="text-xs text-slate-500">{agent.role}</p></div>{agent.createsPendingConfirmation ? <StatusBadge status="need_confirmation" /> : <StatusBadge status={agent.confidence} />}</div><p className="mt-3 text-sm leading-6 text-slate-700">{agent.coreJudgement}</p><div className="mt-4 border-l-2 border-red-300 pl-3"><div className="text-xs font-semibold text-red-700">Objection</div><p className="mt-1 text-xs leading-5 text-slate-600">{agent.objection}</p></div></article>)}</div> : <div className="panel-muted text-sm text-slate-600">该候选尚未进入六角色产品委员会；当前仅保留 Stage-Gate 结论与下一验证。</div>}</section>
    </div>
  );
}
