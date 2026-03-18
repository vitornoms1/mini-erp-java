import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { FaPlus, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Controle do Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [novaCategoria, setNovaCategoria] = useState({
    name: '', // Atualizado para 'name' para fazer match exato com o Java
    descricao: ''
  });

  useEffect(() => {
    buscarCategorias();
  }, []);

  const buscarCategorias = async () => {
    try {
      // Fazendo a chamada REAL para o Spring Boot
      const response = await api.get('/categories'); 
      setCategorias(response.data);
    } catch (error) {
      console.error("Erro ao conectar com a API:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovaCategoria({ ...novaCategoria, [name]: value });
  };

  const handleSalvarCategoria = async (e) => {
    e.preventDefault();
    
    try {
      // Fazendo o POST REAL para o seu backend Spring Boot!
      const response = await api.post('/categories', novaCategoria);
      
      // A resposta (response.data) já vem com o ID gerado pelo MongoDB.
      // Vamos adicionar ela diretamente na lista da tela:
      setCategorias([...categorias, response.data]);
      
      alert("Categoria salva com sucesso no Banco de Dados!");
      setIsModalOpen(false); // Fecha a janelinha
      setNovaCategoria({ name: '', descricao: '' }); // Limpa os campos
      
    } catch (error) {
      console.error("Erro ao salvar categoria:", error);
      alert("Erro ao salvar categoria. Verifique o console ou se o Java está rodando.");
    }
  };

  return (
    <div className="p-8 relative">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Gestão de Categorias</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition-colors shadow-md"
        >
          <FaPlus /> Nova Categoria
        </button>
      </div>

      {/* Tabela de Categorias */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 uppercase text-sm">
              <th className="p-4 font-semibold w-24">ID</th>
              <th className="p-4 font-semibold w-1/4">Nome</th>
              <th className="p-4 font-semibold">Descrição</th>
              <th className="p-4 font-semibold text-center w-32">Ações</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="4" className="p-4 text-center text-gray-500">Carregando dados do banco...</td></tr>
            ) : categorias.length === 0 ? (
              <tr><td colSpan="4" className="p-4 text-center text-gray-500">Nenhuma categoria encontrada.</td></tr>
            ) : (
              categorias.map((categoria) => (
                <tr key={categoria.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  {/* Pega apenas os 6 primeiros caracteres do ID do Mongo para não ficar gigante na tela */}
                  <td className="p-4 text-gray-500" title={categoria.id}>
                    #{String(categoria.id).substring(0, 6)}...
                  </td>
                  <td className="p-4 font-medium text-gray-800">
                    <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">
                      {/* Lendo a propriedade 'name' vinda do Java */}
                      {categoria.name}
                    </span>
                  </td>
                  {/* O Java ainda não tem a propriedade 'descricao', então deixamos um fallback */}
                  <td className="p-4 text-gray-600">{categoria.descricao || 'Sem descrição'}</td>
                  <td className="p-4 flex justify-center gap-3">
                    <button className="text-blue-500 hover:text-blue-700 transition-colors" title="Editar">
                      <FaEdit />
                    </button>
                    <button className="text-red-500 hover:text-red-700 transition-colors" title="Excluir">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal de Nova Categoria */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Cadastrar Categoria</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-red-500 transition-colors"
              >
                <FaTimes size={24} />
              </button>
            </div>

            <form onSubmit={handleSalvarCategoria} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Categoria</label>
                <input 
                  type="text" name="name" required value={novaCategoria.name} onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:border-indigo-500 focus:outline-none"
                  placeholder="Ex: Eletrônicos"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                <textarea 
                  name="descricao" rows="3" value={novaCategoria.descricao} onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:border-indigo-500 focus:outline-none resize-none"
                  placeholder="Breve descrição dos produtos desta categoria..."
                ></textarea>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
                >
                  Salvar Categoria
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categorias;