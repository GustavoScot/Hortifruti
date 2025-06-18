import React from 'react';

interface NavBarProps {
  onViewChange: (view: 'lista' | 'criar' | 'alterar' | 'deletar') => void;
  activeView: 'lista' | 'criar' | 'alterar' | 'deletar';
}

const NavBar: React.FC<NavBarProps> = ({ onViewChange, activeView }) => (
  <nav
    style={{
      width: '100vw',
      background: 'linear-gradient(90deg, #cddc39 0%, #43a047 100%)',
      padding: '0.7rem 0',
      display: 'flex',
      gap: '1.2rem',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: "'Quicksand', 'Segoe UI', Arial, sans-serif",
      position: 'sticky',
      top: 0,
      zIndex: 10
    }}
  >
    {[
      { label: 'Lista de Produtos', view: 'lista' },
      { label: 'Criar Produto', view: 'criar' },
      { label: 'Alterar Produto', view: 'alterar' },
      { label: 'Deletar Produto', view: 'deletar' }
    ].map(({ label, view }) => (
      <button
        key={view}
        onClick={() => onViewChange(view as any)}
        style={{
          color: activeView === view ? '#388e3c' : '#388e3c',
          background: activeView === view ? '#fff' : 'rgba(255,255,255,0.85)',
          padding: '0.5rem 1.2rem',
          borderRadius: '10px',
          fontWeight: 700,
          textDecoration: 'none',
          fontSize: '1.05rem',
          border: 'none',
          cursor: 'pointer',
          transition: 'background 0.2s, color 0.2s',
          boxShadow: '0 1px 4px rgba(67, 160, 71, 0.08)',
          outline: activeView === view ? '2px solid #cddc39' : 'none'
        }}
      >
        {label}
      </button>
    ))}
  </nav>
);

export default NavBar;