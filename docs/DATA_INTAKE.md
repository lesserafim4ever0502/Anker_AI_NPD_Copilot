# DATA_INTAKE.md

## 1. Purpose

This document defines the Evidence Intake Pipeline for **Anker AI-NPD Copilot**.

The goal is to prevent the team from collecting random data that cannot support the demo narrative. Every collected item should be able to enter the Evidence-to-Decision chain:

```text
Public Evidence
  ↓
Structured Fields
  ↓
Pain Tags / Product Capabilities
  ↓
Design Signals / Opportunity Gaps
  ↓
Candidate NP
  ↓
Stage-Gate Review
  ↓
PRD Draft
  ↓
Feishu Archive
```

Current NPD Run:

```text
Company: Anker Innovation
Category: Smart charging / Docking
Scenario: Multi-device mobile office
Market: North America
Stage: Proposal-stage public sample validation
```

---

## 2. Team Workflow

The team should not manually apply complex screening rules.

Use this workflow instead:

```text
Team members collect raw public evidence
        ↓
Fill raw_evidence_intake.csv
        ↓
Evidence Screening Agent classifies and scores each item
        ↓
Structured evidence is written into structured_evidence_template.csv
        ↓
Human reviewer checks include / high-value maybe items
        ↓
Approved evidence is exported to src/data/*.json
        ↓
Demo pages consume the structured JSON data
```

Human collectors only need to fill minimal fields. The AI / Agent handles page mapping, tags, scoring, pain points, opportunity gaps, and design signals.

---

## 3. Raw Evidence Intake Fields

The raw intake table should contain only low-friction fields:

```text
id
data_type
brand
product_or_topic
raw_text_or_claim
source_url
collector
notes
```

### Field Meaning

| Field | Meaning | Required |
|---|---|---|
| id | Unique evidence ID | Yes |
| data_type | product / feedback / review / community / article / other | Yes |
| brand | Anker, UGREEN, Belkin, Baseus, Satechi, Sharge, etc. | Recommended |
| product_or_topic | Product name or discussion topic | Yes |
| raw_text_or_claim | Raw product claim, review summary, comment summary, or measured point | Yes |
| source_url | Public source URL | Yes |
| collector | Team member name | Yes |
| notes | Optional human notes | No |

---

## 4. Evidence Value Score

Each item is scored from 0 to 10.

| Dimension | Score | Question |
|---|---:|---|
| relevance_score | 0–3 | Is it related to smart charging, docking, multi-device office, desktop, travel, or creator scenarios? |
| traceability_score | 0–2 | Does it have a clear source URL, product name, platform, or page context? |
| structure_score | 0–2 | Can it be structured into product matrix, feedback table, pain tag, or review evidence? |
| decision_value_score | 0–2 | Can it support a pain point, opportunity gap, product overlap risk, MVP boundary, or Stage-Gate score? |
| reuse_score | 0–1 | Can it enter PRD evidence, Feishu archive, review report, or knowledge base? |

Total:

```text
evidence_value_score = relevance_score + traceability_score + structure_score + decision_value_score + reuse_score
```

---

## 5. Include Status

| Status | Rule | Action |
|---|---|---|
| include | 8–10 points, clear source, strong relevance, can support multiple pages | Use in structured evidence and demo data |
| maybe | 5–7 points, source exists but relevance or structure is partial | Human review before use |
| exclude | 0–4 points, weak relevance, no source, cannot support evidence chain | Do not use in demo data |

Do not use unsourced data in final demo evidence.

---

## 6. Page Mapping Rules

The screening agent must map each item to one or more pages.

| Page | Data Should Support |
|---|---|
| Page 2 Evidence Pool | Data source, evidence type, confidence, source distribution, evidence card |
| Page 3 Pain Radar | User pain point, scenario, sentiment, severity, design signal, quote evidence |
| Page 4 Competitor Matrix | Product capability, category coverage, competitor comparison, opportunity gap |
| Page 5 Stage-Gate Review | Pain strength, differentiation, overlap risk, feasibility risk, market validation |
| Page 6 PRD Output | Evidence summary, MVP feature basis, risk list, validation plan |
| Page 7 Feishu Archive | Data table, document, task, meeting, knowledge archive |

