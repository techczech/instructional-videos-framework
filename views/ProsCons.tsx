
import React, { useState } from 'react';
import { modesComparisonData, sectionIntro } from '../data/modesComparison';
import { ComparisonCategory, ComparisonGroup } from '../types';
import { uiContent } from '../data/uiContent';
import { 
  Scale, Brain, Timer, GraduationCap, 
  CheckCircle2, XCircle, LayoutGrid, Users, Filter
} from 'lucide-react';
import ActionButtons from '../components/ActionButtons';

const ProsCons: React.FC = () => {
  const [groupBy, setGroupBy] = useState<'mode' | 'perspective'>('mode');
  const [activeCategory, setActiveCategory] = useState<ComparisonCategory | 'all'>('all');

  // Category Configuration
  const categories: { id: ComparisonCategory | 'all', label: string, icon: any, color: string }[] = [
    { id: 'all', label: 'All Factors', icon: Filter, color: 'slate' },
    { id: 'cognitive-load', label: 'Cognitive Load', icon: Brain, color: 'indigo' },
    { id: 'pedagogy', label: 'Pedagogy', icon: GraduationCap, color: 'emerald' },
    { id: 'pace-control', label: 'Pace & Control', icon: Timer, color: 'amber' },
  ];

  // Helper to filter points
  const filterPoints = (points: { text: string, category: ComparisonCategory }[]) => {
    if (activeCategory === 'all') return points;
    return points.filter(p => p.category === activeCategory);
  };

  const hasPoints = (group: ComparisonGroup) => {
    return filterPoints(group.pros).length > 0 || filterPoints(group.cons).length > 0;
  };

  const renderComparisonCard = (
    title: string, 
    subSections: { title: string, data: ComparisonGroup }[]
  ) => {
    // Only render if there's data after filter
    const visibleSubSections = subSections.filter(sub => hasPoints(sub.data));
    
    if (visibleSubSections.length === 0) return null;

    // Adjust grid columns and dividers based on content count
    let gridConfig = '';
    let dividerConfig = 'divide-y';

    if (visibleSubSections.length >= 3) {
      gridConfig = 'lg:grid-cols-3';
      dividerConfig = 'divide-y lg:divide-y-0 lg:divide-x';
    } else if (visibleSubSections.length === 2) {
      gridConfig = 'md:grid-cols-2';
      dividerConfig = 'divide-y md:divide-y-0 md:divide-x';
    }

    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full animate-in fade-in zoom-in-95 duration-300 w-full">
        <div className="bg-slate-50 border-b border-slate-100 p-5 flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-800">{title}</h3>
          {activeCategory !== 'all' && (
             <span className={`text-xs font-bold px-2 py-1 rounded-full bg-${categories.find(c => c.id === activeCategory)?.color}-100 text-${categories.find(c => c.id === activeCategory)?.color}-700 uppercase tracking-wider`}>
               {categories.find(c => c.id === activeCategory)?.label} Only
             </span>
          )}
        </div>
        
        <div className={`grid grid-cols-1 ${gridConfig} ${dividerConfig} divide-slate-100 flex-1`}>
          {visibleSubSections.map((sub, idx) => {
            const pros = filterPoints(sub.data.pros);
            const cons = filterPoints(sub.data.cons);
            
            return (
              <div key={idx} className="p-6 flex flex-col">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2 h-6">
                   {sub.title === 'Student' || sub.title === 'Lecturer' ? <Users size={14} /> : <LayoutGrid size={14} />}
                   {sub.title}
                </h4>
                
                <div className="space-y-6 flex-1">
                   {pros.length > 0 && (
                     <div>
                       <h5 className="text-emerald-700 font-bold text-sm mb-2 flex items-center gap-2">
                         <CheckCircle2 size={16} /> Advantages
                       </h5>
                       <ul className="space-y-2">
                         {pros.map((p, i) => {
                           const cat = categories.find(c => c.id === p.category);
                           return (
                             <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                               <div className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-${cat?.color}-500 shrink-0`} title={cat?.label}></div>
                               <span className="leading-relaxed">{p.text}</span>
                             </li>
                           );
                         })}
                       </ul>
                     </div>
                   )}

                   {cons.length > 0 && (
                     <div>
                       <h5 className="text-rose-700 font-bold text-sm mb-2 flex items-center gap-2">
                         <XCircle size={16} /> Disadvantages
                       </h5>
                       <ul className="space-y-2">
                         {cons.map((c, i) => {
                           const cat = categories.find(catItem => catItem.id === c.category);
                           return (
                             <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                               <div className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-${cat?.color}-500 shrink-0`} title={cat?.label}></div>
                               <span className="leading-relaxed">{c.text}</span>
                             </li>
                           );
                         })}
                       </ul>
                     </div>
                   )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="animate-fade-in max-w-7xl mx-auto pb-12">
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="flex justify-center mb-6">
           <div className="inline-flex items-center justify-center p-3 bg-indigo-100 text-indigo-700 rounded-2xl shadow-sm">
               <Scale size={28} />
           </div>
        </div>
        <div className="flex justify-center items-center gap-4 mb-6">
             <h1 className="text-3xl md:text-5xl font-bold text-slate-900">{uiContent.headers.prosCons}</h1>
             <ActionButtons 
                id="pros-cons-overview" 
                type="Section" 
                title="Videos vs Other Modes of Learning" 
                path="/pros-cons"
                allowEmbed={true}
            />
        </div>
        <p className="text-lg text-slate-600 leading-relaxed">
          {sectionIntro}
        </p>
      </div>

      {/* Controls Bar */}
      <div className="sticky top-4 z-30 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200 p-4 mb-10 flex flex-col xl:flex-row gap-6 justify-between items-center transition-all">
         
         {/* Group By Toggle */}
         <div className="flex bg-slate-100 p-1 rounded-xl shrink-0 w-full md:w-auto">
            <button 
              onClick={() => setGroupBy('mode')}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                groupBy === 'mode' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <LayoutGrid size={18} /> By Mode
            </button>
            <button 
              onClick={() => setGroupBy('perspective')}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                groupBy === 'perspective' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Users size={18} /> By Perspective
            </button>
         </div>

         {/* Category Filters */}
         <div className="flex flex-wrap justify-center gap-2 w-full xl:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all border ${
                  activeCategory === cat.id
                  ? `bg-${cat.color}-100 text-${cat.color}-800 border-${cat.color}-200`
                  : 'bg-transparent text-slate-500 border-transparent hover:bg-slate-50'
                }`}
              >
                <cat.icon size={16} className={activeCategory === cat.id ? `text-${cat.color}-600` : 'text-slate-400'} />
                {cat.label}
              </button>
            ))}
         </div>
      </div>

      {/* Content Grid */}
      <div className="flex flex-col gap-8">
        
        {/* VIEW: GROUP BY MODE */}
        {groupBy === 'mode' && modesComparisonData.map((data) => (
           renderComparisonCard(data.mode, [
             { title: 'Student Perspective', data: data.perspectives.student },
             { title: 'Lecturer Perspective', data: data.perspectives.lecturer }
           ])
        ))}

        {/* VIEW: GROUP BY PERSPECTIVE */}
        {groupBy === 'perspective' && (
          <>
            {renderComparisonCard('Student Perspective', 
               modesComparisonData.map(m => ({ title: m.mode, data: m.perspectives.student }))
            )}
            {renderComparisonCard('Lecturer Perspective', 
               modesComparisonData.map(m => ({ title: m.mode, data: m.perspectives.lecturer }))
            )}
          </>
        )}
      </div>

      {/* Empty State */}
      {activeCategory !== 'all' && (
         <div className="mt-8 text-center">
            <p className="text-sm text-slate-400">
               Showing only <span className="font-bold">{categories.find(c => c.id === activeCategory)?.label}</span> factors. 
               <button onClick={() => setActiveCategory('all')} className="ml-2 text-indigo-600 hover:underline">Show All</button>
            </p>
         </div>
      )}

    </div>
  );
};

export default ProsCons;
