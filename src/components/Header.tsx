import { useState } from "react";
import { Check, ChevronDown, Database, FolderKanban, LockKeyhole } from "lucide-react";
import { Link } from "react-router-dom";
import { useProjectRun } from "../context/ProjectRunContext";

export default function Header() {
  const { projects, activeProject: project, activeRun: run, canActivateProject, setActiveProject } = useProjectRun();
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-slate-200 bg-white px-4 py-3 sm:px-6">
      <div className="app-header-grid">
        <div className="flex min-w-0 items-center gap-3">
          <div className="brand-logo"><img src={`${import.meta.env.BASE_URL}anker-innovations-logo.svg`} alt="Anker Innovations" /></div>
          <div className="min-w-0">
            <h1 className="truncate text-base font-semibold text-ink">Anker AI-NPD Copilot</h1>
            <p className="truncate text-xs text-slate-500">Evidence-to-Decision Workspace</p>
          </div>
        </div>
        <div className="project-switcher-wrap">
          <button type="button" className="project-context-control" aria-expanded={open} aria-haspopup="menu" onClick={() => setOpen((value) => !value)}>
            <FolderKanban size={15} className="shrink-0 text-blue-700" />
            <span className="min-w-0"><span className="context-label">当前项目</span><span className="context-value">{project.name}</span></span>
            <span className="context-divider" />
            <span className="min-w-0"><span className="context-label">当前 Run</span><span className="context-value">{run.name}</span></span>
            <ChevronDown size={14} className={`shrink-0 text-slate-400 transition ${open ? "rotate-180" : ""}`} />
          </button>
          {open ? <div className="project-switcher-menu" role="menu">
            <div className="border-b border-slate-100 px-3 py-2"><div className="text-xs font-semibold text-ink">切换当前项目</div><div className="mt-0.5 text-[11px] text-slate-500">仅可切换到已载入独立 Run 快照的项目</div></div>
            <div className="py-1">{projects.map((item) => {
              const ready = canActivateProject(item.id);
              const current = item.id === project.id;
              return <button key={item.id} type="button" role="menuitem" disabled={!ready} title={ready ? `切换到 ${item.name}` : `${item.name} 尚未载入独立 Run 数据`} onClick={() => { setActiveProject(item.id); setOpen(false); }} className={`project-switcher-option ${ready ? "" : "project-switcher-option-unavailable"}`}><span className="min-w-0 flex-1"><span className="block truncate text-xs font-semibold text-ink">{item.name}</span><span className="mt-0.5 block truncate text-[11px] text-slate-500">{item.scenario} · {item.market}</span></span>{current ? <Check size={15} className="shrink-0 text-blue-700" /> : ready ? <span className="run-ready-chip">Run ready</span> : <span className="snapshot-missing-chip"><LockKeyhole size={12} />未载入 Run</span>}</button>;
            })}</div>
            <Link to="/project-workspace" onClick={() => setOpen(false)} className="project-switcher-footer">管理项目组合</Link>
          </div> : null}
        </div>
        <div className="flex justify-end"><span className="data-boundary hidden md:inline-flex"><Database size={13} /> Public sample data</span></div>
      </div>
    </header>
  );
}
