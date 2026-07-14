import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import projectsData from "../data/projects.json";
import runsData from "../data/npdRuns.json";
import type { NpdProject, NpdRun } from "../types";

type ProjectRunContextValue = {
  projects: NpdProject[];
  runs: NpdRun[];
  activeProject: NpdProject;
  activeRun: NpdRun;
  setActiveProject: (projectId: string) => void;
};

const projects = projectsData as NpdProject[];
const runs = runsData as NpdRun[];
const ProjectRunContext = createContext<ProjectRunContextValue | null>(null);

export function ProjectRunProvider({ children }: { children: ReactNode }) {
  const [activeProjectId, setActiveProjectId] = useState(projects[0].id);
  const activeProject = projects.find((project) => project.id === activeProjectId) ?? projects[0];
  const activeRun = runs.find((run) => run.id === activeProject.currentRunId) ?? runs[0];

  const value = useMemo(() => ({
    projects,
    runs,
    activeProject,
    activeRun,
    setActiveProject: setActiveProjectId,
  }), [activeProject, activeRun]);

  return <ProjectRunContext.Provider value={value}>{children}</ProjectRunContext.Provider>;
}

export function useProjectRun() {
  const context = useContext(ProjectRunContext);
  if (!context) throw new Error("useProjectRun must be used within ProjectRunProvider");
  return context;
}
