import candidatesData from "../data/candidates.json";
import gateEvaluationsData from "../data/gateEvaluations.json";
import agentEvaluationsData from "../data/agentEvaluations.json";
import killCriteria from "../data/killCriteria.json";
import type { AgentEvaluation, CandidateNP, GateEvaluation } from "../types";
import StatusBadge from "../components/StatusBadge";

const candidates = candidatesData as CandidateNP[];
const gates = gateEvaluationsData as GateEvaluation[];
const agents = agentEvaluationsData as AgentEvaluation[];

export default function Evaluation() {
  return (
    <div className="space-y-6">
      <section>
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-anker">
          Stage-Gate Review
        </div>
        <h2 className="mt-2 text-3xl font-semibold text-ink">Stage-Gate + 多 Agent 评审</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
          当前只展示结构化占位，不做真实 LLM 调用；Warning 和 Pending Confirmation 必须保留。
        </p>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        {candidates.map((candidate) => (
          <article key={candidate.id} className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-semibold text-ink">{candidate.name}</h3>
              <StatusBadge status={candidate.status} />
            </div>
            <p className="mt-2 text-sm text-slate-600">{candidate.description}</p>
            <p className="mt-3 text-sm font-medium text-ink">Score {candidate.score}</p>
            <p className="mt-2 text-xs text-slate-500">Risk: {candidate.mainRisk}</p>
          </article>
        ))}
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5">
        <h3 className="text-lg font-semibold text-ink">Gate Matrix</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {gates.map((gate) => (
            <div key={gate.gateId} className="rounded-md bg-slate-50 p-3">
              <div className="flex items-center justify-between gap-3">
                <span className="font-medium text-ink">{gate.gateName}</span>
                <StatusBadge status={gate.status} />
              </div>
              <p className="mt-2 text-sm text-slate-600">{gate.reason}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        {agents.map((agent) => (
          <article key={`${agent.candidateId}-${agent.agentName}`} className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-semibold text-ink">{agent.agentName}</h3>
              {agent.createsPendingConfirmation ? <StatusBadge status="need_confirmation" /> : null}
            </div>
            <p className="mt-2 text-sm text-slate-600">{agent.coreJudgement}</p>
            <p className="mt-2 text-xs text-red-700">反对意见：{agent.objection}</p>
          </article>
        ))}
      </section>

      <section className="rounded-lg border border-red-200 bg-red-50 p-4">
        <h3 className="font-semibold text-ink">Kill Criteria / Warning</h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
          {killCriteria.map((item) => (
            <li key={item.id}>{item.rule}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
