import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Categoria {
  id: string;
  nome: string;
}

const CriarProduto: React.FC = () => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState<number>();
  const [categoriaId, setCategoriaId] = useState('');
  const [novaCategoria, setNovaCategoria] = useState('');
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [estoque, setEstoque] = useState<number>();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setErrorMessage('Usuário não autenticado. Faça login novamente.');
        return;
      }

      const produtoData: any = {
        nome,
        descricao,
        preco: Number(preco),
        estoque: Number(estoque),
      };

      if (novaCategoria.trim()) {
        produtoData.nova_categoria = novaCategoria.trim();
      } else if (categoriaId) {
        produtoData.categoria_id = categoriaId;
      } else {
        setErrorMessage('Selecione ou crie uma categoria.');
        return;
      }

      await axios.post(
        'http://localhost:3000/produtos',
        produtoData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccessMessage('Produto criado com sucesso!');
      setErrorMessage('');
      setNome('');
      setDescricao('');
      setPreco(0);
      setCategoriaId('');
      setNovaCategoria('');
      setEstoque(0);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.message || 'Erro ao criar o produto. Tente novamente.');
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
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Quicksand', 'Segoe UI', Arial, sans-serif",
        paddingTop: '2.0rem' // Use paddingTop para o espaço igual ao da lista
      }}
    >
    
            <form
  onSubmit={handleSubmit}
  style={{
    background: '#fff',
    padding: '2.5rem 2rem',
    borderRadius: '22px',
    boxShadow: '0 6px 32px rgba(76, 175, 80, 0.13)',
    minWidth: '350px',
    maxWidth: '95vw',
    width: '420px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    border: '2px solid #c8e6c9'
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
        fontSize: '2.3rem'
      }}
    >
      Criar Produto
    </h1>
  </div>
  <div style={{ marginBottom: '1rem', width: '100%' }}>
          <label style={{ color: '#689f38', fontWeight: 700, marginBottom: '0.3rem', display: 'block' }}>
            Nome:
          </label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            style={{
              width: '100%',
              boxSizing: 'border-box',
              padding: '0.7rem',
              borderRadius: '10px',
              border: '1.5px solid #aed581',
              fontSize: '1.05rem',
              outline: 'none',
              background: '#f1f8e9',
              color: '#33691e',
              fontFamily: "'Quicksand', 'Segoe UI', Arial, sans-serif"
            }}
            placeholder="Nome do produto"
          />
        </div>
        <div style={{ marginBottom: '1rem', width: '100%' }}>
          <label style={{ color: '#689f38', fontWeight: 700, marginBottom: '0.3rem', display: 'block' }}>
            Descrição:
          </label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
            style={{
              width: '100%',
              boxSizing: 'border-box',
              padding: '0.7rem',
              borderRadius: '10px',
              border: '1.5px solid #aed581',
              fontSize: '1.05rem',
              outline: 'none',
              background: '#f1f8e9',
              color: '#33691e',
              fontFamily: "'Quicksand', 'Segoe UI', Arial, sans-serif",
              resize: 'vertical',
              minHeight: '60px'
            }}
            placeholder="Descrição do produto"
          />
        </div>
        <div style={{ marginBottom: '1rem', width: '100%' }}>
          <label style={{ color: '#689f38', fontWeight: 700, marginBottom: '0.3rem', display: 'block' }}>
            Preço:
          </label>
          <input
            type="number"
            value={preco}
            onChange={(e) => setPreco(Number(e.target.value))}
            required
            style={{
              width: '100%',
              boxSizing: 'border-box',
              padding: '0.7rem',
              borderRadius: '10px',
              border: '1.5px solid #aed581',
              fontSize: '1.05rem',
              outline: 'none',
              background: '#f1f8e9',
              color: '#33691e',
              fontFamily: "'Quicksand', 'Segoe UI', Arial, sans-serif"
            }}
            placeholder="Preço"
            min="0"
            step="0.01"
          />
        </div>
        <div style={{ marginBottom: '1rem', width: '100%' }}>
          <label style={{ color: '#689f38', fontWeight: 700, marginBottom: '0.3rem', display: 'block' }}>
            Categoria existente:
          </label>
          <select
            value={categoriaId}
            onChange={e => setCategoriaId(e.target.value)}
            disabled={!!novaCategoria.trim()}
            style={{
              width: '100%',
              boxSizing: 'border-box',
              padding: '0.7rem',
              borderRadius: '10px',
              border: '1.5px solid #aed581',
              fontSize: '1.05rem',
              outline: 'none',
              background: '#f1f8e9',
              color: '#33691e',
              fontFamily: "'Quicksand', 'Segoe UI', Arial, sans-serif"
            }}
          >
            <option value="">Selecione uma categoria</option>
            {categorias.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.nome}</option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: '1rem', width: '100%' }}>
          <label style={{ color: '#689f38', fontWeight: 700, marginBottom: '0.3rem', display: 'block' }}>
            Ou nova categoria:
          </label>
          <input
            type="text"
            value={novaCategoria}
            onChange={e => setNovaCategoria(e.target.value)}
            placeholder="Digite o nome da nova categoria"
            disabled={!!categoriaId}
            style={{
              width: '100%',
              boxSizing: 'border-box',
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
        </div>
        <div style={{ marginBottom: '1.2rem', width: '100%' }}>
          <label style={{ color: '#689f38', fontWeight: 700, marginBottom: '0.3rem', display: 'block' }}>
            Estoque:
          </label>
          <input
            type="number"
            value={estoque}
            onChange={(e) => setEstoque(Number(e.target.value))}
            required
            style={{
              width: '100%',
              boxSizing: 'border-box',
              padding: '0.7rem',
              borderRadius: '10px',
              border: '1.5px solid #aed581',
              fontSize: '1.05rem',
              outline: 'none',
              background: '#f1f8e9',
              color: '#33691e',
              fontFamily: "'Quicksand', 'Segoe UI', Arial, sans-serif"
            }}
            placeholder="Quantidade em estoque"
            min="0"
          />
        </div>
        {successMessage && <p style={{ color: '#388e3c', fontWeight: 700, marginBottom: '0.8rem' }}>{successMessage}</p>}
        {errorMessage && <p style={{ color: '#d32f2f', fontWeight: 700, marginBottom: '0.8rem' }}>{errorMessage}</p>}
        <button
          type="submit"
          style={{
            background: 'linear-gradient(90deg, #43a047 0%, #cddc39 100%)',
            color: '#fff',
            fontWeight: 800,
            fontSize: '1.15rem',
            border: 'none',
            borderRadius: '10px',
            padding: '0.8rem 2.5rem',
            cursor: 'pointer',
            transition: 'background 0.2s',
            boxShadow: '0 2px 10px rgba(67, 160, 71, 0.13)',
            letterSpacing: '1px'
          }}
        >
          Criar Produto
        </button>
      </form>
    </div>
  );
}
export default CriarProduto;