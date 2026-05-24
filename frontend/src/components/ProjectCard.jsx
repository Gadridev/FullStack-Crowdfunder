import { useNavigate } from 'react-router-dom';
import { Badge,ProgressBar } from './ui';

const borderAccent = {
  green:  'border-[rgba(0,255,136,0.12)]',
  blue:   'border-[rgba(77,159,255,0.12)]',
  orange: 'border-[rgba(255,140,66,0.12)]',
  purple: 'border-[rgba(155,89,255,0.12)]',
};
const raisedColor = {
  green:  'text-accent-green',
  blue:   'text-accent-blue',
  orange: 'text-accent-orange',
  purple: 'text-accent-purple',
};
const pctColor = {
  green:  'text-accent-green',
  blue:   'text-accent-blue',
  orange: 'text-accent-orange',
  purple: 'text-accent-purple',
};
const iconBg = {
  green:  'bg-[rgba(0,255,136,0.1)]',
  blue:   'bg-[rgba(77,159,255,0.1)]',
  orange: 'bg-[rgba(255,140,66,0.1)]',
  purple: 'bg-[rgba(155,89,255,0.1)]',
};

export default function ProjectCard({ project }) {
  const navigate = useNavigate();
  const pct = Math.round((project.raised / project.capital) * 100);
  const isClosed = project.status === 'closed';

  return (
    <div
      className={`bg-bg-card border rounded-2xl p-[22px] transition-all duration-200
        hover:-translate-y-0.5 hover:shadow-card-hover cursor-pointer
        ${borderAccent[project.color] || 'border-[rgba(255,255,255,0.06)]'}
        ${isClosed ? 'opacity-70' : ''}`}
      onClick={() => navigate(`/projects/${project.id || project._id}`)}
    >

      <div className="flex justify-between items-start mb-4">
        <div className={`w-11 h-11 ${iconBg[project.color]} rounded-xl flex items-center justify-center text-xl`}>
          {project.emoji}
        </div>
        <Badge status={project.status} />
      </div>


      <h3 className="font-display text-base font-bold text-text-primary mb-1.5">{project.title}</h3>
      <p className="text-xs text-text-muted leading-relaxed mb-5 line-clamp-2">{project.description}</p>


      <div className="mb-2.5">
        <div className="flex justify-between mb-1.5">
          <span className="text-xs text-text-secondary">Progression</span>
          <span className={`text-xs font-mono font-medium ${pctColor[project.color]}`}>{pct}%</span>
        </div>
        <ProgressBar pct={pct} color={project.color} />
      </div>


      <div className="flex justify-between mt-3">
        <div>
          <p className="text-[11px] text-text-muted">Capital Cible</p>
          <p className="text-[13px] font-mono text-text-primary mt-0.5">
            {project.capital.toLocaleString('fr-MA')} MAD
          </p>
        </div>
        <div className="text-right">
          <p className="text-[11px] text-text-muted">Levé</p>
          <p className={`text-[13px] font-mono mt-0.5 ${raisedColor[project.color]}`}>
            {project.raised.toLocaleString('fr-MA')} MAD
          </p>
        </div>
      </div>


      <div className="flex gap-2 mt-4 pt-3.5 border-t border-[rgba(255,255,255,0.05)]">
        <button
          className="btn-ghost flex-1 text-xs py-1.5"
          onClick={(e) => { e.stopPropagation(); navigate(`/projects/${project.id || project._id}`); }}
        >
          Détails
        </button>
        <button
          className="btn-danger text-xs"
          onClick={(e) => e.stopPropagation()}
        >
          Supprimer
        </button>
      </div>
    </div>
  );
}
