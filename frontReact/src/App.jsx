import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Produtos from './pages/Produtos';
import Categorias from './pages/Categorias';

function App() {
  // Estado para controlar o menu no celular
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-gray-50">
        
        {/* Passamos o estado para a Sidebar saber se deve aparecer */}
        <Sidebar isOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />
        
        {/* No celular (md:ml-0), o conteúdo ocupa a tela toda. No PC (md:ml-64), respeita o menu */}
        <div className="flex-1 flex flex-col md:ml-64 transition-all duration-300 w-full overflow-hidden">
          
          {/* Passamos a função pro Header poder abrir o menu */}
          <Header toggleSidebar={() => setIsSidebarOpen(true)} />
          
          <main className="flex-1 overflow-auto bg-gray-50 w-full">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/produtos" element={<Produtos />} />
              <Route path="/categorias" element={<Categorias />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;