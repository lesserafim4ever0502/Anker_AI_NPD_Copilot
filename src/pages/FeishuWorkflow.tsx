import { useState } from "react";
import { Archive, CheckCircle2, ChevronDown, Cloud, Send, Workflow } from "lucide-react";
import feishuWorkflow from "../data/feishuWorkflow.json";
import feishuArtifactsData from "../data/feishuArtifacts.json";
import validationTasks from "../data/validationTasks.json";
import decisionLedger from "../data/decisionLedger.json";
import type { FeishuArtifact } from "../types";
import StatusBadge, { getStatusLabel } from "../components/StatusBadge";
import PageHeader from "../components/PageHeader";
import PageDataLineage from "../components/PageDataLineage";

const artifacts = feishuArtifactsData as FeishuArtifact[];

export default function FeishuWorkflow() {
  const types = ["全部", ...Array.from(new Set(artifacts.map((item) => item.feishuType)))];
  const [type, setType] = useState(types[0]);
  const [synced, setSynced] = useState(false);
  const [openLedger, setOpenLedger] = useState<string | null>(decisionLedger[decisionLedger.length - 1]?.id ?? null);
  const visible = type === types[0] ? artifacts : artifacts.filter((item) => item.feishuType === type);

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="07 / Collaboration System" title="飞书协作与知识沉淀" icon={Archive}
        description="飞书贯穿数据采集、证据审核、评审协作和知识复用；本页汇总当前 Run 的协作资产，不是流程末端的导出页。"
        action={<button onClick={() => setSynced(true)} className="primary-button"><Send size={15} /> 预览 Mock Handoff</button>} />

      <PageDataLineage page="feishu-workflow" />

      <section className={`border p-4 ${synced ? "border-teal-200 bg-teal-50" : "border-slate-200 bg-white"}`}><div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center"><div className="flex items-center gap-3">{synced ? <CheckCircle2 className="text-teal-700" size={20} /> : <Cloud className="text-slate-500" size={20} />}<div><div className="text-sm font-semibold text-ink">{synced ? "Mock Handoff 已准备" : "真实飞书快照 + Proposal-stage Mock"}</div><div className="mt-1 text-xs text-slate-500">{getStatusLabel(feishuWorkflow.currentMode)} · {getStatusLabel(feishuWorkflow.runStatus)}</div></div></div><span className="data-boundary">No live frontend API</span></div></section>

      <section><div className="mb-3"><h3 className="section-title">当前 Run 协作资产地图</h3><p className="section-subtitle">输入、分析、决策和复用都在同一飞书工作台中保持可追溯</p></div><div className="grid grid-cols-1 gap-px overflow-hidden border border-slate-200 bg-slate-200 md:grid-cols-2 xl:grid-cols-4">{feishuWorkflow.layers.map((layer, index) => <article key={layer.id} className="bg-white p-4"><div className="flex items-center justify-between"><span className="flex h-7 w-7 items-center justify-center rounded bg-slate-100 text-xs font-semibold text-slate-600">{index + 1}</span><Workflow size={16} className="text-blue-700" /></div><h3 className="mt-4 font-semibold text-ink">{layer.name}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{layer.description}</p><div className="mt-3 flex flex-wrap gap-1">{layer.feishuObjects.map((item) => <span key={item} className="rounded bg-slate-100 px-2 py-1 text-[11px] text-slate-600">{item}</span>)}</div></article>)}</div></section>

      <section><div className="toolbar">{types.map((item) => <button key={item} aria-pressed={type === item} onClick={() => setType(item)} className={`filter-button ${type === item ? "filter-button-active" : ""}`}>{item}</button>)}</div><div className="grid grid-cols-1 gap-px border-x border-b border-slate-200 bg-slate-200 lg:grid-cols-2">{visible.map((artifact) => <article key={artifact.id} className="bg-white p-4"><div className="flex items-start justify-between gap-3"><div><div className="text-xs font-semibold text-blue-700">{artifact.feishuType}</div><h3 className="mt-1 font-semibold text-ink">{artifact.name}</h3></div><StatusBadge status={artifact.mockStatus} /></div><p className="mt-3 text-sm leading-6 text-slate-600">{artifact.businessValue}</p><div className="mt-3 text-xs text-slate-400">{artifact.sourcePages.join(" / ")}</div></article>)}</div></section>

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-2"><div><div className="mb-3 flex items-end justify-between"><div><h3 className="section-title">Validation Tasks</h3><p className="section-subtitle">PRD 草案进入下一轮验证的责任对象</p></div><span className="text-xs text-slate-500">{validationTasks.length} tasks</span></div><div className="divide-y divide-slate-200 border-y border-slate-200 bg-white">{validationTasks.map((task) => <div key={task.id} className="grid grid-cols-1 gap-2 px-4 py-3 sm:grid-cols-[minmax(0,1fr)_auto]"><div><h4 className="text-sm font-semibold text-ink">{task.title}</h4><p className="mt-1 text-xs text-slate-500">{task.ownerRole.join(" / ")}</p></div><div className="flex items-center gap-2"><StatusBadge status={task.priority} /><StatusBadge status={task.status} /></div></div>)}</div></div>
        <div><div className="mb-3"><h3 className="section-title">Decision Ledger</h3><p className="section-subtitle">保留结论、依据、风险和下一动作</p></div><div className="divide-y divide-slate-200 border-y border-slate-200 bg-white">{decisionLedger.map((item) => <article key={item.id} className="px-4 py-3"><button aria-expanded={openLedger === item.id} onClick={() => setOpenLedger(openLedger === item.id ? null : item.id)} className="flex w-full items-start justify-between gap-3 text-left"><div><div className="text-xs font-semibold text-blue-700">{item.day} · {item.stage}</div><h4 className="mt-1 text-sm font-semibold leading-6 text-ink">{item.decision}</h4></div><ChevronDown size={16} className={`mt-1 shrink-0 text-slate-400 transition ${openLedger === item.id ? "rotate-180" : ""}`} /></button>{openLedger === item.id ? <dl className="mt-3 grid gap-3 border-l-2 border-blue-200 pl-3 text-xs leading-5 sm:grid-cols-2"><div><dt className="font-semibold">Basis</dt><dd className="text-slate-600">{item.basis}</dd></div><div><dt className="font-semibold">Risk</dt><dd className="text-slate-600">{item.risk}</dd></div><div><dt className="font-semibold">Owner</dt><dd className="text-slate-600">{item.ownerRole}</dd></div><div><dt className="font-semibold">Next</dt><dd className="text-slate-600">{item.nextAction}</dd></div></dl> : null}</article>)}</div></div></section>
    </div>
  );
}
