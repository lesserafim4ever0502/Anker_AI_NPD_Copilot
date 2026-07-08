# START_HERE_DEV.md

## 1. 当前仓库定位

这是 Anker AI-NPD Copilot 的开发就绪基线仓库。当前包含完整 PRD、设计规范、Agent 开发规范、数据采集自动化规范和数据模板，但不包含真实 React 前端代码。

## 2. 第一次开发前必须阅读

```text
AGENT.md
SPEC.md
STATE.md
DESIGN.md
docs/SYSTEM_PRD.md
docs/UX_PAGE_DETAILS.md
docs/DATA_SCHEMA.md
docs/DATA_INTAKE.md
docs/EVIDENCE_AGENT_PROMPT.md
```

## 3. 推荐第一轮开发任务

```text
1. 初始化 Vite + React + TypeScript + Tailwind。
2. 创建 src/types/index.ts。
3. 将 data_templates/*.json 复制为 src/data/*.json。
4. 创建 Layout、Header、StepNav、RunStatusBar、DecisionPanel 等基础组件。
5. 创建 7 个页面占位：WorkspacePage、EvidencePoolPage、PainRadarPage、CompetitorMatrixPage、EvaluationPage、ProposalPrdPage、FeishuWorkflowPage。
6. 使用 react-router-dom 建立路由。
7. 所有页面从 JSON 读取数据，不要把业务数据硬编码到组件。
8. 所有页面保留 Proposal-stage Demo / Public sample data 标识。
```

## 4. 数据采集并行任务

队友先填：

```text
data_templates/raw_evidence_intake.csv
```

然后使用：

```text
docs/EVIDENCE_AGENT_PROMPT.md
```

批量生成结构化证据表，再人工复核后转为 `src/data/*.json`。

## 5. 当前不可做

- 不做真实爬虫。
- 不接真实飞书 API。
- 不做真实 LLM Agent 执行。
- 不把 Demo 描述成已接入安克内部数据。
- 不把 PRD 草案写成最终立项文件。
- 不把候选 NP 说成实时生成。
