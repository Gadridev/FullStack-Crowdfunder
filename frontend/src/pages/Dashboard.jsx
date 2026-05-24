import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GlowDot, ProgressBar, Badge } from '../components/ui';
import DashboardStats from '../components/DashboardStats';
import CapitalChart from '../components/CapitalChart';
import { fetchProjects } from '@/store/slices/projectSlice';
import { mapProjects } from '@/utils/formatProject';

const pctColor = {
  green: 'text-accent-green',
  blue: 'text-accent-blue',
  orange: 'text-accent-orange',
  purple: 'text-accent-purple',
};
const raisedColor = {
  green: 'text-accent-green',
  blue: 'text-accent-blue',
  orange: 'text-accent-orange',
  purple: 'text-accent-purple',
};

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { projects: rawProjects, loading } = useSelector((state) => state.projects);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const projects = mapProjects(rawProjects);

  const openCount = projects.filter((p) => p.status === 'open').length;
  const closedCount = projects.filter((p) => p.status === 'closed').length;
  const totalCapitalRaised = projects.reduce((sum, p) => sum + (p.raised || 0), 0);

  const topProjects = [...projects]
    .sort((a, b) => (b.raised || 0) - (a.raised || 0))
    .slice(0, 5);

  const recentProjects = projects.slice(0, 4);

  const firstName = user?.name?.split(' ')[0] || 'Porteur';

  if (loading && projects.length === 0) {
    return <div className="page-section">Chargement...</div>;
  }

  return (
    <div className="page-section">
      <div className="flex justify-between items-start mb-9">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <GlowDot />
            <span className="text-xs font-mono text-accent-green tracking-widest uppercase">Live Dashboard</span>
          </div>
          <h1 className="page-title">Vue d'ensemble</h1>
          <p className="page-subtitle">
            Bienvenue, {firstName} — voici l'état de vos campagnes
          </p>
        </div>
        <button className="btn-primary" type="button" onClick={() => navigate('/projects/create')}>
          + Nouveau Projet
        </button>
      </div>

      <div className="mb-8">
        <DashboardStats
          totalProjects={projects.length}
          openCount={openCount}
          closedCount={closedCount}
          totalCapitalRaised={totalCapitalRaised}
        />
      </div>

      <div className="grid gap-5 mb-6" style={{ gridTemplateColumns: '1fr 380px' }}>
        <CapitalChart projects={projects} />

        <div className="bg-bg-card border border-[rgba(255,255,255,0.06)] rounded-2xl p-6">
          <h3 className="font-display text-base font-semibold text-text-primary mb-5">Top Projets</h3>
          <div className="flex flex-col gap-4">
            {topProjects.length === 0 ? (
              <p className="text-sm text-text-muted">Aucun projet.</p>
            ) : (
              topProjects.map((p) => {
                const pct = p.capital ? Math.round((p.raised / p.capital) * 100) : 0;
                return (
                  <div
                    key={p.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => navigate(`/projects/${p.id}`)}
                    onKeyDown={(e) => e.key === 'Enter' && navigate(`/projects/${p.id}`)}
                    className="cursor-pointer"
                  >
                    <div className="flex justify-between mb-1.5">
                      <span className="text-[13px] text-text-primary truncate">{p.title}</span>
                      <span className={`text-xs font-mono ${pctColor[p.color]}`}>{pct}%</span>
                    </div>
                    <ProgressBar pct={pct} color={p.color} />
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      <div className="bg-bg-card border border-[rgba(255,255,255,0.06)] rounded-2xl p-6">
        <div className="flex justify-between items-center mb-5">
          <h3 className="font-display text-base font-semibold text-text-primary">Activité Récente</h3>
          <button
            type="button"
            onClick={() => navigate('/projects')}
            className="text-xs text-accent-green bg-transparent border-0 cursor-pointer font-body hover:opacity-80"
          >
            Voir tous les projets →
          </button>
        </div>

        <div
          className="grid gap-4 px-3.5 pb-2 border-b border-[rgba(255,255,255,0.05)]"
          style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr 140px' }}
        >
          {['Projet', 'Statut', 'Capital', 'Levé', 'Progression'].map((h) => (
            <span key={h} className="text-[11px] text-text-muted uppercase tracking-[0.8px]">
              {h}
            </span>
          ))}
        </div>

        {recentProjects.length === 0 ? (
          <p className="text-sm text-text-muted py-4 px-3.5">Aucun projet récent.</p>
        ) : (
          recentProjects.map((p) => {
            const pct = p.capital ? Math.round((p.raised / p.capital) * 100) : 0;
            return (
              <div
                key={p.id}
                role="button"
                tabIndex={0}
                onClick={() => navigate(`/projects/${p.id}`)}
                onKeyDown={(e) => e.key === 'Enter' && navigate(`/projects/${p.id}`)}
                className="grid gap-4 px-3.5 py-3 items-center rounded-lg transition-colors duration-200
                           hover:bg-[rgba(255,255,255,0.03)] cursor-pointer"
                style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr 140px' }}
              >
                <span className="text-sm font-medium text-text-primary">{p.title}</span>
                <Badge status={p.status} />
                <span className="text-[13px] font-mono text-text-secondary">
                  {p.capital.toLocaleString('fr-MA')} MAD
                </span>
                <span className={`text-[13px] font-mono ${raisedColor[p.color]}`}>
                  {p.raised.toLocaleString('fr-MA')} MAD
                </span>
                <ProgressBar pct={pct} color={p.color} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
