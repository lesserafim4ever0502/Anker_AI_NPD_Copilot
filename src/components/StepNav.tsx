import { NavLink } from "react-router-dom";
import { Archive, Boxes, FileText, FolderKanban, Radar, Scale, TableProperties } from "lucide-react";

const steps = [
  { to: "/project-workspace", label: "项目工作台", short: "项目", icon: FolderKanban },
  { to: "/evidence-pool", label: "证据池", short: "证据", icon: Boxes },
  { to: "/pain-radar", label: "痛点雷达", short: "痛点", icon: Radar },
  { to: "/competitor-matrix", label: "竞品矩阵", short: "竞品", icon: TableProperties },
  { to: "/evaluation", label: "决策评审", short: "评审", icon: Scale },
  { to: "/proposal-prd", label: "PRD 输出", short: "PRD", icon: FileText },
  { to: "/feishu-workflow", label: "飞书沉淀", short: "飞书", icon: Archive },
];

export default function StepNav() {
  return (
    <nav className="step-nav" aria-label="NPD Run stages">
      {steps.map((step, index) => (
        <NavLink
          key={step.to}
          to={step.to}
          className={({ isActive }) => `step-link ${isActive ? "step-link-active" : ""}`}
        >
          <span className="step-index">{index + 1}</span>
          <step.icon size={17} />
          <span className="step-full">{step.label}</span>
          <span className="step-short">{step.short}</span>
        </NavLink>
      ))}
    </nav>
  );
}
