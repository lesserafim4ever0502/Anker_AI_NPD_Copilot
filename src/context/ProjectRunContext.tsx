import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import projectsData from "../data/projects.json";
import runsData from "../data/npdRuns.json";
import snapshotsData from "../data/runSnapshots.json";
import type { NpdProject, NpdRun, RunSnapshot } from "../types";

type ProjectRunContextValue = {
  projects: NpdProject[];
  runs: NpdRun[];
  snapshots: RunSnapshot[];
  activeProject: NpdProject;
  activeRun: NpdRun;
  activeSnapshot: RunSnapshot;
  canActivateProject: (projectId: string) => boolean;
  setActiveProject: (projectId: string) => void;
};

const projects = projectsData as NpdProject[];
const runs = runsData as NpdRun[];
const snapshots = snapshotsData as RunSnapshot[];
const ProjectRunContext = createContext<ProjectRunContextValue | null>(null);

export function ProjectRunProvider({ children }: { children: ReactNode }) {
  const [activeProjectId, setActiveProjectId] = useState(projects[0].id);
  const activeProject = projects.find((project) => project.id === activeProjectId) ?? projects[0];
  const activeRun = runs.find((run) => run.id === activeProject.currentRunId) ?? runs[0];
  const activeSnapshot = snapshots.find((snapshot) => snapshot.runId === activeRun.id && snapshot.status === "loaded") ?? snapshots[0];
  const canActivateProject = useCallback((projectId: string) => {
    const project = projects.find((item) => item.id === projectId);
    if (!project) return false;
    const run = runs.find((item) => item.id === project.currentRunId && item.projectId === project.id);
    return Boolean(run && snapshots.some((snapshot) => snapshot.runId === run.id && snapshot.projectId === project.id && snapshot.status === "loaded"));
  }, []);
  const setActiveProject = useCallback((projectId: string) => {
    if (canActivateProject(projectId)) setActiveProjectId(projectId);
  }, [canActivateProject]);

  const value = useMemo(() => ({
    projects,
    runs,
    snapshots,
    activeProject,
    activeRun,
    activeSnapshot,
    canActivateProject,
    setActiveProject,
  }), [activeProject, activeRun, activeSnapshot, canActivateProject, setActiveProject]);

  return <ProjectRunContext.Provider value={value}>{children}</ProjectRunContext.Provider>;
}

export function useProjectRun() {
  const context = useContext(ProjectRunContext);
  if (!context) throw new Error("useProjectRun must be used within ProjectRunProvider");
  return context;
}
