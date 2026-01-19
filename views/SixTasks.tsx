import React from 'react';
import { useNavigate } from 'react-router-dom';
import { tasksData, tasksIntro } from '../data/tasks';
import { CheckSquare, ArrowRight, Target, EyeOff, Lightbulb, Users, Compass, Scale } from 'lucide-react';
import ActionButtons from '../components/ActionButtons';

const SixTasks: React.FC = () => {
  const navigate = useNavigate();

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

  const getColorClasses = (color: string) => {
    switch(color) {
      case 'rose': return {
        bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-700', 
        hoverBorder: 'hover:border-rose-300', hoverText: 'group-hover:text-rose-700',
        iconBg: 'bg-rose-100', iconText: 'text-rose-600',
        hoverBtn: 'group-hover:bg-rose-600'
      };
      case 'amber': return {
        bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', 
        hoverBorder: 'hover:border-amber-300', hoverText: 'group-hover:text-amber-700',
        iconBg: 'bg-amber-100', iconText: 'text-amber-600',
        hoverBtn: 'group-hover:bg-amber-600'
      };
      case 'emerald': return {
        bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', 
        hoverBorder: 'hover:border-emerald-300', hoverText: 'group-hover:text-emerald-700',
        iconBg: 'bg-emerald-100', iconText: 'text-emerald-600',
        hoverBtn: 'group-hover:bg-emerald-600'
      };
      case 'cyan': return {
        bg: 'bg-cyan-50', border: 'border-cyan-200', text: 'text-cyan-700', 
        hoverBorder: 'hover:border-cyan-300', hoverText: 'group-hover:text-cyan-700',
        iconBg: 'bg-cyan-100', iconText: 'text-cyan-600',
        hoverBtn: 'group-hover:bg-cyan-600'
      };
      case 'blue': return {
        bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', 
        hoverBorder: 'hover:border-blue-300', hoverText: 'group-hover:text-blue-700',
        iconBg: 'bg-blue-100', iconText: 'text-blue-600',
        hoverBtn: 'group-hover:bg-blue-600'
      };
      case 'violet': return {
        bg: 'bg-violet-50', border: 'border-violet-200', text: 'text-violet-700', 
        hoverBorder: 'hover:border-violet-300', hoverText: 'group-hover:text-violet-700',
        iconBg: 'bg-violet-100', iconText: 'text-violet-600',
        hoverBtn: 'group-hover:bg-violet-600'
      };
      default: return {
        bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-700', 
        hoverBorder: 'hover:border-indigo-300', hoverText: 'group-hover:text-indigo-700',
        iconBg: 'bg-slate-100', iconText: 'text-slate-600',
        hoverBtn: 'group-hover:bg-indigo-600'
      };
    }
  };

  return (
    <div className="animate-fade-in max-w-6xl mx-auto">
      <div className="mb-12">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-4">
            <div className="inline-flex items-center gap-3">
                <div className="p-2 bg-indigo-100 text-indigo-700 rounded-lg">
                    <CheckSquare size={24} />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900">6 tasks of effective instructional videos</h1>
            </div>
            <ActionButtons 
                id="tasks-overview" 
                type="Section" 
                title="6 Tasks of Effective Instructional Videos" 
                path="/tasks"
                allowEmbed={true}
            />
        </div>
        <p className="text-lg text-slate-600 leading-relaxed max-w-4xl">
          {tasksIntro}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasksData.map((task) => {
          const Icon = getTaskIcon(task.icon);
          const colors = getColorClasses(task.color);

          return (
            <div 
              key={task.id}
              onClick={() => navigate(`/tasks/${task.id}`)}
              className={`group bg-white rounded-xl border ${colors.border} p-6 shadow-sm hover:shadow-lg ${colors.hoverBorder} transition-all duration-300 cursor-pointer flex flex-col justify-between h-full relative overflow-hidden`}
            >
               <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Icon size={80} className={colors.text} />
               </div>

               <div>
                  <div className="flex items-center justify-between mb-4">
                     <span className={`w-12 h-12 rounded-xl ${colors.iconBg} ${colors.iconText} font-bold flex items-center justify-center ${colors.hoverBtn} group-hover:text-white transition-colors`}>
                        <Icon size={24} />
                     </span>
                     <span className="font-mono text-sm font-bold text-slate-300">#{task.id}</span>
                  </div>
                  <h2 className={`text-xl font-bold text-slate-800 mb-3 ${colors.hoverText} transition-colors leading-tight`}>
                      {task.title}
                  </h2>
                  <p className="text-slate-500 text-sm line-clamp-3 leading-relaxed">
                      {task.description}
                  </p>
               </div>
               
               <div className={`mt-6 flex items-center text-sm font-semibold ${colors.text} opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300`}>
                  View Task Details <ArrowRight size={16} className="ml-1" />
               </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SixTasks;
