import type { NpdProject, NpdRun } from "../types";
import { Bell, CircleUserRound, Database, Search } from "lucide-react";

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
        <div className="hidden min-w-0 flex-1 justify-center xl:flex">
          <div className="flex max-w-xl items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-500">
            <Search size={15} /><span className="truncate">{project.name} / {run.name}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <span className="data-boundary hidden md:inline-flex"><Database size={13} /> Public sample data</span>
          <button className="icon-button" aria-label="通知"><Bell size={17} /></button>
          <button className="icon-button" aria-label="当前用户"><CircleUserRound size={18} /></button>
        </div>
      </div>
    </header>
  );
}
