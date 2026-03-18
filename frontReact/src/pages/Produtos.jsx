import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaArrowDown } from 'react-icons/fa';

const Produtos = () => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Controlo do Modal de Novo Produto
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [novoProduto, setNovoProduto] = useState({
    nome: '', categoria: '', quantidade: '', preco: ''
  });

  // Controlo do Modal de Redução de Stock (Dar Baixa)
  const [isBaixaModalOpen, setIsBaixaModalOpen] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [qtdBaixa, setQtdBaixa] = useState('');

  useEffect(() => {
    buscarProdutos();
  }, []);

  const buscarProdutos = async () => {
    try {
      const response = await api.get('/products'); 
      setProdutos(response.data);
    } catch (error) {
      console.error("Erro ao conectar com a API:", error);
    } finally {
      setLoading(false);
    }
  };

  // Lógica para Novo Produto
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovoProduto({ ...novoProduto, [name]: value });
  };

  const handleSalvarProduto = async (e) => {
    e.preventDefault();
    const idFalso = produtos.length + 1;
    setProdutos([...produtos, { id: idFalso, ...novoProduto }]);
    alert("Produto salvo com sucesso! (Simulação)");
    setIsModalOpen(false);
    setNovoProduto({ nome: '', categoria: '', quantidade: '', preco: '' });
  };

  // Lógica para Redução de Stock
  const abrirModalBaixa = (produto) => {
    setProdutoSelecionado(produto);
    setQtdBaixa('');
    setIsBaixaModalOpen(true);
  };

  const handleBaixaEstoque = async (e) => {
    e.preventDefault();
    const quantidadeReduzir = parseInt(qtdBaixa, 10);

    if (quantidadeReduzir <= 0) {
      alert("A quantidade deve ser maior que zero.");
      return;
    }

    if (quantidadeReduzir > produtoSelecionado.quantidade) {
      alert(`Erro: A quantidade em stock (${produtoSelecionado.quantidade}) é insuficiente para esta baixa.`);
      return;
    }

    // Simulação da lógica que o Spring Boot fará no backend
    const produtosAtualizados = produtos.map(p => {
      if (p.id === produtoSelecionado.id) {
        return { ...p, quantidade: p.quantidade - quantidadeReduzir };
      }
      return p;
    });

    setProdutos(produtosAtualizados);
    alert(`Baixa de ${quantidadeReduzir} unidades registada com sucesso! (Simulação)`);
    setIsBaixaModalOpen(false);
  };

  return (
    <div className="p-8 relative">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Gestão de Produtos</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition-colors shadow-md"
        >
          <FaPlus /> Novo Produto
        </button>
      </div>

      {/* Tabela de Produtos */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 uppercase text-sm">
              <th className="p-4 font-semibold">ID</th>
              <th className="p-4 font-semibold">Nome</th>
              <th className="p-4 font-semibold">Categoria</th>
              <th className="p-4 font-semibold">Stock</th>
              <th className="p-4 font-semibold">Preço</th>
              <th className="p-4 font-semibold text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" className="p-4 text-center text-gray-500">A carregar dados...</td></tr>
            ) : produtos.length === 0 ? (
              <tr><td colSpan="6" className="p-4 text-center text-gray-500">Nenhum produto encontrado.</td></tr>
            ) : (
              produtos.map((produto) => (
                <tr key={produto.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="p-4 text-gray-500">#{produto.id}</td>
                  <td className="p-4 font-medium text-gray-800">{produto.nome}</td>
                  <td className="p-4 text-gray-600">
                    <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-xs font-semibold">
                      {produto.categoria}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600 font-bold">{produto.quantidade} un.</td>
                  <td className="p-4 text-gray-600">
                    {new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(produto.preco)}
                  </td>
                  <td className="p-4 flex justify-center gap-4">
                    {/* Novo Botão de Baixa de Stock */}
                    <button 
                      onClick={() => abrirModalBaixa(produto)}
                      className="text-orange-500 hover:text-orange-700 transition-colors flex items-center gap-1" 
                      title="Reduzir Stock"
                    >
                      <FaArrowDown /> Baixa
                    </button>
                    
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

      {/* Modal de Novo Produto (Mantido igual) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
            {/* ... Conteúdo do formulário de novo produto ... */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Cadastrar Produto</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-red-500">
                <FaTimes size={24} />
              </button>
            </div>
            <form onSubmit={handleSalvarProduto} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                <input type="text" name="nome" required value={novoProduto.nome} onChange={handleInputChange} className="w-full border rounded-lg p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                <input type="text" name="categoria" required value={novoProduto.categoria} onChange={handleInputChange} className="w-full border rounded-lg p-2" />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Qtd</label>
                  <input type="number" name="quantidade" required value={novoProduto.quantidade} onChange={handleInputChange} className="w-full border rounded-lg p-2" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preço</label>
                  <input type="number" name="preco" required step="0.01" value={novoProduto.preco} onChange={handleInputChange} className="w-full border rounded-lg p-2" />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* NOVO: Modal de Redução de Stock */}
      {isBaixaModalOpen && produtoSelecionado && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 border-t-4 border-orange-500">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaArrowDown className="text-orange-500" />
                Reduzir Stock
              </h2>
              <button 
                onClick={() => setIsBaixaModalOpen(false)}
                className="text-gray-500 hover:text-red-500 transition-colors"
              >
                <FaTimes size={20} />
              </button>
            </div>

            <div className="mb-6 bg-gray-50 p-3 rounded-lg border border-gray-100">
              <p className="text-sm text-gray-600">Produto:</p>
              <p className="font-bold text-gray-800">{produtoSelecionado.nome}</p>
              <p className="text-sm text-gray-600 mt-2">Stock Atual:</p>
              <p className="font-bold text-indigo-600">{produtoSelecionado.quantidade} unidades</p>
            </div>

            <form onSubmit={handleBaixaEstoque} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantidade a retirar
                </label>
                <input 
                  type="number" 
                  required 
                  min="1" 
                  max={produtoSelecionado.quantidade}
                  value={qtdBaixa} 
                  onChange={(e) => setQtdBaixa(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 text-lg font-bold text-center focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
                  placeholder="Ex: 5"
                />
              </div>

              <div className="mt-4 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsBaixaModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors shadow-md font-bold"
                >
                  Confirmar Baixa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Produtos;