import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { FaBoxOpen, FaTags, FaExclamationTriangle, FaChartLine, FaPlus } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [dados, setDados] = useState({
    totalProdutos: 0,
    totalCategorias: 0,
    valorEmEstoque: 0,
    produtosBaixoEstoque: [],
    dadosGraficoBarras: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarResumo();
  }, []);

  const carregarResumo = async () => {
    try {
      const [resProdutos, resCategorias] = await Promise.all([
        api.get('/products?size=1000'),
        api.get('/categories')
      ]);

      const produtos = resProdutos.data.content; 
      const categorias = resCategorias.data;

      const valorTotal = produtos.reduce((acc, prod) => acc + (prod.price * prod.quantity), 0);
      const estoqueBaixo = produtos.filter(prod => prod.quantity < 5);

      const graficoBarras = categorias.map(cat => {
        const quantidade = produtos.filter(p => p.category && p.category.id === cat.id).length;
        return { name: cat.name, Produtos: quantidade };
      }).filter(item => item.Produtos > 0);

      setDados({
        totalProdutos: produtos.length,
        totalCategorias: categorias.length,
        valorEmEstoque: valorTotal,
        produtosBaixoEstoque: estoqueBaixo,
        dadosGraficoBarras: graficoBarras
      });

    } catch (error) {
      console.error("Erro ao carregar dados do dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    // AJUSTE 1: Espaçamento menor no celular (p-4) e maior no PC (md:p-8)
    <div className="p-4 md:p-8 w-full max-w-7xl mx-auto">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Dashboard</h1>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3 w-full sm:w-auto">
          <Link to="/produtos" className="flex-1 sm:flex-none justify-center bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-colors shadow-sm text-sm sm:text-base">
            <FaBoxOpen className="text-indigo-600"/> Produtos
          </Link>
          <Link to="/categorias" className="flex-1 sm:flex-none justify-center bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition-colors shadow-sm text-sm sm:text-base">
            <FaPlus /> Categoria
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="bg-blue-100 p-3 sm:p-4 rounded-lg text-blue-600"><FaBoxOpen size={20} className="sm:text-2xl" /></div>
          <div>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">Produtos</p>
            <p className="text-lg sm:text-2xl font-bold text-gray-800">{dados.totalProdutos}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="bg-indigo-100 p-3 sm:p-4 rounded-lg text-indigo-600"><FaTags size={20} className="sm:text-2xl" /></div>
          <div>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">Categorias</p>
            <p className="text-lg sm:text-2xl font-bold text-gray-800">{dados.totalCategorias}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="bg-green-100 p-3 sm:p-4 rounded-lg text-green-600"><FaChartLine size={20} className="sm:text-2xl" /></div>
          <div>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">Capital (R$)</p>
            <p className="text-lg sm:text-2xl font-bold text-gray-800">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(dados.valorEmEstoque)}
            </p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="bg-orange-100 p-3 sm:p-4 rounded-lg text-orange-600"><FaExclamationTriangle size={20} className="sm:text-2xl" /></div>
          <div>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">Alertas</p>
            <p className="text-lg sm:text-2xl font-bold text-orange-600">{dados.produtosBaixoEstoque.length}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        
        {/* AJUSTE 3: min-w-0 evita que o Recharts estique a tela no celular */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:col-span-2 min-w-0">
          <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-4 sm:mb-6">Distribuição por Categoria</h2>
          {/* h-64 no celular, h-72 no pc */}
          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dados.dadosGraficoBarras} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                <Tooltip cursor={{fill: '#f3f4f6'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}} />
                <Bar dataKey="Produtos" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flex flex-col gap-6 sm:gap-8">
          <div className="bg-white rounded-xl shadow-sm border border-orange-200 overflow-hidden flex-1">
            <div className="bg-orange-50 border-b border-orange-100 p-3 sm:p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FaExclamationTriangle className="text-orange-500" />
                <h2 className="text-sm sm:text-base font-bold text-orange-800">Reposição Urgente</h2>
              </div>
              <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {dados.produtosBaixoEstoque.length}
              </span>
            </div>
            
            <div className="p-0 overflow-y-auto max-h-48 sm:max-h-60">
              {dados.produtosBaixoEstoque.length === 0 ? (
                <p className="p-4 text-center text-gray-500 text-sm">Estoque regular. Nenhum alerta.</p>
              ) : (
                <ul className="divide-y divide-gray-100">
                  {dados.produtosBaixoEstoque.map(produto => (
                    <li key={produto.id} className="p-3 sm:p-4 flex justify-between items-center hover:bg-gray-50 transition-colors">
                      <div className="min-w-0 flex-1 pr-2">
                        <p className="font-medium text-gray-800 text-xs sm:text-sm truncate">{produto.name}</p>
                        <p className="text-xs text-gray-500 truncate">{produto.category?.name || 'Sem categoria'}</p>
                      </div>
                      <span className="text-red-600 font-bold bg-red-50 px-2 py-1 rounded text-xs sm:text-sm whitespace-nowrap">
                        {produto.quantity} un.
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;