A high-value item usually supports at least two pages.

---

## 7. Data Type Screening Criteria

### 7.1 Product Data

Prioritize:

```text
Desktop charger
Multi-port GaN charger
Anker Prime series
High-power USB-C charger
Laptop power bank
USB-C hub / docking station
Wireless charging station
Smart display / app-enabled charging product
Travel charging product
```

Include when the product:

- belongs to smart charging, docking, power bank, wireless charging, desktop office, or travel charging;
- has public source URL;
- provides extractable capability fields such as power, ports, form factor, display/app, dock support, target scenario;
- helps judge current Anker or competitor product boundaries;
- can support product overlap risk or opportunity gap analysis.

Exclude or deprioritize:

- pure cables, cases, screen protectors, unrelated accessories;
- products with no public source URL;
- products that cannot provide any useful capability field;
- repeated products that add no new decision value.

### 7.2 User Feedback Data

Prioritize feedback mentioning:

```text
desk / desktop
cable clutter / too many cables
messy workspace
power distribution
charging priority
overheat / too hot
USB-C / dock / hub
multiple devices
laptop + phone + tablet + earbuds
travel / bulky / portable
screen / display / status feedback
```

Chinese keywords:

```text
桌面
线缆
线太多
收纳
发热
烫
功率
分配
多设备
笔记本
扩展坞
接口
充电慢
差旅
便携
体积
适配器
状态显示
```

Include when feedback:

- has a source URL or platform context;
- can be mapped to a scenario;
- expresses at least one product experience problem;
- can become a pain point tag;
- can generate a design signal.

Exclude:

- generic “good product” comments without usage details;
- logistics, packaging, after-sales-only comments unless they directly reveal product experience;
- extremely short comments with no scenario;
- suspected spam or promotional comments.

### 7.3 Review / Expert Opinion Data

Prioritize reviews that mention:

- charging stability;
- heat and safety perception;
- port layout;
- desktop usability;
- docking and expansion capability;
- portability;
- display / app / state feedback;
- direct comparison among Anker, UGREEN, Belkin, Baseus, Satechi, Sharge.

Include when a review provides a clear judgement that can become an evidence card.

Exclude pure unboxing, parameter repetition, or strongly promotional content without evaluative judgement.

---

## 8. Confidence Levels

| Confidence | Meaning |
|---|---|
| high | Official product page, repeated evidence across sources, or clear product specification |
| medium | Public review / user feedback / expert opinion with source but limited sample size |
| low | Single weak source, inferred judgement, or insufficient context |

For proposal-stage demo, most public user feedback should be marked as `medium`, not `high`.

---

## 9. Human Review Rules

Human reviewers should check:

1. Source URL exists and is not fabricated.
2. Product name and brand are not mismatched.
3. Claims are not exaggerated.
4. Public sample limitation is preserved.
5. The item does not imply final product launch decision.
6. The item can support at least one concrete page or decision.

Human review statuses:

```text
unreviewed
approved
needs_edit
rejected
```

Only `approved` evidence should enter final demo JSON.

---

## 10. Output Contract

After screening, each item should produce:

```text
include_status
evidence_value_score
used_for_pages
auto_tags
related_pain_points
related_opportunity_gaps
design_signal
confidence
reason
human_review_status
```

The output should be stored in `structured_evidence_template.csv` first, then transformed into page-specific JSON files such as:

```text
src/data/evidenceCards.json
src/data/products.json
src/data/competitorProducts.json
src/data/feedback.json
src/data/painPoints.json
src/data/opportunityGaps.json
```

---

## 11. Guardrails

Do not:

- claim to have full-market or full-platform data;
- claim public samples are representative of all Anker users;
- fabricate product parameters;
- fabricate user quotes;
- present mock candidate NP generation as real-time generation;
- present Feishu sync as real API integration unless it is actually implemented.

Use this phrasing:

```text
This proposal-stage demo uses a public sample dataset to validate the AI-NPD workflow. After entering the next round, the system can be connected to Anker internal sales, after-sales, user research, product roadmap, and Feishu knowledge base data to improve confidence.
```
