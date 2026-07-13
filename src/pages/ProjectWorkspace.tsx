import { useState } from "react";
import { ArrowRight, FolderKanban, Users } from "lucide-react";
import projectsData from "../data/projects.json";
import runsData from "../data/npdRuns.json";
import type { NpdProject, NpdRun } from "../types";
import MetricCard from "../components/MetricCard";
import StatusBadge from "../components/StatusBadge";
import PageHeader from "../components/PageHeader";

const projects = projectsData as NpdProject[];
const run = runsData[0] as NpdRun;

export default function ProjectWorkspace() {
  const [selectedId, setSelectedId] = useState(projects[0].id);
  const selected = projects.find((project) => project.id === selectedId) ?? projects[0];

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="01 / Project Workspace" title="项目工作台" icon={FolderKanban}
        description={run.summary}
        action={<a className="primary-button" href="/evidence-pool">进入当前 Run <ArrowRight size={16} /></a>} />

      <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <MetricCard label="项目总数" value={projects.length} hint="Proposal-stage portfolio" />
        <MetricCard label="当前 Run" value={run.currentStage} hint={`Confidence · ${run.confidence}`} />
        <MetricCard label="开放确认" value={projects[0].pendingCount} hint={projects[0].nextAction} />
      </section>

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div>
          <div className="mb-3 flex items-end justify-between">
            <div><h3 className="section-title">项目组合</h3><p className="section-subtitle">选择项目查看当前决策状态与责任团队</p></div>
            <span className="text-xs text-slate-500">{projects.length} projects</span>
          </div>
          <div className="divide-y divide-slate-200 border-y border-slate-200 bg-white">
            {projects.map((project) => (
              <button key={project.id} onClick={() => setSelectedId(project.id)}
                className={`grid w-full gap-3 px-4 py-4 text-left transition sm:grid-cols-[minmax(0,1fr)_auto] ${selectedId === project.id ? "bg-blue-50/70 shadow-[inset_3px_0_0_#2f80ed]" : "hover:bg-slate-50"}`}>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2"><h4 className="font-semibold text-ink">{project.name}</h4><StatusBadge status={project.status} /></div>
                  <p className="mt-1 text-xs text-slate-500">{project.category.join(" / ")} · {project.scenario} · {project.market}</p>
                  <p className="mt-3 text-sm text-slate-700">{project.recommendedCandidate}</p>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-500 sm:justify-end">
                  <span>{project.pendingCount} pending</span><ArrowRight size={15} />
                </div>
              </button>
            ))}
          </div>
        </div>

        <aside className="panel h-fit">
          <div className="section-kicker">Selected project</div>
          <h3 className="mt-2 text-lg font-semibold text-ink">{selected.name}</h3>
          <div className="mt-3 flex gap-2"><StatusBadge status={selected.status} /><StatusBadge status={selected.confidence} /></div>
          <dl className="mt-5 space-y-4 text-sm">
            <div><dt className="text-xs text-slate-500">推荐候选</dt><dd className="mt-1 font-medium leading-6 text-ink">{selected.recommendedCandidate}</dd></div>
            <div><dt className="text-xs text-slate-500">下一步</dt><dd className="mt-1 leading-6 text-slate-700">{selected.nextAction}</dd></div>
            <div><dt className="flex items-center gap-1 text-xs text-slate-500"><Users size={13} /> Owners</dt><dd className="mt-2 flex flex-wrap gap-1.5">{selected.ownerRoles.map((role) => <span key={role} className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-600">{role}</span>)}</dd></div>
          </dl>
        </aside>
      </section>
    </div>
  );
}
