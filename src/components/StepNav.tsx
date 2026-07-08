import { NavLink } from "react-router-dom";

const steps = [
  { to: "/project-workspace", label: "项目工作台" },
  { to: "/evidence-pool", label: "证据池" },
  { to: "/pain-radar", label: "痛点雷达" },
  { to: "/competitor-matrix", label: "竞品矩阵" },
  { to: "/evaluation", label: "决策评审" },
  { to: "/proposal-prd", label: "PRD 输出" },
  { to: "/feishu-workflow", label: "飞书沉淀" },
];

export default function StepNav() {
  return (
    <nav className="space-y-1">
      {steps.map((step, index) => (
        <NavLink
          key={step.to}
          to={step.to}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition ${
              isActive
                ? "bg-blue-50 text-anker"
                : "text-slate-600 hover:bg-slate-100 hover:text-ink"
            }`
          }
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full border border-current text-xs">
            {index + 1}
          </span>
          {step.label}
        </NavLink>
      ))}
    </nav>
  );
}
