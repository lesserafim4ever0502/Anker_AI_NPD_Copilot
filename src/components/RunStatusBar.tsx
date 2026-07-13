import type { NpdProject, NpdRun } from "../types";
import StatusBadge from "./StatusBadge";
import { ArrowRight, CircleAlert } from "lucide-react";

export default function RunStatusBar({ project, run }: { project: NpdProject; run: NpdRun }) {
  return (
    <section className="run-bar">
      <div className="flex min-w-0 items-center gap-2">
        <CircleAlert size={16} className="shrink-0 text-amber-600" />
        <span className="truncate text-sm font-semibold text-ink">{run.currentStage}</span>
        <StatusBadge status={run.confidence} />
      </div>
      <div className="hidden min-w-0 items-center gap-2 text-xs text-slate-500 md:flex">
        <span className="truncate">{project.name}</span><ArrowRight size={13} />
        <span className="truncate text-slate-700">{run.name}</span>
      </div>
      <div className="stage-strip">
        {run.stageProgress.map((stage) => (
          <div key={stage.stageId} className={`stage-dot stage-${stage.status}`} title={`${stage.name}: ${stage.status}`}>
            <span>{stage.name}</span>
          </div>
        ))}
      </div>
      <div className="hidden text-right xl:block">
        <div className="text-[10px] uppercase text-slate-400">Next action</div>
        <div className="text-xs font-semibold text-slate-700">{run.nextAction}</div>
      </div>
    </section>
  );
}
