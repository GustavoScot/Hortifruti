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

const UpdateProduto: React.FC = () => {
  const [busca, setBusca] = useState('');
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [buscaRealizada, setBuscaRealizada] = useState(false);

  // Buscar todas as categorias ao carregar
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://localhost:3000/categorias', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategorias(response.data);
      } catch {
        // Trate erro se quiser
      }
    };
    fetchCategorias();
  }, []);

  // Buscar todos os produtos ao carregar
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

  // Buscar produtos pelo nome
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

  // Selecionar produto da lista
  const handleSelecionar = (produto: Produto) => {
    setProdutoSelecionado(produto);
    setSuccessMessage('');
    setErrorMessage('');
  };

  // Atualizar produto selecionado
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!produtoSelecionado) return;
    try {
      const token = localStorage.getItem('authToken');
      const produtoData = {
        ...produtoSelecionado,
        categoria_id: produtoSelecionado.categoria_id, // Envie apenas o id
      };
      await axios.patch(
        `http://localhost:3000/produtos/${produtoSelecionado.id}`,
        produtoData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccessMessage('Produto atualizado com sucesso!');
      setErrorMessage('');
    } catch (error) {
      console.log('Erro detalhado:', error);
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.message || 'Erro ao atualizar o produto.');
      } else {
        setErrorMessage('Erro inesperado. Tente novamente.');
      }
    }
  };

  return (
    <div>
      <h1>Atualizar Produto</h1>
      <div>
        <input
          type="text"
          placeholder="Digite o nome do produto"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <button onClick={handleBuscar}>Buscar</button>
      </div>
      {/* Lista de produtos */}
      {produtos.length === 0 && buscaRealizada && busca && !errorMessage && (
        <div style={{ color: 'red' }}>Produto não existe.</div>
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
      {/* Formulário de edição */}
      {produtoSelecionado && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nome:</label>
            <input
              type="text"
              value={produtoSelecionado.nome}
              onChange={(e) =>
                setProdutoSelecionado({ ...produtoSelecionado, nome: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label>Descrição:</label>
            <textarea
              value={produtoSelecionado.descricao}
              onChange={(e) =>
                setProdutoSelecionado({ ...produtoSelecionado, descricao: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label>Preço:</label>
            <input
              type="number"
              value={produtoSelecionado.preco}
              onChange={(e) =>
                setProdutoSelecionado({ ...produtoSelecionado, preco: Number(e.target.value) })
              }
              required
            />
          </div>
          <div>
            <label>Categoria:</label>
            <select
              value={produtoSelecionado.categoria_id}
              onChange={e =>
                setProdutoSelecionado({ ...produtoSelecionado, categoria_id: e.target.value })
              }
              required
            >
              <option value="">Selecione uma categoria</option>
              {categorias.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.nome}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Estoque:</label>
            <input
              type="number"
              value={produtoSelecionado.estoque}
              onChange={(e) =>
                setProdutoSelecionado({ ...produtoSelecionado, estoque: Number(e.target.value) })
              }
              required
            />
          </div>
          {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
          {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
          <button type="submit">Atualizar Produto</button>
        </form>
      )}
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
    </div>
  );
};

export default UpdateProduto;