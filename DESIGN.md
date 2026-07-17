# DESIGN.md

## 1. Design Goal

Anker AI-NPD Copilot 的交互网页 Demo 应该呈现为：

> Guided walkthrough 型企业新品定义决策工作台。

它不能是普通后台仪表盘，也不能是聊天机器人。评委应该沿着 7 页走完一次 NPD Run，并在每个阶段看到飞书如何承载协作、审核、责任和产物，而不是最后才进入飞书。

---

## 2. Visual Direction

风格关键词：

```text
干净
专业
有证据感
有科技感
有安克消费电子气质
企业内部工具感
高级产品咨询报告感
```

建议：

- 浅色背景为主。
- 大面积留白。
- 卡片式布局。
- 细线框、轻阴影。
- 深色正文 + 蓝紫 / 青色强调色。
- 图表简洁。
- 每页最多 2–3 个视觉焦点。
- 不做过度炫酷动画。

---

## 3. Global Layout

### Desktop-first Scope / 桌面端优先范围

**EN:** The current acceptance target is the desktop decision workspace at 1280–1920 px. Mobile-specific navigation, information compression, and touch optimization are deferred until the desktop demo is stable. Existing responsive rules should not be removed, but they are not a release gate for this phase.

**中文：** 当前验收目标是 1280–1920 px 的桌面决策工作台。移动端导航、信息压缩和触控优化延期到桌面 Demo 稳定之后；现有响应式规则保留，但不作为本阶段发布门槛。

每页保持统一框架：

```text
Top Header
  - Anker AI-NPD Copilot
  - Workspace / Project / Run
  - Demo status: 公开小样本验证集

Run Status Bar
  - Project
  - Run
  - Status
  - Confidence
  - Next Action
  - Stage Progress

Feishu Workspace Bar
  - Bound Base workspace
  - Real workspace / reviewed snapshot / read-only frontend boundary
  - Table count and latest review state

Left Step Navigation
  1. 项目工作台
  2. 证据池
  3. 痛点雷达
  4. 竞品矩阵
  5. 决策评审
  6. PRD 输出
  7. 飞书协作

Main Content
  - Page title
  - Page-level Feishu collaboration context
  - Page conclusion
  - Core modules

Right Decision Panel
  - Current Stage
  - Page Output
  - Open Questions
  - Owner
  - Next Action
```

### Project and Feishu Continuity / 项目与飞书连续性

**EN:** Header, Run Status Bar, Decision Panel, and Project Workspace must consume one shared project/Run context. Every route must identify Feishu sources, the current collaboration action, owner roles, review state, open confirmations, and artifact destination.

**中文：** Header、Run Status Bar、Decision Panel 与项目工作台必须共享同一项目/Run 上下文。每页都要标明飞书来源、当前协作动作、责任角色、审核状态、开放确认项和产物去向，形成飞书贯穿项目治理、证据、洞察、决策、PRD 与验证的连续链路。

Portfolio projects without an independent evidence snapshot may be inspected but must not activate downstream analysis.

尚未建立独立证据快照的组合项目只能查看状态，不得驱动后续分析页面，避免跨项目数据误配。

Project activation requires a matching project, Run, and loaded snapshot registry entry. Page-level lineage must resolve against that active snapshot before showing downstream output.

项目激活必须同时匹配项目、Run 和已载入的快照注册记录；页面级飞书协作上下文必须能够在当前快照中解析后，才能展示后续输出。

---

## 4. Global Status System

状态枚举：

```text
completed
in_progress
need_confirmation
pending
blocked
```

UI 文案：

- Completed: 已完成
- In Progress: 进行中
- Need Confirmation: 需确认
- Pending: 待开始
- Blocked: 阻塞

当前主 Run 默认：

```text
PRD Drafted / Need Confirmation
```

---

## 5. Core Components

### Global Components

- `Layout`
- `Header`
- `StepNav`
- `RunStatusBar`
- `DecisionPanel`
- `DecisionLedger`
- `MetricCard`
- `StatusBadge`
- `PageConclusion`
- `MockActionButton`

### Evidence Components

- `EvidenceCard`
- `SourceDistribution`
- `EvidenceChainFlow`
- `DataGapTable`

### Pain Components

- `PainPointRankList`
- `PainClusterMap`
- `UserQuoteCard`
- `DesignSignalCard`

### Competitor Components

- `BrandCoverageMatrix`
- `ProductMatrixTable`
- `OpportunityGapCard`
- `CandidateMappingTable`
- `OverlapWarningCard`

