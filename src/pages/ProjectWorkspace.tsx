import { useState } from "react";
import { ArrowRight, FolderKanban, Users } from "lucide-react";
import MetricCard from "../components/MetricCard";
import StatusBadge, { getConfidenceLabel } from "../components/StatusBadge";
import PageHeader from "../components/PageHeader";
import PageDataLineage from "../components/PageDataLineage";
import { Link } from "react-router-dom";
import { useProjectRun } from "../context/ProjectRunContext";

export default function ProjectWorkspace() {
  const { projects, runs, snapshots, activeProject, activeRun: run, activeSnapshot, canActivateProject, setActiveProject } = useProjectRun();
  const [selectedId, setSelectedId] = useState(activeProject.id);
  const selected = projects.find((project) => project.id === selectedId) ?? projects[0];
  const selectedRun = runs.find((item) => item.id === selected.currentRunId);
  const selectedSnapshot = snapshots.find((item) => item.runId === selected.currentRunId && item.status === "loaded");
  const isActive = selected.id === activeProject.id;
  const readyProjectCount = projects.filter((project) => canActivateProject(project.id)).length;
  const portfolioPendingCount = projects.reduce((total, project) => total + project.pendingCount, 0);
  const currentStageIndex = run.stageProgress.findIndex((stage) => stage.status !== "completed");

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="01 / Project Workspace" title="项目工作台" icon={FolderKanban}
        description={run.summary}
        action={<Link className="primary-button" to="/evidence-pool">进入当前 Run <ArrowRight size={16} /></Link>} />

      <PageDataLineage page="project-workspace" />

      <section className="run-progress-panel">
        <div className="flex items-end justify-between gap-4"><div><h3 className="section-title">当前 Run 进度</h3><p className="section-subtitle">{run.name} · {run.currentStage}</p></div><span className="text-xs text-slate-500">{run.stageProgress.filter((stage) => stage.status === "completed").length} / {run.stageProgress.length} stages completed</span></div>
        <div className="run-stage-track" aria-label="当前 Run 进度">
          {run.stageProgress.map((stage, index) => <div key={stage.stageId} className={`run-stage-step run-stage-${stage.status} ${index === currentStageIndex ? "run-stage-current" : ""}`} title={`${stage.name} · ${stage.status}`}><span className="run-stage-node">{index + 1}</span><span className="run-stage-name">{stage.name}</span>{index === currentStageIndex ? <span className="run-stage-current-label">当前阶段</span> : null}</div>)}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        <MetricCard label="项目组合" value={projects.length} hint="Proposal-stage portfolio" />
        <MetricCard label="可进入 Run" value={readyProjectCount} hint={`当前：${activeProject.name}`} />
        <MetricCard label="组合待确认" value={portfolioPendingCount} hint={`当前 Run · ${activeProject.pendingCount} 项`} />
      </section>

      <section>
        <div className="mb-3 flex items-end justify-between">
          <div><h3 className="section-title">项目组合与 Run 控制</h3><p className="section-subtitle">选择项目查看治理状态；只有已载入独立证据快照的项目可切换为全局 Current Run</p></div>
          <span className="text-xs text-slate-500">{readyProjectCount} ready / {projects.length} projects</span>
        </div>
        <div className="grid grid-cols-1 items-stretch gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="h-full">
          <div className="divide-y divide-slate-200 border-y border-slate-200 bg-white">
            {projects.map((project) => (
              <button key={project.id} onClick={() => setSelectedId(project.id)} aria-pressed={selectedId === project.id}
                className={`grid w-full gap-3 px-4 py-4 text-left transition sm:grid-cols-[minmax(0,1fr)_auto] ${selectedId === project.id ? "bg-blue-50/70 shadow-[inset_3px_0_0_#2f80ed]" : "hover:bg-slate-50"}`}>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2"><h4 className="font-semibold text-ink">{project.name}</h4><StatusBadge status={project.status} />{project.id === activeProject.id ? <span className="current-run-chip">Current Run</span> : null}</div>
                  <p className="mt-1 text-xs text-slate-500">{project.category.join(" / ")} · {project.scenario} · {project.market}</p>
                  <p className="mt-3 text-sm text-slate-700">{project.recommendedCandidate}</p>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500 sm:justify-end">
                  <span className={canActivateProject(project.id) ? "run-ready-chip" : "run-placeholder-chip"}>{canActivateProject(project.id) ? "Run ready" : "Snapshot unavailable"}</span>
                  <span>{project.pendingCount} pending</span><ArrowRight size={15} />
                </div>
              </button>
            ))}
          </div>
        </div>

        <aside className="panel h-full">
          <div className="section-kicker">Selected project</div>
          <h3 className="mt-2 text-lg font-semibold text-ink">{selected.name}</h3>
          <div className="mt-3 flex gap-2"><StatusBadge status={selected.status} /><StatusBadge status={selected.confidence} label={getConfidenceLabel(selected.confidence)} /></div>
          <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2 xl:grid-cols-1">
            <div><dt className="text-xs text-slate-500">推荐候选</dt><dd className="mt-1 font-medium leading-6 text-ink">{selected.recommendedCandidate}</dd></div>
            <div><dt className="text-xs text-slate-500">下一步</dt><dd className="mt-1 leading-6 text-slate-700">{selected.nextAction}</dd></div>
            <div><dt className="flex items-center gap-1 text-xs text-slate-500"><Users size={13} /> Owners</dt><dd className="mt-2 flex flex-wrap gap-1.5">{selected.ownerRoles.map((role) => <span key={role} className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-600">{role}</span>)}</dd></div>
            <div><dt className="text-xs text-slate-500">治理状态</dt><dd className="mt-1 text-xs leading-5 text-slate-600">{selectedRun && selectedSnapshot ? `${selectedRun.stageProgress.filter((stage) => stage.status === "completed").length}/${selectedRun.stageProgress.length} stages complete · snapshot ${selectedSnapshot.version}` : "组合项目已登记；独立证据快照和 Run 尚未载入"}</dd></div>
            <div><dt className="text-xs text-slate-500">最近更新</dt><dd className="mt-1 text-xs leading-5 text-slate-600">{selected.updatedAt} · {selected.pendingCount} 项待确认</dd></div>
          </dl>
          <div className="mt-5 border-t border-slate-200 pt-4 text-xs leading-5 text-slate-500">{isActive ? "该项目驱动顶部状态、右侧决策面板和后续六页数据。" : "该项目仅展示组合状态；进入完整分析前需先建立独立证据快照。"}</div>
          <div className="mt-4">{selectedRun && selectedSnapshot ? <Link to="/evidence-pool" onClick={() => setActiveProject(selected.id)} className="secondary-button w-full">{isActive ? "继续当前 Run" : "设为当前 Run"}<ArrowRight size={15} /></Link> : <button disabled className="secondary-button w-full cursor-not-allowed opacity-50">证据快照未载入</button>}</div>
        </aside>
        </div>
      </section>

      <section><div className="mb-3"><h3 className="section-title">当前 Run 治理上下文</h3><p className="section-subtitle">项目切换后，七页证据、决策状态和飞书快照必须作为同一个版本化上下文更新</p></div><div className="grid gap-px overflow-hidden border border-slate-200 bg-slate-200 lg:grid-cols-3"><div className="bg-white p-4"><div className="section-kicker">Active scope</div><div className="mt-2 text-sm font-semibold text-ink">{activeProject.name}</div><p className="mt-1 text-xs leading-5 text-slate-500">{run.name}</p></div><div className="bg-white p-4"><div className="section-kicker">Evidence snapshot</div><div className="mt-2 text-sm font-semibold text-ink">{activeSnapshot.version}</div><p className="mt-1 text-xs leading-5 text-slate-500">{activeSnapshot.source}</p></div><div className="bg-white p-4"><div className="section-kicker">Decision control</div><div className="mt-2 text-sm font-semibold text-ink">{activeProject.pendingCount} 项待确认</div><p className="mt-1 text-xs leading-5 text-slate-500">{activeProject.nextAction}</p></div></div></section>
    </div>
  );
}
