import { Outlet } from "react-router-dom";
import projects from "../data/projects.json";
import runs from "../data/npdRuns.json";
import type { NpdProject, NpdRun } from "../types";
import DecisionPanel from "./DecisionPanel";
import Header from "./Header";
import RunStatusBar from "./RunStatusBar";
import StepNav from "./StepNav";

const project = projects[0] as NpdProject;
const run = runs[0] as NpdRun;

export default function Layout() {
  return (
    <div className="min-h-screen bg-surface text-ink">
      <Header project={project} run={run} />
      <RunStatusBar project={project} run={run} />
      <div className="grid min-h-[calc(100vh-178px)] grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)_320px]">
        <aside className="border-r border-slate-200 bg-white p-4">
          <StepNav />
        </aside>
        <main className="min-w-0 p-6">
          <Outlet />
        </main>
        <div className="border-l border-slate-200 bg-white p-4">
          <DecisionPanel />
        </div>
      </div>
    </div>
  );
}
