export default function DashboardStats({
  totalProjects = 0,
  openCount = 0,
  closedCount = 0,
  totalCapitalRaised = 0,
}) {
  const capitalDisplay =
    totalCapitalRaised >= 1_000_000
      ? { value: (totalCapitalRaised / 1_000_000).toFixed(2), unit: 'MAD' }
      : { value: totalCapitalRaised.toLocaleString('fr-MA'), unit: 'MAD' };

  const stats = [
    {
      label: 'Total Projets',
      value: totalProjects,
      sub: 'Tous vos projets',
      iconBg: 'bg-[rgba(77,159,255,0.1)]',
      valueColor: 'text-text-primary',
      border: 'border-[rgba(255,255,255,0.06)]',
    },
    {
      label: 'Projets Ouverts',
      value: openCount,
      sub: 'En collecte active',
      iconBg: 'bg-[rgba(0,255,136,0.1)]',
      valueColor: 'text-accent-green',
      border: 'border-[rgba(0,255,136,0.12)]',
      glow: true,
    },
    {
      label: 'Projets Fermés',
      value: closedCount,
      sub: 'Collecte terminée',
      iconBg: 'bg-[rgba(255,77,106,0.1)]',
      valueColor: 'text-text-primary',
      border: 'border-[rgba(255,255,255,0.06)]',
    },
    {
      label: 'Capital Total',
      value: capitalDisplay.value,
      sub: 'Capital levé sur tous les projets',
      iconBg: 'bg-[rgba(0,255,136,0.12)]',
      valueColor: 'text-accent-green',
      border: 'border-[rgba(0,255,136,0.15)]',
      unit: capitalDisplay.unit,
      gradient: true,
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className={`bg-bg-card border rounded-2xl p-[22px] transition-all duration-200
            hover:-translate-y-0.5 hover:shadow-card-hover
            ${s.border}
            ${s.gradient ? 'bg-gradient-to-br from-[rgba(0,255,136,0.08)] to-[rgba(77,159,255,0.04)]' : ''}
            ${s.glow ? 'relative overflow-hidden' : ''}`}
        >
          {s.glow && (
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-radial from-[rgba(0,255,136,0.08)] to-transparent pointer-events-none" />
          )}
          <span className="text-[11px] text-text-muted uppercase tracking-[0.8px]">{s.label}</span>
          <div className={`font-display font-bold leading-none mt-4 ${s.valueColor}`}>
            {s.unit ? (
              <>
                <span className="text-[28px]">{s.value}</span>{' '}
                <span className="text-sm text-text-secondary">{s.unit}</span>
              </>
            ) : (
              <span className="text-[38px]">{s.value}</span>
            )}
          </div>
          <p className="text-xs text-text-muted mt-2">{s.sub}</p>
        </div>
      ))}
    </div>
  );
}
