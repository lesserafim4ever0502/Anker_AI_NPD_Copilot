# UX_PAGE_DETAILS.md

本文件是 7 页交互设计的开发细化摘要。完整视觉规范见 `DESIGN.md`。

## Global UX

每页必须包含：

- Header
- Run Status Bar
- Feishu Workspace Bar
- Page-level Feishu Data Lineage
- Step Navigation
- Page Title
- Page Conclusion
- Core Modules
- Decision Panel
- Next Action CTA

## Page 1: 项目工作台 / 项目启动页

目标：管理多个 NPD 项目，进入主 Run。

核心模块：

- Workspace Header
- Project Status Overview
- Project Cards
- Selected Project Detail
- New Run Mock Modal

P0 交互：点击项目卡片，右侧详情切换；仅有独立证据快照的项目可进入并驱动全局 NPD Run。

## Page 2: 证据池概览页

目标：证明后续判断来自可追溯证据池。

核心模块：

- Evidence Metrics
- Data Source Cards
- Evidence-to-Decision Flow
- Evidence Cards
- Data Gaps
- Feishu Input Layer

P0 交互：来源筛选、证据卡片展开、进入痛点雷达。

## Page 3: 用户痛点雷达页

目标：把用户反馈转化为痛点标签和设计信号。

核心模块：

- Pain Priority List
- Pain Cluster Map
- User Quote Cards
- Design Signals
- Feishu Insight Layer

P0 交互：点击痛点切换用户原声与设计信号。

## Page 4: 竞品机会矩阵页

目标：结合痛点和产品边界识别机会空白。

核心模块：

- Brand Coverage Matrix
- Product Capability Table
- Opportunity Gap Cards
- Candidate Mapping Table
- Product Overlap Warning
- Feishu Market Data Lineage

P0 交互：品牌筛选、机会卡片高亮候选、进入评审。

## Page 5: Stage-Gate + 多 Agent 评审页

目标：筛选候选 NP，输出推荐和待确认事项。

核心模块：

- Candidate Cards
- Stage-Gate Matrix
- Kill Criteria
- Agent Review Cards
- Final Recommendation
- Feishu Review Layer

P0 交互：候选卡片切换评审内容，生成 PRD 摘要。

## Page 6: 样例 NP PRD 摘要输出页

目标：生成结构化 PRD 摘要草案。

核心模块：

- PRD Header
- Basic Info
- Product Positioning
- Evidence Summary
- MVP Feature Table
- Out of Scope
- Risk List
- Validation Plan
- Pending Confirmations
- Evidence Sidebar
- Feishu Handoff Panel

P0 交互：Mock 同步飞书，进入 Page 7。

## Page 7: 飞书协同沉淀页

目标：把 NPD Run 转化为飞书协同资产和组织知识。

核心模块：

- Feishu Four Layers
- Feishu Artifacts
- Review Meeting Handoff
- Validation Tasks
- Decision Ledger
- Knowledge Archive Tree
- Run Collaboration Asset Map

P0 交互：Mock 同步，查看产物详情；不展示面向开发者的自动化实施路线图。
