import type {
  CompatibilityEvaluation,
  CompatibilityInput,
  CompatibilityRuleSet,
} from "../types";

export function evaluateCompatibility(
  input: CompatibilityInput,
  ruleSet: CompatibilityRuleSet,
): CompatibilityEvaluation {
  const dock = ruleSet.docks.find((item) => item.id === input.dockId);
  const required = [input.dockId, input.hostOs, input.hostConnection, input.task];

  if (!dock || required.some((value) => !value)) {
    return {
      outcome: "unknown",
      confidence: "low",
      headline: "输入不足，无法形成确定性结论",
      summary: "请补齐 Dock、操作系统、主机连接和目标任务。未知状态不会被自动补全为支持。",
      reasons: ["关键字段缺失，或所选 Dock 不在当前审阅范围内。"],
      requiredChecks: ["补齐设备型号与版本", "确认目标任务和连接方式"],
      evidenceRefs: [],
      ruleIds: ["rule-required-inputs"],
    };
  }

  if (input.task === "display" && input.displayCount === 0) {
    return {
      outcome: "unknown",
      confidence: "low",
      headline: "目标任务与显示器数量冲突",
      summary: "显示输出任务至少需要选择一台外接显示器。",
      reasons: ["当前输入无法描述可执行的显示拓扑。"],
      requiredChecks: ["确认外接显示器数量", "确认镜像或扩展模式"],
      evidenceRefs: [dock.sourceRef],
      ruleIds: ["rule-required-inputs"],
    };
  }

  if (input.task === "display" && input.displayCount > dock.maxReviewedDisplays) {
    return {
      outcome: "not_supported",
      confidence: "medium",
      headline: "超出当前已审阅的显示拓扑范围",
      summary: `当前规则只覆盖最多 ${dock.maxReviewedDisplays} 台外接显示器；该结论仅适用于本规则集，不替代厂商或硬件测试结论。`,
      reasons: ["目标显示器数量超过当前公开规格和样例规则的审阅范围。"],
      requiredChecks: ["查阅最新官方拓扑说明", "如需继续，建立独立硬件测试案例"],
      evidenceRefs: [dock.sourceRef],
      ruleIds: ["rule-reviewed-display-limit"],
    };
  }

  if (!dock.reviewedTasks.includes(input.task)) {
    return {
      outcome: "unknown",
      confidence: "low",
      headline: "当前规则集未覆盖该任务",
      summary: "未覆盖不等于不支持，需要新增来源和人工测试后再形成规则。",
      reasons: ["所选任务不在该 Dock 的当前审阅任务列表中。"],
      requiredChecks: ["补充官方规格来源", "创建人工金标准案例"],
      evidenceRefs: [dock.sourceRef],
      ruleIds: ["rule-required-inputs"],
    };
  }

  const reasons = ["公开产品规格覆盖所选任务，但当前没有对应硬件金标准案例。"];
  const requiredChecks = ["核对主机、OS、Dock、线材和显示器的完整版本", "执行人工测试后由责任人确认"];
  const evidenceRefs = [dock.sourceRef];
  const ruleIds = ["rule-public-claim-only"];

  if (input.hostOs === "macos" && input.task === "display" && input.displayCount === 2 && input.displayMode === "extend") {
    reasons.push("已审核公开反馈显示，macOS 双外屏可能出现仅镜像而非独立扩展的情况。");
    requiredChecks.unshift("确认 Mac 芯片、显示协议、驱动与独立扩展能力");
    evidenceRefs.push("UGF-007");
    ruleIds.push("rule-macos-dual-extend");
  }

  if (input.dockId === "anker_008" && input.task === "ethernet" && input.driverState !== "vendor_verified") {
    reasons.push("已审核公开反馈显示，系统默认网卡驱动可能限制 2.5GbE 吞吐量。");
    requiredChecks.unshift("核对网卡芯片与厂商驱动版本");
    evidenceRefs.push("UGF-008");
    ruleIds.push("rule-tb5-ethernet-driver");
  }

  return {
    outcome: "conditional",
    confidence: "medium",
    headline: "条件支持，必须完成配置核对",
    summary: "当前只能确认公开规格与任务方向一致；在硬件金标准完成前，不升级为“支持”。",
    reasons,
    requiredChecks,
    evidenceRefs: [...new Set(evidenceRefs)],
    ruleIds: [...new Set(ruleIds)],
  };
}
