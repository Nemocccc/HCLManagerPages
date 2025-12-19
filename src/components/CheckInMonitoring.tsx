import React, { useState } from 'react';

// Mock Data
const TOTAL_WEEKS = 16;
const ACTIVE_WEEKS = [2, 4, 6, 9, 11, 14]; // Randomly selected active weeks

const STUDENTS = [
  { id: '2023001', name: '张三' },
  { id: '2023002', name: '李四' },
  { id: '2023003', name: '王五' },
  { id: '2023004', name: '赵六' },
  { id: '2023005', name: '钱七' },
  { id: '2023006', name: '孙八' },
  { id: '2023007', name: '周九' },
  { id: '2023008', name: '吴十' },
  { id: '2023009', name: '郑十一' },
  { id: '2023010', name: '王十二' },
  { id: '2023011', name: '冯十三' },
  { id: '2023012', name: '陈十四' },
  { id: '2023013', name: '褚十五' },
  { id: '2023014', name: '卫十六' },
  { id: '2023015', name: '蒋十七' },
  { id: '2023016', name: '沈十八' },
  { id: '2023017', name: '韩十九' },
  { id: '2023018', name: '杨二十' },
];

const CheckInMonitoring: React.FC = () => {
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);

  // Deterministic pseudo-random check-in status based on week and student
  const getCheckInStatus = (week: number, studentId: string) => {
    const hash = (week * 1000 + parseInt(studentId)) % 10;
    return hash > 2; // 70% chance of being present
  };

  if (selectedWeek !== null) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <button 
          onClick={() => setSelectedWeek(null)}
          className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          ← 返回周次列表
        </button>
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">第 {selectedWeek} 周签到详情</h2>
          <div className="text-sm text-gray-500">
            应到: {STUDENTS.length} 人
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {STUDENTS.map((student) => {
            const isPresent = getCheckInStatus(selectedWeek, student.id);
            return (
              <div 
                key={student.id} 
                className={`p-4 rounded-lg border flex justify-between items-center ${
                  isPresent ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                }`}
              >
                <div>
                  <p className="font-medium text-gray-900">{student.name}</p>
                  <p className="text-xs text-gray-500">{student.id}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-bold ${
                  isPresent ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'
                }`}>
                  {isPresent ? '已签到' : '未签到'}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">签到监控 - 课程周次</h2>
      <p className="text-gray-600 mb-6">请选择开启了签到的周次查看详情（灰色为未开启签到）。</p>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {Array.from({ length: TOTAL_WEEKS }, (_, i) => i + 1).map((week) => {
          const isActive = ACTIVE_WEEKS.includes(week);
          return (
            <button
              key={week}
              onClick={() => isActive && setSelectedWeek(week)}
              disabled={!isActive}
              className={`
                h-32 rounded-xl flex flex-col items-center justify-center transition-all duration-200 border-2
                ${isActive 
                  ? 'bg-blue-50 border-blue-200 hover:bg-blue-100 hover:border-blue-300 hover:shadow-md cursor-pointer text-blue-700' 
                  : 'bg-gray-50 border-gray-100 text-gray-400 cursor-not-allowed'
                }
              `}
            >
              <span className="text-3xl font-bold mb-2">{week}</span>
              <span className="text-sm font-medium">
                {isActive ? '已开启签到' : '未开启'}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CheckInMonitoring;
