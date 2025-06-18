import React, { useState } from 'react';
import ListaProdutos from './components/ListaProdutos';
import Login from './components/Login';
import CriarProduto from './components/CriarProduto';
import UpdateProduto from './components/UpdateProduto';
import DeleteProduto from './components/DeleteProduto';
import NavBar from './components/NavBar';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [view, setView] = useState<'lista' | 'criar' | 'alterar' | 'deletar'>('lista');

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleViewChange = (newView: 'lista' | 'criar' | 'alterar' | 'deletar') => {
    setView(newView);
  };

  return (
    <div>
      {!isAuthenticated ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        <div>
          <NavBar onViewChange={handleViewChange} activeView={view} />
          {view === 'lista' && <ListaProdutos />}
          {view === 'criar' && <CriarProduto />}
          {view === 'alterar' && <UpdateProduto />}
          {view === 'deletar' && <DeleteProduto />}
        </div>
      )}
    </div>
  );
};

export default App;