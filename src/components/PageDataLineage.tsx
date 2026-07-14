import { ArrowRight, Database, FileCheck2 } from "lucide-react";
import lineageData from "../data/feishuLineage.json";
import { useProjectRun } from "../context/ProjectRunContext";

type PageKey = keyof typeof lineageData.pages;

export default function PageDataLineage({ page }: { page: PageKey }) {
  const lineage = lineageData.pages[page];
  const { activeSnapshot } = useProjectRun();
  const hasSnapshotData = Boolean(activeSnapshot.pageData[page]?.length);
  return (
    <section className="lineage-strip" aria-label={`${lineage.stage}数据血缘`}>
      <div className="lineage-stage">
        <Database size={15} />
        <div><div className="text-[10px] uppercase text-slate-400">Feishu lineage</div><div className="text-xs font-semibold text-slate-700">{lineage.stage}</div></div>
      </div>
      <div className="lineage-tables">
        {lineage.sourceTables.map((table) => <span key={table} className="lineage-table">{table}</span>)}
      </div>
      <ArrowRight size={14} className="hidden shrink-0 text-slate-300 lg:block" />
      <div className="hidden min-w-0 lg:block"><div className="text-[10px] uppercase text-slate-400">Transform</div><div className="truncate text-xs text-slate-600">{lineage.process}</div></div>
      <div className="lineage-output" title={`${activeSnapshot.source} · ${activeSnapshot.version}`}><FileCheck2 size={14} /><span>{hasSnapshotData ? lineage.output : "Snapshot unavailable"}</span></div>
    </section>
  );
}
