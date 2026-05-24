import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectForm from '../components/ProjectForm';
import { createProject } from '@/api/projectsApi';

export default function CreateProject() {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    capital: '',
    initialInvestment: '',
    maxPct: '',
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      capital: Number(form.capital),
      maxInvestmentPercentage: Number(form.maxPct),
    };

    if (form.initialInvestment) {
      payload.initialInvestmentAmount = Number(form.initialInvestment);
    }

    try {
      const res = await createProject(payload);
      const project = res.data.project;
      navigate(`/projects/${project._id ?? project.id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Création impossible');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="page-section">
      <ProjectForm
        title="Créer un Projet"
        submitLabel={saving ? 'Création...' : 'Lancer la Campagne →'}
        values={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        error={error}
        disabled={saving}
      />
    </div>
  );
}
