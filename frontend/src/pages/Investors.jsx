import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import InvestorList from '../components/InvestorList';
import { getInvestorsProject, getProject } from '@/store/slices/projectSlice';
import { mapInvestors, mapProject } from '@/utils/formatProject';

export default function Investors() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');

  const rawInvestors = useSelector((state) => state.projects.investors);
  const rawProject = useSelector((state) => state.projects.project);
  const loading = useSelector((state) => state.projects.loading);

  const project = mapProject(rawProject);
  const investors = mapInvestors(rawInvestors);

  const filtered = investors.filter((inv) =>
    inv.name.toLowerCase().includes(search.toLowerCase().trim()),
  );

  useEffect(() => {
    if (!id) return;
    dispatch(getProject(id));
    dispatch(getInvestorsProject(id));
  }, [dispatch, id]);

  return (
    <div className="page-section">
      <div className="flex justify-between items-start mb-9">
        <div>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-sm text-text-secondary bg-transparent border-0
                       cursor-pointer mb-3 hover:text-text-primary transition-colors font-body"
          >
            ← Retour
          </button>
          <h1 className="page-title">Investisseurs</h1>
          <p className="page-subtitle">
            {project?.title ?? 'Projet'} — {filtered.length} investisseur{filtered.length !== 1 ? 's' : ''}
          </p>
        </div>
        <input
          className="input-field w-64"
          type="search"
          placeholder="Rechercher un investisseur..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <p className="text-text-secondary">Chargement...</p>
      ) : filtered.length === 0 ? (
        <p className="text-text-muted">
          {search ? 'Aucun investisseur trouvé.' : 'Aucun investisseur pour ce projet.'}
        </p>
      ) : (
        <InvestorList investors={filtered} />
      )}
    </div>
  );
}
