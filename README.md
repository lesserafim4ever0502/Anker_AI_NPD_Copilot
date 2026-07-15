# Anker AI-NPD Copilot

> 面向安克创新命题的 AI 原生新品定义工作台：从用户反馈到新品立项的证据链驱动 NPD 决策系统。
>
> An evidence-driven AI workspace for moving from public user feedback to reviewable new-product decisions for Anker Innovation.

本仓库当前是 **可运行的桌面优先七页 Demo repository**。Vite + React + TypeScript + Tailwind 工程、审核后的公开样本数据、Stage-Gate 结果、产品委员会结论与 Proposal PRD V0.2 均已实现。当前交互支持公开来源下钻、决策优先的竞品机会页、Guided Walkthrough CTA，以及会议与知识库级别的飞书协作资产展示。

This is a **runnable desktop-first seven-page demo repository**. The frontend, reviewed public sample data, Stage-Gate outcome, committee decision, and Proposal PRD V0.2 are implemented. The current experience supports public-source drill-down, decision-first opportunity review, guided walkthrough actions, and Feishu meeting and knowledge-archive handoff views without changing frozen evidence or decisions.

## 1. 项目定位

Anker AI-NPD Copilot 不是普通 AI 聊天机器人，也不是一次性新品创意生成器。它是一套面向安克消费电子新品定义场景的 **Evidence-to-Decision** 工作台，通过公开小样本证据池、用户痛点雷达、竞品机会矩阵、Stage-Gate 门禁、多 Agent 产品委员会、样例 NP PRD 摘要与飞书协同沉淀，帮助产品团队把新品定义从经验驱动升级为证据链驱动。

## 2. Demo 主流程

1. 项目工作台 / 项目启动页：管理多个 NPD 项目，进入当前主 Run。
2. 证据池概览页：展示公开小样本证据池、数据来源、证据链和数据缺口。
3. 用户痛点雷达页：从用户反馈中提炼痛点标签、严重度和设计信号。
4. 竞品机会矩阵页：结合产品矩阵和痛点信号识别机会空白与重叠风险。
5. Stage-Gate + 多 Agent 评审页：对 3 个候选 NP 做门禁评审、反方质疑和推荐判断。
6. 样例 NP PRD 摘要输出页：生成结构化 PRD 草案、MVP 功能、风险和验证计划。
7. 飞书协同沉淀页：将本轮 NPD Run 的证据、决策、PRD、任务和知识沉淀到飞书。

## 3. 当前推荐 Demo 状态

当前主项目建议呈现为：

```text
Run Status: PRD Drafted / Need Confirmation
Project: 桌面办公能源生态项目
Run: 智能充电 × 多设备移动办公 × 北美市场
Recommended Candidate: 跨平台 Dock 兼容预检助手（Recommended with Warning）
Confidence: Medium
Next: Product Review Meeting
```

已完成：分析边界定义、证据池构建、痛点聚类、竞品机会识别、候选 NP 评审、PRD 摘要草案。

待确认：与安克现有 SKU 的差异边界、用户付费意愿、MVP 硬件复杂度。

## 4. 仓库结构

```text
.
├── README.md
├── AGENT.md
├── SPEC.md
├── STATE.md
├── DECISIONS.md
├── DESIGN.md
├── review_index.json
├── docs/
│   ├── SYSTEM_PRD.md
│   ├── UX_PAGE_DETAILS.md
│   ├── NPD_RUN_LIFECYCLE.md
│   ├── ROLE_JOURNEYS.md
│   ├── DECISION_LOGIC.md
│   ├── FEISHU_COLLABORATION.md
│   ├── DATA_SCHEMA.md
│   ├── DATA_INTAKE.md
│   ├── EVIDENCE_AGENT_PROMPT.md
│   ├── EVIDENCE_TO_DECISION.md
│   ├── PROMPT_CONTRACTS.md
│   ├── DEMO_SCRIPT.md
│   ├── REPORT_OUTLINE.md
│   ├── ENTERPRISE_VALUE.md
│   ├── DEVELOPMENT_PLAN.md
│   └── CHANGELOG.md
├── data_templates/
│   ├── *.json
│   ├── raw_evidence_intake.csv
│   ├── structured_evidence_template.csv
│   ├── evidence_intake_examples.csv
│   └── evidence_schema.json
├── submission_templates/
│   └── *.md
└── assets_placeholder/
    └── README.md
```

