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

  // Buscar categorias existentes ao carregar
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

      // Monta o objeto de acordo com a escolha do usuário
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
            onChange={(e) => setPreco(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label>Categoria existente:</label>
          <select
            value={categoriaId}
            onChange={e => setCategoriaId(e.target.value)}
            disabled={!!novaCategoria.trim()}
          >
            <option value="">Selecione uma categoria</option>
            {categorias.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.nome}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Ou nova categoria:</label>
          <input
            type="text"
            value={novaCategoria}
            onChange={e => setNovaCategoria(e.target.value)}
            placeholder="Digite o nome da nova categoria"
            disabled={!!categoriaId}
          />
        </div>
        <div>
          <label>Estoque:</label>
          <input
            type="number"
            value={estoque}
            onChange={(e) => setEstoque(Number(e.target.value))}
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