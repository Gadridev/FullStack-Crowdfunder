import { useNavigate } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchProjects } from '@/store/slices/projectSlice';
import { mapProjects } from '@/utils/formatProject';

export default function Projects() {
  const navigate = useNavigate();
  const { projects, loading } = useSelector((state) => state.projects);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  if (loading) {
    return "isLoading";
  }

  const uiProject = mapProjects(projects);

  return (
    <div className="page-section">
      <div className="flex justify-between items-start mb-9">
        <div>
          <h1 className="page-title">Mes Projets</h1>
          <p className="page-subtitle">Gérez et suivez toutes vos campagnes de financement</p>
        </div>
        <div className="flex gap-2.5 items-center">
          <select className="input-field w-40">
            <option>Tous les statuts</option>
            <option>Ouverts</option>
            <option>Fermés</option>
          </select>
          <button className="btn-primary" onClick={() => navigate('/projects/create')}>
            + Nouveau Projet
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-[18px]">
        {uiProject.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}

        <div
          onClick={() => navigate('/projects/create')}
          className="bg-[rgba(255,255,255,0.02)] border border-dashed border-[rgba(255,255,255,0.1)]
                     rounded-2xl p-[22px] cursor-pointer flex flex-col items-center justify-center
                     gap-3 min-h-[200px] transition-all duration-200
                     hover:border-[rgba(0,255,136,0.3)] hover:bg-[rgba(0,255,136,0.03)]"
        >
          <div className="w-12 h-12 rounded-xl bg-[rgba(0,255,136,0.08)] flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 4v12M4 10h12" stroke="#00ff88" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <div className="text-center">
            <p className="font-display text-sm font-semibold text-text-secondary">Nouveau Projet</p>
            <p className="text-xs text-text-muted mt-1">Lancer une campagne</p>
          </div>
        </div>
      </div>
    </div>
  );
}
