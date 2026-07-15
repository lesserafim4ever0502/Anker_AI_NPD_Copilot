import type { NpdProject, NpdRun } from "../types";
import StatusBadge, { getConfidenceLabel } from "./StatusBadge";
import { CircleAlert, Milestone } from "lucide-react";

export default function RunStatusBar({ project, run }: { project: NpdProject; run: NpdRun }) {
  const currentPhase = run.stageProgress.find((stage) => stage.status !== "completed");

  return (
    <section className="run-bar">
      <div className="run-bar-summary">
        <div className="run-summary-cell">
          <CircleAlert size={16} className="shrink-0 text-amber-600" />
          <div className="min-w-0"><div className="summary-label">Run status</div><div className="truncate text-sm font-semibold text-ink">{run.currentStage}</div></div>
          <StatusBadge status={run.confidence} label={getConfidenceLabel(run.confidence)} />
        </div>
        <div className="run-summary-cell justify-center border-slate-100 md:border-x md:px-5">
          <Milestone size={16} className="shrink-0 text-blue-600" />
          <div className="min-w-0">
            <div className="summary-label">Current phase</div>
            <div className="truncate text-xs font-semibold text-slate-700">{currentPhase?.name ?? run.currentStage}</div>
          </div>
          <span className="shrink-0 whitespace-nowrap text-xs font-semibold text-amber-700">{project.pendingCount} 项待确认</span>
        </div>
        <div className="run-summary-cell justify-end text-right">
          <div className="min-w-0"><div className="summary-label">Next action</div>
          <div className="text-xs font-semibold text-slate-700">{run.nextAction}</div>
          <div className="mt-0.5 truncate text-[10px] text-slate-400">{project.name}</div></div>
        </div>
      </div>
    </section>
  );
}
