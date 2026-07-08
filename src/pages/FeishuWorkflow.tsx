import feishuWorkflow from "../data/feishuWorkflow.json";
import feishuArtifactsData from "../data/feishuArtifacts.json";
import validationTasks from "../data/validationTasks.json";
import decisionLedger from "../data/decisionLedger.json";
import type { FeishuArtifact } from "../types";
import StatusBadge from "../components/StatusBadge";

const feishuArtifacts = feishuArtifactsData as FeishuArtifact[];

export default function FeishuWorkflow() {
  return (
    <div className="space-y-6">
      <section>
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-anker">
          Feishu Handoff
        </div>
        <h2 className="mt-2 text-3xl font-semibold text-ink">飞书协同沉淀</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
          当前是 Proposal-stage Mock，不接真实飞书 API。页面保留表格、文档、任务、会议和知识库归档结构。
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {feishuWorkflow.layers.map((layer) => (
          <article key={layer.id} className="rounded-lg border border-slate-200 bg-white p-4">
            <h3 className="font-semibold text-ink">{layer.name}</h3>
            <p className="mt-2 text-sm text-slate-600">{layer.description}</p>
            <p className="mt-3 text-xs text-slate-500">{layer.feishuObjects.join(" / ")}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        {feishuArtifacts.map((artifact) => (
          <article key={artifact.id} className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-semibold text-ink">{artifact.name}</h3>
              <StatusBadge status={artifact.mockStatus} />
            </div>
            <p className="mt-2 text-sm text-slate-600">{artifact.businessValue}</p>
            <p className="mt-2 text-xs text-slate-500">{artifact.feishuType}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-lg border border-slate-200 bg-white p-5">
          <h3 className="text-lg font-semibold text-ink">Validation Tasks</h3>
          <div className="mt-3 space-y-2 text-sm text-slate-700">
            {validationTasks.map((task) => (
              <div key={task.id} className="rounded-md bg-slate-50 p-3">
                {task.title}
              </div>
            ))}
          </div>
        </article>
        <article className="rounded-lg border border-slate-200 bg-white p-5">
          <h3 className="text-lg font-semibold text-ink">Decision Ledger</h3>
          <div className="mt-3 space-y-2 text-sm text-slate-700">
            {decisionLedger.map((item) => (
              <div key={item.id} className="rounded-md bg-slate-50 p-3">
                {item.day} · {item.decision}
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="rounded-lg border border-blue-200 bg-blue-50 p-4">
        <h3 className="font-semibold text-ink">Automation Roadmap</h3>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          {feishuWorkflow.automationRoadmap.map((item) => (
            <div key={item.stage} className="rounded-md bg-white/70 p-3 text-sm">
              <div className="font-semibold text-ink">{item.stage}</div>
              <div className="mt-1 text-slate-600">{item.mode}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
