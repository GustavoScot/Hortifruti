import React, { useState } from 'react';
import ListaProdutos from './ListaProdutos';
import Login from './components/Login';
import CriarProduto from './components/CriarProduto';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [view, setView] = useState<'lista' | 'criar'>('lista'); // Estado para alternar entre lista e criação de produtos

  const handleLoginSuccess = () => {
    setIsAuthenticated(true); // Atualiza o estado para indicar que o usuário está autenticado
  };

  const handleViewChange = (newView: 'lista' | 'criar') => {
    setView(newView); // Alterna entre as visualizações
  };

  return (
    <div>
      {/* Renderiza a tela de login se o usuário não estiver autenticado */}
      {!isAuthenticated ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        <div>
          {/* Botões para alternar entre lista de produtos e criação de produtos */}
          <div>
            <button onClick={() => handleViewChange('lista')}>Lista de Produtos</button>
            <button onClick={() => handleViewChange('criar')}>Criar Produto</button>
          </div>

          {/* Renderiza a visualização correspondente */}
          {view === 'lista' ? <ListaProdutos /> : <CriarProduto />}
        </div>
      )}
    </div>
  );
};

export default App;