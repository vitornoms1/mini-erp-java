import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaArrowDown, FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';

const Produtos = () => {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // ================= ESTADOS DE PAGINAÇÃO ================= //
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(0);
  
  // Estado para a barra de pesquisa
  const [termoPesquisa, setTermoPesquisa] = useState('');
  const [tipoFiltro, setTipoFiltro] = useState('nome'); // 'nome' ou 'categoria'
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [novoProduto, setNovoProduto] = useState({
    name: '', categoryId: '', quantity: '', price: ''
  });

  const [isBaixaModalOpen, setIsBaixaModalOpen] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [qtdBaixa, setQtdBaixa] = useState('');

  // Busca as categorias apenas UMA vez quando a tela abre
  useEffect(() => {
    buscarCategorias();
  }, []);

  // Busca os produtos SEMPRE que a páginaAtual mudar
  useEffect(() => {
    buscarProdutos();
  }, [paginaAtual]);

  const buscarCategorias = async () => {
    try {
      const response = await api.get('/categories');
      setCategorias(response.data);
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
    }
  };

  const buscarProdutos = async () => {
    try {
      setLoading(true);
      // Chamada à API com paginação (ex: 5 itens por página)
      const response = await api.get(`/products?page=${paginaAtual}&size=5`);
      
      // O Spring Boot devolve os dados dentro de "content"
      setProdutos(response.data.content);
      setTotalPaginas(response.data.totalPages);
    } catch (error) {
      console.error("Erro ao conectar com a API:", error);
      toast.error("Erro ao carregar dados do servidor.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovoProduto({ ...novoProduto, [name]: value });
  };

  const abrirModalNovo = () => {
    setEditandoId(null);
    setNovoProduto({ name: '', categoryId: '', quantity: '', price: '' });
    setIsModalOpen(true);
  };

  const abrirModalEdicao = (produto) => {
    setEditandoId(produto.id);
    setNovoProduto({
      name: produto.name,
      categoryId: produto.category ? produto.category.id : '',
      quantity: produto.quantity,
      price: produto.price
    });
    setIsModalOpen(true);
  };

  const handleSalvarProduto = async (e) => {
    e.preventDefault();
    const payload = {
      name: novoProduto.name,
      price: parseFloat(novoProduto.price),
      quantity: parseInt(novoProduto.quantity, 10),
      category: { id: novoProduto.categoryId }
    };

    try {
      if (editandoId) {
        await api.put(`/products/${editandoId}`, payload);
        toast.success("Produto atualizado com sucesso!");
      } else {
        await api.post('/products', payload);
        toast.success("Produto salvo com sucesso!");
      }
      setIsModalOpen(false);
      buscarProdutos(); // Recarrega os dados para manter a paginação correta
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
      toast.error("Erro ao salvar o produto. Verifique os dados.");
    }
  };

  const handleExcluirProduto = async (id) => {
    const confirmacao = window.confirm("Tem certeza que deseja excluir este produto?");
    if (confirmacao) {
      try {
        const toastId = toast.loading("A excluir produto...");
        await api.delete(`/products/${id}`);
        toast.success("Produto excluído!", { id: toastId });
        buscarProdutos(); // Recarrega os dados
      } catch (error) {
        console.error("Erro ao excluir:", error);
        toast.error("Erro ao excluir o produto.");
      }
    }
  };

  const abrirModalBaixa = (produto) => {
    setProdutoSelecionado(produto);
    setQtdBaixa('');
    setIsBaixaModalOpen(true);
  };

  const handleBaixaEstoque = async (e) => {
    e.preventDefault();
    const quantidadeReduzir = parseInt(qtdBaixa, 10);

    if (quantidadeReduzir <= 0) {
      toast.error("A quantidade deve ser maior que zero.");
      return;
    }

    try {
      await api.post(`/products/${produtoSelecionado.id}/reduce?quantity=${quantidadeReduzir}`);
      toast.success(`Baixa de ${quantidadeReduzir} unidades registada!`);
      setIsBaixaModalOpen(false);
      buscarProdutos(); // Recarrega os dados
    } catch (error) {
      console.error("Erro ao reduzir estoque:", error);
      toast.error(error.response?.data?.message || "Estoque insuficiente.");
    }
  };

  // ================= LÓGICA DE FILTRAGEM ================= //
  const produtosFiltrados = produtos.filter(produto => {
    const termo = termoPesquisa.toLowerCase();
    
    // Pesquisa por Nome
    const nomeMatch = produto.name.toLowerCase().includes(termo);
    
    // Pesquisa por Categoria
    const categoriaMatch = produto.category && 
                           produto.category.name && 
                           produto.category.name.toLowerCase().includes(termo);

    if (tipoFiltro === 'categoria') {
      return categoriaMatch;
    } else {
      return nomeMatch; 
    }
  });

  return (
    <div className="p-4 md:p-8 relative w-full max-w-7xl mx-auto">
      <Toaster position="top-right" reverseOrder={false} />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Gestão de Produtos</h1>
          <p className="text-gray-500 text-sm mt-1">Gira o seu inventário e faça baixas de stock.</p>
        </div>
        <button 
          onClick={abrirModalNovo}
          className="w-full sm:w-auto justify-center bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition-colors shadow-md"
        >
          <FaPlus /> Novo Produto
        </button>
      </div>

      <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-200 mb-6 flex items-center gap-1 sm:gap-2">
        <FaSearch className="text-gray-400 mx-2 hidden sm:block" />
        
        <select 
          value={tipoFiltro} 
          onChange={(e) => setTipoFiltro(e.target.value)}
          className="bg-transparent border-none focus:ring-0 outline-none text-gray-600 font-medium text-xs sm:text-sm p-2 cursor-pointer border-r border-gray-100"
        >
          <option value="nome">Pesquisar por Nome</option>
          <option value="categoria">Pesquisar por Categoria</option>
        </select>
        
        <input 
          type="text" 
          placeholder={tipoFiltro === 'nome' ? "Digite o nome do produto..." : "Digite o nome da categoria..."}
          value={termoPesquisa}
          onChange={(e) => setTermoPesquisa(e.target.value)}
          className="w-full border-none focus:ring-0 outline-none text-gray-700 placeholder-gray-400 bg-transparent text-sm sm:text-base p-2"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 uppercase text-xs sm:text-sm">
                <th className="p-4 font-semibold">Nome</th>
                <th className="p-4 font-semibold hidden sm:table-cell">Categoria</th>
                <th className="p-4 font-semibold">Stock</th>
                <th className="p-4 font-semibold hidden md:table-cell">Preço</th>
                <th className="p-4 font-semibold text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="5" className="p-4 text-center text-gray-500">A carregar dados do banco...</td></tr>
              ) : produtosFiltrados.length === 0 ? (
                <tr><td colSpan="5" className="p-4 text-center text-gray-500">Nenhum produto encontrado nesta página.</td></tr>
              ) : (
                produtosFiltrados.map((produto) => (
                  <tr key={produto.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors text-sm sm:text-base">
                    <td className="p-4 font-medium text-gray-800">
                      {produto.name}
                      <span className="block sm:hidden text-xs text-indigo-500 mt-1">
                        {produto.category && produto.category.name ? produto.category.name : 'Sem Categoria'}
                      </span>
                    </td>
                    <td className="p-4 text-gray-600 hidden sm:table-cell">
                      <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center">
                        {produto.category && produto.category.name ? produto.category.name : 'Sem Categoria'}
                      </span>
                    </td>
                    <td className="p-4 text-gray-600 font-bold">
                      <span className={produto.quantity < 5 ? "text-red-500" : "text-gray-700"}>
                        {produto.quantity} un.
                      </span>
                    </td>
                    <td className="p-4 text-gray-600 hidden md:table-cell">
                      {new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(produto.price)}
                    </td>
                    <td className="p-4 flex justify-center gap-3 sm:gap-4">
                      <button onClick={() => abrirModalBaixa(produto)} className="text-orange-500 hover:text-orange-700 transition-colors flex items-center gap-1 font-medium" title="Baixa">
                        <FaArrowDown /> <span className="hidden lg:inline">Baixa</span>
                      </button>
                      <button onClick={() => abrirModalEdicao(produto)} className="text-blue-500 hover:text-blue-700 transition-colors" title="Editar">
                        <FaEdit size={18} />
                      </button>
                      <button onClick={() => handleExcluirProduto(produto.id)} className="text-red-500 hover:text-red-700 transition-colors" title="Excluir">
                        <FaTrash size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ================= BARRA DE PAGINAÇÃO ================= */}
        {!loading && totalPaginas > 0 && (
          <div className="bg-gray-50 p-4 border-t border-gray-200 flex items-center justify-between">
            <button 
              onClick={() => setPaginaAtual(paginaAtual - 1)} 
              disabled={paginaAtual === 0}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base ${paginaAtual === 0 ? 'text-gray-400 cursor-not-allowed' : 'text-indigo-600 hover:bg-indigo-100'}`}
            >
              <FaChevronLeft /> Anterior
            </button>
            
            <span className="text-xs sm:text-sm text-gray-600 font-medium">
              Página {paginaAtual + 1} de {totalPaginas}
            </span>

            <button 
              onClick={() => setPaginaAtual(paginaAtual + 1)} 
              disabled={paginaAtual === totalPaginas - 1 || totalPaginas === 0}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base ${paginaAtual === totalPaginas - 1 || totalPaginas === 0 ? 'text-gray-400 cursor-not-allowed' : 'text-indigo-600 hover:bg-indigo-100'}`}
            >
              Próxima <FaChevronRight />
            </button>
          </div>
        )}
      </div>

      {/* Modal de Criar/Editar Produto */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                {editandoId ? 'Editar Produto' : 'Cadastrar Produto'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-red-500">
                <FaTimes size={24} />
              </button>
            </div>
            <form onSubmit={handleSalvarProduto} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Produto</label>
                <input type="text" name="name" required value={novoProduto.name} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2 focus:border-indigo-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                <select name="categoryId" required value={novoProduto.categoryId} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2 focus:border-indigo-500 outline-none bg-white">
                  <option value="" disabled>Selecione uma categoria...</option>
                  {categorias.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantidade</label>
                  <input type="number" name="quantity" required min="0" value={novoProduto.quantity} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2 focus:border-indigo-500 outline-none" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preço</label>
                  <input type="number" name="price" required min="0" step="0.01" value={novoProduto.price} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2 focus:border-indigo-500 outline-none" />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-md">
                  {editandoId ? 'Atualizar' : 'Salvar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Redução de Stock */}
      {isBaixaModalOpen && produtoSelecionado && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 border-t-4 border-orange-500">
             <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaArrowDown className="text-orange-500" /> Reduzir Stock
              </h2>
              <button onClick={() => setIsBaixaModalOpen(false)} className="text-gray-500 hover:text-red-500">
                <FaTimes size={20} />
              </button>
            </div>
            <div className="mb-6 bg-gray-50 p-3 rounded-lg border border-gray-100">
              <p className="text-sm text-gray-600">Produto:</p>
              <p className="font-bold text-gray-800">{produtoSelecionado.name}</p>
              <p className="text-sm text-gray-600 mt-2">Stock Atual:</p>
              <p className="font-bold text-indigo-600">{produtoSelecionado.quantity} unidades</p>
            </div>
            <form onSubmit={handleBaixaEstoque} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantidade a retirar</label>
                <input type="number" required min="1" max={produtoSelecionado.quantity} value={qtdBaixa} onChange={(e) => setQtdBaixa(e.target.value)} className="w-full border border-gray-300 rounded-lg p-3 text-lg font-bold text-center focus:border-orange-500 outline-none" placeholder="Ex: 5" />
              </div>
              <div className="mt-4 flex flex-col sm:flex-row justify-end gap-3">
                <button type="button" onClick={() => setIsBaixaModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium w-full sm:w-auto">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 shadow-md font-bold w-full sm:w-auto">Confirmar Baixa</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Produtos;