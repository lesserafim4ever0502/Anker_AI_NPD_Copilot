export type Status =
  | "draft"
  | "evidence_building"
  | "insight_ready"
  | "opportunity_generated"
  | "under_review"
  | "need_confirmation"
  | "prd_drafted"
  | "meeting_scheduled"
  | "validation_task_created"
  | "archived";

export type StageStatus =
  | "completed"
  | "in_progress"
  | "need_confirmation"
  | "pending"
  | "blocked";

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

export type CreateNpdRunDraftInput = {
  projectName: string;
  categories: string[];
  scenario: string;
  market: string;
  problemStatement: string;
  ownerRoles: string[];
};

export type RunSnapshot = {
  runId: string;
  projectId: string;
  status: "loaded" | "unavailable";
  version: string;
  source: string;
  dataBoundary: string;
  pageData: Record<string, string[]>;
};

export type FeishuCollaborationStatus =
  | "reviewed_snapshot"
  | "in_review"
  | "need_confirmation"
  | "proposal_mock";

export type FeishuPageContext = {
  stage: string;
  sourceTables: string[];
  process: string;
  collaborationAction: string;
  ownerRoles: string[];
  reviewStatus: FeishuCollaborationStatus;
  pendingCount: number;
  output: string;
  outputArtifact: string;
  writebackTarget: string;
  dataBoundary: string;
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
  independentSourceCount?: number;
  warning?: string;
  status?: "insight_ready" | "needs_more_evidence";
};

