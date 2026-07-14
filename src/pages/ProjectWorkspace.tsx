import { useState } from "react";
import { ArrowRight, FolderKanban, Users } from "lucide-react";
import MetricCard from "../components/MetricCard";
import StatusBadge from "../components/StatusBadge";
import PageHeader from "../components/PageHeader";
import PageDataLineage from "../components/PageDataLineage";
import { Link } from "react-router-dom";
import { useProjectRun } from "../context/ProjectRunContext";

export default function ProjectWorkspace() {
  const { projects, runs, snapshots, activeProject, activeRun: run, activeSnapshot, canActivateProject, setActiveProject } = useProjectRun();
  const [selectedId, setSelectedId] = useState(projects[0].id);
  const selected = projects.find((project) => project.id === selectedId) ?? projects[0];
  const selectedRun = runs.find((item) => item.id === selected.currentRunId);
  const selectedSnapshot = snapshots.find((item) => item.runId === selected.currentRunId && item.status === "loaded");
  const isActive = selected.id === activeProject.id;

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="01 / Project Workspace" title="项目工作台" icon={FolderKanban}
        description={run.summary}
        action={<Link className="primary-button" to="/evidence-pool">进入当前 Run <ArrowRight size={16} /></Link>} />

      <PageDataLineage page="project-workspace" />

      <section className="grid grid-cols-1 gap-3 xl:grid-cols-3">
        <MetricCard label="项目总数" value={projects.length} hint="Proposal-stage portfolio" />
        <MetricCard label="当前 Run" value={run.currentStage} hint={`Confidence · ${run.confidence}`} />
        <MetricCard label="开放确认" value={activeProject.pendingCount} hint={activeProject.nextAction} />
      </section>

      <section>
        <div className="mb-3 flex items-end justify-between">
          <div><h3 className="section-title">项目组合与 Run 控制</h3><p className="section-subtitle">组合选择用于查看；蓝色 Current Run 标识决定全局证据与决策上下文</p></div>
          <span className="text-xs text-slate-500">{projects.length} projects</span>
        </div>
        <div className="grid grid-cols-1 items-stretch gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="h-full">
          <div className="divide-y divide-slate-200 border-y border-slate-200 bg-white">
            {projects.map((project) => (
              <button key={project.id} onClick={() => setSelectedId(project.id)} aria-pressed={selectedId === project.id}
                className={`grid w-full gap-3 px-4 py-4 text-left transition sm:grid-cols-[minmax(0,1fr)_auto] ${selectedId === project.id ? "bg-blue-50/70 shadow-[inset_3px_0_0_#2f80ed]" : "hover:bg-slate-50"}`}>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2"><h4 className="font-semibold text-ink">{project.name}</h4><StatusBadge status={project.status} />{project.id === activeProject.id ? <span className="current-run-chip">Current Run</span> : null}</div>
                  <p className="mt-1 text-xs text-slate-500">{project.category.join(" / ")} · {project.scenario} · {project.market} · {canActivateProject(project.id) ? "Snapshot loaded" : "Snapshot unavailable"}</p>
                  <p className="mt-3 text-sm text-slate-700">{project.recommendedCandidate}</p>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-500 sm:justify-end">
                  <span>{project.pendingCount} pending</span><ArrowRight size={15} />
                </div>
              </button>
            ))}
          </div>
        </div>

        <aside className="panel h-full">
          <div className="section-kicker">Selected project</div>
          <h3 className="mt-2 text-lg font-semibold text-ink">{selected.name}</h3>
          <div className="mt-3 flex gap-2"><StatusBadge status={selected.status} /><StatusBadge status={selected.confidence} /></div>
          <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2 xl:grid-cols-1">
            <div><dt className="text-xs text-slate-500">推荐候选</dt><dd className="mt-1 font-medium leading-6 text-ink">{selected.recommendedCandidate}</dd></div>
            <div><dt className="text-xs text-slate-500">下一步</dt><dd className="mt-1 leading-6 text-slate-700">{selected.nextAction}</dd></div>
            <div><dt className="flex items-center gap-1 text-xs text-slate-500"><Users size={13} /> Owners</dt><dd className="mt-2 flex flex-wrap gap-1.5">{selected.ownerRoles.map((role) => <span key={role} className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-600">{role}</span>)}</dd></div>
            <div><dt className="text-xs text-slate-500">Run linkage</dt><dd className="mt-1 text-xs leading-5 text-slate-600">{selectedRun && selectedSnapshot ? `${selectedRun.stageProgress.filter((stage) => stage.status === "completed").length}/${selectedRun.stageProgress.length} stages complete · snapshot ${selectedSnapshot.version}` : "组合占位：尚未载入完整证据快照"}</dd></div>
          </dl>
          <div className="mt-5 border-t border-slate-200 pt-4 text-xs leading-5 text-slate-500">{isActive ? "该项目驱动顶部状态、右侧决策面板和后续六页数据。" : "该项目仅展示组合状态；进入完整分析前需先建立独立证据快照。"}</div>
          <div className="mt-4">{selectedRun && selectedSnapshot ? <Link to="/evidence-pool" onClick={() => setActiveProject(selected.id)} className="secondary-button w-full">{isActive ? "继续当前 Run" : "设为当前 Run"}<ArrowRight size={15} /></Link> : <button disabled className="secondary-button w-full cursor-not-allowed opacity-50">证据快照未载入</button>}</div>
        </aside>
        </div>
      </section>

      <section><div className="mb-3"><h3 className="section-title">当前 Run 链路</h3><p className="section-subtitle">所有页面共享同一项目、Run、决策状态与飞书数据快照 · {activeSnapshot.source} · {activeSnapshot.version}</p></div><div className="grid grid-cols-2 gap-px overflow-hidden border border-slate-200 bg-slate-200 md:grid-cols-4 xl:grid-cols-7">{run.stageProgress.map((stage, index) => <div key={stage.stageId} className="bg-white p-3"><div className="text-[10px] font-semibold text-slate-400">0{index + 1}</div><div className="mt-1 text-sm font-semibold text-ink">{stage.name}</div><div className="mt-2"><StatusBadge status={stage.status} /></div></div>)}</div></section>
    </div>
  );
}
