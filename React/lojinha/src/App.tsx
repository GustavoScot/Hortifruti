import React, { useState } from 'react';
import ListaProdutos from './ListaProdutos';
import Login from './components/Login';
import CriarProduto from './components/CriarProduto';
import UpdateProduto from './components/UpdateProduto';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [view, setView] = useState<'lista' | 'criar' | 'alterar'>('lista'); // Adiciona 'alterar'

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleViewChange = (newView: 'lista' | 'criar' | 'alterar') => {
    setView(newView);
  };

  return (
    <div>
      {/* Renderiza a tela de login se o usuário não estiver autenticado */}
      {!isAuthenticated ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        <div>
          {/* Botões para alternar entre as visualizações */}
          <div>
            <button onClick={() => handleViewChange('lista')}>Lista de Produtos</button>
            <button onClick={() => handleViewChange('criar')}>Criar Produto</button>
            <button onClick={() => handleViewChange('alterar')}>Alterar Produto</button>
          </div>

          {/* Renderiza a visualização correspondente */}
          {view === 'lista' && <ListaProdutos />}
          {view === 'criar' && <CriarProduto />}
          {view === 'alterar' && <UpdateProduto />}
        </div>
      )}
    </div>
  );
};

export default App;