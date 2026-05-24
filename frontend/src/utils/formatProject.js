export function mapProjects(projects) {
  if (!projects?.length) return [];
  return projects.map((p) => ({
    ...p,
    id: p._id ?? p.id,
    raised: p.currentAmount ?? 0,
    emoji: getEmoji(p.title),
    color: p.status === "open" ? "green" : "orange",
  }));
}

export function mapProject(p) {
  if (!p) return null;
  return {
    ...p,
    id: p._id ?? p.id,
    raised: p.currentAmount ?? p.raised ?? 0,
    emoji: getEmoji(p.title),
    color: p.status === "open" ? "green" : "orange",
  };
}

function getEmoji(title) {
  const t = (title || "").toLowerCase();
  if (t.includes("solar")) return "☀️";
  if (t.includes("health")) return "🏥";
  if (t.includes("education")) return "📚";
  if (t.includes("agri")) return "🌾";
  return "📦";
}
const colors = ["green", "blue", "orange", "purple"];

function getColor(index) {
  return colors[index % colors.length];
}

function getInitials(name = "") {
  return name
    .trim()
    .split(" ")
    .map(w => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function mapInvestors(apiData = []) {
  if (!Array.isArray(apiData)) return [];

  return apiData.map((inv, index) => ({
    id: inv.investorId,
    initials: getInitials(inv.name),
    name: inv.name,
    email: inv.email || '',
    amount: inv.amountInvested,
    pct: inv.percentage,
    status: 'active',
    color: getColor(index),
  }));
}