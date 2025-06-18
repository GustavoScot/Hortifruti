import React, { useEffect, useState } from 'react';
import axios from 'axios';
import type { Produto } from '../Produto';

const ListaProdutos: React.FC = () => {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const response = await axios.get<Produto[]>(
                    'http://localhost:3000/produtos'
                );
                setProdutos(response.data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Erro desconhecido');
            } finally {
                setLoading(false);
            }
        };
        fetchProdutos();
    }, []);

    if (loading)
        return (
            <>
                <div
                    style={{
                        width: '100vw',
                        height: '100vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'linear-gradient(135deg, #f9fbe7 0%, #e8f5e9 100%)',
                        fontFamily: "'Quicksand', 'Segoe UI', Arial, sans-serif"
                    }}
                >
                    Carregando...
                </div>
            </>
        );
    if (error)
        return (
            <>
                <div
                    style={{
                        width: '100vw',
                        height: '100vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'linear-gradient(135deg, #f9fbe7 0%, #e8f5e9 100%)',
                        fontFamily: "'Quicksand', 'Segoe UI', Arial, sans-serif",
                        color: '#d32f2f',
                        fontWeight: 700
                    }}
                >
                    Erro: {error}
                </div>
            </>
        );

    return (
        <>
            <div
                style={{
                    minHeight: '100vh',
                    width: '100vw',
                    background: 'linear-gradient(135deg, #f9fbe7 0%, #e8f5e9 100%)',
                    fontFamily: "'Quicksand', 'Segoe UI', Arial, sans-serif",
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '2rem 0'
                }}
            >
                <div
                    style={{
                        background: '#fff',
                        borderRadius: '22px',
                        boxShadow: '0 6px 32px rgba(76, 175, 80, 0.13)',
                        border: '2px solid #c8e6c9',
                        padding: '2.5rem 2rem',
                        minWidth: '350px',
                        maxWidth: '95vw',
                        width: '500px'
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
                                margin: 0
                            }}
                        >
                            Produtos
                        </h1>
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {produtos.map((produto) => (
                            <li
                                key={produto.id}
                                style={{
                                    background: '#f1f8e9',
                                    borderRadius: '12px',
                                    marginBottom: '1.2rem',
                                    padding: '1.1rem 1.2rem',
                                    boxShadow: '0 2px 8px rgba(67, 160, 71, 0.08)',
                                    border: '1.5px solid #aed581',
                                    color: '#33691e'
                                }}
                            >
                                <h2
                                    style={{
                                        margin: 0,
                                        color: '#388e3c',
                                        fontWeight: 800,
                                        fontSize: '1.25rem'
                                    }}
                                >
                                    {produto.nome}
                                </h2>
                                <p style={{ margin: '0.5rem 0 0 0', fontWeight: 600 }}>
                                    Preço: <span style={{ color: '#689f38' }}>R$ {produto.preco.toFixed(2)}</span>
                                </p>
                                <p style={{ margin: '0.2rem 0 0 0', fontWeight: 500 }}>
                                    Categoria:{' '}
                                    <span style={{ color: '#8bc34a' }}>
                                        {produto.categoria?.nome ?? 'Sem categoria'}
                                    </span>
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default ListaProdutos;