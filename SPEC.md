# SPEC.md

## 1. Product Name

**Anker AI-NPD Copilot**

中文名：安克 AI 原生新品定义工作台

副标题：从用户反馈到新品立项的证据链驱动 NPD 决策系统

---

## 2. One-sentence Definition

Anker AI-NPD Copilot 是一套面向安克消费电子新品定义场景的证据链驱动 NPD 决策系统，帮助企业从用户反馈、竞品边界、多智能体评审和飞书协同沉淀中生成可追溯、可评审、可复用的新产品定义草案。

---

## 3. What It Is Not

本方案不是：

- 普通 AI 聊天机器人。
- 单次新品创意生成器。
- 只写 PRD 的文案工具。
- 纯营销增长工具。
- 一键替企业完成立项决策的黑箱系统。

---

## 4. What It Is

本方案是：

- AI 原生新品定义工作台。
- Evidence-to-Decision 决策系统。
- 多项目 NPD 状态管理工作台。
- Stage-Gate + 多 Agent 产品评审系统。
- 飞书协同沉淀与组织知识复用流程。
- 报名阶段可交互 Web Demo + 飞书工作区样例 + 本地数据包。

---

## 5. Core Methodology

核心方法论：**Evidence-to-Decision**。

```text
原始资料
  → 结构化字段
  → 痛点标签
  → 设计信号
  → 机会空白
  → 候选 NP
  → Stage-Gate 评审
  → 多 Agent 产品委员会
  → PRD 草案
  → 飞书任务 / 会议 / 知识库沉淀
```

---

## 6. Product Object Model

```text
Workspace 企业工作区
  ↓
NPD Project 新品定义项目
  ↓
NPD Run 一次分析 / 一轮决策
  ↓
Stage 阶段
  ↓
Artifact 产物
  ↓
Task / Pending Confirmation 待办与待确认事项
```

当前 Demo 主项目：

```text
Workspace: 安克创新 AI-NPD Workspace
Project: 桌面办公能源生态项目
Run: 智能充电 × 多设备移动办公 × 北美市场
Status: PRD Drafted / Need Confirmation
Recommended Candidate: 跨平台 Dock 兼容预检助手（Recommended with Warning）
```

---

## 7. Seven-page Demo

1. 项目工作台 / 项目启动页
2. 证据池概览页
3. 用户痛点雷达页
4. 竞品机会矩阵页
5. Stage-Gate + 多 Agent 评审页
6. 样例 NP PRD 摘要输出页
7. 飞书协作全景与知识沉淀页

---

## 8. P0 Functional Requirements

- 展示多个 NPD 项目状态。
- 进入主 NPD Run。
- 展示全局 Run Status Bar。
- 展示每页 Decision Panel。
- 展示证据池统计、来源、关键证据和数据缺口。
- 展示用户痛点、严重度、设计信号和用户原声。
- 展示竞品矩阵、机会空白、候选 NP 映射和重叠风险。
- 展示 3 个候选 NP。
- 展示 Stage-Gate 矩阵、Kill Criteria 和多 Agent 评审。
- 展示推荐但需二次确认的候选 NP。
- 展示 PRD 摘要草案、MVP 功能、风险和验证计划。
- 七页均展示飞书来源、当前协作动作、责任角色、审核状态、待确认项和产物去向。
- 展示飞书四层协同、产物卡片、会议议程、任务清单、Decision Ledger、知识库归档。

---

## 9. System Boundaries

报名阶段：

- 使用本地 JSON 数据。
- 候选 NP 预置。
- Agent 输出预置。
- 飞书同步 Mock。
- 不接真实后端。
- 不接真实 LLM。
- 不接真实飞书 API。

入围后可升级：

- 通过飞书 CLI 半自动同步 Markdown PRD、评分表和任务。
- 通过飞书开放平台 API 实现文档、多维表格、任务和知识库自动化。
- 接入安克内部数据提升证据置信度。

---

## 10. Core Differentiation

- 不是 Prompt-to-Idea，而是 Evidence-to-Decision。
- 不是只生成一个产品概念，而是从多个候选 NP 中筛选。
- 不是 Agent 角色扮演，而是结构化产品评审机制。
- 不是一键完成，而是保留 Warning、二次确认、会议和验证任务。
- 不是孤立 Web Demo，而是由飞书从项目治理开始贯穿的企业协同闭环。
- 不是只产出文档，而是沉淀数据、评审、风险、任务、模板和知识库。

---

## 11. Acceptance Criteria

Demo 通过验收的标准：

1. 打开首页能理解这是多项目 NPD 工作台。
2. 能看到当前主 Run 处于 PRD Drafted / Need Confirmation，而不是完成态。
3. 能看到后续所有判断来自证据池。
4. 能看到用户痛点不是空泛总结，而有频次、严重度、证据和设计信号。
5. 能看到竞品矩阵服务于机会识别，而不是参数堆砌。
6. 能看到 3 个候选 NP 经过 Stage-Gate 和多 Agent 评审。
7. 能看到风险评审官提出反对意见。
8. 能看到 PRD 是草案，有 MVP 收敛、非目标、风险和验证计划。
9. 能看到飞书承载文档、表格、任务、会议和知识库。
10. 能看到 Decision Ledger 和 Pending Confirmations。
