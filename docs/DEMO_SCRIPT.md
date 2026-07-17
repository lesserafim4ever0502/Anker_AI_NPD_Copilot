# DEMO_SCRIPT.md

## 3–5 分钟演示脚本 / 3–5 Minute Demo Script

### 0:00–0:30 项目工作台 / Project Workspace

我们不是做单次新品生成器，而是做安克新品定义的多项目 NPD 工作台。主项目状态是 `PRD Drafted / Need Confirmation`，说明系统保留人工决策和待确认事项。

This is a multi-project NPD workspace, not a one-shot idea generator. The main Run remains `PRD Drafted / Need Confirmation`, preserving human review and open decisions.

### 0:30–1:00 证据池 / Evidence Pool

本轮使用 12 款 Anker 产品、18 款竞品和 13 条已审核公开用户反馈。它是公开小样本验证集，置信度为 Medium，不代表市场全量或安克内部用户总体。

The Run uses 12 Anker products, 18 competitor products, and 13 reviewed public user-feedback records. This is a medium-confidence public sample, not full-market or internal Anker data.

### 1:00–1:40 痛点雷达 / Pain Radar

系统形成 5 个痛点簇。功率透明度、兼容设置和状态可信度可进入洞察；热安全与桌面整合只有两个独立来源，需要继续补证据。

The system forms five pain clusters. Power transparency, compatibility setup, and state reliability are insight-ready; thermal safety and desktop integration still need evidence.

### 1:40–2:20 竞品机会矩阵 / Competitor Matrix

30 行能力矩阵显示：屏幕、App、Dock 和桌面整合已有大量供给，能力存在不等于痛点已解决。硬件一体化因高重叠和低证据被排除，兼容预检成为唯一可直接进入评审的 Gap。

The 30-row matrix shows that displays, apps, docks, and desktop integration are already crowded. Feature presence is not proof of pain resolution. Hardware integration is excluded; compatibility preflight is the only gap entering review directly.

### 2:20–3:20 决策评审 / Decision Review

3 个候选经过 18 条 Stage-Gate 评审。兼容预检得分 4.24，为 `Recommended with Warning`；功率解释层得分 3.91，需要先做对照验证；可信状态得分 3.24，并因痛点证据不足触发 Fail Gate。六角色委员会保留反对意见，没有用平均分覆盖风险。

Across 18 Gate evaluations, compatibility preflight scores 4.24 and is `Recommended with Warning`; power explanation requires validation at 3.91; trustworthy state scores 3.24 and fails the evidence gate. Six committee roles preserve objections and blocking conditions.

### 3:20–4:10 Proposal PRD

PRD 只定义有限规则 MVP：10 组拓扑、可追溯兼容结论、设置步骤、来源与版本元数据，以及未知返回。它不承诺通用兼容，不自动控制设备，也不开发新 Dock 硬件。所有成功指标都是拟议目标，仍需确认。

The Proposal PRD defines a bounded rules MVP: ten topologies, traceable compatibility results, setup steps, version metadata, and an explicit unknown state. It does not promise universal compatibility or new hardware. All targets remain proposed and pending confirmation.

### 4:10–5:00 飞书协作全景 / Feishu Collaboration Overview

飞书从项目登记和证据采集开始贯穿整个 Run。产品矩阵、Pain Radar、机会缺口、候选池、Stage-Gate 和产品委员会均保留来源、责任人与审核状态；PRD、验证任务、会议议程和 Decision Ledger 形成协作闭环。网页读取已审核本地快照，任务和会议回写为 Proposal-stage Mock，不调用真实前端飞书 API。

Feishu supports the Run from project registration and evidence intake onward. The matrix, Pain Radar, gaps, candidate pool, Gate evaluations, and committee reviews retain sources, owners, and review states. The web demo reads a reviewed local snapshot; task and meeting write-backs remain proposal-stage mocks without a real frontend Feishu API.
