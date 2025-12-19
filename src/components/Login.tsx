import React, { useState } from 'react';
import bgImage from '../assets/sports.png';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      onLogin();
    } else {
      alert('没有注册管理员权限');
      setUsername('');
      setPassword('');
    }
  };

  return (
    <div 
      className="h-screen w-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-white/90 p-8 rounded-lg shadow-xl w-96 backdrop-blur-sm">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">乐健管理员登录</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">账号</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="请输入账号"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">密码</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="请输入密码"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200 font-medium"
          >
            登录
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
