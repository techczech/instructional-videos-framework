import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';
import { Question } from '../types';

const AccordionItem: React.FC<{ question: Question }> = ({ question }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-slate-200 rounded-lg mb-4 bg-white overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isOpen ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-500'}`}>
                <span className="font-bold text-sm">{question.id}</span>
            </div>
            <span className={`font-semibold text-lg ${isOpen ? 'text-indigo-900' : 'text-slate-800'}`}>
                {question.question}
            </span>
        </div>
        {isOpen ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />}
      </button>
      
      {isOpen && (
        <div className="p-5 pt-0 pl-16 pr-8">
          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
             {question.answer.map((para, idx) => (
                 <p key={idx} dangerouslySetInnerHTML={{__html: para}} />
             ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AccordionItem;