### Evaluation Components

- `CandidateCard`
- `StageGateMatrix`
- `KillCriteriaCard`
- `AgentReviewCard`
- `FinalRecommendationCard`

### PRD Components

- `PrdPreview`
- `PrdSection`
- `MvpFeatureTable`
- `RiskValidationTable`
- `EvidenceSidebar`
- `FeishuPrdCollaborationContext`

### Feishu Components

- `FeishuLayerCard`
- `FeishuArtifactCard`
- `ReviewMeetingCard`
- `ValidationTaskTable`
- `KnowledgeArchiveTree`
- `SyncStatusPanel`

---

## 6. Page 1: 项目工作台 / 项目启动页

### Goal

管理多个 NPD 项目，并进入当前需要推进的主 NPD Run。

### Modules

1. Workspace Header
2. Project Status Overview
3. Project Cards
4. Selected Project Detail
5. New Run Mock CTA

### Required Project Cards

- 桌面办公能源生态项目：PRD Drafted / Need Confirmation，主 Demo 项目。
- 创作者移动电力项目：Under Review。
- 差旅多设备充电项目：Insight Ready。

### Key Copy

```text
Anker AI-NPD Copilot 是面向安克新品定义团队的证据链驱动 NPD 工作台。系统支持同时管理多个新品探索项目，将用户反馈、竞品信息、Stage-Gate 评审、多 Agent 反方意见和飞书协同沉淀连接成可追踪的决策流程。
```

### P0 Interactions

- 点击主项目卡片，右侧详情更新。
- 点击“进入 NPD Run”，进入 Page 2。

### Screenshot Acceptance

必须看出这是多项目 NPD 工作台，主项目不是完成态，而是 PRD 草案 + 需确认态。

---

## 7. Page 2: 证据池概览页

### Goal

展示本轮分析的数据来源、证据质量、证据链和数据缺口。

### Modules

1. Evidence Metrics
2. Data Source Distribution
3. Evidence-to-Decision Flow
4. Evidence Cards
5. Data Gaps & Next Actions
6. Feishu Input Layer

### Key Metrics

- 安克产品 SKU: 12
- 竞品 SKU: 18
- 已审核公开反馈: 13
- 痛点簇: 5
- 测评 / 编辑观点: 24
- 可直接引用原声: 0（当前只展示可追溯摘要，不伪造原话）

### Key Copy

```text
当前证据池基于公开渠道构建，覆盖安克产品、主要竞品、用户反馈、测评观点和社区讨论。当前证据置信度为 Medium，可支持开题阶段验证；入围后需接入安克内部售后、销售、用户调研与飞书知识库进一步提升可信度。
```

### P0 Interactions

- 点击数据源筛选 Evidence Card。
- 展开 Evidence Card 后可查看审核记录 ID 与公开来源 URL。
- 点击“进入痛点雷达”。

---

## 8. Page 3: 用户痛点雷达页

### Goal

从公开用户反馈中识别高优先级痛点，形成设计信号。

### Modules

1. Pain Priority List
2. Pain Cluster Map
3. User Quote Cards
4. Design Signals
5. Feishu Insight Layer

### Pain Clusters

- 桌面空间管理：线缆混乱、桌面占用、设备摆放混乱。
- 充电体验：功率分配不透明、发热担忧、充电优先级不清楚。
- 设备协同：接口割裂、多设备兼容、充电器 / 扩展坞分离。
- 移动与差旅：差旅配置复杂、多插头 / 多线缆携带、收纳负担。

### Key Copy

```text
多设备办公场景中的核心问题并不只是充电功率不足，而是线缆混乱、功率分配不透明、接口割裂、发热担忧和桌面空间占用共同形成的复合体验问题。
```

### P0 Interactions

- 点击痛点，更新用户原声和设计信号。
- 点击“进入竞品矩阵”。

---

## 9. Page 4: 竞品机会矩阵页

### Goal

结合用户痛点和产品矩阵，识别机会空白与产品重叠风险。

### Modules

1. Portfolio Metrics
2. Opportunity Gap Cards → Candidate NP Entry Decision
3. Selected Opportunity Detail
4. Product Overlap Warnings
5. Scrollable Product Capability Evidence Table
6. Feishu Competitive Intelligence Layer

### Key Copy

```text
安克和主要竞品在高功率、多口、便携、无线充电和扩展坞等方向已有大量产品布局，但在多设备办公场景下，充电、扩展、线缆管理、功率状态反馈、场景化设备组织仍存在体验割裂。
```

