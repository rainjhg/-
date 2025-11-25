import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Calendar, FolderOpen, TrendingUp, AlertCircle, MessageSquare } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Specific Image URL from request
const HERO_BG = "https://loremflickr.com/1600/900/metlife_building,skyscraper,architecture";

const data = [
  { name: '1주', consulting: 4, mentoring: 2 },
  { name: '2주', consulting: 3, mentoring: 5 },
  { name: '3주', consulting: 6, mentoring: 3 },
  { name: '4주', consulting: 8, mentoring: 4 },
];

const StatCard = ({ title, value, sub, icon: Icon, color }: any) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-[#333333]">{value}</h3>
        <p className={`text-xs mt-2 ${color} font-medium`}>{sub}</p>
      </div>
      <div className={`p-3 rounded-lg bg-gray-50`}>
        <Icon className="text-gray-600" size={24} />
      </div>
    </div>
  </div>
);

const NoticeItem = ({ tag, title, date, urgent }: any) => (
  <div className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 px-2 rounded transition-colors cursor-pointer">
    <div className="flex items-center space-x-3 overflow-hidden">
      <span className={`px-2 py-0.5 text-xs font-bold rounded ${urgent ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-[#0090DA]'}`}>
        {tag}
      </span>
      <span className="text-sm text-gray-700 truncate font-medium">{title}</span>
    </div>
    <span className="text-xs text-gray-400 whitespace-nowrap">{date}</span>
  </div>
);

export default function Dashboard() {
  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Hero Section */}
      <div 
        className="relative rounded-2xl overflow-hidden text-white shadow-xl group"
        style={{ height: '280px' }}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url(${HERO_BG})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0090DA]/90 to-[#003B70]/80 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="relative h-full flex flex-col justify-center px-8 md:px-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            효율적인 성공을 위한 <br />
            권나경 팀 통합 매니지먼트
          </h2>
          <p className="text-blue-100 max-w-xl mb-8 text-lg">
            팀원 관리, 일정 조율, 핵심 자료 공유를 하나의 플랫폼에서.<br />
            금융 전문가를 위한 최적의 업무 환경을 경험하세요.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/schedule" className="bg-white text-[#0090DA] hover:bg-gray-100 px-6 py-3 rounded-lg font-bold text-sm transition-colors flex items-center shadow-lg">
              일정 예약하기 <ArrowRight size={16} className="ml-2" />
            </Link>
            <Link to="/resources" className="bg-[#003B70] bg-opacity-50 hover:bg-opacity-70 text-white px-6 py-3 rounded-lg font-bold text-sm transition-colors backdrop-blur-sm border border-white/20">
              최신 자료 확인
            </Link>
          </div>
        </div>
      </div>

      {/* Stats & Quick Access */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="총 팀원 수" value="12명" sub="+2명 (이번 달)" icon={Users} color="text-green-500" />
        <StatCard title="이번 주 일정" value="8건" sub="컨설팅 5, 멘토링 3" icon={Calendar} color="text-[#0090DA]" />
        <StatCard title="신규 자료" value="24건" sub="업데이트 완료" icon={FolderOpen} color="text-purple-500" />
        <StatCard title="목표 달성률" value="87%" sub="전월 대비 +12%" icon={TrendingUp} color="text-orange-500" />
      </div>

      {/* Charts & Board */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Activity Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-[#333333] flex items-center">
              <TrendingUp size={18} className="mr-2 text-[#0090DA]" /> 
              월간 활동 현황
            </h3>
            <select className="text-xs border-gray-200 rounded-md text-gray-500">
              <option>이번 달</option>
              <option>지난 달</option>
            </select>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} barSize={20}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="consulting" name="컨설팅" fill="#0090DA" radius={[4, 4, 0, 0]} />
                <Bar dataKey="mentoring" name="멘토링" fill="#333333" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Notice Board */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-[#333333] flex items-center">
              <MessageSquare size={18} className="mr-2 text-[#0090DA]" /> 
              공지사항 & 알림
            </h3>
            <span className="text-xs text-gray-400 hover:text-[#0090DA] cursor-pointer">전체보기</span>
          </div>
          <div className="flex-1 space-y-2">
             <NoticeItem tag="필독" title="10월 지점 전체 회의 안내" date="2024.10.05" urgent={true} />
             <NoticeItem tag="공지" title="신규 상품 약관 변경 사항" date="2024.10.03" />
             <NoticeItem tag="행사" title="하반기 워크샵 일정 투표" date="2024.10.01" />
             <NoticeItem tag="자료" title="9월 영업 실적 리포트" date="2024.09.28" />
             <NoticeItem tag="안내" title="사내 보안 시스템 점검 예정" date="2024.09.25" />
          </div>
          <button className="w-full mt-4 py-3 bg-gray-50 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors flex justify-center items-center">
            <AlertCircle size={16} className="mr-2" /> 팀 단톡방 바로가기
          </button>
        </div>
      </div>
    </div>
  );
}