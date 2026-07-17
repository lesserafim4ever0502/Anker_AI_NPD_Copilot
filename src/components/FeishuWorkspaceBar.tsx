import { Database, Eye, ShieldCheck } from "lucide-react";
import lineage from "../data/feishuLineage.json";

export default function FeishuWorkspaceBar() {
  return (
    <section className="feishu-workspace-bar" aria-label="飞书协作工作区状态">
      <div className="flex min-w-0 items-center gap-2.5">
        <Database size={15} className="shrink-0 text-blue-700" />
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="shrink-0 text-xs font-semibold text-slate-700">飞书协作底座</span>
            <span className="feishu-mode-chip">{lineage.workspaceStatus}</span>
          </div>
          <span className="hidden truncate text-[11px] text-slate-500 md:block">{lineage.workspaceName}</span>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-3 text-[11px] text-slate-500">
        <span className="hidden items-center gap-1.5 xl:inline-flex"><ShieldCheck size={13} className="text-emerald-600" />{lineage.snapshotMode} · {lineage.syncStatus}</span>
        <span className="hidden text-slate-300 xl:inline">|</span>
        <span>{lineage.tableCount} 张表</span>
        <span className="inline-flex items-center gap-1.5"><Eye size={13} />{lineage.frontendMode}</span>
      </div>
    </section>
  );
}
