import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { questionsData } from '../data/questions';
import { tasksData } from '../data/tasks';
import { mayerPrinciples } from '../data/principles';
import { ArrowLeft, CheckSquare, HelpCircle, MessageCircle, ArrowRight, Brain, Monitor } from 'lucide-react';
import ActionButtons from '../components/ActionButtons';

// Mapping logic to link Questions to Tasks based on the educational content
const questionTaskMap: Record<number, number[]> = {
  1: [1, 2, 3], // Visuals relate to directing attention, avoiding distraction, conceptualisation
  2: [2, 4],    // Production value relates to distraction and personal connection
  3: [1, 5],    // Angles relate to directing attention and navigation/control
  4: [1, 3],    // Animations relate to directing attention and conceptualisation
  5: [5, 2],    // Length relates to navigation and processing load
  6: [1, 2],    // Transitions relate to attention and distraction
  7: [4],       // Scripts relate to personal connection
  8: [5],       // Speed relates to learner control
  9: [4, 6],    // Face relates to personal connection and balancing needs
  10: [4],      // Eye contact relates to personal connection
  11: [4],      // Actors relate to personal connection
  12: [2, 4, 6],// Asides relate to load, personal connection and learner context
  13: [3],      // Story relates to conceptualisation/integration
  14: [2, 5],   // Pre-roll relates to distraction and navigation
  15: [5]       // Presentation relates to learner control
};

const QuestionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const questionId = parseInt(id || '0', 10);

  // Flatten the nested data structure to find the question
  const questionData = useMemo(() => {
    for (const category of questionsData) {
      const found = category.questions.find(q => q.id === questionId);
      if (found) {
        return { ...found, categoryName: category.title };
      }
    }
    return null;
  }, [questionId]);

  const relatedTasks = useMemo(() => {
    const taskIds = questionTaskMap[questionId] || [];
    return tasksData.filter(t => taskIds.includes(t.id));
  }, [questionId]);

  const relatedPrinciples = useMemo(() => {
    if (!questionData?.relatedPrincipleIds) return [];
    return mayerPrinciples.filter(p => questionData.relatedPrincipleIds?.includes(p.id));
  }, [questionData]);

  if (!questionData) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-slate-800">Question not found</h2>
        <button 
          onClick={() => navigate('/questions')}
          className="mt-4 text-indigo-600 hover:underline"
        >
          Return to Questions
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in max-w-6xl mx-auto">
      {/* Back Navigation */}
      <button 
        onClick={() => navigate('/questions')}
        className="group flex items-center text-slate-500 hover:text-indigo-600 mb-8 transition-colors font-medium"
      >
        <div className="p-1.5 rounded-full bg-white border border-slate-200 group-hover:border-indigo-300 mr-2 transition-colors">
            <ArrowLeft size={16} />
        </div>
        Back to all questions
      </button>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
            <div className="bg-slate-50 border-b border-slate-100 px-8 py-6 flex items-center gap-4 relative">
                
                {/* Action Buttons */}
                <div className="absolute top-6 right-6">
                    <ActionButtons 
                        id={`q-${questionData.id}`}
                        type="Question" 
                        title={`Question ${questionData.id}: ${questionData.question}`} 
                        allowEmbed={true}
                    />
                </div>

                <span className="flex-shrink-0 w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center font-bold text-xl shadow-md">
                    {questionData.id}
                </span>
                <div className="pr-12">
                    <span className="text-xs font-bold text-indigo-500 uppercase tracking-wider">
                        {questionData.categoryName}
                    </span>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight mt-1">
                        {questionData.question}
                    </h1>
                </div>
            </div>
            
            <div className="p-8 md:p-10">
                <div className="flex items-start gap-4 mb-6">
                    <MessageCircle size={24} className="text-indigo-400 mt-1 shrink-0" />
                    <div className="prose prose-lg prose-slate max-w-none">
                        {questionData.answer.map((paragraph, idx) => (
                            <p key={idx} dangerouslySetInnerHTML={{ __html: paragraph }} className="mb-4 last:mb-0 leading-relaxed text-slate-700" />
                        ))}
                    </div>
                </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-80 shrink-0 space-y-6">

          {/* Special Link for Question 15 */}
          {questionId === 15 && (
            <div className="bg-gradient-to-br from-indigo-50 to-white rounded-xl p-6 border border-indigo-200 shadow-sm animate-in fade-in slide-in-from-right-4 duration-500">
                <h4 className="font-bold text-indigo-900 mb-3 flex items-center gap-2">
                    <Monitor size={20} className="text-indigo-600" /> 
                    Platform Comparison
                </h4>
                <p className="text-sm text-indigo-800 mb-5 leading-relaxed">
                    View a detailed comparison of platforms like YouTube, Panopto, and LinkedIn Learning in the context of student access.
                </p>
                <button 
                    onClick={() => navigate('/platforms')}
                    className="w-full py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                >
                    Compare Platforms <ArrowRight size={16} />
                </button>
            </div>
          )}
          
          {/* Relevant Tasks */}
          <div>
            <div className="flex items-center gap-2 mb-4 text-slate-800">
                <CheckSquare className="text-indigo-600" size={20} />
                <h3 className="font-bold text-lg">Relevant Tasks</h3>
            </div>
            
            {relatedTasks.length > 0 ? (
                <div className="space-y-4">
                    {relatedTasks.map(task => (
                        <div 
                            key={task.id}
                            className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all group"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded">
                                    Task {task.id}
                                </span>
                                <ArrowRight size={16} className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
                            </div>
                            <h4 className="font-bold text-slate-800 mb-2 leading-tight group-hover:text-indigo-700 transition-colors">
                                {task.title}
                            </h4>
                            <p className="text-sm text-slate-500 line-clamp-3 mb-3">
                                {task.description}
                            </p>
                            <button 
                                onClick={() => navigate('/tasks')} 
                                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 uppercase tracking-wide"
                            >
                                View Task Details
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-slate-50 rounded-xl p-6 text-center border border-slate-200 text-slate-500 italic text-sm">
                    General advice applicable to all tasks.
                </div>
            )}
            
            <div className="mt-8 bg-slate-50 rounded-xl p-6 border border-slate-200">
                <h4 className="font-bold text-slate-700 mb-2 flex items-center gap-2">
                    <HelpCircle size={16} /> Need more context?
                </h4>
                <p className="text-sm text-slate-600 mb-4">
                    Check out the 6 Tasks framework to understand the core principles behind these answers.
                </p>
                <button 
                    onClick={() => navigate('/tasks')}
                    className="w-full py-2 bg-white border border-slate-300 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-100 transition-colors shadow-sm"
                >
                    Go to 6 Tasks
                </button>
            </div>
          </div>

          {/* Related Principles */}
          {relatedPrinciples.length > 0 && (
             <div className="pt-6 border-t border-slate-200">
                 <div className="flex items-center gap-2 mb-4 text-slate-800">
                    <Brain className="text-indigo-600" size={20} />
                    <h3 className="font-bold text-lg">Relevant Principles</h3>
                 </div>
                 <div className="space-y-2">
                    {relatedPrinciples.map(p => (
                        <button
                            key={p.id}
                            onClick={() => navigate(`/principles/${p.id}`)}
                            className="w-full text-left bg-white p-3 rounded-lg border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all flex justify-between items-center group"
                        >
                            <span className="text-sm font-bold text-slate-700 group-hover:text-indigo-700 transition-colors">{p.name}</span>
                            <ArrowRight size={14} className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
                        </button>
                    ))}
                 </div>
             </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default QuestionDetail;
