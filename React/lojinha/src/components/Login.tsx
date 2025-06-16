import React, { useState } from 'react';
import axios from 'axios';

interface LoginProps {
  onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // Estado para a mensagem de sucesso

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        nome,
        senha,
      }, { withCredentials: true });
      const {access_token: token } = response.data;
      localStorage.setItem('authToken', token); // Armazena o token no localStorage

      // Exibe a mensagem de sucesso
      setSuccessMessage('Login realizado com sucesso!');
      setError('');
      // Aguarda 2 segundos antes de redirecionar
      setTimeout(() => {
        onLoginSuccess(); // Chama a função para atualizar o estado de autenticação
      }, 500);
    } catch (err) {
      setError('Credenciais inválidas. Tente novamente.');
      setSuccessMessage('');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
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
          <label>Senha:</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;