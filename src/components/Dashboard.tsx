import React, { useState } from 'react';
import AppealManagement from './AppealManagement';
import CheckInMonitoring from './CheckInMonitoring';
import StudentData from './StudentData';

const Dashboard: React.FC = () => {
  const [currentView, setCurrentView] = useState('profile');

  const adminInfo = {
    name: 'admin',
    id: '2023114514',
    role: '超级管理员',
    department: '体育学院'
  };

  const renderContent = () => {
    switch (currentView) {
      case 'profile':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">个人信息</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-4 rounded-md">
                <p className="text-sm text-gray-500">姓名</p>
                <p className="text-lg font-semibold text-gray-800">{adminInfo.name}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-md">
                <p className="text-sm text-gray-500">学工号</p>
                <p className="text-lg font-semibold text-gray-800">{adminInfo.id}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-md">
                <p className="text-sm text-gray-500">角色</p>
                <p className="text-lg font-semibold text-gray-800">{adminInfo.role}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-md">
                <p className="text-sm text-gray-500">部门</p>
                <p className="text-lg font-semibold text-gray-800">{adminInfo.department}</p>
              </div>
            </div>
          </div>
        );
      case 'appeals':
        return <AppealManagement />;
      case 'checkin':
        return <CheckInMonitoring />;
      case 'students':
        return <StudentData />;
      default:
        return null;
    }
  };

  const navItems = [
    { id: 'profile', label: '个人信息', icon: '👤' },
    { id: 'appeals', label: '申诉管理', icon: '📝' },
    { id: 'checkin', label: '签到监控', icon: '📍' },
    { id: 'students', label: '学生数据', icon: '📊' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-blue-600">乐健管理系统</h1>
        </div>
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-3 ${
                currentView === item.id
                  ? 'bg-blue-50 text-blue-600 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <header className="mb-8 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">
            {navItems.find(item => item.id === currentView)?.label}
          </h2>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">欢迎, {adminInfo.name}</span>
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
              {adminInfo.name[0].toUpperCase()}
            </div>
          </div>
        </header>
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
