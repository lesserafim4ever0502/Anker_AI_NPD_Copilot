import { Database, RefreshCw } from "lucide-react";
import lineage from "../data/feishuLineage.json";

export default function FeishuWorkspaceBar() {
  return (
    <section className="feishu-workspace-bar" aria-label="飞书工作台数据状态">
      <div className="flex min-w-0 items-center gap-2">
        <Database size={15} className="shrink-0 text-blue-700" />
        <span className="shrink-0 text-xs font-semibold text-slate-700">飞书数据底座</span>
        <span className="hidden truncate text-xs text-slate-500 md:inline">{lineage.workspaceName}</span>
      </div>
      <div className="flex shrink-0 items-center gap-2 text-[11px] text-slate-500">
        <span>{lineage.tableCount} tables</span>
        <span className="hidden sm:inline">·</span>
        <span className="hidden sm:inline">{lineage.snapshotMode}</span>
        <RefreshCw size={12} />
        <span>{lineage.syncStatus}</span>
      </div>
    </section>
  );
}
