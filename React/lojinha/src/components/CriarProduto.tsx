import React, { useState } from 'react';
import axios from 'axios';

const CriarProduto: React.FC = () => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState<number>(); // Inicializa como número
  const [categoriaId, setCategoriaId] = useState(''); // Adiciona categoria_id
  const [estoque, setEstoque] = useState<number>(); // Adiciona estoque
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken'); // Recupera o token armazenado
      if (!token) {
        setErrorMessage('Usuário não autenticado. Faça login novamente.');
        return;
      }

      // Validação dos dados antes de enviar
      const produtoData = {
        nome,
        descricao,
        preco: Number(preco), // Converte para número
        categoria_id: String(categoriaId), // Converte para string
        estoque: Number(estoque), // Converte para número
      };

      await axios.post(
        'http://localhost:3000/produtos',
        produtoData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Envia o token no cabeçalho
          },
        }
      );

      setSuccessMessage('Produto criado com sucesso!');
      setErrorMessage('');
      setNome('');
      setDescricao('');
      setPreco(0);
      setCategoriaId('');
      setEstoque(0);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Erro na requisição:', error.response?.data || error.message);
        setErrorMessage(error.response?.data?.message || 'Erro ao criar o produto. Tente novamente.');
      } else {
        console.error('Erro inesperado:', error);
        setErrorMessage('Erro inesperado. Tente novamente.');
      }
    }
  };

  return (
    <div>
      <h1>Criar Produto</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descrição:</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Preço:</label>
          <input
            type="number"
            value={preco}
            onChange={(e) => setPreco(Number(e.target.value))} // Converte para número
            required
          />
        </div>
        <div>
          <label>Categoria ID:</label>
          <input
            type="text"
            value={categoriaId}
            onChange={(e) => setCategoriaId(e.target.value)} // Converte para string
            required
          />
        </div>
        <div>
          <label>Estoque:</label>
          <input
            type="number"
            value={estoque}
            onChange={(e) => setEstoque(Number(e.target.value))} // Converte para número
            required
          />
        </div>
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button type="submit">Criar Produto</button>
      </form>
    </div>
  );
};

export default CriarProduto;