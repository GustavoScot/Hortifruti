import React, { useEffect, useState } from 'react';
import axios from 'axios';
import type { Produto } from './Produto';

const ListaProdutos: React.FC = () => {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const response = await axios.get<Produto[]>
                    ('http://localhost:3000/produtos');
                setProdutos(response.data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Erro desconhecido');
            } finally {
                setLoading(false);
            }
        };
        fetchProdutos();
    }, []);
    if (loading) return <div>Carregando...</div>;
    if (error) return <div>Erro: {error}</div>;
    return (
        <div>
            <h1>Lista de Produtos</h1>
            <ul>
                {produtos.map((produto) => (
                    <li key={produto.id}>
                        <h2>{produto.nome}</h2>
                        <p>Preço: R$ {produto.preco.toFixed(2)}</p>
                        <p>Categoria: {produto.categoria?.nome ?? 'Sem categoria'}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default ListaProdutos;