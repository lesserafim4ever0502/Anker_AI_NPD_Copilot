import projectsData from "../data/projects.json";
import runsData from "../data/npdRuns.json";
import type { NpdProject, NpdRun } from "../types";
import MetricCard from "../components/MetricCard";
import StatusBadge from "../components/StatusBadge";

const projects = projectsData as NpdProject[];
const run = runsData[0] as NpdRun;

export default function ProjectWorkspace() {
  return (
    <div className="space-y-6">
      <section>
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-anker">
          Project Workspace
        </div>
        <h2 className="mt-2 text-3xl font-semibold text-ink">项目工作台</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
          当前 Demo 展示多项目 NPD 状态管理。主项目处于 PRD Drafted / Need Confirmation，
          不是完成态，也不是最终立项结论。
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <MetricCard label="项目数" value={projects.length} hint="Proposal-stage sample" />
        <MetricCard label="当前 Run 状态" value={run.currentStage} hint={run.confidence} />
        <MetricCard label="待确认事项" value={projects[0].pendingCount} hint={projects[0].nextAction} />
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        {projects.map((project) => (
          <article key={project.id} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-ink">{project.name}</h3>
                <p className="mt-1 text-sm text-slate-500">
                  {project.scenario} · {project.market}
                </p>
              </div>
              <StatusBadge status={project.status} />
            </div>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="text-slate-500">推荐候选</dt>
                <dd className="font-medium text-ink">{project.recommendedCandidate ?? "待生成"}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Owner</dt>
                <dd className="text-slate-700">{project.ownerRoles.join(" / ")}</dd>
              </div>
              <div>
                <dt className="text-slate-500">下一步</dt>
                <dd className="text-slate-700">{project.nextAction}</dd>
              </div>
            </dl>
          </article>
        ))}
      </section>
    </div>
  );
}
