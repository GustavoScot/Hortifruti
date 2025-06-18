import React, { useState } from 'react';
import axios from 'axios';

interface LoginProps {
  onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        nome,
        senha,
      }, { withCredentials: true });
      const { access_token: token } = response.data;
      localStorage.setItem('authToken', token);

      setSuccessMessage('Login realizado com sucesso!');
      setError('');
      setTimeout(() => {
        onLoginSuccess();
      }, 500);
    } catch (err) {
      setError('Credenciais inválidas. Tente novamente.');
      setSuccessMessage('');
    }
  };

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(135deg, #f9fbe7 0%, #e8f5e9 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Quicksand', 'Segoe UI', Arial, sans-serif",
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 1
    }}>
      <form
        onSubmit={handleLogin}
        style={{
          background: '#fff',
          padding: '2.5rem 2rem',
          borderRadius: '22px',
          boxShadow: '0 6px 32px rgba(76, 175, 80, 0.18)',
          minWidth: '350px',
          width: '100%',
          maxWidth: '420px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch', // <-- Corrigido para alinhar os campos
          border: '2px solid #c8e6c9'
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '1.5rem'
        }}>
          <span style={{
            fontSize: '2.2rem',
            marginRight: '0.7rem'
          }}>🥦</span>
          <h1 style={{
            color: '#388e3c',
            fontWeight: 900,
            letterSpacing: '1.5px',
            fontFamily: "'Quicksand', 'Segoe UI', Arial, sans-serif",
            margin: 0
          }}>
            Hortifruti
          </h1>
        </div>
        <div style={{ marginBottom: '1.1rem', width: '100%' }}>
          <label style={{
            color: '#689f38',
            fontWeight: 700,
            marginBottom: '0.3rem',
            display: 'block',
            fontSize: '1.05rem'
          }}>
            Nome:
          </label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            style={{
              width: '100%',
              boxSizing: 'border-box', // <-- Garante alinhamento
              padding: '0.7rem',
              borderRadius: '10px',
              border: '1.5px solid #aed581',
              fontSize: '1.05rem',
              outline: 'none',
              background: '#f1f8e9',
              color: '#33691e',
              fontFamily: "'Quicksand', 'Segoe UI', Arial, sans-serif"
            }}
            placeholder="Digite seu nome"
          />
        </div>
        <div style={{ marginBottom: '1.1rem', width: '100%' }}>
          <label style={{
            color: '#689f38',
            fontWeight: 700,
            marginBottom: '0.3rem',
            display: 'block',
            fontSize: '1.05rem'
          }}>
            Senha:
          </label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            style={{
              width: '100%',
              boxSizing: 'border-box', // <-- Garante alinhamento
              padding: '0.7rem',
              borderRadius: '10px',
              border: '1.5px solid #aed581',
              fontSize: '1.05rem',
              outline: 'none',
              background: '#f1f8e9',
              color: '#33691e',
              fontFamily: "'Quicksand', 'Segoe UI', Arial, sans-serif"
            }}
            placeholder="Digite sua senha"
          />
        </div>
        {error && <p style={{ color: '#d32f2f', marginBottom: '0.8rem', fontWeight: 700 }}>{error}</p>}
        {successMessage && <p style={{ color: '#388e3c', marginBottom: '0.8rem', fontWeight: 700 }}>{successMessage}</p>}
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
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;