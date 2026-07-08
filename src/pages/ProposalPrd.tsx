import proposalPrd from "../data/proposalPrd.json";
import pendingConfirmations from "../data/pendingConfirmations.json";
import StatusBadge from "../components/StatusBadge";

export default function ProposalPrd() {
  return (
    <div className="space-y-6">
      <section>
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-anker">
          Draft PRD
        </div>
        <h2 className="mt-2 text-3xl font-semibold text-ink">{proposalPrd.title}</h2>
        <div className="mt-3 flex gap-2">
          <StatusBadge status={proposalPrd.status} />
          <StatusBadge status="need_confirmation" />
        </div>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          {proposalPrd.oneSentence}
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-lg border border-slate-200 bg-white p-5">
          <h3 className="text-lg font-semibold text-ink">Product Positioning</h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">{proposalPrd.positioning}</p>
          <div className="mt-4">
            <div className="text-sm font-semibold text-ink">Target Users</div>
            <p className="mt-2 text-sm text-slate-600">{proposalPrd.targetUsers.join(" / ")}</p>
          </div>
        </article>
        <article className="rounded-lg border border-slate-200 bg-white p-5">
          <h3 className="text-lg font-semibold text-ink">Evidence Summary</h3>
          <p className="mt-3 text-sm text-slate-600">{proposalPrd.evidenceSummary.gateSummary}</p>
          <p className="mt-2 text-sm text-slate-600">{proposalPrd.evidenceSummary.agentSummary}</p>
        </article>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5">
        <h3 className="text-lg font-semibold text-ink">MVP Feature Scope</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {proposalPrd.mvpFeatures.map((feature) => (
            <div key={feature.feature} className="rounded-md bg-slate-50 p-3">
              <div className="font-medium text-ink">{feature.priority} · {feature.feature}</div>
              <p className="mt-1 text-sm text-slate-600">{feature.value}</p>
              <p className="mt-1 text-xs text-slate-500">{feature.status}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-lg border border-amber-200 bg-amber-50 p-5">
          <h3 className="font-semibold text-ink">Pending Confirmations</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            {pendingConfirmations.map((item) => (
              <li key={item.id}>{item.title}</li>
            ))}
          </ul>
        </article>
        <article className="rounded-lg border border-slate-200 bg-white p-5">
          <h3 className="font-semibold text-ink">Feishu Handoff</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            {proposalPrd.feishuArtifacts.map((artifact) => (
              <li key={artifact}>{artifact}</li>
            ))}
          </ul>
        </article>
      </section>
    </div>
  );
}
