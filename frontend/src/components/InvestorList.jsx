import { InvestorAvatar } from './ui';

const pctColors = {
  green:  'text-accent-green',
  blue:   'text-accent-blue',
  purple: 'text-accent-purple',
  orange: 'text-accent-orange',
  muted:  'text-text-secondary',
};

export default function InvestorList({ investors }) {
  return (
    <div className="bg-bg-card border border-[rgba(255,255,255,0.06)] rounded-2xl overflow-hidden">

      <div className="grid gap-4 px-5 py-3.5 border-b border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)]"
           style={{ gridTemplateColumns: '2.5fr 1.5fr 1fr 1fr 100px' }}>
        {['Investisseur', 'Montant Investi', '% Capital', 'Statut', 'Action'].map(h => (
          <span key={h} className="text-[11px] text-text-muted uppercase tracking-[0.8px]">{h}</span>
        ))}
      </div>


      {investors.map((inv, i) => (
        <div
          key={inv.id}
          className={`grid gap-4 px-5 py-4 items-center transition-colors duration-200 hover:bg-[rgba(255,255,255,0.03)]
            ${i < investors.length - 1 ? 'border-b border-[rgba(255,255,255,0.04)]' : ''}`}
          style={{ gridTemplateColumns: '2.5fr 1.5fr 1fr 1fr 100px' }}
        >

          <div className="flex items-center gap-3">
            <InvestorAvatar initials={inv.initials} color={inv.color} />
            <div className="min-w-0">
              <p className="text-sm font-medium text-text-primary truncate">{inv.name}</p>
              {inv.email ? (
                <p className="text-xs text-text-muted truncate">{inv.email}</p>
              ) : null}
            </div>
          </div>


          <span className="text-sm font-mono text-text-primary">
            {inv.amount.toLocaleString('fr-MA')} MAD
          </span>


          <span className={`text-sm font-mono font-semibold ${pctColors[inv.color]}`}>
            {inv.pct}%
          </span>


          {inv.status === 'active'
            ? <span className="badge-open w-fit">ACTIF</span>
            : <span className="badge-closed w-fit">INACTIF</span>
          }


          <button className="px-3 py-1.5 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)]
                             rounded-md text-text-secondary text-xs font-body cursor-pointer
                             hover:text-text-primary hover:border-[rgba(255,255,255,0.15)] transition-all duration-200">
            Profil
          </button>
        </div>
      ))}
    </div>
  );
}