### P0 Interactions

- 点击品牌筛选产品表。
- 点击机会空白，高亮关联候选 NP。
- 点击产品来源图标打开公开官方页面。
- 点击“进入决策评审”。

---

## 10. Page 5: Stage-Gate + 多 Agent 评审页

### Goal

对 3 个候选 NP 做结构化评审，形成推荐方向、风险和待确认事项。

### Modules

1. Candidate Cards
2. Stage-Gate Matrix
3. Kill Criteria & Warning
4. Multi-Agent Product Committee
5. Final Recommendation
6. Feishu Review Layer

### Required Candidate Status

- 跨平台 Dock 兼容预检助手: Recommended with Warning
- Candidate B: Need Feasibility Review
- Candidate C: Hold / More Evidence Needed

### Required Gates

- 品牌契合度
- 痛点强度
- 竞品差异度
- 技术 / 制造可行性
- 市场验证可行性
- 组织沉淀价值

### Key Copy

```text
系统不会直接批准某个新品，而是通过六个门禁和六类 Agent 输出支持理由、反对意见、风险项和建议动作。当前 Demo 推荐候选 A 进入 PRD 草案阶段，但保留竞品差异度 Warning，并通过飞书发起二次确认会议。
```

### P0 Interactions

- 点击候选 NP，切换评审内容。
- 展示 Pass / Warning / Fail。
- 点击“生成 PRD 摘要”进入 Page 6。

---

## 11. Page 6: 样例 NP PRD 摘要输出页

### Goal

将推荐候选、证据链、Gate 结果和 Agent 意见整合为 PRD 摘要草案。

### Modules

1. PRD Header
2. NP Basic Information
3. Product Positioning
4. Evidence Summary
5. MVP Feature Scope
6. Out of Scope
7. Risk List
8. Validation Plan
9. Pending Confirmations
10. Evidence Sidebar
11. Feishu PRD Collaboration Context

### PRD Status

```text
Draft / Need Confirmation
```

### Key Copy

```text
系统输出的不是最终立项 PRD，而是包含目标用户、核心场景、产品定位、MVP 功能、风险清单、验证计划和待确认事项的结构化 PRD 摘要。
```

### P0 Interactions

- 展示 PRD 草案。
- 点击“查看 PRD 协作”进入 Page 7 对应 PRD 资产。
- 不显示统一“同步成功”；必须区分现有文档、已审核快照与 Proposal Mock。

---

## 12. Page 7: 飞书协作全景与知识沉淀页

### Goal

汇总本轮 NPD Run 从项目登记开始已经发生或计划发生的飞书协作，形成责任清晰的协同资产和组织知识。

### Modules

1. Feishu Four-layer Architecture
2. Generated Feishu Artifacts
3. Review Meeting Collaboration
4. Validation Tasks
5. Decision Ledger
6. Knowledge Archive Tree
7. Sync Status Panel
8. Run Collaboration Asset Map

### Four Layers

- 输入数据承载
- AI 协同分析
- 输出产物沉淀
- 知识复用

### Key Copy

```text
飞书不是附属导出工具，而是系统的企业协同底座：多维表格承载结构化证据，文档承载 PRD 与评审报告，会议与妙记承接二次确认，任务承接 MVP 验证计划，知识库沉淀历史案例、风险记录和方法论模板。
```

### P0 Interactions

- 展示飞书产物卡片。
- 展示会议议程、验证任务、Decision Ledger、知识库目录。
- 展开协作边界，区分真实飞书资产、已审核快照和 Proposal Mock。

---

## 13. Backtracking Design

系统必须允许概念上的回退：

- Page 5 痛点强度 Warning → 回 Page 3 补充用户证据。
- Page 5 竞品差异 Warning → 回 Page 4 复核竞品边界。
- Page 6 MVP 过重 → 回 Page 5 收敛功能。
- Page 7 会议后新增结论 → 更新 Page 5 和 Page 6。

Demo 阶段可以用按钮和状态提示表达，不必实现复杂状态引擎。

---

## 14. Screenshot Requirements

每页截图必须同时满足：

- 人类评委 10 秒看懂页面目标。
- AI Agent 能从文字标题、状态和卡片中准确摘要页面价值。
- 页面显示当前阶段输出和下一步。
- 页面至少有一个证据链或状态链元素。
- 页面不把核心信息藏在图片里。
