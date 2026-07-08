import type { NpdProject, NpdRun } from "../types";
import StatusBadge from "./StatusBadge";

export default function RunStatusBar({ project, run }: { project: NpdProject; run: NpdRun }) {
  return (
    <section className="border-b border-slate-200 bg-white px-6 py-3">
      <div className="grid gap-3 lg:grid-cols-[1.2fr_1.3fr_1fr_1fr]">
        <div>
          <div className="text-xs text-slate-500">Project</div>
          <div className="text-sm font-semibold text-ink">{project.name}</div>
        </div>
        <div>
          <div className="text-xs text-slate-500">Run</div>
          <div className="text-sm font-semibold text-ink">{run.name}</div>
        </div>
        <div>
          <div className="text-xs text-slate-500">Status</div>
          <div className="mt-1 flex gap-2">
            <StatusBadge status="prd_drafted" />
            <StatusBadge status="need_confirmation" />
          </div>
        </div>
        <div>
          <div className="text-xs text-slate-500">Next Action</div>
          <div className="text-sm font-semibold text-ink">{run.nextAction}</div>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {run.stageProgress.map((stage) => (
          <div key={stage.stageId} className="flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1">
            <span className="text-xs font-medium text-slate-600">{stage.name}</span>
            <StatusBadge status={stage.status} />
          </div>
        ))}
      </div>
    </section>
  );
}
