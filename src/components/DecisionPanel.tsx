import pendingConfirmations from "../data/pendingConfirmations.json";
import decisionLedger from "../data/decisionLedger.json";

export default function DecisionPanel() {
  const pending = pendingConfirmations.slice(0, 3);
  const ledger = decisionLedger.slice(0, 3);

  return (
    <aside className="space-y-4">
      <section className="rounded-lg border border-amber-200 bg-amber-50 p-4">
        <div className="text-xs font-semibold uppercase tracking-wide text-amber-700">
          Pending Confirmation
        </div>
        <div className="mt-2 text-sm font-semibold text-ink">当前不是最终立项结论</div>
        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          {pending.map((item) => (
            <li key={item.id} className="rounded-md bg-white/70 p-2">
              {item.title}
            </li>
          ))}
        </ul>
      </section>
      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Decision Ledger
        </div>
        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          {ledger.map((item) => (
            <li key={item.id} className="border-l-2 border-blue-200 pl-3">
              {item.decision}
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
}
