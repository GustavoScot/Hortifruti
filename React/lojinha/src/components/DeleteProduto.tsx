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

const DeleteProduto: React.FC = () => {
  const [busca, setBusca] = useState('');
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [buscaRealizada, setBuscaRealizada] = useState(false);

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
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.message || 'Erro ao deletar o produto.');
      } else {
        setErrorMessage('Erro inesperado. Tente novamente.');
      }
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        background: 'linear-gradient(135deg, #f9fbe7 0%, #e8f5e9 100%)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        fontFamily: "'Quicksand', 'Segoe UI', Arial, sans-serif",
        paddingTop: '3.5rem'
      }}
    >
      <div style={{
        display: 'flex',
        gap: '2.5rem',
        width: '100%',
        maxWidth: '950px',
        justifyContent: 'center'
      }}>
        {/* Bloco da lista de produtos */}
        <div
          style={{
            background: '#fff',
            padding: '2.5rem 2rem',
            borderRadius: '22px',
            boxShadow: '0 6px 32px rgba(76, 175, 80, 0.13)',
            minWidth: '320px',
            maxWidth: '350px',
            width: '100%',
            border: '2px solid #c8e6c9',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '2.2rem', marginRight: '0.7rem' }}>🥦</span>
            <h1
              style={{
                color: '#388e3c',
                fontWeight: 900,
                letterSpacing: '1.5px',
                fontFamily: "'Quicksand', 'Segoe UI', Arial, sans-serif",
                margin: 0,
                fontSize: '2rem'
              }}
            >
              Deletar Produto
            </h1>
          </div>
          <div style={{ marginBottom: '1.2rem', width: '100%', display: 'flex', gap: '0.5rem' }}>
            <input
              type="text"
              placeholder="Digite o nome do produto"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              style={{
                flex: 1,
                padding: '0.7rem',
                borderRadius: '10px',
                border: '1.5px solid #aed581',
                fontSize: '1.05rem',
                outline: 'none',
                background: '#f1f8e9',
                color: '#33691e',
                fontFamily: "'Quicksand', 'Segoe UI', Arial, sans-serif"
              }}
            />
            <button
              onClick={handleBuscar}
              type="button"
              style={{
                background: 'linear-gradient(90deg, #43a047 0%, #cddc39 100%)',
                color: '#fff',
                fontWeight: 800,
                fontSize: '1.05rem',
                border: 'none',
                borderRadius: '10px',
                padding: '0.7rem 1.5rem',
                cursor: 'pointer',
                transition: 'background 0.2s',
                boxShadow: '0 2px 10px rgba(67, 160, 71, 0.13)',
                letterSpacing: '1px'
              }}
            >
              Buscar
            </button>
          </div>
          {produtos.length === 0 && buscaRealizada && busca && !errorMessage && (
            <div style={{ color: '#d32f2f', fontWeight: 700, marginBottom: '1rem' }}>Produto não existe .</div>
          )}
          {produtos.length > 0 && (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, width: '100%' }}>
              {produtos.map((produto) => (
                <li key={produto.id} style={{ marginBottom: '0.7rem' }}>
                  <button
                    onClick={() => handleSelecionar(produto)}
                    style={{
                      width: '100%',
                      background: '#f1f8e9',
                      color: '#388e3c',
                      fontWeight: 700,
                      border: '1.5px solid #aed581',
                      borderRadius: '10px',
                      padding: '0.7rem',
                      fontSize: '1.05rem',
                      cursor: 'pointer',
                      transition: 'background 0.2s',
                      boxShadow: '0 1px 4px rgba(67, 160, 71, 0.08)'
                    }}
                  >
                    {produto.nome}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* Bloco de confirmação de deleção */}
        {produtoSelecionado && (
          <div
            style={{
              background: '#fff',
              padding: '2.5rem 2rem',
              borderRadius: '22px',
              boxShadow: '0 6px 32px rgba(76, 175, 80, 0.13)',
              minWidth: '350px',
              maxWidth: '420px',
              width: '100%',
              border: '2px solid #c8e6c9',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '2.2rem', marginRight: '0.7rem' }}>🥦</span>
              <h1
                style={{
                  color: '#d32f2f',
                  fontWeight: 900,
                  letterSpacing: '1.5px',
                  fontFamily: "'Quicksand', 'Segoe UI', Arial, sans-serif",
                  margin: 0,
                  fontSize: '2rem'
                }}
              >
                Confirmar Deleção
              </h1>
            </div>
            <p style={{ color: '#388e3c', fontWeight: 700, marginBottom: '0.7rem' }}>
              Tem certeza que deseja deletar o produto abaixo?
            </p>
            <div style={{ marginBottom: '1.2rem', width: '100%' }}>
              <p><strong>Nome:</strong> {produtoSelecionado.nome}</p>
              <p><strong>Descrição:</strong> {produtoSelecionado.descricao}</p>
              <p><strong>Preço:</strong> R$ {produtoSelecionado.preco}</p>
            </div>
            <button
              onClick={handleDelete}
              style={{
                background: 'linear-gradient(90deg, #d32f2f 0%, #ffb300 100%)',
                color: '#fff',
                fontWeight: 800,
                fontSize: '1.15rem',
                border: 'none',
                borderRadius: '10px',
                padding: '0.8rem 2.5rem',
                cursor: 'pointer',
                transition: 'background 0.2s',
                boxShadow: '0 2px 10px rgba(211, 47, 47, 0.13)',
                letterSpacing: '1px'
              }}
            >
              Deletar Produto
            </button>
          </div>
        )}
      </div>
      {/* Mensagens */}
      <div style={{
        position: 'fixed',
        bottom: '2rem',
        left: 0,
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        pointerEvents: 'none'
      }}>
        {successMessage && <div style={{
          background: '#388e3c',
          color: '#fff',
          padding: '1rem 2rem',
          borderRadius: '12px',
          fontWeight: 700,
          margin: '0 1rem',
          pointerEvents: 'all'
        }}>{successMessage}</div>}
        {errorMessage && <div style={{
          background: '#d32f2f',
          color: '#fff',
          padding: '1rem 2rem',
          borderRadius: '12px',
          fontWeight: 700,
          margin: '0 1rem',
          pointerEvents: 'all'
        }}>{errorMessage}</div>}
      </div>
    </div>
  );
};

export default DeleteProduto;
// This code defines a React component for deleting products from a store.