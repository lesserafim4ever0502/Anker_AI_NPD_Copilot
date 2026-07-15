import pendingConfirmations from "../data/pendingConfirmations.json";
import decisionLedger from "../data/decisionLedger.json";
import { AlertTriangle, ArrowUpRight, ClipboardCheck, ShieldAlert } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { Link } from "react-router-dom";
import { useProjectRun } from "../context/ProjectRunContext";

export default function DecisionPanel() {
  const pending = pendingConfirmations.slice(0, 3);
  const ledger = decisionLedger.slice(-3);
  const { activeProject: project, activeRun: run } = useProjectRun();

  return (
    <aside className="space-y-5">
      <section>
        <div className="section-kicker"><ClipboardCheck size={14} /> Current decision</div>
        <h2 className="mt-2 text-base font-semibold leading-6 text-ink">{project.recommendedCandidate}</h2>
        <div className="mt-3 flex flex-wrap gap-2"><StatusBadge status="recommended_with_warning" /><StatusBadge status={run.confidence} /></div>
        <p className="mt-3 text-xs leading-5 text-slate-600">{run.summary}</p>
      </section>
      <section className="border-t border-slate-200 pt-5">
        <div className="section-kicker text-amber-700"><AlertTriangle size={14} /> Pending Confirmation · {pendingConfirmations.length}</div>
        <ul className="mt-3 space-y-3 text-sm text-slate-700">
          {pending.map((item) => (
            <li key={item.id} className="border-l-2 border-amber-300 pl-3">
              <div className="font-medium text-slate-800">{item.title}</div>
              <div className="mt-1 text-xs text-slate-500">{item.ownerRole.join(" / ")}</div>
            </li>
          ))}
        </ul>
        <Link to="/proposal-prd?tab=Evidence" className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-anker">查看全部 <ArrowUpRight size={13} /></Link>
      </section>
      <section className="border-t border-slate-200 pt-5">
        <div className="section-kicker"><ShieldAlert size={14} /> Decision Ledger</div>
        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          {ledger.map((item) => (
            <li key={item.id} className="grid grid-cols-[42px_1fr] gap-2 border-b border-slate-100 pb-2">
              <span className="text-xs font-semibold text-slate-400">{item.day}</span>
              <span className="text-xs leading-5">{item.decision}</span>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
}
