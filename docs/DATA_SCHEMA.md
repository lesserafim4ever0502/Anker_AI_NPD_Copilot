# DATA_SCHEMA.md

本文件定义开发阶段应在 `src/types/index.ts` 中实现的数据类型。

```ts
export type Status = "draft" | "evidence_building" | "insight_ready" | "opportunity_generated" | "under_review" | "need_confirmation" | "prd_drafted" | "meeting_scheduled" | "validation_task_created" | "archived";

export type StageStatus = "completed" | "in_progress" | "need_confirmation" | "pending" | "blocked";

export type Confidence = "high" | "medium" | "low";

export type NpdProject = {
  id: string;
  name: string;
  company: string;
  category: string[];
  scenario: string;
  market: string;
  currentRunId: string;
  status: Status;
  confidence: Confidence;
  recommendedCandidate?: string;
  pendingCount: number;
  nextAction: string;
  ownerRoles: string[];
  updatedAt: string;
};

export type NpdRun = {
  id: string;
  projectId: string;
  name: string;
  company: string;
  category: string[];
  scenario: string;
  market: string;
  mode: string;
  currentStage: string;
  status: string;
  confidence: Confidence;
  nextAction: string;
  summary: string;
  stageProgress: {
    stageId: string;
    name: string;
    status: StageStatus;
  }[];
};

export type EvidenceSource = {
  id: string;
  name: string;
  type: string;
  purpose: string;
  confidence: Confidence;
  limitations: string;
};

export type EvidenceCard = {
  id: string;
  source: string;
  type: string;
  relatedProduct?: string;
  relatedPainPoints: string[];
  designSignal: string;
  confidence: Confidence;
  quoteUsable: boolean;
  relatedPages: string[];
};

export type PainPoint = {
  id: string;
  name: string;
  cluster: string;
  frequency: number;
  severityAvg: number;
  evidenceCount: number;
  confidence: Confidence;
  scenarios: string[];
  relatedEvidenceIds: string[];
  designSignals: string[];
};

export type Feedback = {
  id: string;
  source: string;
  brand: string;
  productName?: string;
  rawTextSummary: string;
  sentiment: "positive" | "neutral" | "negative";
  scenario: string;
  painPointIds: string[];
  severity: number;
  designSignal: string;
  quoteUsable: boolean;
  confidence: Confidence;
};

export type Product = {
  id: string;
  brand: string;
  productName: string;
  category: string;
  powerWatt?: string;
  ports?: string;
  wirelessSupport?: boolean;
  dockSupport?: boolean;
  screenOrApp?: string;
  formFactor: string;
  targetScenario: string[];
  priceRange?: string;
  coreClaims: string[];
  sourceUrl?: string;
  possibleGap?: string;
  notes?: string;
};

export type CandidateNP = {
  id: string;
  name: string;
  description: string;
  targetUsers: string[];
  coreScenarios: string[];
  relatedPainPoints: string[];
  relatedGaps: string[];
  score: number;
  status: string;
  mainStrength: string;
  mainRisk: string;
};

export type GateEvaluation = {
  candidateId: string;
  gateId: string;
  gateName: string;
  status: "pass" | "warning" | "fail";
  score: number;
  reason: string;
};

export type AgentEvaluation = {
  candidateId: string;
  agentName: string;
  role: string;
  score: number;
  coreJudgement: string;
  supportReason: string;
  objection: string;
  suggestion: string;
  createsPendingConfirmation: boolean;
};

export type PendingConfirmation = {
  id: string;
  title: string;
  description: string;
  sourcePage: string;
  relatedCandidateId?: string;
  ownerRole: string[];
  priority: "high" | "medium" | "low";
  status: "open" | "in_review" | "resolved";
  suggestedAction: string;
  feishuAction?: string;
};

export type FeishuArtifact = {
  id: string;
  name: string;
  feishuType: string;
  sourcePages: string[];
  content: string[];
  businessValue: string;
  mockStatus: "created" | "pending" | "failed";
};
```
