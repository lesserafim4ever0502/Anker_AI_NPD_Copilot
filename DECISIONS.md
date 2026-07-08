# DECISIONS.md

## Decision 001: 选择安克创新命题

选择安克创新，围绕消费电子新品定义场景设计 AI 原生 NPD 工具。

## Decision 002: 方案不是直接设计一个新品

系统本体是 Anker AI-NPD Copilot；样例 NP PRD 是系统输出的一部分，不是人工提前写死的主方案。

## Decision 003: 采用 Evidence-to-Decision 方法论

项目核心不是 AI 生成创意，而是从证据链到结构化决策。

## Decision 004: 报名 Demo 候选 NP 预置

报名阶段不做真实生成后端。候选 NP 由本地 JSON 预置，但明确标注为基于公开小样本和前期调研预生成。

## Decision 005: 7 页主流程

冻结页面结构：项目工作台、证据池、痛点雷达、竞品矩阵、评审页、PRD 输出、飞书沉淀。

## Decision 006: 增加 DESIGN.md

由于交互网页需要视觉和页面设计规范，新增 DESIGN.md 作为 Agent 开发设计基准。

## Decision 007: 引入多项目状态管理

系统不是单次分析页面，而是多项目 NPD 工作台。首页升级为项目工作台，展示多个 NPD Project 和主 NPD Run。

## Decision 008: 引入 NPD Run 生命周期

一次新品定义任务被定义为 NPD Run，支持 Draft、Evidence Building、Insight Ready、Opportunity Generated、Under Review、Need Confirmation、PRD Drafted、Meeting Scheduled、Validation Task Created、Archived 等状态。

## Decision 009: Demo 不呈现全部完成

推荐 Demo 状态为 PRD Drafted / Need Confirmation，更符合真实企业 NPD 场景。

## Decision 010: 飞书作为企业协同底座

飞书承载输入数据、AI 协同、输出产物、会议任务和知识复用，不是简单导出工具。

## Decision 011: 引入 Agent-ready 仓库规范

保留 README、AGENT、SPEC、STATE、DESIGN、review_index 等文件，支持人类和 AI Agent 双通道阅读。

## Decision 012: Stage-Gate 和多 Agent 同页

决策评审页同时展示 3 个候选 NP、Stage-Gate 矩阵、Kill Criteria、多 Agent 评审、最终推荐和待确认事项。

## Decision 013: PRD 输出是草案

Page 6 输出样例 NP PRD 摘要草案，不代表最终立项文件。必须保留风险、非目标和待确认事项。

## Decision 014: Page 7 必须体现会议和任务

飞书协同沉淀页不仅展示文档和表格，还必须展示二次评审会议议程、MVP 验证任务、Decision Ledger 和知识库归档。


---

## Decision 015: Use Semi-Automated Evidence Intake Pipeline

Status: Accepted

The project will not rely on fully manual evidence screening, and will not implement broad web crawling in the proposal-stage demo.

Instead, the team will use a semi-automated pipeline:

```text
Human-selected public sources
  → minimal raw intake table
  → AI / Agent evidence screening
  → structured evidence table
  → human review
  → page-specific JSON data
```

Rationale:

1. Reduces team cognitive load during data collection.
2. Preserves traceability through `source_url` and confidence fields.
3. Ensures every data item can support Page 2–7 and the Evidence-to-Decision chain.
4. Avoids unstable scraping, anti-bot, login, OCR, and large-scale data collection risks.
5. Keeps the demo honest: public sample data supports proposal-stage workflow validation, not final product launch decisions.

Implementation artifacts:

- `docs/DATA_INTAKE.md`
- `docs/EVIDENCE_AGENT_PROMPT.md`
- `data_templates/raw_evidence_intake.csv`
- `data_templates/structured_evidence_template.csv`
- `data_templates/evidence_schema.json`
