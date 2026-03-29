import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { to: '/', label: 'Scanner', icon: '🔍' },
  { to: '/alternatives', label: 'Alternatives', icon: '🔄' },
  { to: '/calculator', label: 'Calculator', icon: '🧮' },
  { to: '/recycling', label: 'Map', icon: '🗺️' },
  { to: '/journey', label: 'Journey', icon: '🌱' },
];

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-stone-950 text-stone-100 selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-stone-800/60 bg-stone-950/80 backdrop-blur-xl sticky left-0 top-0 h-screen flex-shrink-0 z-[1000]">
        <div className="p-6 pb-4 border-b border-stone-800/40">
          <h1 className="text-2xl font-display font-bold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
            EcoSage
          </h1>
          <p className="text-xs text-stone-500 mt-1">AI Sustainability Companion</p>
        </div>
        <nav className="flex-1 p-4 space-y-1" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                ${isActive
                  ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/20 shadow-sm shadow-emerald-900/20'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/40'
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-stone-800/40">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-sm font-bold">
              E
            </div>
            <div>
              <p className="text-xs font-medium text-stone-300">Eco Explorer</p>
              <p className="text-[10px] text-stone-500">Level 3 • 12 scans</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Header + Hamburger */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-[1000] bg-stone-950/90 backdrop-blur-xl border-b border-stone-800/40 px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-display font-bold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
          EcoSage
        </h1>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-stone-800/60 text-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {sidebarOpen ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <>
                <path d="M4 6h16M4 12h16M4 18h16" />
              </>
            )}
          </svg>
        </button>
      </header>

      {/* Mobile slide-out menu */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 z-[1100] bg-black/50 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.nav
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 z-[1200] w-64 bg-stone-900/98 backdrop-blur-xl border-r border-stone-800/60 p-6 space-y-2"
              aria-label="Mobile navigation"
            >
              <h2 className="text-xl font-display font-bold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent mb-6">
                EcoSage
              </h2>
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                    ${isActive
                      ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/20'
                      : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/40'
                    }`
                  }
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.label}
                </NavLink>
              ))}
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="flex-1 min-w-0">
        <div className="pt-16 lg:pt-0 min-h-screen">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Tab Bar */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-[1000] bg-stone-950/90 backdrop-blur-xl border-t border-stone-800/40"
        aria-label="Mobile tab navigation"
      >
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg text-[10px] font-medium transition-all
                ${isActive ? 'text-emerald-400' : 'text-stone-500'}`
              }
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
