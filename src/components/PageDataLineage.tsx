import { useState } from "react";
import { ChevronDown, ClipboardCheck, Database, FileCheck2, ShieldCheck, Users } from "lucide-react";
import lineageData from "../data/feishuLineage.json";
import { useProjectRun } from "../context/ProjectRunContext";

type PageKey = keyof typeof lineageData.pages;

export default function PageDataLineage({ page }: { page: PageKey }) {
  const lineage = lineageData.pages[page];
  const { activeSnapshot } = useProjectRun();
  const hasSnapshotData = Boolean(activeSnapshot.pageData[page]?.length);
  const [expanded, setExpanded] = useState(false);
  const statusLabel = {
    reviewed_snapshot: "已审核快照",
    in_review: "协作评审中",
    need_confirmation: "等待确认",
    proposal_mock: "提案阶段 Mock",
  }[lineage.reviewStatus];
  return (
    <section className="feishu-context" aria-label={`${lineage.stage}飞书协作上下文`}>
      <button type="button" className="feishu-context-summary" aria-expanded={expanded} onClick={() => setExpanded((value) => !value)}>
        <div className="feishu-context-stage">
          <Database size={16} />
          <div><div className="text-[10px] font-semibold uppercase text-blue-500">飞书阶段协作</div><div className="text-sm font-semibold text-slate-800">{lineage.stage}</div></div>
        </div>
        <div className="feishu-context-cell">
          <div className="feishu-context-label"><ClipboardCheck size={12} /> 当前协作动作</div>
          <div className="feishu-context-value">{lineage.collaborationAction}</div>
        </div>
        <div className="feishu-context-cell hidden 2xl:block">
          <div className="feishu-context-label"><Users size={12} /> 责任角色</div>
          <div className="feishu-context-value">{lineage.ownerRoles.join(" / ")}</div>
        </div>
        <div className="feishu-context-status">
          <span className={`feishu-review-chip feishu-review-${lineage.reviewStatus}`}>{statusLabel}</span>
          {lineage.pendingCount > 0 ? <span className="feishu-pending-count">{lineage.pendingCount} 项待确认</span> : <span className="text-[11px] font-medium text-emerald-700">无开放确认</span>}
        </div>
        <ChevronDown size={16} className={`shrink-0 text-slate-400 transition ${expanded ? "rotate-180" : ""}`} />
      </button>

      {expanded ? <div className="feishu-context-details">
        <div className="feishu-detail-block">
          <div className="feishu-context-label">飞书来源表</div>
          <div className="lineage-tables">{lineage.sourceTables.map((table) => <span key={table} className="lineage-table">{table}</span>)}</div>
        </div>
        <div className="feishu-detail-block">
          <div className="feishu-context-label">审核与处理规则</div>
          <p>{lineage.process}</p>
        </div>
        <div className="feishu-detail-block">
          <div className="feishu-context-label">阶段产物</div>
          <div className="flex items-start gap-2 font-semibold text-teal-700"><FileCheck2 size={14} className="mt-0.5 shrink-0" /><span>{hasSnapshotData ? lineage.outputArtifact : "当前快照未载入"}</span></div>
          <p className="mt-1 text-slate-500">关联位置：{lineage.writebackTarget}</p>
        </div>
        <div className="feishu-detail-block feishu-boundary-block">
          <div className="feishu-context-label"><ShieldCheck size={12} /> 数据边界</div>
          <p>{lineage.dataBoundary}</p>
          <p className="mt-1 text-slate-500">{activeSnapshot.source} · {activeSnapshot.version}</p>
        </div>
      </div>
      : null}
    </section>
  );
}
