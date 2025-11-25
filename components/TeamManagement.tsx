import React, { useState } from 'react';
import { Search, Plus, MoreVertical, Phone, Mail, User } from 'lucide-react';
import { TeamMember } from '../types';

const TEAM_BG = "https://loremflickr.com/1600/900/office_desk,workspace";

const MOCK_MEMBERS: TeamMember[] = [
  { id: '1', name: '권나경', role: 'Leader', email: 'nk.kwon@metlife.co.kr', phone: '010-1234-5678', joinDate: '2018-03-15', status: 'Active' },
  { id: '2', name: '김민수', role: 'Manager', email: 'ms.kim@metlife.co.kr', phone: '010-2345-6789', joinDate: '2019-05-20', status: 'Active' },
  { id: '3', name: '이영희', role: 'Consultant', email: 'yh.lee@metlife.co.kr', phone: '010-3456-7890', joinDate: '2020-01-10', status: 'Active' },
  { id: '4', name: '박준호', role: 'Consultant', email: 'jh.park@metlife.co.kr', phone: '010-4567-8901', joinDate: '2021-08-15', status: 'Inactive' },
  { id: '5', name: '최수진', role: 'Consultant', email: 'sj.choi@metlife.co.kr', phone: '010-5678-9012', joinDate: '2022-03-01', status: 'Active' },
  { id: '6', name: '정우성', role: 'Consultant', email: 'ws.jung@metlife.co.kr', phone: '010-6789-0123', joinDate: '2023-11-20', status: 'Active' },
];

export default function TeamManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [members] = useState<TeamMember[]>(MOCK_MEMBERS);

  const filteredMembers = members.filter(m => 
    m.name.includes(searchTerm) || m.email.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
       {/* Page Header with Background */}
       <div className="relative rounded-xl overflow-hidden h-40 bg-gray-800 text-white shadow-lg">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url(${TEAM_BG})` }}
        ></div>
        <div className="relative z-10 h-full flex flex-col justify-center px-8">
          <h2 className="text-2xl font-bold">팀원 관리</h2>
          <p className="text-gray-200 text-sm mt-1">권나경 팀의 소중한 파트너들을 관리합니다.</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="이름 또는 이메일 검색..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0090DA] focus:border-transparent text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center space-x-2 bg-[#0090DA] text-white px-5 py-2 rounded-lg hover:bg-[#007bb8] transition-colors shadow-md w-full sm:w-auto justify-center">
          <Plus size={18} />
          <span className="font-medium text-sm">팀원 추가</span>
        </button>
      </div>

      {/* Member Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map(member => (
          <div key={member.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100 overflow-hidden group">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-[#0090DA] transition-colors">
                    <User size={32} />
                </div>
                <div className="flex flex-col items-end">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    member.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {member.status === 'Active' ? '재직중' : '휴직/퇴사'}
                  </span>
                  <button className="mt-2 text-gray-400 hover:text-gray-600">
                    <MoreVertical size={18} />
                  </button>
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-[#333333] mb-1">{member.name}</h3>
              <p className="text-sm text-[#0090DA] font-medium mb-4">{member.role}</p>
              
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <Mail size={14} className="mr-2 text-gray-400" />
                  {member.email}
                </div>
                <div className="flex items-center">
                  <Phone size={14} className="mr-2 text-gray-400" />
                  {member.phone}
                </div>
              </div>
            </div>
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
              <span>입사일: {member.joinDate}</span>
              <button className="text-[#0090DA] font-medium hover:underline">프로필 상세</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}