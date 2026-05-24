import api from "./axios.js";

export async function listProjectInvestors(projectId) {
  const { data } = await api.get(`/projects/${projectId}/investors`);
  return data;
}

export async function getInvestorPortfolio(projectId, investorId) {
  const { data } = await api.get(
    `/projects/${projectId}/investors/${investorId}/portfolio`,
  );
  return data;
}
