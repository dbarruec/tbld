import { Link, NavLink, Outlet } from 'react-router-dom';

const navItems = [
  { to: '/nuevo', label: 'Nuevo' },
  { to: '/historico', label: 'Histórico' },
  { to: '/seguimiento', label: 'Seguimiento' },
];

function AppLayout() {
  return (
    <div className="min-h-screen bg-white">
      <header className="fixed inset-x-0 top-0 z-50 flex flex-col bg-black md:flex-row md:items-stretch md:justify-between">
        <div className="flex h-12 items-center px-4 md:h-14 md:px-6">
          <Link to="/" className="text-sm font-black uppercase tracking-wide text-white">
            TABLADA
          </Link>
        </div>
        <nav className="flex h-12 items-stretch justify-center gap-6 border-t border-white/10 px-4 md:h-14 md:justify-start md:border-t-0 md:px-0 md:pr-6">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
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
      <main className="pt-24 md:pt-14">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
