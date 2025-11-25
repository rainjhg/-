import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar, FolderOpen, Settings, Bell, LogOut, Menu, X } from 'lucide-react';
import Dashboard from './components/Dashboard';
import TeamManagement from './components/TeamManagement';
import ScheduleSystem from './components/ScheduleSystem';
import ResourceManager from './components/ResourceManager';
import AdminSettings from './components/AdminSettings';

const SidebarLink = ({ to, icon: Icon, label, active, onClick }: any) => (
  <Link
    to={to}
    onClick={onClick}
    className={`flex items-center space-x-3 px-6 py-4 transition-colors duration-200 ${
      active
        ? 'bg-[#0090DA] text-white border-r-4 border-[#005c8a]'
        : 'text-gray-500 hover:bg-gray-100 hover:text-[#0090DA]'
    }`}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </Link>
);

const Layout = ({ children }: { children?: React.ReactNode }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', icon: LayoutDashboard, label: '대시보드' },
    { path: '/team', icon: Users, label: '팀원 관리' },
    { path: '/schedule', icon: Calendar, label: '일정/예약' },
    { path: '/resources', icon: FolderOpen, label: '자료실' },
    { path: '/admin', icon: Settings, label: '관리자 설정' },
  ];

  return (
    <div className="flex min-h-screen bg-[#F5F7FA]">
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex flex-col w-64 bg-white shadow-xl fixed h-full z-20">
        <div className="p-8 flex items-center justify-center border-b border-gray-100">
          <div className="text-2xl font-bold text-[#333333]">
            <span className="text-[#0090DA]">MetLife</span> FS
          </div>
        </div>
        
        <div className="flex-1 py-6 flex flex-col space-y-1">
          {navItems.map((item) => (
            <SidebarLink
              key={item.path}
              to={item.path}
              icon={item.icon}
              label={item.label}
              active={location.pathname === item.path}
            />
          ))}
        </div>

        <div className="p-6 border-t border-gray-100">
          <div className="flex items-center space-x-3 text-gray-500 hover:text-red-500 cursor-pointer transition-colors">
            <LogOut size={20} />
            <span className="font-medium">로그아웃</span>
          </div>
          <p className="mt-4 text-xs text-gray-400">© 2024 Kwon Team System</p>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className={`md:hidden fixed top-0 w-full z-30 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-[#F5F7FA]'}`}>
        <div className="flex items-center justify-between px-6 py-4">
          <span className="text-xl font-bold text-[#333333]">MetLife FS</span>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-[#333333]">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-20 bg-white pt-20 px-6 md:hidden">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <SidebarLink
                key={item.path}
                to={item.path}
                icon={item.icon}
                label={item.label}
                active={location.pathname === item.path}
                onClick={() => setIsMobileMenuOpen(false)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-6 md:p-10 pt-20 md:pt-10 transition-all duration-300">
        {/* Top Bar (Desktop) */}
        <header className="hidden md:flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#333333]">
              {navItems.find(i => i.path === location.pathname)?.label || '대시보드'}
            </h1>
            <p className="text-gray-500 text-sm mt-1">권나경 팀 통합 매니지먼트 시스템에 오신 것을 환영합니다.</p>
          </div>
          <div className="flex items-center space-x-6">
            <button className="relative p-2 text-gray-400 hover:text-[#0090DA] transition-colors">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center space-x-3 pl-6 border-l border-gray-200">
              <img 
                src="https://picsum.photos/100/100" 
                alt="Profile" 
                className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
              />
              <div className="text-sm">
                <p className="font-bold text-[#333333]">관리자</p>
                <p className="text-xs text-gray-400">Master Admin</p>
              </div>
            </div>
          </div>
        </header>

        <div className="min-h-[calc(100vh-140px)]">
          {children}
        </div>
      </main>
    </div>
  );
};

export default function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/team" element={<TeamManagement />} />
          <Route path="/schedule" element={<ScheduleSystem />} />
          <Route path="/resources" element={<ResourceManager />} />
          <Route path="/admin" element={<AdminSettings />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}