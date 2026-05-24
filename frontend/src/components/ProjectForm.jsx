import { useNavigate } from 'react-router-dom';
import { InputField, TextareaField } from './ui';

export default function ProjectForm({
  initialValues = {},
  values,
  onChange,
  onSubmit,
  error,
  disabled = false,
  isUpdate = false,
  title = 'Créer un Projet',
  submitLabel = 'Lancer la Campagne →',
}) {
  const navigate = useNavigate();
  const controlled = Boolean(values && onChange);

  const field = (name) =>
    controlled
      ? { name, value: values[name] ?? '', onChange, disabled }
      : { name, defaultValue: initialValues[name], disabled };

  return (
    <div className="max-w-xl">
      <button
        type="button"
        onClick={() => navigate('/projects')}
        className="flex items-center gap-1.5 text-sm text-text-secondary bg-transparent border-0
                   cursor-pointer mb-4 hover:text-text-primary transition-colors duration-200 font-body"
      >
        ← Retour aux projets
      </button>

      <div className="mb-9">
        <h1 className="page-title">{title}</h1>
        <p className="page-subtitle">Configurez votre campagne de financement participatif</p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit?.(e);
        }}
        className="bg-bg-card border border-[rgba(255,255,255,0.06)] rounded-2xl p-8 flex flex-col gap-5"
      >
        {error && (
          <p className="text-sm text-accent-red">{error}</p>
        )}

        <InputField
          label="Titre du Projet"
          type="text"
          placeholder="ex: AgriTech Souss — Irrigation Intelligente"
          {...field('title')}
        />

        <TextareaField
          label="Description"
          placeholder="Décrivez votre projet, son impact et ses objectifs..."
          rows={4}
          {...field('description')}
        />

        <div className={`grid gap-4 ${isUpdate ? 'grid-cols-1' : 'grid-cols-2'}`}>
          <InputField
            label="Capital Cible (MAD)"
            type="number"
            placeholder="500 000"
            min="1"
            {...field('capital')}
          />
          {!isUpdate && (
            <InputField
              label="Investissement Initial (MAD)"
              type="number"
              placeholder="50 000"
              min="1"
              {...field('initialInvestment')}
            />
          )}
        </div>

        <div>
          <InputField
            label="% Maximum par Investisseur"
            type="number"
            placeholder="25"
            min="0"
            max="50"
            {...field('maxPct')}
          />
          <p className="text-[11px] text-text-muted mt-1.5">Limite le risque de concentration du capital</p>
        </div>

        <div className="flex gap-3 pt-2 border-t border-[rgba(255,255,255,0.05)]">
          <button type="submit" className="btn-primary flex-1 py-3" disabled={disabled}>
            {submitLabel}
          </button>
          <button type="button" className="btn-ghost" onClick={() => navigate('/projects')} disabled={disabled}>
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}
