# STATE.md

## Current Phase

当前处于 **Pre-development Design Freeze** 阶段。

方向已经明确：Anker AI-NPD Copilot，一套面向安克新品定义的证据链驱动 NPD 决策系统。

## Completed Decisions

- 企业选择：安克创新。
- 方案方向：产品研发 / 新品定义工具，不是营销工具。
- 系统定位：Evidence-to-Decision，而不是 Prompt-to-Idea。
- Demo 形态：React + TypeScript + Tailwind + 本地 JSON。
- 候选 NP：报名阶段预置 3 个，体现为基于证据池预生成。
- 页面结构：7 页主流程。
- 飞书定位：企业协同底座，不是导出按钮。
- 仓库规范：Human-readable + Agent-readable，包含 README、AGENT、SPEC、STATE、DESIGN 等。
- 页面设计：7 页已完成 V1 设计讨论。
- 工作流机制：多项目工作台 + NPD Run 状态 + Pending Confirmation + Decision Ledger + Feishu Handoff。

## Current Demo State Recommendation

```text
Project: 桌面办公能源生态项目
Run: 智能充电 × 多设备移动办公 × 北美市场
Status: PRD Drafted / Need Confirmation
Recommended Candidate: 多设备移动办公桌面能量中枢
Confidence: Medium
Next Action: Product Review Meeting
```

## Next Development Steps

1. 初始化 Vite + React + TypeScript + Tailwind 项目。
2. 将 `data_templates/*.json` 复制到 `src/data/` 并补齐样例数据。
3. 按 `docs/DATA_SCHEMA.md` 创建 `src/types/index.ts`。
4. 搭建全局 Layout、Header、StepNav、RunStatusBar、DecisionPanel。
5. 开发 7 个页面。
6. 实现 P0 交互。
7. 补充视觉 polish。
8. 截图并沉淀到提交材料。

## Risks

- 页面信息量较大，开发时需要保持清晰层级。
- 不要把系统做成普通 dashboard。
- 不要把多 Agent 做成聊天记录。
- 不要让飞书只在最后出现一个按钮。
- 不要让 PRD 输出显得像最终立项。

## Update Rule

每次重大决策变更后更新：

- `STATE.md`
- `DECISIONS.md`
- `SPEC.md`
- `DESIGN.md`
- `review_index.json`


---

## Data Intake Pipeline

### Current Data Intake Status

Evidence intake has been defined as a semi-automated pipeline:

```text
raw public evidence
  → raw_evidence_intake.csv
  → Evidence Screening Agent
  → structured_evidence_template.csv
  → human review
  → src/data/*.json
  → demo pages
```

### Current Rules

- Team members only need to collect minimal raw evidence fields.
- AI / Agent classifies evidence, scores evidence value, maps pages, extracts tags, pain points, opportunity gaps, and design signals.
- Human review is required before final demo JSON generation.
- Public evidence must not be described as full-market or full-user data.

### Next Data Tasks

1. Fill `data_templates/raw_evidence_intake.csv` with public product, feedback, review, and community data.
2. Batch classify raw evidence with `docs/EVIDENCE_AGENT_PROMPT.md`.
3. Review `include` and high-value `maybe` records.
4. Export approved evidence into `src/data/*.json`.
5. Update Page 2–7 demo data from approved structured evidence.
