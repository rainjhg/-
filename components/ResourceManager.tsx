import React, { useState } from 'react';
import { FileText, Download, Eye, Clock, Search, Filter, FolderOpen } from 'lucide-react';
import { ResourceItem } from '../types';

const DATA_BG = "https://loremflickr.com/1600/900/documents,archive";

const MOCK_RESOURCES: ResourceItem[] = [
  { id: '1', title: '2024 하반기 종신보험 세일즈 매뉴얼', category: 'Manual', date: '2024-10-01', size: '12.5 MB', format: 'PDF' },
  { id: '2', title: '법인 영업 제안서 템플릿 (v2.0)', category: 'Sales', date: '2024-09-28', size: '5.2 MB', format: 'PPT' },
  { id: '3', title: '신입 컨설턴트 교육 자료집', category: 'Education', date: '2024-09-15', size: '24.1 MB', format: 'PDF' },
  { id: '4', title: '10월 변액보험 수익률 현황', category: 'Sales', date: '2024-10-05', size: '2.1 MB', format: 'PDF' },
  { id: '5', title: '계약 체결 필수 체크리스트', category: 'Contract', date: '2024-08-30', size: '0.5 MB', format: 'DOC' },
];

const CategoryButton = ({ active, label, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
      active 
      ? 'bg-[#0090DA] text-white border-[#0090DA] shadow-md' 
      : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
    }`}
  >
    {label}
  </button>
);

export default function ResourceManager() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredResources = MOCK_RESOURCES.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
        {/* Header Area */}
        <div className="relative rounded-xl overflow-hidden h-48 bg-gray-900 shadow-lg">
             <div 
                className="absolute inset-0 bg-cover bg-center opacity-30"
                style={{ backgroundImage: `url(${DATA_BG})` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#003B70] to-transparent mix-blend-multiply"></div>
            <div className="relative z-10 h-full flex flex-col justify-center px-10">
                <h2 className="text-3xl font-bold text-white mb-2">팀 자료실</h2>
                <p className="text-blue-100 max-w-xl">
                    영업에 필요한 핵심 자료와 매뉴얼을 안전하게 보관하고 공유합니다.<br/>
                    검색을 통해 빠르게 문서를 찾아보세요.
                </p>
            </div>
        </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          <CategoryButton label="전체" active={selectedCategory === 'All'} onClick={() => setSelectedCategory('All')} />
          <CategoryButton label="영업 매뉴얼" active={selectedCategory === 'Manual'} onClick={() => setSelectedCategory('Manual')} />
          <CategoryButton label="세일즈 자료" active={selectedCategory === 'Sales'} onClick={() => setSelectedCategory('Sales')} />
          <CategoryButton label="계약 서식" active={selectedCategory === 'Contract'} onClick={() => setSelectedCategory('Contract')} />
          <CategoryButton label="교육" active={selectedCategory === 'Education'} onClick={() => setSelectedCategory('Education')} />
        </div>
        
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="자료명 검색..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0090DA] text-sm"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-[#0090DA]">
            <Filter size={16} />
          </button>
        </div>
      </div>

      {/* Resource List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-12 bg-gray-50 py-3 px-6 text-xs font-semibold text-gray-500 border-b border-gray-200">
          <div className="col-span-6 md:col-span-5">파일명</div>
          <div className="col-span-2 hidden md:block">카테고리</div>
          <div className="col-span-3 md:col-span-2 text-center">등록일</div>
          <div className="col-span-3 md:col-span-2 text-center hidden md:block">크기</div>
          <div className="col-span-3 md:col-span-1 text-right">다운로드</div>
        </div>
        
        <div className="divide-y divide-gray-100">
          {filteredResources.length > 0 ? (
            filteredResources.map((item) => (
              <div key={item.id} className="grid grid-cols-12 py-4 px-6 items-center hover:bg-blue-50/30 transition-colors group">
                <div className="col-span-6 md:col-span-5 flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    item.format === 'PDF' ? 'bg-red-50 text-red-500' :
                    item.format === 'PPT' ? 'bg-orange-50 text-orange-500' : 'bg-blue-50 text-blue-500'
                  }`}>
                    <FileText size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800 group-hover:text-[#0090DA] transition-colors">{item.title}</p>
                    <p className="text-xs text-gray-400 md:hidden">{item.size} • {item.date}</p>
                  </div>
                </div>
                
                <div className="col-span-2 hidden md:flex">
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                    {item.category === 'Manual' ? '매뉴얼' : item.category === 'Sales' ? '영업자료' : item.category === 'Contract' ? '서식' : '교육'}
                  </span>
                </div>
                
                <div className="col-span-3 md:col-span-2 text-center text-sm text-gray-500 flex items-center justify-center">
                    <Clock size={12} className="mr-1 text-gray-400" />
                    {item.date}
                </div>
                
                <div className="col-span-2 text-center text-sm text-gray-500 hidden md:block">
                  {item.size}
                </div>
                
                <div className="col-span-3 md:col-span-1 flex justify-end space-x-2">
                  <button className="p-2 text-gray-400 hover:text-[#0090DA] hover:bg-blue-50 rounded-full transition-colors" title="미리보기">
                    <Eye size={18} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-[#0090DA] hover:bg-blue-50 rounded-full transition-colors" title="다운로드">
                    <Download size={18} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-gray-400">
                <FolderOpen size={48} className="mx-auto mb-4 opacity-30" />
                <p>검색 결과가 없습니다.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}