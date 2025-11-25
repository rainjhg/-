import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, MapPin, CheckCircle, XCircle } from 'lucide-react';
import { ScheduleEvent } from '../types';

const SCHEDULE_BG = "https://loremflickr.com/1600/900/planner,calendar";

const MOCK_EVENTS: ScheduleEvent[] = [
  { id: '1', title: '신규 고객 재무 설계', date: '2024-10-15', time: '14:00', type: 'Consulting', consultantId: '2', status: 'Confirmed' },
  { id: '2', title: '신입 팀원 멘토링', date: '2024-10-16', time: '10:00', type: 'Mentoring', consultantId: '1', status: 'Pending' },
  { id: '3', title: '월간 전략 회의', date: '2024-10-20', time: '09:00', type: 'Meeting', consultantId: '1', status: 'Confirmed' },
];

export default function ScheduleSystem() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events] = useState<ScheduleEvent[]>(MOCK_EVENTS);

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const renderCalendarDays = () => {
    const days = [];
    // Empty cells for previous month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 bg-gray-50/30 border-b border-r border-gray-100"></div>);
    }
    // Days
    for (let i = 1; i <= daysInMonth; i++) {
      const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      const dayEvents = events.filter(e => e.date === dateStr);
      const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), i).toDateString();

      days.push(
        <div key={i} className={`h-28 border-b border-r border-gray-100 p-2 relative group hover:bg-blue-50/30 transition-colors ${isToday ? 'bg-blue-50/50' : 'bg-white'}`}>
          <span className={`text-sm font-medium ${isToday ? 'text-[#0090DA] font-bold' : 'text-gray-700'}`}>{i}</span>
          <div className="mt-1 space-y-1">
            {dayEvents.map(ev => (
              <div key={ev.id} className={`text-[10px] px-1.5 py-1 rounded truncate cursor-pointer shadow-sm ${
                ev.type === 'Consulting' ? 'bg-blue-100 text-blue-700' : 
                ev.type === 'Mentoring' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'
              }`}>
                {ev.time} {ev.title}
              </div>
            ))}
          </div>
          <button className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 text-[#0090DA] hover:bg-blue-100 p-1 rounded-full transition-all">
            <CalendarIcon size={14} />
          </button>
        </div>
      );
    }
    return days;
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Main Calendar Area */}
      <div className="flex-1 space-y-6">
        <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center space-x-4">
                <h2 className="text-xl font-bold text-[#333333]">
                    {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
                </h2>
                <div className="flex space-x-1">
                    <button onClick={handlePrevMonth} className="p-1 hover:bg-gray-100 rounded text-gray-600"><ChevronLeft size={20}/></button>
                    <button onClick={handleNextMonth} className="p-1 hover:bg-gray-100 rounded text-gray-600"><ChevronRight size={20}/></button>
                </div>
            </div>
            <button className="bg-[#0090DA] text-white px-4 py-2 rounded-lg text-sm font-medium shadow hover:bg-[#007bb8] transition-colors">
                일정 추가
            </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
            {['일', '월', '화', '수', '목', '금', '토'].map((day, idx) => (
              <div key={day} className={`py-3 text-center text-sm font-semibold ${idx === 0 ? 'text-red-500' : idx === 6 ? 'text-blue-500' : 'text-gray-600'}`}>
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {renderCalendarDays()}
          </div>
        </div>
      </div>

      {/* Side Panel: Requests & Today */}
      <div className="w-full lg:w-80 space-y-6">
        {/* Decorative Background Card */}
        <div className="relative rounded-xl overflow-hidden h-32 bg-gray-800 text-white shadow">
            <div 
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{ backgroundImage: `url(${SCHEDULE_BG})` }}
            ></div>
            <div className="relative z-10 h-full flex flex-col justify-center px-6">
            <h3 className="text-lg font-bold">멘토링 예약 현황</h3>
            <p className="text-xs text-gray-200 mt-1">승인 대기 중인 요청을 확인하세요.</p>
            </div>
        </div>

        {/* Requests List */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            <h4 className="font-bold text-gray-800 mb-4 text-sm flex items-center justify-between">
                <span>승인 대기 목록</span>
                <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-full text-xs">2건</span>
            </h4>
            <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-bold text-purple-600 bg-purple-100 px-2 py-0.5 rounded">멘토링</span>
                        <span className="text-xs text-gray-400">10분 전</span>
                    </div>
                    <p className="font-medium text-sm text-[#333333]">신입 RP 교육 요청</p>
                    <p className="text-xs text-gray-500 mt-1">김민수 매니저 • 10월 16일 10:00</p>
                    <div className="flex gap-2 mt-3">
                        <button className="flex-1 py-1.5 bg-[#0090DA] text-white text-xs rounded hover:bg-[#007bb8] transition-colors flex justify-center items-center">
                            <CheckCircle size={12} className="mr-1"/> 승인
                        </button>
                        <button className="flex-1 py-1.5 bg-white border border-gray-200 text-gray-600 text-xs rounded hover:bg-gray-50 transition-colors flex justify-center items-center">
                            <XCircle size={12} className="mr-1"/> 반려
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {/* Today's Schedule Mini */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
             <h4 className="font-bold text-gray-800 mb-4 text-sm">오늘의 일정</h4>
             <div className="space-y-4">
                <div className="flex items-start space-x-3">
                    <div className="flex flex-col items-center">
                        <span className="text-xs font-bold text-gray-500">14:00</span>
                        <div className="h-full w-0.5 bg-gray-200 mt-1"></div>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-[#333333]">신규 고객 재무 설계</p>
                        <div className="flex items-center text-xs text-gray-400 mt-1">
                            <MapPin size={10} className="mr-1"/> 강남 파이낸스센터 3F
                        </div>
                    </div>
                </div>
                <div className="flex items-start space-x-3 opacity-50">
                    <div className="flex flex-col items-center">
                        <span className="text-xs font-bold text-gray-500">16:00</span>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-[#333333]">팀 주간 회의</p>
                        <div className="flex items-center text-xs text-gray-400 mt-1">
                            <Clock size={10} className="mr-1"/> 1시간 예정
                        </div>
                    </div>
                </div>
             </div>
        </div>
      </div>
    </div>
  );
}