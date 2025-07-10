import React, { useState } from "react";
import {
  FiCloud,
  FiHome,
  FiUsers,
  FiHeart,
  FiGift,
  FiDollarSign,
  FiMenu,
  FiX,
} from "react-icons/fi";

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);

  // Menu items com ícones ajustados
  const menuItems = [
    { label: "BandsCloud", href: "/", icon: <FiHome /> },
    { label: "Missão", href: "#perfil", icon: <FiHeart /> },
    { label: "Valores", href: "#musicas", icon: <FiGift /> },
    { label: "Contribuição", href: "#albuns", icon: <FiUsers /> },
    { label: "Patrocínios", href: "#eventos", icon: <FiDollarSign /> },
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
              {open ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
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
