import React from 'react';
import { Task } from '../types';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const TaskCard: React.FC<{ task: Task }> = ({ task }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
         <h3 className="text-lg font-bold">Task {task.id}</h3>
         <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center font-bold">{task.id}</div>
      </div>
      <div className="p-6 md:p-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">{task.title}</h2>
        <p className="text-slate-600 mb-6 leading-relaxed">{task.description}</p>
        
        <div className="bg-slate-50 rounded-lg p-5 mb-6 border border-slate-100">
          <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Action Points</h4>
          <ul className="space-y-3">
            {task.actionPoints.map((point, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-indigo-600 mt-1 shrink-0" />
                <span className="text-slate-700 text-sm md:text-base">
                  {point.includes("IN VIDEO:") ? (
                     <span><strong className="text-indigo-600">IN VIDEO:</strong> {point.replace("IN VIDEO:", "")}</span>
                  ) : point.includes("OUTSIDE VIDEO:") ? (
                     <span><strong className="text-slate-600">OUTSIDE VIDEO:</strong> {point.replace("OUTSIDE VIDEO:", "")}</span>
                  ) : (
                    point
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-slate-400 bg-slate-100 w-fit px-3 py-1.5 rounded-full">
            <span className="uppercase">Principles:</span>
            <span className="text-slate-600">{task.principles}</span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;