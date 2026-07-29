import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import projectsData from "../data/projects.json";
import runsData from "../data/npdRuns.json";
import snapshotsData from "../data/runSnapshots.json";
import type { CreateNpdRunDraftInput, NpdProject, NpdRun, RunSnapshot } from "../types";

type ProjectRunContextValue = {
  projects: NpdProject[];
  runs: NpdRun[];
  snapshots: RunSnapshot[];
  activeProject: NpdProject;
  activeRun: NpdRun;
  activeSnapshot: RunSnapshot;
  canActivateProject: (projectId: string) => boolean;
  isDraftProject: (projectId: string) => boolean;
  createDraftRun: (input: CreateNpdRunDraftInput) => string;
  setActiveProject: (projectId: string) => void;
};

type DraftPortfolio = {
  projects: NpdProject[];
  runs: NpdRun[];
  snapshots: RunSnapshot[];
};

const DRAFT_STORAGE_KEY = "anker-ai-npd-copilot.portfolio-drafts.v1";
const seedProjects = projectsData as NpdProject[];
const seedRuns = runsData as NpdRun[];
const seedSnapshots = snapshotsData as RunSnapshot[];
const workspaceCompany = seedProjects[0].company;
const emptyDraftPortfolio: DraftPortfolio = { projects: [], runs: [], snapshots: [] };
const ProjectRunContext = createContext<ProjectRunContextValue | null>(null);

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isStoredDraftPortfolio(value: unknown): value is DraftPortfolio {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<DraftPortfolio>;
  if (!Array.isArray(candidate.projects) || !Array.isArray(candidate.runs) || !Array.isArray(candidate.snapshots)) return false;
  const projectsValid = candidate.projects.every((project) =>
    project?.id?.startsWith("local-project-")
    && project.currentRunId?.startsWith("local-run-")
    && typeof project.name === "string"
    && isStringArray(project.category)
    && isStringArray(project.ownerRoles)
    && project.status === "draft");
  const runsValid = candidate.runs.every((run) =>
    run?.id?.startsWith("local-run-")
    && run.projectId?.startsWith("local-project-")
    && typeof run.name === "string"
    && isStringArray(run.category)
    && Array.isArray(run.stageProgress));
  const snapshotsValid = candidate.snapshots.every((snapshot) =>
    snapshot?.runId?.startsWith("local-run-")
    && snapshot.projectId?.startsWith("local-project-")
    && snapshot.status === "unavailable");
  return projectsValid && runsValid && snapshotsValid;
}

function loadDraftPortfolio(): DraftPortfolio {
  if (typeof window === "undefined") return emptyDraftPortfolio;
  try {
    const stored = window.localStorage.getItem(DRAFT_STORAGE_KEY);
    if (!stored) return emptyDraftPortfolio;
    const parsed: unknown = JSON.parse(stored);
    return isStoredDraftPortfolio(parsed) ? parsed : emptyDraftPortfolio;
  } catch {
    return emptyDraftPortfolio;
  }
}

export function ProjectRunProvider({ children }: { children: ReactNode }) {
  const [draftPortfolio, setDraftPortfolio] = useState<DraftPortfolio>(loadDraftPortfolio);
  const projects = useMemo(() => [...seedProjects, ...draftPortfolio.projects], [draftPortfolio.projects]);
  const runs = useMemo(() => [...seedRuns, ...draftPortfolio.runs], [draftPortfolio.runs]);
  const snapshots = useMemo(() => [...seedSnapshots, ...draftPortfolio.snapshots], [draftPortfolio.snapshots]);
  const [activeProjectId, setActiveProjectId] = useState(seedProjects[0].id);
  const activeProject = projects.find((project) => project.id === activeProjectId) ?? seedProjects[0];
  const activeRun = runs.find((run) => run.id === activeProject.currentRunId) ?? seedRuns[0];
  const activeSnapshot = snapshots.find((snapshot) => snapshot.runId === activeRun.id && snapshot.status === "loaded") ?? seedSnapshots[0];

  useEffect(() => {
    try {
      window.localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draftPortfolio));
    } catch {
      // The workspace remains usable even when browser storage is unavailable.
    }
  }, [draftPortfolio]);

  const isDraftProject = useCallback((projectId: string) => draftPortfolio.projects.some((project) => project.id === projectId), [draftPortfolio.projects]);
  const canActivateProject = useCallback((projectId: string) => {
    if (isDraftProject(projectId)) return false;
    const project = projects.find((item) => item.id === projectId);
    if (!project) return false;
    const run = runs.find((item) => item.id === project.currentRunId && item.projectId === project.id);
    return Boolean(run && snapshots.some((snapshot) => snapshot.runId === run.id && snapshot.projectId === project.id && snapshot.status === "loaded"));
  }, [isDraftProject, projects, runs, snapshots]);
  const createDraftRun = useCallback((input: CreateNpdRunDraftInput) => {
    const token = typeof globalThis.crypto?.randomUUID === "function" ? globalThis.crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const projectId = `local-project-${token}`;
    const runId = `local-run-${token}`;
    const updatedAt = new Date().toISOString().slice(0, 10);
    const project: NpdProject = {
      id: projectId,
      name: input.projectName,
      company: workspaceCompany,
      category: input.categories,
      scenario: input.scenario,
      market: input.market,
      currentRunId: runId,
      status: "draft",
      confidence: "low",
      recommendedCandidate: "尚未生成 · 等待证据池与机会评审",
      pendingCount: 0,
      nextAction: "冻结问题范围并建立飞书证据采集表",
      ownerRoles: input.ownerRoles,
      updatedAt,
    };
    const run: NpdRun = {
      id: runId,
      projectId,
      name: `${input.categories.join(" × ")} × ${input.scenario} × ${input.market}`,
      company: workspaceCompany,
      category: input.categories,
      scenario: input.scenario,
      market: input.market,
      mode: "浏览器本地草案",
      currentStage: "Project Scoping",
      status: "draft",
      confidence: "low",
      nextAction: "Scope Freeze & Evidence Intake",
      summary: input.problemStatement,
      stageProgress: [
        { stageId: "start", name: "启动", status: "in_progress" },
        { stageId: "evidence", name: "证据池", status: "pending" },
        { stageId: "pain", name: "痛点", status: "pending" },
        { stageId: "competitor", name: "竞品", status: "pending" },
        { stageId: "review", name: "评审", status: "pending" },
        { stageId: "prd", name: "PRD 草案", status: "pending" },
        { stageId: "feishu", name: "飞书协作", status: "pending" },
      ],
    };
    const snapshot: RunSnapshot = {
      runId,
      projectId,
      status: "unavailable",
      version: "draft",
      source: "Browser-local NPD Run draft",
      dataBoundary: "No evidence snapshot loaded",
      pageData: {},
    };
    setDraftPortfolio((current) => ({
      projects: [...current.projects, project],
      runs: [...current.runs, run],
      snapshots: [...current.snapshots, snapshot],
    }));
    return projectId;
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
    isDraftProject,
    createDraftRun,
    setActiveProject,
  }), [projects, runs, snapshots, activeProject, activeRun, activeSnapshot, canActivateProject, isDraftProject, createDraftRun, setActiveProject]);

  return <ProjectRunContext.Provider value={value}>{children}</ProjectRunContext.Provider>;
}

export function useProjectRun() {
  const context = useContext(ProjectRunContext);
  if (!context) throw new Error("useProjectRun must be used within ProjectRunProvider");
  return context;
}