## 5. Agent-ready 仓库规范

本项目采用 Human-readable + Agent-readable 双通道设计：

- `README.md`：给人类评委、队友和开发者快速理解项目。
- `AGENT.md`：给 AI Agent 作为第一入口，明确项目边界、开发规则、目录结构、页面流和不可破坏的设计约束。
- `SPEC.md`：项目单一事实源。
- `STATE.md`：当前项目状态和下一步。
- `DESIGN.md`：交互网页设计规范。
- `review_index.json`：供自动审阅、摘要与 Agent 快速建模的结构化索引。

后续让 AI Agent 开发时，第一步必须读取：

```text
AGENT.md
SPEC.md
DESIGN.md
docs/SYSTEM_PRD.md
docs/UX_PAGE_DETAILS.md
docs/DATA_SCHEMA.md
```


## 6. 数据采集自动化入口

本仓库已内置 Evidence Intake Pipeline，用于把复杂的数据筛选规则自动化。团队成员只需要先填最小原始证据表，后续由 AI / Agent 完成筛选、打分、标签、页面映射和结构化输出。

核心文件：

```text
docs/DATA_INTAKE.md
docs/EVIDENCE_AGENT_PROMPT.md
data_templates/raw_evidence_intake.csv
data_templates/structured_evidence_template.csv
data_templates/evidence_intake_examples.csv
data_templates/evidence_schema.json
```

推荐流程：

```text
队友填 raw_evidence_intake.csv
  → 使用 EVIDENCE_AGENT_PROMPT.md 批量筛选
  → 输出 structured_evidence_template.csv
  → 人工复核 include / high-value maybe
  → 转成 src/data/*.json
  → 供 Page 2–7 消费
```

原则：输入证据使用可追溯公开数据；标签、评分、页面映射由 AI 半自动生成并经人工复核。飞书采集 Base 和两份文档已真实创建，但网页中的 Feishu Handoff 仍为 Proposal-stage Mock，不接真实前端 API。

## 7. 技术栈 / Stack

当前工程：

```text
Vite + React + TypeScript + Tailwind CSS
本地 JSON 数据
无真实后端
无真实登录
无真实爬虫
无真实飞书 API 强依赖
```

当前 Demo 使用本地 JSON 和 Mock 飞书 Handoff 展示完整流程；飞书 CLI 仅用于维护独立的协作工作台，不作为浏览器运行时依赖。

## 8. MVP 边界

报名 Demo 当前必须明确：

- 候选 NP 可用本地 JSON 预置，视觉上表现为“基于当前证据池预生成”。
- PRD 输出是草案，不是最终立项文件。
- 飞书同步可以 Mock，但要展示文档、表格、任务、会议和知识库的完整协同链路。
- 不要把 NPD 表达成一键完成。系统应该保留 Warning、Pending Confirmation、Review Meeting 和 Validation Tasks。

## 9. Sites 开发入口 / Sites Entry Point

Sites 开始前必须读取：

```text
AGENT.md
SPEC.md
STATE.md
DESIGN.md
docs/SITES_HANDOFF.md
docs/DEMO_SCRIPT.md
docs/DATA_SCHEMA.md
```

直接沿用现有 `src/`、路由和 `src/data/*.json` 实现七页可交互 Demo。优先保证叙事、状态和证据引用准确，再完成响应式视觉与交互验证。

Sites must preserve the existing project structure and JSON contract, implement all seven routes, and keep Warning, Pending Confirmation, Decision Ledger, and Feishu Handoff visible throughout the demo.
