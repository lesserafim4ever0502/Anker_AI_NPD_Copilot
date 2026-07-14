import { Outlet } from "react-router-dom";
import DecisionPanel from "./DecisionPanel";
import FeishuWorkspaceBar from "./FeishuWorkspaceBar";
import Header from "./Header";
import RunStatusBar from "./RunStatusBar";
import StepNav from "./StepNav";
import { useProjectRun } from "../context/ProjectRunContext";

export default function Layout() {
  const { activeProject, activeRun } = useProjectRun();
  return (
    <div className="min-h-screen bg-surface text-ink">
      <Header project={activeProject} run={activeRun} />
      <RunStatusBar project={activeProject} run={activeRun} />
      <FeishuWorkspaceBar />
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
