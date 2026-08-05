import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Check, Clipboard, FlaskConical, RotateCcw, ShieldAlert } from "lucide-react";
import protocolData from "../data/validationProtocol.json";
import type { ValidationDraftRecord, ValidationProtocol } from "../types";

const protocol = protocolData as ValidationProtocol;
const storageKey = "anker-ai-npd-validation-drafts-v1";

const initialForm = {
  method: protocol.methods[0].value,
  topologyId: protocol.topologies[0].id,
  taskId: protocol.tasks[0].id,
  comparisonArm: protocol.comparisonArms[1].value,
  observedOutcome: protocol.observedOutcomes[1].value,
  reviewerVerdict: protocol.reviewerVerdicts[3].value,
  durationSeconds: "",
  reviewer: "",
  notes: "",
};

export default function ValidationOperationsPanel() {
  const [drafts, setDrafts] = useState<ValidationDraftRecord[]>(() => {
    try {
      return JSON.parse(window.localStorage.getItem(storageKey) ?? "[]") as ValidationDraftRecord[];
    } catch {
      return [];
    }
  });
  const [form, setForm] = useState(initialForm);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(drafts));
  }, [drafts]);

  const selectedTopology = protocol.topologies.find((item) => item.id === form.topologyId)!;
  const selectedTask = protocol.tasks.find((item) => item.id === form.taskId)!;
  const plannedCases = protocol.targets.topologies * protocol.targets.tasksPerTopology;
  const completedDrafts = useMemo(() => drafts.filter((item) => item.reviewerVerdict !== "blocked").length, [drafts]);

  function submitDraft(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const record: ValidationDraftRecord = {
      id: `draft-${Date.now()}`,
      createdAt: new Date().toISOString(),
      method: form.method,
      topologyId: form.topologyId,
      taskId: form.taskId,
      comparisonArm: form.method === "faq_comparison" ? form.comparisonArm : null,
      observedOutcome: form.observedOutcome,
      reviewerVerdict: form.reviewerVerdict,
      durationSeconds: form.durationSeconds ? Number(form.durationSeconds) : null,
      reviewer: form.reviewer.trim(),
      notes: form.notes.trim(),
      verificationStatus: "local_draft",
    };
    setDrafts((current) => [record, ...current]);
    setForm((current) => ({ ...current, durationSeconds: "", notes: "" }));
  }

  async function copyHandoff() {
    const payload = {
      schemaVersion: protocol.version,
      exportedAt: new Date().toISOString(),
      boundary: protocol.boundary,
      targetObjects: protocol.feishuHandoff.targetObjects,
      records: drafts,
    };
    try {
      await navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
  }

  function clearDrafts() {
    setDrafts([]);
    setCopyState("idle");
  }

  return (
    <section className="overflow-hidden border border-slate-200 bg-white shadow-sm" aria-labelledby="validation-ops-title">
      <header className="grid gap-4 border-b border-slate-200 bg-slate-950 px-5 py-5 text-white xl:grid-cols-[minmax(0,1fr)_auto] xl:items-center">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-300"><FlaskConical size={15} /> PRODUCT PROOF · VALIDATION OPS</div>
          <h3 id="validation-ops-title" className="mt-2 text-xl font-semibold">验证运营控制台</h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-300">把拟议指标变成可执行案例、原始观测和待复核回写，不把本地记录冒充已验证结果。</p>
        </div>
        <div className="grid grid-cols-3 gap-px overflow-hidden border border-slate-700 bg-slate-700 text-center">
          <Metric value={`${protocol.verified.goldCases}/${protocol.targets.goldCases}`} label="已签核金标准" tone="amber" />
          <Metric value={`${protocol.verified.faqComparisonSessions}/${protocol.targets.faqComparisonSessions}`} label="FAQ 对照会话" />
          <Metric value={String(drafts.length)} label="本地草稿" tone="blue" />
        </div>
      </header>

      <div className="grid min-w-0 2xl:grid-cols-[minmax(0,1.1fr)_380px]">
        <div className="min-w-0 border-b border-slate-200 p-5 2xl:border-b-0 2xl:border-r">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div><div className="section-kicker">30 例硬件金标准计划</div><p className="mt-1 text-sm text-slate-600">10 组拓扑 × 3 个任务；当前只定义测试面，不宣称已经执行。</p></div>
            <span className="text-xs font-semibold text-slate-500">{plannedCases} planned · {completedDrafts} local observations</span>
          </div>
          <div className="mt-4 overflow-x-auto border border-slate-200">
            <table className="w-full min-w-[680px] text-left text-xs">
              <thead className="bg-slate-50 text-slate-500"><tr><th className="px-3 py-2.5">拓扑</th><th className="px-3 py-2.5">主机 / 系统</th><th className="px-3 py-2.5">连接 / 显示</th><th className="px-3 py-2.5">任务覆盖</th></tr></thead>
              <tbody className="divide-y divide-slate-100">
                {protocol.topologies.map((topology) => (
                  <tr key={topology.id} className={topology.id === form.topologyId ? "bg-blue-50/60" : "hover:bg-slate-50"}>
                    <td className="px-3 py-3"><button type="button" onClick={() => setForm((current) => ({ ...current, topologyId: topology.id }))} className="font-semibold text-blue-700 hover:underline">{topology.id}</button><div className="mt-1 max-w-52 leading-5 text-slate-500">{topology.reason}</div></td>
                    <td className="px-3 py-3 font-medium text-slate-700">{topology.host}<div className="mt-1 font-normal text-slate-500">{topology.os}</div></td>
                    <td className="px-3 py-3 text-slate-700">{topology.connection}<div className="mt-1 text-slate-500">{topology.displays}</div></td>
                    <td className="px-3 py-3"><div className="flex flex-wrap gap-1">{protocol.tasks.map((task) => <button key={task.id} type="button" onClick={() => setForm((current) => ({ ...current, topologyId: topology.id, taskId: task.id }))} className={`rounded border px-2 py-1 font-medium ${topology.id === form.topologyId && task.id === form.taskId ? "border-blue-300 bg-blue-100 text-blue-800" : "border-slate-200 bg-white text-slate-600"}`}>{task.title}</button>)}</div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <form className="bg-slate-50 p-5" onSubmit={submitDraft}>
          <div className="section-kicker">记录一次原始观测</div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 2xl:grid-cols-1">
            <Select label="验证方法" value={form.method} options={protocol.methods} onChange={(value) => setForm((current) => ({ ...current, method: value }))} />
            <Select label="拓扑" value={form.topologyId} options={protocol.topologies.map((item) => ({ value: item.id, label: `${item.id} · ${item.host}` }))} onChange={(value) => setForm((current) => ({ ...current, topologyId: value }))} />
            <Select label="任务" value={form.taskId} options={protocol.tasks.map((item) => ({ value: item.id, label: item.title }))} onChange={(value) => setForm((current) => ({ ...current, taskId: value }))} />
            {form.method === "faq_comparison" ? <Select label="实验组别" value={form.comparisonArm} options={protocol.comparisonArms} onChange={(value) => setForm((current) => ({ ...current, comparisonArm: value }))} /> : null}
            <Select label="观察结果" value={form.observedOutcome} options={protocol.observedOutcomes} onChange={(value) => setForm((current) => ({ ...current, observedOutcome: value }))} />
            <Select label="复核判断" value={form.reviewerVerdict} options={protocol.reviewerVerdicts} onChange={(value) => setForm((current) => ({ ...current, reviewerVerdict: value }))} />
            <label className="form-field"><span className="form-label">完成时间（秒）</span><input className="form-input" type="number" min="0" value={form.durationSeconds} onChange={(event) => setForm((current) => ({ ...current, durationSeconds: event.target.value }))} placeholder="未测量可留空" /></label>
            <label className="form-field"><span className="form-label">记录人</span><input required className="form-input" value={form.reviewer} onChange={(event) => setForm((current) => ({ ...current, reviewer: event.target.value }))} placeholder="填写实际记录人" /></label>
            <label className="form-field"><span className="form-label">原始观察与异常</span><textarea required className="form-input form-textarea" value={form.notes} onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))} placeholder="记录实际现象，不写推测性结论" /></label>
          </div>
          <div className="mt-4 border-l-2 border-blue-300 bg-white px-3 py-2 text-xs leading-5 text-slate-600"><strong className="text-slate-800">{selectedTopology.host} · {selectedTask.title}</strong><br />{selectedTask.instruction}</div>
          <button type="submit" className="primary-button mt-4 w-full"><Check size={15} /> 保存为本地待复核草稿</button>
        </form>
      </div>

      <div className="grid gap-px border-t border-slate-200 bg-slate-200 2xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="bg-white p-5"><div className="section-kicker">实验判定门槛</div><div className="mt-3 divide-y divide-slate-100">{protocol.metrics.map((metric) => <article key={metric.id} className="min-w-0 border-l-2 border-slate-300 py-3 pl-3 first:pt-0 last:pb-0"><div className="flex min-w-0 flex-wrap items-baseline gap-x-3 gap-y-1"><h4 className="min-w-0 text-sm font-semibold text-ink">{metric.label}</h4><span className="shrink-0 whitespace-nowrap text-sm font-semibold text-blue-700">{metric.target}</span></div><p className="mt-1 text-xs leading-5 text-slate-500">{metric.failRule}</p></article>)}</div></div>
        <aside className="bg-amber-50 p-5"><div className="flex items-center gap-2 text-xs font-semibold text-amber-800"><ShieldAlert size={15} /> 飞书回写边界</div><p className="mt-3 text-xs leading-5 text-slate-700">{protocol.feishuHandoff.writebackRule}</p><div className="mt-3 flex flex-wrap gap-1">{protocol.feishuHandoff.targetObjects.map((item) => <span key={item} className="rounded border border-amber-200 bg-white px-2 py-1 text-[10px] text-amber-800">{item}</span>)}</div><div className="mt-4 flex gap-2"><button type="button" disabled={!drafts.length} onClick={copyHandoff} className="secondary-button flex-1 disabled:cursor-not-allowed disabled:opacity-50"><Clipboard size={14} /> {copyState === "copied" ? "已复制交接 JSON" : copyState === "failed" ? "复制失败" : "复制飞书交接 JSON"}</button><button type="button" disabled={!drafts.length} onClick={clearDrafts} className="icon-button border-amber-200 bg-white disabled:opacity-50" title="清空本地草稿" aria-label="清空本地草稿"><RotateCcw size={15} /></button></div></aside>
      </div>

      <div className="border-t border-amber-200 bg-amber-50 px-5 py-3 text-xs leading-5 text-amber-900">{protocol.boundary}</div>
    </section>
  );
}

function Metric({ value, label, tone = "slate" }: { value: string; label: string; tone?: "slate" | "amber" | "blue" }) {
  const color = tone === "amber" ? "text-amber-300" : tone === "blue" ? "text-blue-300" : "text-white";
  return <div className="min-w-28 bg-slate-900 px-3 py-2.5"><div className={`text-lg font-semibold tabular-nums ${color}`}>{value}</div><div className="mt-0.5 text-[10px] text-slate-400">{label}</div></div>;
}

function Select({ label, value, options, onChange }: { label: string; value: string; options: { value: string; label: string }[]; onChange: (value: string) => void }) {
  return <label className="form-field"><span className="form-label">{label}</span><select className="form-input" value={value} onChange={(event) => onChange(event.target.value)}>{options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>;
}
