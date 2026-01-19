import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { tasksData } from '../data/tasks';
import { questionsData } from '../data/questions';
import { mayerPrinciples } from '../data/principles';
import { ArrowLeft, CheckSquare, HelpCircle, Brain, ArrowRight, CheckCircle2, Target, EyeOff, Lightbulb, Users, Compass, Scale } from 'lucide-react';
import ActionButtons from '../components/ActionButtons';

// Copying the mapping logic to reverse link Tasks to Questions
const questionTaskMap: Record<number, number[]> = {
  1: [1, 2, 3], 2: [2, 4], 3: [1, 5], 4: [1, 3], 5: [5, 2],
  6: [1, 2], 7: [4], 8: [5], 9: [4, 6], 10: [4],
  11: [4], 12: [2, 4, 6], 13: [3], 14: [2, 5], 15: [5]
};

const TaskDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const taskId = parseInt(id || '0', 10);

  const task = useMemo(() => tasksData.find(t => t.id === taskId), [taskId]);

  const relatedQuestions = useMemo(() => {
    const questions = [];
    for (const category of questionsData) {
      for (const q of category.questions) {
        if (questionTaskMap[q.id]?.includes(taskId)) {
          questions.push(q);
        }
      }
    }
    return questions;
  }, [taskId]);

  const relatedPrinciples = useMemo(() => {
    if (!task?.relatedPrincipleIds) return [];
    return mayerPrinciples.filter(p => task.relatedPrincipleIds?.includes(p.id));
  }, [task]);

  if (!task) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-slate-800">Task not found</h2>
        <button 
          onClick={() => navigate('/tasks')}
          className="mt-4 text-indigo-600 hover:underline"
        >
          Return to 6 Tasks
        </button>
      </div>
    );
  }

  const getTaskIcon = (iconName: string) => {
    switch(iconName) {
      case 'Target': return Target;
      case 'EyeOff': return EyeOff;
      case 'Lightbulb': return Lightbulb;
      case 'Users': return Users;
      case 'Compass': return Compass;
      case 'Scale': return Scale;
      default: return CheckSquare;
    }
  };

  const getThemeColors = (color: string) => {
    switch(color) {
      case 'rose': return { bg: 'bg-rose-600', border: 'border-rose-400', badge: 'text-rose-100', iconBg: 'bg-rose-700', text: 'text-rose-700' };
      case 'amber': return { bg: 'bg-amber-600', border: 'border-amber-400', badge: 'text-amber-100', iconBg: 'bg-amber-700', text: 'text-amber-700' };
      case 'emerald': return { bg: 'bg-emerald-600', border: 'border-emerald-400', badge: 'text-emerald-100', iconBg: 'bg-emerald-700', text: 'text-emerald-700' };
      case 'cyan': return { bg: 'bg-cyan-600', border: 'border-cyan-400', badge: 'text-cyan-100', iconBg: 'bg-cyan-700', text: 'text-cyan-700' };
      case 'blue': return { bg: 'bg-blue-600', border: 'border-blue-400', badge: 'text-blue-100', iconBg: 'bg-blue-700', text: 'text-blue-700' };
      case 'violet': return { bg: 'bg-violet-600', border: 'border-violet-400', badge: 'text-violet-100', iconBg: 'bg-violet-700', text: 'text-violet-700' };
      default: return { bg: 'bg-indigo-600', border: 'border-indigo-400', badge: 'text-indigo-100', iconBg: 'bg-indigo-700', text: 'text-indigo-700' };
    }
  };

  const Icon = getTaskIcon(task.icon);
  const theme = getThemeColors(task.color);

  return (
    <div className="animate-fade-in max-w-6xl mx-auto">
      {/* Back Navigation */}
      <button 
        onClick={() => navigate('/tasks')}
        className="group flex items-center text-slate-500 hover:text-indigo-600 mb-8 transition-colors font-medium"
      >
        <div className="p-1.5 rounded-full bg-white border border-slate-200 group-hover:border-indigo-300 mr-2 transition-colors">
            <ArrowLeft size={16} />
        </div>
        Back to all tasks
      </button>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
            <div className={`${theme.bg} text-white px-8 py-8 flex items-start gap-5 relative`}>
                {/* Action Buttons */}
                <div className="absolute top-6 right-6">
                    <ActionButtons 
                        id={`task-${task.id}`} 
                        type="Task" 
                        title={`Task ${task.id}: ${task.title}`} 
                        allowEmbed={true}
                    />
                </div>

                <span className={`flex-shrink-0 w-16 h-16 ${theme.iconBg} text-white rounded-2xl flex items-center justify-center font-bold text-3xl shadow-lg border ${theme.border}`}>
                    <Icon size={32} />
                </span>
                <div className="pr-12">
                    <span className={`text-xs font-bold ${theme.badge} uppercase tracking-wider mb-1 block`}>
                        Task {task.id}
                    </span>
                    <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                        {task.title}
                    </h1>
                </div>
            </div>
            
            <div className="p-8 md:p-10">
                <div className="mb-8">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Description</h3>
                    <p className="text-lg text-slate-700 leading-relaxed">
                        {task.description}
                    </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-6 md:p-8 border border-slate-100">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Action Points</h3>
                    <ul className="space-y-4">
                        {task.actionPoints.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                            <CheckCircle2 size={20} className={`${theme.text} mt-0.5 shrink-0`} />
                            <span className="text-slate-700 text-base">
                            {point.includes("IN VIDEO:") ? (
                                <span><strong className={`${theme.text} bg-slate-100 px-1.5 py-0.5 rounded text-xs tracking-wide uppercase mr-1`}>In Video</strong> {point.replace("IN VIDEO:", "")}</span>
                            ) : point.includes("OUTSIDE VIDEO:") ? (
                                <span><strong className="text-slate-600 bg-slate-200 px-1.5 py-0.5 rounded text-xs tracking-wide uppercase mr-1">Outside</strong> {point.replace("OUTSIDE VIDEO:", "")}</span>
                            ) : (
                                point
                            )}
                            </span>
                        </li>
                        ))}
                    </ul>
                </div>
            </div>
          </div>
        </div>

        {/* Sidebar: Relevant Info */}
        <div className="lg:w-80 shrink-0 space-y-8">
          
          {/* Principles Card */}
          <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
             <div className="flex items-center gap-2 mb-4 text-indigo-900">
                <Brain className="text-indigo-600" size={20} />
                <h3 className="font-bold text-lg">Mayer's Principles</h3>
             </div>
             <p className="text-sm text-indigo-800 mb-4 leading-relaxed">
                This task is supported by the following principles:
             </p>
             
             {relatedPrinciples.length > 0 ? (
                <div className="space-y-2 mb-4">
                    {relatedPrinciples.map(p => (
                        <button
                            key={p.id}
                            onClick={() => navigate(`/principles/${p.id}`)}
                            className="w-full text-left bg-white/60 hover:bg-white rounded-lg p-3 text-sm font-medium text-indigo-900 border border-indigo-100/50 hover:border-indigo-300 transition-all flex justify-between items-center group"
                        >
                            <span>{p.name}</span>
                            <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-indigo-500" />
                        </button>
                    ))}
                </div>
             ) : (
                <div className="bg-white/60 rounded-lg p-3 text-sm font-medium text-indigo-900 mb-4 border border-indigo-100/50 italic">
                    {task.principles}
                </div>
             )}

             <button 
                onClick={() => navigate('/principles')}
                className="w-full py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors shadow-sm flex items-center justify-center gap-2"
             >
                <Brain size={16} /> View All Principles
             </button>
          </div>

          {/* Questions List */}
          <div>
            <div className="flex items-center gap-2 mb-4 text-slate-800">
                <HelpCircle className="text-indigo-600" size={20} />
                <h3 className="font-bold text-lg">Common Questions</h3>
            </div>
            
            {relatedQuestions.length > 0 ? (
                <div className="space-y-3">
                    {relatedQuestions.map(q => (
                        <div 
                            key={q.id}
                            onClick={() => navigate(`/questions/${q.id}`)}
                            className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer group"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded">
                                    Q {q.id}
                                </span>
                                <ArrowRight size={14} className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
                            </div>
                            <h4 className="font-bold text-slate-800 text-sm leading-tight group-hover:text-indigo-700 transition-colors">
                                {q.question}
                            </h4>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-slate-50 rounded-xl p-6 text-center border border-slate-200 text-slate-500 italic text-sm">
                    No specific questions linked to this task.
                </div>
            )}
            
            <button 
                onClick={() => navigate('/questions')}
                className="mt-4 w-full py-2 bg-white border border-slate-300 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors"
            >
                View All Questions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
