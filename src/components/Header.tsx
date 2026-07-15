import type { NpdProject, NpdRun } from "../types";
import { ChevronRight, Database, FolderKanban } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header({ project, run }: { project: NpdProject; run: NpdRun }) {
  return (
    <header className="border-b border-slate-200 bg-white px-4 py-3 sm:px-6">
      <div className="mx-auto flex max-w-[1800px] items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="brand-logo"><img src={`${import.meta.env.BASE_URL}anker-innovations-logo.svg`} alt="Anker Innovations" /></div>
          <div className="min-w-0">
            <h1 className="truncate text-base font-semibold text-ink">Anker AI-NPD Copilot</h1>
            <p className="truncate text-xs text-slate-500">Evidence-to-Decision Workspace</p>
          </div>
        </div>
        <div className="hidden min-w-0 flex-1 justify-center lg:flex">
          <Link to="/project-workspace" className="project-context-control" title="返回项目工作台切换项目">
            <FolderKanban size={15} className="shrink-0 text-blue-700" />
            <span className="min-w-0"><span className="context-label">当前项目</span><span className="context-value">{project.name}</span></span>
            <ChevronRight size={13} className="shrink-0 text-slate-300" />
            <span className="min-w-0"><span className="context-label">当前 Run</span><span className="context-value">{run.name}</span></span>
          </Link>
        </div>
        <span className="data-boundary hidden md:inline-flex"><Database size={13} /> Public sample data</span>
      </div>
    </header>
  );
}
