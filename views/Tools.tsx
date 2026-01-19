import React, { useState, useMemo } from 'react';
import { toolMatrix } from '../data/tools';
import { PenTool, Search, Filter } from 'lucide-react';
import ActionButtons from '../components/ActionButtons';

const Tools: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  // Extract unique categories for filter chips
  const categories = useMemo(() => {
    return ['All', ...Array.from(new Set(toolMatrix.map(t => t.type)))];
  }, []);

  const filteredTools = toolMatrix.filter(tool => {
    const searchLower = searchTerm.toLowerCase();
    const typeMatch = tool.type.toLowerCase().includes(searchLower);
    const purposeMatch = tool.purpose.toLowerCase().includes(searchLower);
    const toolsMatch = tool.tools.some(t => t.toLowerCase().includes(searchLower));
    
    const matchesSearch = typeMatch || purposeMatch || toolsMatch;
    const matchesFilter = activeFilter === 'All' || tool.type === activeFilter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="animate-fade-in max-w-7xl mx-auto">
      <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-indigo-100 text-indigo-700 rounded-lg">
                    <PenTool size={24} />
                </div>
                <h1 className="text-3xl font-bold text-slate-900">Production tools</h1>
              </div>
              <p className="text-lg text-slate-600 max-w-3xl">
                This tool matrix is intended as a guide for educators who are not expert media producers. It does not focus on professional production tools.
              </p>
              <p className="text-sm text-slate-500 mt-2">
                <strong>Note:</strong> Many of these tools may require additional subscriptions or installation that may or may not be supported by your university.
              </p>
            </div>
            
            <div className="flex flex-col gap-4 min-w-[300px] items-end">
                <ActionButtons 
                    id="tools-overview" 
                    type="Section" 
                    title="Production Tools Matrix" 
                    path="/tools"
                    allowEmbed={true}
                />
                
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={18} className="text-slate-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search technologies..."
                    className="pl-10 pr-4 py-3 w-full border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none bg-white shadow-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
            </div>
          </div>
      </div>

      {/* Filter Chips */}
      <div className="mb-6 flex flex-col gap-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
          <Filter size={16} />
          <span>Filter by Type:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                activeFilter === cat
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 font-bold text-slate-700 w-1/5 min-w-[200px]">Type of technology / video</th>
                <th className="px-6 py-4 font-bold text-slate-700 w-2/5 min-w-[300px]">What it’s for</th>
                <th className="px-6 py-4 font-bold text-slate-700 w-2/5 min-w-[300px]">Tools that can be used to produce it</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTools.length > 0 ? (
                filteredTools.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-6 align-top">
                      <h3 className="font-bold text-indigo-900 text-lg">{row.type}</h3>
                    </td>
                    <td className="px-6 py-6 align-top text-slate-600 leading-relaxed">
                       <div dangerouslySetInnerHTML={{ __html: row.purpose }} />
                    </td>
                    <td className="px-6 py-6 align-top">
                      <div className="space-y-2 text-slate-700">
                        {row.tools.map((line, i) => (
                          <div key={i} className={`leading-relaxed ${line.trim().startsWith('·') ? 'pl-4' : ''}`}>
                             <span dangerouslySetInnerHTML={{ __html: line }} />
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-slate-500">
                    <p className="text-lg">No matching tools found.</p>
                    <button 
                      onClick={() => {setSearchTerm(''); setActiveFilter('All');}} 
                      className="mt-2 text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      Clear filters and search
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Tools;
