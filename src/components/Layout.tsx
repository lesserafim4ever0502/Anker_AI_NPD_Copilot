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
      <div className="workspace-grid">
        <aside className="step-rail">
          <StepNav />
        </aside>
        <main className="min-w-0 px-4 py-6 sm:px-6 xl:px-8">
          <Outlet />
        </main>
        <div className="decision-rail">
          <DecisionPanel />
        </div>
      </div>
    </div>
  );
}
