import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProjectForm from '../components/ProjectForm';
import { getProjectById, updateProject } from '@/api/projectsApi';

export default function UpdateProject() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    capital: '',
    maxPct: '',
  });

  useEffect(() => {
    async function load() {
      try {
        const project = await getProjectById(id);
        if (!project) {
          setError('Projet introuvable');
          return;
        }
        if (project.status !== 'open') {
          navigate(`/projects/${id}`);
          return;
        }
        setForm({
          title: project.title,
          description: project.description,
          capital: String(project.capital),
          maxPct: String(project.maxInvestmentPercentage),
        });
      } catch (err) {
        setError(err.response?.data?.message || 'Impossible de charger le projet');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id, navigate]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      await updateProject(id, {
        title: form.title.trim(),
        description: form.description.trim(),
        capital: Number(form.capital),
        maxInvestmentPercentage: Number(form.maxPct),
      });
      navigate(`/projects/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Mise à jour impossible');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="page-section">Chargement...</div>;
  }

  if (error && !form.title) {
    return <div className="page-section text-accent-red">{error}</div>;
  }

  return (
    <div className="page-section">
      <ProjectForm
        isUpdate
        title="Modifier le Projet"
        submitLabel={saving ? 'Enregistrement...' : 'Enregistrer les modifications →'}
        values={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        error={error}
        disabled={saving}
      />
    </div>
  );
}
