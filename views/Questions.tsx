import React from 'react';
import { useNavigate } from 'react-router-dom';
import { questionsData, questionsIntro } from '../data/questions';
import { HelpCircle, MessageSquare, ArrowRight } from 'lucide-react';
import ActionButtons from '../components/ActionButtons';

const Questions: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in max-w-6xl mx-auto">
      <div className="mb-12">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-4">
            <div className="inline-flex items-center gap-3">
                <div className="p-2 bg-indigo-100 text-indigo-700 rounded-lg">
                    <HelpCircle size={24} />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900">15 questions about video production</h1>
            </div>
            <ActionButtons 
                id="questions-overview" 
                type="Section" 
                title="15 Questions about Evidence-Based Video Production" 
                path="/questions"
                allowEmbed={true}
            />
        </div>
        <p className="text-lg text-slate-600 max-w-4xl leading-relaxed">
          {questionsIntro}
        </p>
      </div>

      <div className="space-y-16">
        {questionsData.map((cat, catIdx) => (
          <div key={catIdx}>
            <div className="flex items-center gap-3 mb-6 border-b border-slate-200 pb-3">
              <div className="p-2 bg-slate-50 rounded-lg text-indigo-600">
                <MessageSquare size={20} />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">{cat.title}</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cat.questions.map((q) => (
                <div 
                  key={q.id}
                  onClick={() => navigate(`/questions/${q.id}`)}
                  className="group bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-lg hover:border-indigo-300 transition-all duration-300 cursor-pointer flex flex-col justify-between h-full relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <HelpCircle size={64} className="text-indigo-600" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 font-bold flex items-center justify-center text-sm group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        {q.id}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-indigo-700 transition-colors leading-tight">
                      {q.question}
                    </h3>
                  </div>
                  
                  <div className="mt-6 flex items-center text-sm font-semibold text-indigo-600 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    Read Answer <ArrowRight size={16} className="ml-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Questions;
