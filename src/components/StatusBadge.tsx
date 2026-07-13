import type { StageStatus, Status } from "../types";

type BadgeStatus = StageStatus | Status | "pass" | "warning" | "fail" | string;

const statusLabel: Record<string, string> = {
  completed: "已完成",
  in_progress: "进行中",
  need_confirmation: "需确认",
  pending: "待开始",
  blocked: "阻塞",
  draft: "草稿",
  evidence_building: "证据构建",
  insight_ready: "洞察已形成",
  opportunity_generated: "机会已生成",
  under_review: "评审中",
  prd_drafted: "PRD 草案",
  meeting_scheduled: "会议已安排",
  validation_task_created: "验证任务已创建",
  archived: "已归档",
  pass: "Pass",
  warning: "Warning",
  fail: "Fail",
  recommended_with_warning: "推荐 / 需确认",
  need_feasibility_review: "需可行性复核",
  hold_more_evidence_needed: "保留 / 补证据",
  draft_need_confirmation: "草案 / 需确认",
  ready_for_stage_gate: "可进入 Stage-Gate",
  validation_required: "先验证",
  more_evidence_required: "先补证据",
  fail_evidence_gate: "证据 Gate 失败",
};

const statusClass: Record<string, string> = {
  completed: "border-emerald-200 bg-emerald-50 text-emerald-700",
  in_progress: "border-blue-200 bg-blue-50 text-blue-700",
  need_confirmation: "border-amber-200 bg-amber-50 text-amber-700",
  pending: "border-slate-200 bg-slate-50 text-slate-600",
  blocked: "border-red-200 bg-red-50 text-red-700",
  prd_drafted: "border-blue-200 bg-blue-50 text-blue-700",
  under_review: "border-indigo-200 bg-indigo-50 text-indigo-700",
  insight_ready: "border-teal-200 bg-teal-50 text-teal-700",
  ready_for_stage_gate: "border-emerald-200 bg-emerald-50 text-emerald-700",
  validation_required: "border-amber-200 bg-amber-50 text-amber-700",
  more_evidence_required: "border-slate-200 bg-slate-50 text-slate-700",
  recommended_with_warning: "border-amber-200 bg-amber-50 text-amber-700",
  fail_evidence_gate: "border-red-200 bg-red-50 text-red-700",
  pass: "border-emerald-200 bg-emerald-50 text-emerald-700",
  warning: "border-amber-200 bg-amber-50 text-amber-700",
  fail: "border-red-200 bg-red-50 text-red-700",
};

export default function StatusBadge({ status }: { status: BadgeStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${
        statusClass[status] ?? "border-slate-200 bg-slate-50 text-slate-700"
      }`}
    >
      {statusLabel[status] ?? status}
    </span>
  );
}
