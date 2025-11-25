import React, { useState } from 'react';
import { Shield, Lock, UserPlus, FileText, ToggleLeft, ToggleRight, Save, Activity } from 'lucide-react';
import { AdminLog } from '../types';

const MOCK_LOGS: AdminLog[] = [
  { id: '1', action: '시스템 설정 변경 (보안 레벨 상향)', admin: 'Master Admin', timestamp: '2024-10-12 14:30', status: 'Success' },
  { id: '2', action: '신규 팀원 계정 승인 (정우성)', admin: '권나경 (Leader)', timestamp: '2024-10-11 09:15', status: 'Success' },
  { id: '3', action: '일정 삭제 (ID: #402)', admin: '김민수 (Manager)', timestamp: '2024-10-10 18:00', status: 'Warning' },
];

export default function AdminSettings() {
  const [allowNewSignups, setAllowNewSignups] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
            <h2 className="text-2xl font-bold text-[#333333]">관리자 설정</h2>
            <p className="text-gray-500 text-sm mt-1">시스템 권한 및 보안 설정을 제어합니다.</p>
        </div>
        <button className="mt-4 md:mt-0 bg-[#333333] text-white px-5 py-2 rounded-lg flex items-center text-sm font-medium hover:bg-black transition-colors">
            <Save size={16} className="mr-2" /> 변경사항 저장
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* General Settings */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-[#333333] mb-4 flex items-center">
            <Shield size={20} className="mr-2 text-[#0090DA]" /> 시스템 제어
          </h3>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">신규 회원가입 허용</p>
                <p className="text-xs text-gray-500">비활성화 시 관리자 초대만 가능합니다.</p>
              </div>
              <button onClick={() => setAllowNewSignups(!allowNewSignups)} className="text-[#0090DA]">
                {allowNewSignups ? <ToggleRight size={40} /> : <ToggleLeft size={40} className="text-gray-300" />}
              </button>
            </div>
            
            <div className="flex items-center justify-between border-t border-gray-100 pt-4">
              <div>
                <p className="font-medium text-gray-800">시스템 점검 모드</p>
                <p className="text-xs text-gray-500">일반 사용자의 접속을 제한합니다.</p>
              </div>
              <button onClick={() => setMaintenanceMode(!maintenanceMode)} className={maintenanceMode ? "text-red-500" : "text-gray-300"}>
                {maintenanceMode ? <ToggleRight size={40} /> : <ToggleLeft size={40} />}
              </button>
            </div>
          </div>
        </div>

        {/* Admin Accounts */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
           <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-[#333333] flex items-center">
                    <UserPlus size={20} className="mr-2 text-[#0090DA]" /> 관리자 계정
                </h3>
                <button className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition-colors">추가</button>
           </div>
           <div className="space-y-3">
               <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                   <div className="flex items-center">
                       <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-[#0090DA] text-xs font-bold mr-3">MA</div>
                       <div>
                           <p className="text-sm font-bold">Master Admin</p>
                           <p className="text-xs text-gray-500">시스템 전체 권한</p>
                       </div>
                   </div>
                   <span className="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded">본인</span>
               </div>
               <div className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-lg">
                   <div className="flex items-center">
                       <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-xs font-bold mr-3">KN</div>
                       <div>
                           <p className="text-sm font-bold">권나경 (Leader)</p>
                           <p className="text-xs text-gray-500">팀 관리/승인 권한</p>
                       </div>
                   </div>
                   <button className="text-gray-400 hover:text-red-500"><Lock size={14} /></button>
               </div>
           </div>
        </div>
      </div>

      {/* Audit Logs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-bold text-[#333333] flex items-center">
                <Activity size={20} className="mr-2 text-[#0090DA]" /> 보안 감사 로그
            </h3>
        </div>
        <div className="divide-y divide-gray-100">
            {MOCK_LOGS.map(log => (
                <div key={log.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between hover:bg-gray-50 transition-colors">
                    <div className="flex items-start space-x-3 mb-2 md:mb-0">
                        <FileText size={18} className="text-gray-400 mt-0.5" />
                        <div>
                            <p className="text-sm font-medium text-gray-800">{log.action}</p>
                            <p className="text-xs text-gray-500">By {log.admin}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="text-xs text-gray-400 font-mono">{log.timestamp}</span>
                        <span className={`text-xs px-2 py-1 rounded font-medium ${log.status === 'Success' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                            {log.status}
                        </span>
                    </div>
                </div>
            ))}
        </div>
        <div className="p-4 bg-gray-50 text-center">
            <button className="text-sm text-gray-500 hover:text-[#0090DA] font-medium">로그 전체 보기</button>
        </div>
      </div>
    </div>
  );
}