export type Feedback = {
  id: string;
  source: string;
  brand: string;
  productName?: string;
  rawTextSummary: string;
  sentiment: "positive" | "neutral" | "negative" | "mixed";
  scenario: string;
  painPointIds: string[];
  severity: number;
  designSignal: string;
  quoteUsable: boolean;
  confidence: Confidence;
  sourceUrl?: string;
  evidenceValueScore?: number;
  includeStatus?: "include" | "maybe" | "exclude";
  sourceGroupId?: string;
  humanReviewStatus?: "approved" | "needs_edit" | "rejected" | "needs_recheck";
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

export type CapabilityMatrixRow = {
  id: string;
  portfolioRole: "anker" | "competitor";
  productId: string;
  hasWireless: boolean;
  hasDock: boolean;
  hasDisplay: boolean;
  hasApp: boolean;
  hasCableManagement: boolean;
  hasThermalManagement: boolean;
  desktopFit: "high" | "medium" | "low";
  mobileFit: "high" | "medium" | "low";
  compatibilityComplexity: "high" | "medium" | "low";
  potentialPainCoverage: string[];
  evidenceConfidence: Confidence;
  normalizationNotes: string;
};

export type CandidateNP = {
  id: string;
  name: string;
  description: string;
  hypothesis: string;
  targetUsers: string[];
  coreScenarios: string[];
  relatedPainPoints: string[];
  relatedGaps: string[];
  score?: number;
  status: "ready_for_stage_gate" | "validation_required" | "more_evidence_required";
  evidenceConfidence: Confidence;
  entryDecision:
    | "continue_to_stage_gate"
    | "validate_before_stage_gate"
    | "hold_before_stage_gate";
  mvpBoundary: string[];
  nonGoals: string[];
  mainStrength: string;
  mainRisk: string;
  nextValidation: string;
};

export type CandidateScreening = {
  gapId: string;
  candidateId: string | null;
  screeningDecision:
    | "included"
    | "included_for_validation"
    | "included_for_evidence_collection"
    | "excluded";
  reason: string;
};

export type GateEvaluation = {
  candidateId: string;
  gateId: string;
  gateName: string;
  status: "pass" | "warning" | "fail";
  score: number;
  confidence: Confidence;
  reason: string;
  evidenceRefs: string[];
  decisionImpact: string;
};

export type AgentEvaluation = {
  candidateId: string;
  agentName: string;
  role: string;
  score: number;
  confidence: Confidence;
  coreJudgement: string;
  supportReason: string;
  objection: string;
  suggestion: string;
  evidenceRefs: string[];
  createsPendingConfirmation: boolean;
};

export type EvaluationSummary = {
  candidateId: string;
  weightedScore: number;
  gateResult: string;
  confidence: Confidence;
  blockingIssues: string[];
  warnings: string[];
  decision: string;
  nextAction: string;
};

export type CompatibilityOutcome = "supported" | "conditional" | "not_supported" | "unknown";

export type CompatibilityInput = {
  dockId: string;
  hostOs: string;
  hostConnection: string;
  displayCount: number;
  displayMode: string;
  task: string;
  driverState: string;
};

export type CompatibilityEvaluation = {
  outcome: CompatibilityOutcome;
  confidence: Confidence;
  headline: string;
  summary: string;
  reasons: string[];
  requiredChecks: string[];
  evidenceRefs: string[];
  ruleIds: string[];
};

export type CompatibilityRuleSet = {
  version: string;
  mode: "local_rule_slice";
  scopeLabel: string;
  lastReviewed: string;
  hardwareVerifiedCases: number;
  goldSetTarget: number;
  boundary: string;
  defaultInput: CompatibilityInput;
  inputOptions: Record<string, { value: string; label: string }[]>;
  docks: {
    id: string;
    name: string;
    reviewedTasks: string[];
    maxReviewedDisplays: number;
    sourceRef: string;
  }[];
  evidence: {
    id: string;
    label: string;
    type: string;
    url: string;
  }[];
  rules: { id: string; description: string }[];
  contractCases: {
    id: string;
    label: string;
    input: CompatibilityInput;
    expectedOutcome: CompatibilityOutcome;
  }[];
};

export type ValidationDraftRecord = {
  id: string;
  createdAt: string;
  method: string;
  topologyId: string;
  taskId: string;
  comparisonArm: string | null;
  observedOutcome: string;
  reviewerVerdict: string;
  durationSeconds: number | null;
  reviewer: string;
  notes: string;
  verificationStatus: "local_draft";
};

export type ValidationProtocol = {
  version: string;
  lastReviewed: string;
  mode: "local_validation_draft";
  scopeLabel: string;
  boundary: string;
  targets: { userInterviews: number; topologies: number; tasksPerTopology: number; goldCases: number; faqComparisonSessions: number };
  verified: { userInterviews: number; goldCases: number; faqComparisonSessions: number };
  methods: { value: string; label: string }[];
  comparisonArms: { value: string; label: string }[];
  observedOutcomes: { value: string; label: string }[];
  reviewerVerdicts: { value: string; label: string }[];
  tasks: { id: string; title: string; instruction: string; successDefinition: string }[];
  topologies: { id: string; host: string; os: string; dockId: string; connection: string; displays: string; reason: string }[];
  metrics: { id: string; label: string; target: string; failRule: string }[];
  feishuHandoff: { status: "proposal_mock"; targetObjects: string[]; requiredReviewers: string[]; writebackRule: string };
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
  mockStatus: "reviewed_snapshot" | "existing_document" | "proposal_mock" | "pending" | "failed";
};

export type FeishuWorkflow = {
  currentMode: string;
  runStatus: string;
  layers: {
    id: string;
    name: string;
    feishuObjects: string[];
    description: string;
  }[];
  reviewMeeting: {
    id: string;
    title: string;
    schedule: string;
    participants: string[];
    agenda: string[];
    expectedOutputs: string[];
    mockStatus: FeishuArtifact["mockStatus"];
  };
  knowledgeArchive: {
    root: string;
    mockStatus: FeishuArtifact["mockStatus"];
    nodes: {
      id: string;
      name: string;
      artifactType: string;
      summary: string;
      mockStatus: FeishuArtifact["mockStatus"];
    }[];
  };
  automationRoadmap: {
    stage: string;
    mode: string;
  }[];
};
