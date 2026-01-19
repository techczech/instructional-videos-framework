import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mayerPrinciples } from '../data/principles';
import { tasksData } from '../data/tasks';
import { questionsData } from '../data/questions';
import { 
  ArrowLeft, CheckSquare, HelpCircle, ArrowRight, BarChart,
  Brain, Monitor, Target, MousePointer2, Copy, LayoutTemplate, 
  Clock, Scissors, GraduationCap, Headphones, Smile, Mic, PenTool
} from 'lucide-react';
import ActionButtons from '../components/ActionButtons';

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

const PrincipleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const principleId = parseInt(id || '0', 10);

  const principle = useMemo(() => mayerPrinciples.find(p => p.id === principleId), [principleId]);

  const relatedTasks = useMemo(() => {
    return tasksData.filter(t => t.relatedPrincipleIds?.includes(principleId));
  }, [principleId]);

  const relatedQuestions = useMemo(() => {
    const qs = [];
    for (const cat of questionsData) {
      for (const q of cat.questions) {
        if (q.relatedPrincipleIds?.includes(principleId)) {
          qs.push(q);
        }
      }
    }
    return qs;
  }, [principleId]);

  if (!principle) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-slate-800">Principle not found</h2>
        <button 
          onClick={() => navigate('/principles')}
          className="mt-4 text-indigo-600 hover:underline"
        >
          Return to Principles
        </button>
      </div>
    );
  }

  const Icon = getPrincipleIcon(principle.id);

  return (
    <div className="animate-fade-in max-w-5xl mx-auto">
      <button 
        onClick={() => navigate('/principles')}
        className="group flex items-center text-slate-500 hover:text-indigo-600 mb-8 transition-colors font-medium"
      >
        <div className="p-1.5 rounded-full bg-white border border-slate-200 group-hover:border-indigo-300 mr-2 transition-colors">
            <ArrowLeft size={16} />
        </div>
        Back to 12 Principles
      </button>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
        <div className="bg-indigo-600 text-white px-8 py-8 md:px-12 md:py-12 text-center relative">
            
            <div className="absolute top-6 right-6">
                <ActionButtons 
                    id={`principle-${principle.id}`}
                    type="Principle"
                    title={`Mayer's Principle: ${principle.name}`}
                    allowEmbed={true}
                />
            </div>

            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/30 shadow-lg">
                <Icon size={40} className="text-white" />
            </div>
            <div className="text-indigo-200 font-bold uppercase tracking-widest text-sm mb-2">Principle {principle.id}</div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">{principle.name}</h1>
            {principle.effectSize && (
                <div className="inline-flex items-center gap-2 bg-indigo-800/50 px-4 py-1.5 rounded-full text-sm font-medium border border-indigo-400/30">
                    <BarChart size={14} /> Effect Size: {principle.effectSize}
                </div>
            )}
        </div>
        
        <div className="p-8 md:p-12 text-center">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Definition</h3>
            <p className="text-xl md:text-2xl text-slate-700 font-light leading-relaxed max-w-3xl mx-auto">
                "{principle.definition}"
            </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Related Tasks */}
        <div>
            <div className="flex items-center gap-2 mb-4 text-slate-800">
                <CheckSquare className="text-indigo-600" size={24} />
                <h3 className="font-bold text-xl">Supported Tasks</h3>
            </div>
            {relatedTasks.length > 0 ? (
                <div className="space-y-3">
                    {relatedTasks.map(task => (
                        <div 
                            key={task.id}
                            onClick={() => navigate(`/tasks/${task.id}`)}
                            className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer group"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded group-hover:bg-indigo-100 group-hover:text-indigo-700 transition-colors">
                                    Task {task.id}
                                </span>
                                <ArrowRight size={16} className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
                            </div>
                            <h4 className="font-bold text-slate-800 leading-tight group-hover:text-indigo-700 transition-colors">
                                {task.title}
                            </h4>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-slate-50 rounded-xl p-8 text-center border border-slate-200 text-slate-500 italic">
                    No specific tasks linked to this principle directly.
                </div>
            )}
        </div>

        {/* Related Questions */}
        <div>
            <div className="flex items-center gap-2 mb-4 text-slate-800">
                <HelpCircle className="text-indigo-600" size={24} />
                <h3 className="font-bold text-xl">Related Questions</h3>
            </div>
            {relatedQuestions.length > 0 ? (
                <div className="space-y-3">
                    {relatedQuestions.map(q => (
                        <div 
                            key={q.id}
                            onClick={() => navigate(`/questions/${q.id}`)}
                            className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer group"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded group-hover:bg-indigo-100 group-hover:text-indigo-700 transition-colors">
                                    Question {q.id}
                                </span>
                                <ArrowRight size={16} className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
                            </div>
                            <h4 className="font-bold text-slate-800 text-sm leading-tight group-hover:text-indigo-700 transition-colors">
                                {q.question}
                            </h4>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-slate-50 rounded-xl p-8 text-center border border-slate-200 text-slate-500 italic">
                    No specific questions linked to this principle directly.
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default PrincipleDetail;
