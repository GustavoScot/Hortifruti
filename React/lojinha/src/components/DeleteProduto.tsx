import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Produto {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  categoria_id: string;
  estoque: number;
}

interface Categoria {
  id: string;
  nome: string;
}

const DeleteProduto: React.FC = () => {
  const [busca, setBusca] = useState('');
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [buscaRealizada, setBuscaRealizada] = useState(false);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://localhost:3000/categorias', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategorias(response.data);
      } catch {
        // Tratar erro se necessário
      }
    };
    fetchCategorias();
  }, []);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://localhost:3000/produtos', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProdutos(response.data);
      } catch {
        setErrorMessage('Erro ao buscar produtos.');
      }
    };
    fetchProdutos();
  }, []);

  const handleBuscar = async () => {
    setBuscaRealizada(true);
    if (!busca.trim()) {
      const token = localStorage.getItem('authToken');
      const response = await axios.get('http://localhost:3000/produtos', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProdutos(response.data);
      setErrorMessage('');
      return;
    }
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get(`http://localhost:3000/produtos?nome=${busca}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProdutos(response.data);
      setErrorMessage('');
    } catch {
      setErrorMessage('Erro ao buscar produtos.');
    }
  };

  const handleSelecionar = (produto: Produto) => {
    setProdutoSelecionado(produto);
    setSuccessMessage('');
    setErrorMessage('');
  };

  // Deletar produto selecionado
  const handleDelete = async () => {
    if (!produtoSelecionado) return;
    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(`http://localhost:3000/produtos/${produtoSelecionado.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccessMessage('Produto deletado com sucesso!');
      setErrorMessage('');
      setProdutoSelecionado(null);
      setProdutos(produtos.filter(p => p.id !== produtoSelecionado.id));
    } catch (error) {
      console.log('Erro detalhado:', error);
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.message || 'Erro ao deletar o produto.');
      } else {
        setErrorMessage('Erro inesperado. Tente novamente.');
      }
    }
  };

  return (
    <div>
      <h1>Deletar Produto</h1>
      <div>
        <input
          type="text"
          placeholder="Digite o nome do produto"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <button onClick={handleBuscar}>Buscar</button>
      </div>

      {produtos.length === 0 && buscaRealizada && busca && !errorMessage && (
        <div style={{ color: 'red' }}>Produto já não existe mais.</div>
      )}
      {produtos.length > 0 && (
        <ul>
          {produtos.map((produto) => (
            <li key={produto.id}>
              <button onClick={() => handleSelecionar(produto)}>
                {produto.nome}
              </button>
            </li>
          ))}
        </ul>
      )}

      {produtoSelecionado && (
        <div>
          <h3>Deseja deletar o produto abaixo?</h3>
          <p><strong>Nome:</strong> {produtoSelecionado.nome}</p>
          <p><strong>Descrição:</strong> {produtoSelecionado.descricao}</p>
          <p><strong>Preço:</strong> R$ {produtoSelecionado.preco}</p>
          <button onClick={handleDelete} style={{ backgroundColor: 'red', color: 'white' }}>
            Deletar Produto
          </button>
        </div>
      )}

      {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
    </div>
  );
};

export default DeleteProduto;
