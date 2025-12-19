import React from 'react';

// Mock Data Generation
const generateStudentData = () => {
  const students = [];
  for (let i = 1; i <= 20; i++) {
    const attendanceRate = Math.floor(Math.random() * 40) + 60; // 60-100%
    const totalDistance = (Math.random() * 150 + 50).toFixed(1); // 50-200km
    students.push({
      id: `2023${String(i).padStart(3, '0')}`,
      name: [
        '张三', '李四', '王五', '赵六', '钱七', '孙八', '周九', '吴十', 
        '郑十一', '王十二', '冯十三', '陈十四', '褚十五', '卫十六', '蒋十七', '沈十八', '韩十九', '杨二十', '朱二一', '秦二二'
      ][i-1],
      attendanceRate,
      totalDistance: parseFloat(totalDistance),
      avgPace: `${Math.floor(Math.random() * 3) + 5}'${Math.floor(Math.random() * 60).toString().padStart(2, '0')}"`, // 5'00" - 8'00"
    });
  }
  return students.sort((a, b) => b.totalDistance - a.totalDistance); // Sort by distance
};

const STUDENTS_DATA = generateStudentData();

const WEEKLY_ATTENDANCE = [
  95, 88, 92, 85, 90, 75, 82, 88, 95, 90, 85, 80, 88, 92, 96, 90
];

const StudentData: React.FC = () => {
  // Calculate Summary Stats
  const avgAttendance = (STUDENTS_DATA.reduce((acc, curr) => acc + curr.attendanceRate, 0) / STUDENTS_DATA.length).toFixed(1);
  const totalClassDistance = STUDENTS_DATA.reduce((acc, curr) => acc + curr.totalDistance, 0).toFixed(1);
  const atRiskCount = STUDENTS_DATA.filter(s => s.attendanceRate < 70).length;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
          <p className="text-sm text-gray-500">平均出勤率</p>
          <p className="text-2xl font-bold text-gray-800">{avgAttendance}%</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
          <p className="text-sm text-gray-500">班级总跑量</p>
          <p className="text-2xl font-bold text-gray-800">{totalClassDistance} <span className="text-sm font-normal">km</span></p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-purple-500">
          <p className="text-sm text-gray-500">人均跑量</p>
          <p className="text-2xl font-bold text-gray-800">{(parseFloat(totalClassDistance) / STUDENTS_DATA.length).toFixed(1)} <span className="text-sm font-normal">km</span></p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-red-500">
          <p className="text-sm text-gray-500">预警人数 (出勤&lt;70%)</p>
          <p className="text-2xl font-bold text-red-600">{atRiskCount} <span className="text-sm font-normal text-gray-500">人</span></p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Trend Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm lg:col-span-2">
          <h3 className="text-lg font-bold text-gray-800 mb-6">16周出勤率趋势</h3>
          <div className="h-48 flex items-end justify-between gap-2">
            {WEEKLY_ATTENDANCE.map((rate, index) => (
              <div key={index} className="flex flex-col items-center flex-1 group">
                <div className="relative w-full flex justify-center">
                   <div 
                    className={`w-full max-w-[30px] rounded-t-md transition-all duration-300 hover:opacity-80 ${
                      rate >= 90 ? 'bg-green-400' : rate >= 80 ? 'bg-blue-400' : 'bg-yellow-400'
                    }`}
                    style={{ height: `${rate * 1.5}px` }} // Scale factor for visual
                  ></div>
                  {/* Tooltip */}
                  <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs py-1 px-2 rounded z-10">
                    {rate}%
                  </div>
                </div>
                <span className="text-xs text-gray-500 mt-2">{index + 1}</span>
              </div>
            ))}
          </div>
          <div className="text-center text-xs text-gray-400 mt-2">周次</div>
        </div>

        {/* Top Runners / Stats */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-4">运动龙虎榜 (Top 5)</h3>
          <div className="space-y-4">
            {STUDENTS_DATA.slice(0, 5).map((student, index) => (
              <div key={student.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className={`
                    w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-3
                    ${index === 0 ? 'bg-yellow-100 text-yellow-700' : 
                      index === 1 ? 'bg-gray-100 text-gray-700' : 
                      index === 2 ? 'bg-orange-100 text-orange-700' : 'bg-blue-50 text-blue-600'}
                  `}>
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{student.name}</p>
                    <p className="text-xs text-gray-500">{student.id}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-blue-600">{student.totalDistance} km</p>
                  <p className="text-xs text-gray-400">配速 {student.avgPace}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-800">学生详细数据</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">学生信息</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">出勤率</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">总跑量</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">平均配速</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {STUDENTS_DATA.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs font-bold mr-3">
                        {student.name[0]}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-500">{student.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-900 mr-2">{student.attendanceRate}%</span>
                      <div className="w-16 bg-gray-200 rounded-full h-1.5">
                        <div 
                          className={`h-1.5 rounded-full ${
                            student.attendanceRate >= 90 ? 'bg-green-500' : 
                            student.attendanceRate >= 70 ? 'bg-blue-500' : 'bg-red-500'
                          }`} 
                          style={{ width: `${student.attendanceRate}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {student.totalDistance} km
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.avgPace}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      student.attendanceRate >= 70 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {student.attendanceRate >= 70 ? '正常' : '预警'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentData;
