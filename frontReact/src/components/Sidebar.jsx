import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBox, FaTags, FaChartPie, FaTimes } from 'react-icons/fa';

const Sidebar = ({ isOpen, closeSidebar }) => {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/', icon: <FaChartPie /> },
    { name: 'Produtos', path: '/produtos', icon: <FaBox /> },
    { name: 'Categorias', path: '/categorias', icon: <FaTags /> }
  ];

  return (
    <>
      {/* Fundo escuro quando o menu abre no celular */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      {/* O Menu em si */}
      <div className={`
        fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white flex flex-col shadow-2xl z-50
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0
      `}>
        <div className="p-6 text-2xl font-bold border-b border-gray-800 text-indigo-400 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FaBox className="text-indigo-500" />
            ERP System
          </div>
          {/* Botão de fechar no celular */}
          <button className="md:hidden text-gray-400 hover:text-white" onClick={closeSidebar}>
            <FaTimes size={24} />
          </button>
        </div>
        
        <nav className="flex-1 mt-6">
          <ul className="space-y-2 px-4">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  onClick={closeSidebar} // Fecha o menu ao clicar num link (no celular)
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${
                    location.pathname === item.path
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;