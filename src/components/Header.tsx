import type { NpdProject, NpdRun } from "../types";
import StatusBadge from "./StatusBadge";

export default function Header({ project, run }: { project: NpdProject; run: NpdRun }) {
  return (
    <header className="border-b border-slate-200 bg-white px-6 py-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-anker">
            Proposal-stage Mock / Public sample data
          </div>
          <h1 className="mt-1 text-2xl font-semibold text-ink">Anker AI-NPD Copilot</h1>
          <p className="mt-1 text-sm text-slate-500">
            {project.company} · {project.name} · {run.name}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status="prd_drafted" />
          <StatusBadge status="need_confirmation" />
        </div>
      </div>
    </header>
  );
}
