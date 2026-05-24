import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Logo } from '../ui';
import { logout } from '@/store/slices/authSlice';

const navItems = [
  {
    to: '/',
    label: 'Dashboard',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="9" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="1" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="9" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    to: '/projects',
    label: 'Mes Projets',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M2 3h12M2 8h12M2 13h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    to: '/projects/create',
    label: 'Créer un Projet',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 5v6M5 8h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

function getInitials(name = '') {
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || '?';
}

function getRoleLabel(role) {
  if (role === 'project_owner') return 'Porteur de Projet';
  if (role === 'investor') return 'Investisseur';
  return role || '';
}

export default function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const initials = getInitials(user?.name);
  const roleLabel = getRoleLabel(user?.role);

  function handleLogout() {
    dispatch(logout());
    navigate('/login');
  }

  return (
    <aside className="w-[240px] min-w-[240px] bg-bg-secondary border-r border-[rgba(255,255,255,0.05)] flex flex-col">
      <div className="px-5 py-6 border-b border-[rgba(255,255,255,0.05)]">
        <Logo size="sm" />
      </div>

      <nav className="flex-1 flex flex-col gap-0.5 p-3 pt-5">
        {navItems.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            {icon}
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="px-5 py-4 border-t border-[rgba(255,255,255,0.05)]">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent-green to-accent-blue
                          flex items-center justify-center text-[13px] font-display font-bold text-bg-primary flex-shrink-0">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="text-[13px] font-medium text-text-primary truncate">
              {user?.name || '...'}
            </p>
            <p className="text-[11px] text-text-muted">{roleLabel}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="w-full py-2 bg-[rgba(255,77,106,0.08)] border border-[rgba(255,77,106,0.15)]
                     text-accent-red text-[13px] font-body rounded-lg transition-all duration-200
                     hover:bg-[rgba(255,77,106,0.15)] cursor-pointer"
        >
          Déconnexion
        </button>
      </div>
    </aside>
  );
}
