import { listMyProjects } from "./projectsApi.js";

export async function getDashboardStats() {
  const { data } = await listMyProjects();
  const projects = data.projects ?? [];

  const openCount = projects.filter((p) => p.status === "open").length;
  const closedCount = projects.filter((p) => p.status === "closed").length;
  const totalCapitalRaised = projects.reduce(
    (sum, p) => sum + (p.currentAmount ?? 0),
    0,
  );

  return {
    totalProjects: projects.length,
    openCount,
    closedCount,
    totalCapitalRaised,
    projects,
  };
}
