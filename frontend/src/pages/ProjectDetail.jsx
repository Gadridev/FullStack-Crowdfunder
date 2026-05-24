import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Badge, ProgressBar, InvestorAvatar } from '../components/ui';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProject } from '@/api/projectsApi';
import { getInvestorsProject, getProject } from '@/store/slices/projectSlice';
import { mapInvestors, mapProject } from '@/utils/formatProject';

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [deleting, setDeleting] = useState(false);
  const rawProject = useSelector((state) => state.projects.project);
  const rawInvestors = useSelector((state) => state.projects?.investors) || [];
  const investors = mapInvestors(rawInvestors);
  const project = mapProject(rawProject);

  async function handleDelete() {
    if (project.status !== 'open') return;
    if (!window.confirm(`Supprimer le projet "${project.title}" ?`)) return;

    setDeleting(true);
    try {
      await deleteProject(project.id);
      navigate('/projects');
    } catch (err) {
      alert(err.response?.data?.message || 'Suppression impossible');
    } finally {
      setDeleting(false);
    }
  }

  useEffect(() => {
     if (!id) return;
  dispatch(getProject(id));
  dispatch(getInvestorsProject(id));
  }, [dispatch, id]);

  if (!project) {
    return <div className="page-section">Chargement...</div>;
  }

  const pct = Math.round((project.raised / project.capital) * 100);
  const remaining = project.capital - project.raised;

  return (
    <div className="page-section">
      <button
        onClick={() => navigate('/projects')}
        className="flex items-center gap-1.5 text-sm text-text-secondary bg-transparent border-0
                   cursor-pointer mb-6 hover:text-text-primary transition-colors font-body"
      >
        ← Retour aux projets
      </button>

      <div className="grid gap-6" style={{ gridTemplateColumns: '1fr 340px' }}>
        <div className="flex flex-col gap-5">
          <div className="bg-bg-card border border-[rgba(0,255,136,0.12)] rounded-2xl p-7">
            <div className="flex justify-between items-start mb-5">
              <div className="flex items-center gap-3.5">
                <div className="w-[52px] h-[52px] bg-[rgba(0,255,136,0.1)] rounded-xl flex items-center justify-center text-2xl">
                  {project.emoji}
                </div>
                <div>
                  <h1 className="font-display text-2xl font-extrabold text-text-primary mb-1">
                    {project.title}
                  </h1>
                  <Badge status={project.status} />
                </div>
              </div>
              <div className="flex gap-2">
                {project.status === 'open' && (
                  <button className="btn-blue" onClick={() => navigate(`/projects/update/${project.id}`)}>
                    Modifier
                  </button>
                )}
                <button className="btn-danger py-2 px-3.5 text-sm">Fermer</button>
              </div>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">{project.description}</p>
          </div>

          <div className="grid grid-cols-3 gap-3.5">
            {[
              { label: 'Capital Cible', value: `${project.capital.toLocaleString('fr-MA')} MAD`, color: 'text-text-primary' },
              { label: 'Capital Actuel', value: `${project.raised.toLocaleString('fr-MA')} MAD`, color: 'text-accent-green', glow: true },
              { label: 'Progression', value: `${pct}%`, color: 'text-accent-green' },
            ].map(s => (
              <div
                key={s.label}
                className={`bg-bg-card border rounded-xl p-[18px] text-center
                  ${s.glow
                    ? 'border-[rgba(0,255,136,0.15)] bg-gradient-to-br from-[rgba(0,255,136,0.08)] to-[rgba(0,255,136,0.03)]'
                    : 'border-[rgba(255,255,255,0.06)]'}`}
              >
                <p className="text-[11px] text-text-muted uppercase tracking-[0.8px] mb-2">{s.label}</p>
                <p className={`text-xl font-mono font-semibold ${s.color}`}>{s.value}</p>
              </div>
            ))}
          </div>

          <div className="bg-bg-card border border-[rgba(255,255,255,0.06)] rounded-2xl p-[22px]">
            <div className="flex justify-between mb-3">
              <span className="text-sm text-text-secondary">Collecte en cours</span>
              <span className="text-sm font-mono text-accent-green">
                {project.raised.toLocaleString('fr-MA')} / {project.capital.toLocaleString('fr-MA')} MAD
              </span>
            </div>
            <div className="h-2.5 bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-accent-green to-accent-green-dim rounded-full"
                style={{ width: `${pct}%` }}
              />
            </div>
            <div className="flex justify-between mt-2.5">
              <span className="text-[11px] text-text-muted">0 MAD</span>
              <span className="text-[11px] text-text-muted">
                Il reste {remaining.toLocaleString('fr-MA')} MAD
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-bg-card border border-[rgba(255,255,255,0.06)] rounded-2xl p-[22px]">
            <div className="flex justify-between items-center mb-[18px]">
              <h3 className="font-display text-[15px] font-semibold text-text-primary">Investisseurs</h3>
              <button
                onClick={() => navigate(`/projects/${project.id}/investors`)}
                className="text-[11px] text-accent-green bg-transparent border-0 cursor-pointer font-body hover:opacity-80"
              >
                Voir tous →
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {investors.slice(0, 3).map(inv => (
                <div key={inv.id} className="flex items-center gap-2.5">
                  <InvestorAvatar initials={inv.initials} color={inv.color} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium text-text-primary truncate">{inv.name}</p>
                    <p className="text-[11px] font-mono text-text-muted">
                      {inv.amount.toLocaleString('fr-MA')} MAD — {inv.pct}%
                    </p>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-[rgba(0,255,136,0.08)] flex items-center justify-center flex-shrink-0">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M5 2l4 4-4 4" stroke="#00ff88" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-bg-card border border-[rgba(255,255,255,0.06)] rounded-2xl p-[22px]">
            <h3 className="font-display text-[15px] font-semibold text-text-primary mb-4">Actions</h3>
            <div className="flex flex-col gap-2">
              <button
                className="w-full py-2.5 px-3 bg-[rgba(77,159,255,0.1)] border border-[rgba(77,159,255,0.2)]
                           rounded-lg text-accent-blue text-[13px] font-body cursor-pointer text-left
                           flex items-center gap-2 transition-all duration-200 hover:bg-[rgba(77,159,255,0.18)]"
                onClick={() => navigate(`/projects/update/${project.id}`)}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M9 2l3 3-7 7H2V9l7-7z" stroke="#4d9fff" strokeWidth="1.4" strokeLinejoin="round" />
                </svg>
                Modifier le projet
              </button>
              <button
                className="w-full py-2.5 px-3 bg-[rgba(255,140,66,0.1)] border border-[rgba(255,140,66,0.2)]
                           rounded-lg text-accent-orange text-[13px] font-body cursor-pointer text-left
                           flex items-center gap-2 transition-all duration-200 hover:bg-[rgba(255,140,66,0.18)]"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 1v6M4 10a3 3 0 106 0" stroke="#ff8c42" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
                Fermer la collecte
              </button>
              {project.status === 'open' && (
                <button
                  type="button"
                  disabled={deleting}
                  onClick={handleDelete}
                  className="w-full py-2.5 px-3 bg-[rgba(255,77,106,0.1)] border border-[rgba(255,77,106,0.2)]
                             rounded-lg text-accent-red text-[13px] font-body cursor-pointer text-left
                             flex items-center gap-2 transition-all duration-200 hover:bg-[rgba(255,77,106,0.18)]
                             disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 4h10M5 4V2h4v2M5.5 7v4M8.5 7v4M3 4l.7 8h6.6L11 4"
                      stroke="#ff4d6a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {deleting ? 'Suppression...' : 'Supprimer le projet'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
