import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { username, password });
      localStorage.setItem('token', res.data.token);
      alert('Login successful!');
      navigate('/home'); // go to home after login
    } catch (err) {
      console.error(err);
      alert('Invalid credentials or server error');
    }
  };

  return (
   <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
    <form
      onSubmit={handleSubmit}
      className="bg-white/30 backdrop-blur-lg p-10 rounded-3xl shadow-2xl w-96 flex flex-col items-center space-y-6 border border-white/20"
    >
      <h2 className="text-3xl font-extrabold text-cyan-100 drop-shadow-lg mb-2 shadow-xl">Welcome Back</h2>
      <input
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="Username"
        className="w-full px-5 py-3 rounded-xl bg-white/60 text-gray-800 placeholder-gray-500 font-medium focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full px-5 py-3 rounded-xl bg-white/60 text-gray-800 placeholder-gray-500 font-medium focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
      />
      <button
        className="w-full py-3 rounded-xl bg-gradient-to-r from-green-400 to-blue-400 text-white font-semibold shadow hover:from-green-500 hover:to-blue-500 transition-all duration-300"
      >
        Login
      </button>
      <p className="text-black text-sm">
        Want to create a new account?{' '}
        <span
          className="text-blue-600 underline cursor-pointer hover:text-blue-100"
          onClick={() => navigate('/register')}
        >
          Signup
        </span>
      </p>
    </form>
  </div>
  );
}
