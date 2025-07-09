import React, { useState } from "react";
import {
  FiCloud,
  FiHome,
  FiUser,
  FiFolder,
  FiCalendar,
  FiUsers,
  FiSettings,
} from "react-icons/fi";

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);

  // Menu items com label, link e ícone ajustados corretamente
  const menuItems = [
    { label: "Dashboard", href: "/artist", icon: <FiHome /> },            // correto
    { label: "Perfil", href: "#perfil", icon: <FiUser /> },              // correto
    { label: "Artistas", href: "#artistas", icon: <FiUsers /> },         // correto (ícone de pessoas)
    { label: "Contratos", href: "#contratos", icon: <FiFolder /> },      // correto
    { label: "Projetos", href: "#projetos", icon: <FiFolder /> },       // projetos: pasta/folder parece mais adequado que música
    { label: "Eventos e Shows", href: "#eventos", icon: <FiCalendar /> },// calendário para eventos
    { label: "Seguidores", href: "#seguidores", icon: <FiUsers /> },     // seguidores são múltiplos usuários -> FiUsers melhor que FiUser
    { label: "Configurações", href: "#configuracoes", icon: <FiSettings /> }, // correto
  ];

  return (
    <nav className="bg-[#6600cc] shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 text-2xl font-bold text-white">
            <h1 className="text-logo-page flex items-center justify-center gap-3">
              <FiCloud className="icon-logo-header" />
              <span>BandsCloud</span>
            </h1>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-10">
            {menuItems.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                className="flex items-center gap-2 text-white hover:text-indigo-300 transition"
              >
                {icon}
                {label}
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setOpen(!open)}
              type="button"
              aria-label="Toggle menu"
              aria-expanded={open}
              className="text-white hover:text-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 rounded"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {open ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#6600cc] shadow-md">
          {menuItems.map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              className="flex items-center gap-2 px-6 py-4 border-b border-indigo-700 text-white hover:bg-indigo-700 hover:text-indigo-200 transition"
              onClick={() => setOpen(false)}
            >
              {icon}
              {label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
