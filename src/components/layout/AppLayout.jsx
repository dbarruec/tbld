import { NavLink, Outlet } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Nuevo', end: true },
  { to: '/historico', label: 'Histórico' },
  { to: '/seguimiento', label: 'Seguimiento' },
];

function AppLayout() {
  return (
    <div className="min-h-screen bg-white">
      <header className="fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between bg-black px-6">
        <span className="text-sm font-bold tracking-wide text-white">TABLADA</span>
        <nav className="flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-150 ${
                  isActive ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
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
