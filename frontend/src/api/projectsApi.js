import api from "./axios.js";

export async function listMyProjects() {
  const { data } = await api.get("/projects/mine");
  console.log(data)
  return data;
}
export async function getInvestorsOfProject(projectId){
  const {data}=await api.get(`/projects/${projectId}/investors`)
  console.log(data)
  return data
}

export async function createProject(payload) {
  const { data } = await api.post("/projects", payload);
  return data;
}

export async function updateProject(id, payload) {
  const { data } = await api.patch(`/projects/${id}`, payload);
  return data;
}

export async function deleteProject(id) {
  const { data } = await api.delete(`/projects/${id}`);
  return data;
}

export async function closeProject(id) {
  const { data } = await api.patch(`/projects/${id}/close`);
  return data;
}

export async function getProjectById(id) {
  const result = await listMyProjects();
  const projects = result.data?.projects ?? [];
  return projects.find((p) => p._id === id || p.id === id);
}

export function getFundingPercentage(project) {
  if (!project?.capital) return 0;
  return Math.min(100, Math.round((project.currentAmount / project.capital) * 100));
}
