const BAR_MAX_HEIGHT = 120;

export default function CapitalChart({ projects = [] }) {
  const data = [...projects]
    .sort((a, b) => (b.raised || 0) - (a.raised || 0))
    .slice(0, 8)
    .map((p) => ({
      label: p.title.length > 10 ? `${p.title.slice(0, 10)}…` : p.title,
      value: p.raised || 0,
    }));

  const max = Math.max(...data.map((d) => d.value), 1);

  if (data.length === 0) {
    return (
      <div className="bg-bg-card border border-[rgba(255,255,255,0.06)] rounded-2xl p-6">
        <h3 className="font-display text-base font-semibold text-text-primary">Capital Levé</h3>
        <p className="text-sm text-text-muted mt-4">Aucun projet pour afficher le graphique.</p>
      </div>
    );
  }

  return (
    <div className="bg-bg-card border border-[rgba(255,255,255,0.06)] rounded-2xl p-6">
      <div className="mb-6">
        <h3 className="font-display text-base font-semibold text-text-primary">Capital Levé</h3>
        <p className="text-xs text-text-muted mt-1">Par projet (MAD)</p>
      </div>

      <div className="flex items-end justify-between gap-3" style={{ minHeight: BAR_MAX_HEIGHT + 48 }}>
        {data.map((d, i) => {
          const ratio = d.value / max;
          const barHeight = d.value > 0 ? Math.max(Math.round(ratio * BAR_MAX_HEIGHT), 12) : 0;
          const isTop = i === 0;

          return (
            <div
              key={`${d.label}-${i}`}
              className="flex flex-1 flex-col items-center justify-end min-w-0"
            >
              <span
                className={`text-[10px] font-mono mb-2 whitespace-nowrap ${isTop ? 'text-accent-green' : 'text-text-muted'}`}
              >
                {d.value.toLocaleString('fr-MA')}
              </span>

              <div
                className="w-full max-w-[52px] flex items-end"
                style={{ height: BAR_MAX_HEIGHT }}
              >
                <div
                  className={`chart-bar w-full ${isTop ? 'opacity-100' : 'opacity-85'}`}
                  style={{ height: barHeight }}
                  title={`${d.label}: ${d.value.toLocaleString('fr-MA')} MAD`}
                />
              </div>

              <span
                className={`text-[10px] font-mono mt-2 truncate w-full text-center ${isTop ? 'text-accent-green' : 'text-text-muted'}`}
              >
                {d.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
