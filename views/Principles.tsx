import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { mayerPrinciples, mayerContext } from '../data/principles';
import { 
  Brain, ArrowRight, Layers, Battery, Zap,
  Monitor, Target, MousePointer2, Copy, LayoutTemplate, 
  Clock, Scissors, GraduationCap, Headphones, 
  Smile, Mic, PenTool, BarChart3, Filter, Info, X, ArrowDownUp
} from 'lucide-react';
import ActionButtons from '../components/ActionButtons';

const Principles: React.FC = () => {
  const navigate = useNavigate();
  const [showInfo, setShowInfo] = useState(false);
  const [sortBy, setSortBy] = useState<'id' | 'effect'>('id');
  const [filterBand, setFilterBand] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  const getPrincipleIcon = (id: number) => {
    switch (id) {
      case 1: return Monitor;
      case 2: return Target;
      case 3: return MousePointer2;
      case 4: return Copy;
      case 5: return LayoutTemplate;
      case 6: return Clock;
      case 7: return Scissors;
      case 8: return GraduationCap;
      case 9: return Headphones;
      case 10: return Smile;
      case 11: return Mic;
      case 12: return PenTool;
      default: return Brain;
    }
  };

  // Logic to process principles based on state
  const processedPrinciples = useMemo(() => {
    let data = [...mayerPrinciples];

    // 1. Filter
    if (filterBand !== 'all') {
      data = data.filter(p => {
        const es = parseFloat(p.effectSize || '0');
        if (filterBand === 'high') return es >= 0.8;
        if (filterBand === 'medium') return es >= 0.5 && es < 0.8;
        if (filterBand === 'low') return es < 0.5;
        return true;
      });
    }

    // 2. Sort
    data.sort((a, b) => {
      if (sortBy === 'effect') {
        const esA = parseFloat(a.effectSize || '0');
        const esB = parseFloat(b.effectSize || '0');
        return esB - esA; // Descending
      }
      return a.id - b.id; // Ascending ID
    });

    return data;
  }, [filterBand, sortBy]);

  return (
    <div className="animate-fade-in max-w-6xl mx-auto">
      <div className="mb-12 text-left">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
             <div className="flex items-center gap-3">
                 <div className="p-3 bg-indigo-100 text-indigo-700 rounded-xl">
                     <Brain size={32} />
                 </div>
                 <h1 className="text-4xl font-bold text-slate-900">12 Principles of Multimedia Learning</h1>
             </div>
             <ActionButtons 
                id="principles-overview" 
                type="Section" 
                title="12 Principles of Multimedia Learning" 
                path="/principles"
                allowEmbed={true}
            />
          </div>
          <p className="text-xl text-slate-600 mb-10 max-w-4xl leading-relaxed">{mayerContext.intro}</p>
      </div>

      {/* Principles Section */}
      <div>
        <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">The 12 Principles</h2>
            <p className="text-lg text-slate-600 max-w-3xl mb-8">
                These evidence-based guidelines help structure multimedia presentations to maximize learning outcomes.
            </p>

            {/* Controls Bar */}
            <div className="flex flex-col xl:flex-row gap-6 xl:items-start bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                
                {/* Filters */}
                <div className="flex-1">
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-500 mb-3 uppercase tracking-wider">
                        <Filter size={16} /> Filter by Impact
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { id: 'all', label: 'All Principles' },
                            { id: 'high', label: 'High Impact (> 0.8)' },
                            { id: 'medium', label: 'Medium Impact (0.5 - 0.8)' },
                            { id: 'low', label: 'Low/Moderate (< 0.5)' }
                        ].map((filter) => (
                            <button
                                key={filter.id}
                                onClick={() => setFilterBand(filter.id as any)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                    filterBand === filter.id 
                                    ? 'bg-indigo-600 text-white shadow-md' 
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Sort & Info Toggle */}
                <div className="flex flex-col sm:flex-row gap-4 xl:border-l xl:border-slate-100 xl:pl-6">
                    <div>
                        <div className="flex items-center gap-2 text-sm font-bold text-slate-500 mb-3 uppercase tracking-wider">
                            <ArrowDownUp size={16} /> Sort Order
                        </div>
                        <div className="flex bg-slate-100 p-1 rounded-lg">
                            <button 
                                onClick={() => setSortBy('id')}
                                className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${sortBy === 'id' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                Principle #
                            </button>
                            <button 
                                onClick={() => setSortBy('effect')}
                                className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${sortBy === 'effect' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                Most Effective
                            </button>
                        </div>
                    </div>
                    
                    <div className="sm:self-end">
                        <button 
                            onClick={() => setShowInfo(!showInfo)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-bold transition-all ${
                                showInfo 
                                ? 'bg-indigo-50 border-indigo-200 text-indigo-700' 
                                : 'border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600'
                            }`}
                        >
                            {showInfo ? <X size={18} /> : <Info size={18} />}
                            {showInfo ? 'Hide Guide' : 'What is Effect Size?'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Educational Context Info Box (Conditional) */}
            {showInfo && (
                <div className="mt-4 bg-indigo-50/50 rounded-xl border border-indigo-100 p-6 md:p-8 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-white rounded-lg shadow-sm text-indigo-600 shrink-0 hidden md:flex">
                            <BarChart3 size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Understanding Effect Size (Cohen's d)</h3>
                            <p className="text-slate-700 mb-6 leading-relaxed max-w-4xl">
                                Effect size is a way of quantifying the difference between two groups (e.g., those who used multimedia vs. those who didn't). 
                                In education research (Hattie), an effect size of <strong>0.4</strong> is often considered the "hinge point" — representing a typical year of academic growth.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                <div className="bg-white p-4 rounded-lg border border-indigo-100 shadow-sm">
                                    <div className="text-emerald-600 font-bold mb-1 flex items-center gap-2">
                                        High Impact <span className="text-xs bg-emerald-100 px-2 py-0.5 rounded-full text-emerald-700">d &gt; 0.8</span>
                                    </div>
                                    <p className="text-xs text-slate-500 mb-3">Extremely effective instructional strategies.</p>
                                    <div className="text-sm font-semibold text-slate-700 border-t border-slate-100 pt-2">
                                        Comparison:<br/>
                                        <span className="text-emerald-600">Cognitive Task Analysis (1.29)</span>
                                    </div>
                                </div>
                                <div className="bg-white p-4 rounded-lg border border-indigo-100 shadow-sm">
                                    <div className="text-indigo-600 font-bold mb-1 flex items-center gap-2">
                                        Medium Impact <span className="text-xs bg-indigo-100 px-2 py-0.5 rounded-full text-indigo-700">0.4 - 0.79</span>
                                    </div>
                                    <p className="text-xs text-slate-500 mb-3">Above average effectiveness.</p>
                                    <div className="text-sm font-semibold text-slate-700 border-t border-slate-100 pt-2">
                                        Comparison:<br/>
                                        <span className="text-indigo-600">Feedback (0.70)</span>
                                    </div>
                                </div>
                                <div className="bg-white p-4 rounded-lg border border-indigo-100 shadow-sm">
                                    <div className="text-slate-600 font-bold mb-1 flex items-center gap-2">
                                        Low/Avg Impact <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-full text-slate-700">d &lt; 0.4</span>
                                    </div>
                                    <p className="text-xs text-slate-500 mb-3">Typical teacher effects or developmental growth.</p>
                                    <div className="text-sm font-semibold text-slate-700 border-t border-slate-100 pt-2">
                                        Comparison:<br/>
                                        <span className="text-slate-500">Homework (0.29)</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm text-slate-500 italic">
                                *Effect sizes for Mayer's principles are derived from meta-analyses. Values > 0.4 are considered educationally significant.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>

        {/* Results Count */}
        <div className="mb-4 text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>Showing {processedPrinciples.length} Principles</span>
            {filterBand !== 'all' && (
                <button onClick={() => setFilterBand('all')} className="text-indigo-600 hover:underline flex items-center gap-1 normal-case">
                    <X size={14} /> Clear filters
                </button>
            )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processedPrinciples.map((p) => {
                const Icon = getPrincipleIcon(p.id);
                const effectSize = parseFloat(p.effectSize || '0');
                
                // Determine color band for effect size badge
                let badgeColor = "bg-slate-100 text-slate-500 border-slate-200";
                if (effectSize >= 0.8) badgeColor = "bg-emerald-50 text-emerald-700 border-emerald-200";
                else if (effectSize >= 0.4) badgeColor = "bg-indigo-50 text-indigo-700 border-indigo-200";

                return (
                    <div 
                        key={p.id} 
                        onClick={() => navigate(`/principles/${p.id}`)}
                        className="group bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-lg hover:border-indigo-300 transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden"
                    >
                        {/* Effect Size Vertical Bar Indicator */}
                        <div className={`absolute left-0 top-0 bottom-0 w-1 ${effectSize >= 0.8 ? 'bg-emerald-400' : effectSize >= 0.4 ? 'bg-indigo-400' : 'bg-slate-300'}`}></div>

                        <div>
                            <div className="flex justify-between items-start mb-5 pl-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-slate-50 text-slate-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                        <Icon size={20} />
                                    </div>
                                    <span className="font-mono text-sm font-bold text-slate-400">
                                        #{p.id.toString().padStart(2, '0')}
                                    </span>
                                </div>
                                
                                {p.effectSize && (
                                    <span className={`text-xs font-mono px-2 py-1 rounded border whitespace-nowrap flex items-center gap-1 ${badgeColor}`}>
                                        <BarChart3 size={12} /> ES: {p.effectSize}
                                    </span>
                                )}
                            </div>
                            
                            <h3 className="font-bold text-slate-900 text-lg leading-tight mb-3 group-hover:text-indigo-700 transition-colors pl-2">
                                {p.name}
                            </h3>
                            <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 pl-2">
                                {p.definition}
                            </p>
                        </div>
                        
                        <div className="mt-5 pl-2 flex items-center text-sm font-semibold text-indigo-600 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                            View Details <ArrowRight size={16} className="ml-1" />
                        </div>
                    </div>
                );
            })}
        </div>
        
        {processedPrinciples.length === 0 && (
            <div className="text-center py-20 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                <Filter size={48} className="mx-auto text-slate-300 mb-4" />
                <h3 className="text-xl font-bold text-slate-600 mb-2">No principles found</h3>
                <p className="text-slate-500 mb-6">Try adjusting your filters.</p>
                <button 
                    onClick={() => setFilterBand('all')}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-colors"
                >
                    Clear Filters
                </button>
            </div>
        )}

      </div>
    </div>
  );
};

export default Principles;
