import React, { useState } from 'react';

type AppealStatus = '未受理' | '已受理' | '已解决' | '已拒绝';

interface Appeal {
  id: string;
  type: string;
  studentName: string;
  studentId: string;
  description: string;
  status: AppealStatus;
  date: string;
}

const MOCK_APPEALS: Appeal[] = [
  {
    id: '1',
    type: '里程数据错误',
    studentName: '张三',
    studentId: '2023001',
    description: '我明明跑了3公里，系统只显示1.5公里，请核实。',
    status: '未受理',
    date: '2023-12-18'
  },
  {
    id: '2',
    type: 'GPS轨迹漂移',
    studentName: '李四',
    studentId: '2023002',
    description: '轨迹直接飞到湖里去了，导致成绩无效。',
    status: '未受理',
    date: '2023-12-17'
  },
  {
    id: '3',
    type: '打卡过点问题',
    studentName: '王五',
    studentId: '2023003',
    description: '到了打卡点手机没反应，无法打卡。',
    status: '已受理',
    date: '2023-12-16'
  },
  {
    id: '4',
    type: '被判无效数据',
    studentName: '赵六',
    studentId: '2023004',
    description: '配速正常，但是被判定为骑车。',
    status: '已解决',
    date: '2023-12-15'
  },
];

const AppealManagement: React.FC = () => {
  const [appeals, setAppeals] = useState<Appeal[]>(MOCK_APPEALS);
  const [selectedAppeal, setSelectedAppeal] = useState<Appeal | null>(null);

  const handleStatusChange = (id: string, newStatus: AppealStatus) => {
    setAppeals(appeals.map(appeal => 
      appeal.id === id ? { ...appeal, status: newStatus } : appeal
    ));
    if (selectedAppeal && selectedAppeal.id === id) {
      setSelectedAppeal({ ...selectedAppeal, status: newStatus });
    }
  };

  const getStatusColor = (status: AppealStatus) => {
    switch (status) {
      case '未受理': return 'bg-gray-100 text-gray-800';
      case '已受理': return 'bg-blue-100 text-blue-800';
      case '已解决': return 'bg-green-100 text-green-800';
      case '已拒绝': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (selectedAppeal) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <button 
          onClick={() => setSelectedAppeal(null)}
          className="mb-4 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          ← 返回列表
        </button>
        
        <div className="border-b pb-4 mb-6">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-gray-800">申诉详情</h2>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedAppeal.status)}`}>
              {selectedAppeal.status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">申诉类型</p>
            <p className="font-medium text-gray-900">{selectedAppeal.type}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">提交时间</p>
            <p className="font-medium text-gray-900">{selectedAppeal.date}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">学生姓名</p>
            <p className="font-medium text-gray-900">{selectedAppeal.studentName}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">学工号</p>
            <p className="font-medium text-gray-900">{selectedAppeal.studentId}</p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">问题描述</h3>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 min-h-[100px]">
            <p className="text-gray-700 whitespace-pre-wrap">{selectedAppeal.description}</p>
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">处理申诉</h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleStatusChange(selectedAppeal.id, '已受理')}
              disabled={selectedAppeal.status === '已受理'}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                selectedAppeal.status === '已受理' 
                  ? 'bg-blue-100 text-blue-400 cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              受理申诉
            </button>
            <button
              onClick={() => handleStatusChange(selectedAppeal.id, '已解决')}
              disabled={selectedAppeal.status === '已解决'}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                selectedAppeal.status === '已解决' 
                  ? 'bg-green-100 text-green-400 cursor-not-allowed' 
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              标记为已解决
            </button>
            <button
              onClick={() => handleStatusChange(selectedAppeal.id, '已拒绝')}
              disabled={selectedAppeal.status === '已拒绝'}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                selectedAppeal.status === '已拒绝' 
                  ? 'bg-red-100 text-red-400 cursor-not-allowed' 
                  : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              拒绝申诉
            </button>
            {selectedAppeal.status !== '未受理' && (
               <button
               onClick={() => handleStatusChange(selectedAppeal.id, '未受理')}
               className="px-4 py-2 rounded-md font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors ml-auto"
             >
               重置状态
             </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">申诉管理</h2>
        <div className="text-sm text-gray-500">
          共 {appeals.length} 条申诉，待处理 {appeals.filter(a => a.status === '未受理').length} 条
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 px-4 font-semibold text-gray-600">申诉类型</th>
              <th className="py-3 px-4 font-semibold text-gray-600">学生姓名</th>
              <th className="py-3 px-4 font-semibold text-gray-600">提交时间</th>
              <th className="py-3 px-4 font-semibold text-gray-600">状态</th>
              <th className="py-3 px-4 font-semibold text-gray-600 text-right">操作</th>
            </tr>
          </thead>
          <tbody>
            {appeals.map((appeal) => (
              <tr 
                key={appeal.id} 
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => setSelectedAppeal(appeal)}
              >
                <td className="py-3 px-4 text-gray-800">{appeal.type}</td>
                <td className="py-3 px-4 text-gray-800">{appeal.studentName}</td>
                <td className="py-3 px-4 text-gray-500 text-sm">{appeal.date}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appeal.status)}`}>
                    {appeal.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <button 
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedAppeal(appeal);
                    }}
                  >
                    查看详情
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {appeals.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            暂无申诉记录
          </div>
        )}
      </div>
    </div>
  );
};

export default AppealManagement;
