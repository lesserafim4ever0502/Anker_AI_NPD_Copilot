# START_HERE_DEV.md

## 1. 当前仓库定位

这是 Anker AI-NPD Copilot 的 Sites-ready Demo 仓库。Vite + React + TypeScript + Tailwind 骨架、七页路由、核心组件、类型和审核后的本地 JSON 已存在；下一步是在现有工程上完成体验，不是重新初始化。

This repository is ready for Sites implementation. Preserve the existing stack, routes, components, and frozen JSON contract.

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
docs/SITES_HANDOFF.md
docs/DEMO_SCRIPT.md
```

## 3. Sites 实现任务

```text
1. 保留现有 Vite、React、TypeScript、Tailwind 和 React Router 配置。
2. 使用现有七页路由和组件完成响应式信息架构与视觉实现。
3. 所有业务数据继续从 `src/data/*.json` 读取，禁止在组件中硬编码结论。
4. 让 Page 5/6/7 完整呈现门禁、PRD、待确认项和飞书交接结构。
5. 全局保留 `PRD Drafted / Need Confirmation` 与 `Proposal-stage Mock / Public sample data`。
6. 不新增真实飞书 API、LLM、登录、后端或持久化依赖。
7. 完成构建验证和桌面/移动端视觉检查。
```

## 4. 数据状态

首轮采集、清洗、用户反馈复核、产品能力标准化、机会缺口、候选生成、Stage-Gate 和 PRD V0.2 已完成。`data_templates/*.csv` 保留为后续补采模板，其中 `template-example-*` 行仅用于说明格式，不得进入 Demo 数据。

## 5. 当前不可做

- 不做真实爬虫。
- 不接真实飞书 API。
- 不做真实 LLM Agent 执行。
- 不把 Demo 描述成已接入安克内部数据。
- 不把 PRD 草案写成最终立项文件。
- 不把候选 NP 说成实时生成。
