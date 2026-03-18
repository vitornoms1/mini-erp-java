import React from 'react';
import { FaUserCircle, FaBars } from 'react-icons/fa';

const Header = ({ toggleSidebar }) => {
  return (
    <header className="h-20 bg-white shadow-sm flex items-center justify-between px-4 md:px-8 w-full border-b border-gray-200">
      <div className="flex items-center gap-4">
        {/* Botão Hamburger (Aparece só no celular) */}
        <button 
          onClick={toggleSidebar}
          className="md:hidden text-gray-600 hover:text-indigo-600 transition-colors"
        >
          <FaBars size={24} />
        </button>
        <h2 className="text-xl font-bold text-gray-800">Painel de Controle</h2>
      </div>
    </header>
  );
};

export default Header;