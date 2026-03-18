import React from 'react';
import { FaBox, FaTags, FaDollarSign, FaExclamationTriangle } from 'react-icons/fa';

const Dashboard = () => {
  // Dados simulados para os cards (futuramente virão da sua API Spring Boot)
  const stats = [
    { 
      id: 1, 
      title: 'Total de Produtos', 
      value: '124', 
      icon: <FaBox className="text-blue-500 text-2xl" />, 
      bgColor: 'bg-blue-100' 
    },
    { 
      id: 2, 
      title: 'Categorias Ativas', 
      value: '8', 
      icon: <FaTags className="text-purple-500 text-2xl" />, 
      bgColor: 'bg-purple-100' 
    },
    { 
      id: 3, 
      title: 'Valor em Estoque', 
      value: 'R$ 45.200,00', 
      icon: <FaDollarSign className="text-green-500 text-2xl" />, 
      bgColor: 'bg-green-100' 
    },
    { 
      id: 4, 
      title: 'Estoque Baixo', 
      value: '3 itens', 
      icon: <FaExclamationTriangle className="text-orange-500 text-2xl" />, 
      bgColor: 'bg-orange-100' 
    }
  ];

  // Dados simulados para movimentações recentes
  const movimentacoes = [
    { id: 1, acao: 'Entrada de Estoque', produto: 'Notebook Dell XPS', data: 'Hoje, 10:30', status: 'Concluído' },
    { id: 2, acao: 'Nova Categoria', produto: 'Acessórios Gamer', data: 'Ontem, 15:45', status: 'Concluído' },
    { id: 3, acao: 'Saída de Estoque', produto: 'Monitor LG 27"', data: '16/03/2026', status: 'Concluído' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Visão Geral</h1>
        <p className="text-gray-500 mt-2">Acompanhe os principais indicadores do seu inventário.</p>
      </div>

      {/* Grid de Cards (KPIs) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat) => (
          <div key={stat.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center ${stat.bgColor}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
              <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Seção de Atividades Recentes */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Movimentações Recentes</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-gray-500 text-sm uppercase">
                <th className="pb-3 font-semibold">Ação</th>
                <th className="pb-3 font-semibold">Item Afetado</th>
                <th className="pb-3 font-semibold">Data/Hora</th>
                <th className="pb-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {movimentacoes.map((mov) => (
                <tr key={mov.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-4 font-medium text-gray-800">{mov.acao}</td>
                  <td className="py-4 text-gray-600">{mov.produto}</td>
                  <td className="py-4 text-gray-500 text-sm">{mov.data}</td>
                  <td className="py-4">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                      {mov.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;