import type { NpdProject, NpdRun } from "../types";
import StatusBadge from "./StatusBadge";
import { ArrowRight, CircleAlert } from "lucide-react";
import { NavLink } from "react-router-dom";

const stageRoutes: Record<string, string> = {
  start: "/project-workspace",
  evidence: "/evidence-pool",
  pain: "/pain-radar",
  competitor: "/competitor-matrix",
  review: "/evaluation",
  prd: "/proposal-prd",
  feishu: "/feishu-workflow",
};

export default function RunStatusBar({ project, run }: { project: NpdProject; run: NpdRun }) {
  return (
    <section className="run-bar">
      <div className="run-bar-summary">
        <div className="flex min-w-0 items-center gap-2">
          <CircleAlert size={16} className="shrink-0 text-amber-600" />
          <div className="min-w-0"><div className="text-[10px] font-semibold uppercase text-slate-400">Run status</div><div className="truncate text-sm font-semibold text-ink">{run.currentStage}</div></div>
          <StatusBadge status={run.confidence} />
        </div>
        <div className="hidden min-w-0 items-center gap-2 text-xs text-slate-500 md:flex">
          <span className="truncate">{project.name}</span><ArrowRight size={13} className="shrink-0" />
          <span className="truncate text-slate-700">{run.name}</span>
        </div>
        <div className="hidden text-right lg:block">
          <div className="text-[10px] font-semibold uppercase text-slate-400">Next action</div>
          <div className="text-xs font-semibold text-slate-700">{run.nextAction}</div>
        </div>
      </div>
      <nav className="run-stage-track" aria-label="当前 Run 阶段">
        {run.stageProgress.map((stage, index) => <NavLink key={stage.stageId} to={stageRoutes[stage.stageId] ?? "/project-workspace"} className={({ isActive }) => `run-stage-step run-stage-${stage.status} ${isActive ? "run-stage-route-active" : ""}`} title={`${stage.name} · ${stage.status}`}><span className="run-stage-node">{index + 1}</span><span className="run-stage-name">{stage.name}</span></NavLink>)}
      </nav>
    </section>
  );
}
