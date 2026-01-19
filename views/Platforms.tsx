
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { platformComparisonTable, platformPageData } from '../data/platforms';
import { uiContent } from '../data/uiContent';
import { 
  Monitor, Settings, Gauge, Headphones, 
  Type, Search, Bookmark, RotateCcw, 
  Smartphone, HelpCircle, ArrowRight 
} from 'lucide-react';
import ActionButtons from '../components/ActionButtons';

const Platforms: React.FC = () => {
  const navigate = useNavigate();

  const IconMap: Record<string, any> = {
    'Gauge': Gauge,
    'Headphones': Headphones,
    'Type': Type,
    'Search': Search,
    'Bookmark': Bookmark,
    'RotateCcw': RotateCcw,
    'Smartphone': Smartphone
  };

  return (
    <div className="animate-fade-in max-w-5xl mx-auto">
      {/* Page Title */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
         <div className="flex items-center gap-3">
             <div className="p-2 bg-indigo-100 text-indigo-700 rounded-lg">
                 <Monitor size={24} />
             </div>
             <h1 className="text-3xl font-bold text-slate-900">{platformPageData.title}</h1>
         </div>
         <ActionButtons 
            id="platforms-overview" 
            type="Section" 
            title={platformPageData.title} 
            path="/platforms"
            allowEmbed={true}
        />
      </div>

      {/* Intro Section with Question Link */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
                <p className="text-lg text-slate-700 leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: platformPageData.intro }} />
                
                {/* Inline link to Question */}
                <div 
                    onClick={() => navigate(`/questions/${platformPageData.questionLink.questionId}`)}
                    className="mb-6 p-4 bg-indigo-50 rounded-lg border border-indigo-100 flex items-start gap-3 cursor-pointer hover:bg-indigo-100 transition-colors group"
                >
                    <HelpCircle className="text-indigo-600 mt-1 shrink-0" size={20} />
                    <div>
                        <span className="font-bold text-indigo-900 block mb-1">Related Question: Presentation</span>
                        <p className="text-indigo-800 text-sm">
                            {platformPageData.questionLink.description} <span className="inline-flex items-center font-bold text-indigo-600 group-hover:translate-x-1 transition-transform">Go there <ArrowRight size={14} className="ml-1" /></span>
                        </p>
                    </div>
                </div>

                <p className="text-slate-600 font-medium mb-4">{platformPageData.modesListTitle}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {platformPageData.modes.map((mode, idx) => {
                        const Icon = IconMap[mode.icon] || Settings;
                        return (
                          <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100 text-slate-700 text-sm">
                              <Icon size={18} className="text-indigo-500 shrink-0" />
                              <span>{mode.text}</span>
                          </div>
                        );
                    })}
                </div>
              </div>
          </div>

          <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-xl p-6 text-white shadow-md sticky top-6">
                  <div className="flex items-center gap-2 mb-3 font-bold text-indigo-100 uppercase text-xs tracking-wider">
                      <HelpCircle size={16} />
                      <h3>Key Context</h3>
                  </div>
                  <h3 className="font-bold text-xl mb-4 leading-tight">
                      {platformPageData.questionLink.text}
                  </h3>
                  <p className="text-sm text-indigo-100 mb-6 opacity-90 leading-relaxed">
                      Understand the underlying principles of video presentation and learner access before choosing a platform.
                  </p>
                  <button 
                      onClick={() => navigate(`/questions/${platformPageData.questionLink.questionId}`)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white text-indigo-600 text-sm font-bold rounded-lg hover:bg-indigo-50 transition-colors shadow-sm"
                  >
                      {uiContent.common.readAnswer} {platformPageData.questionLink.questionId} <ArrowRight size={16} />
                  </button>
              </div>
          </div>
      </div>

      {/* Platforms Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-200">{platformPageData.sectionsTitle}</h2>
        
        <p className="text-slate-700 text-lg mb-8 max-w-4xl">
            {platformPageData.sectionsIntro}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {platformPageData.sections.map((section, idx) => (
                <div 
                  key={idx} 
                  className={`bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:border-indigo-300 transition-colors ${section.colSpan ? `md:col-span-${section.colSpan}` : ''}`}
                >
                     <h3 className="font-bold text-slate-900 text-lg mb-3">{section.title}</h3>
                     <div className="space-y-4">
                        {section.content.map((para, pIdx) => (
                          <React.Fragment key={pIdx}>
                            <p className="text-slate-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: para }} />
                            {pIdx < section.content.length - 1 && <div className="h-px bg-slate-100"></div>}
                          </React.Fragment>
                        ))}
                     </div>
                </div>
            ))}
        </div>
      </div>

      {/* Comparison Table */}
      <section>
        <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-slate-100 text-slate-700 rounded-lg">
                <Settings size={24} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">
                {platformComparisonTable.title}
            </h2>
        </div>
        
        <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-sm bg-white">
            <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-700">
                <tr>
                    {platformComparisonTable.headers.map((h, i) => (
                        <th key={i} className="px-4 py-4 text-left font-bold whitespace-nowrap border-b border-slate-200">
                            {h}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
                {platformComparisonTable.rows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        {row.map((cell, cIdx) => (
                            <td key={cIdx} className={`px-4 py-3 ${cIdx === 0 ? 'font-bold text-slate-800 bg-slate-50/30' : 'text-center'}`}>
                                {cell}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
            </table>
        </div>
      </section>
    </div>
  );
};

export default Platforms;
