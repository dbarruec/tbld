import { NavLink, Outlet } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Nuevo', end: true },
  { to: '/historico', label: 'Histórico' },
  { to: '/seguimiento', label: 'Seguimiento' },
];

function AppLayout() {
  return (
    <div className="min-h-screen bg-white">
      <header className="fixed inset-x-0 top-0 z-50 flex h-14 items-stretch justify-between bg-black px-6">
        <span className="flex items-center text-sm font-black uppercase tracking-wide text-white">
          TABLADA
        </span>
        <nav className="flex items-stretch gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center border-b-2 text-sm transition-colors duration-150 ${
                  isActive
                    ? 'border-white font-bold text-white'
                    : 'border-transparent font-medium text-white/50 hover:text-white'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="pt-14">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
