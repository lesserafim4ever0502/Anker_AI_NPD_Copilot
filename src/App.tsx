import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ProjectWorkspace from "./pages/ProjectWorkspace";
import EvidencePool from "./pages/EvidencePool";
import PainRadar from "./pages/PainRadar";
import CompetitorMatrix from "./pages/CompetitorMatrix";
import Evaluation from "./pages/Evaluation";
import ProposalPrd from "./pages/ProposalPrd";
import FeishuWorkflow from "./pages/FeishuWorkflow";
import { ProjectRunProvider } from "./context/ProjectRunContext";

export default function App() {
  return (
    <ProjectRunProvider><Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/project-workspace" replace />} />
        <Route path="/project-workspace" element={<ProjectWorkspace />} />
        <Route path="/evidence-pool" element={<EvidencePool />} />
        <Route path="/pain-radar" element={<PainRadar />} />
        <Route path="/competitor-matrix" element={<CompetitorMatrix />} />
        <Route path="/evaluation" element={<Evaluation />} />
        <Route path="/proposal-prd" element={<ProposalPrd />} />
        <Route path="/feishu-workflow" element={<FeishuWorkflow />} />
      </Route>
    </Routes></ProjectRunProvider>
  );
}
