import React from 'react';
import { Layers, Battery, Zap } from 'lucide-react';
import ActionButtons from '../components/ActionButtons';

const CognitivePrinciples: React.FC = () => {
  return (
    <div className="animate-fade-in max-w-6xl mx-auto">
      <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
             <div className="flex items-center gap-3">
                 <div className="p-3 bg-indigo-100 text-indigo-700 rounded-xl">
                     <Layers size={32} />
                 </div>
                 <h1 className="text-4xl font-bold text-slate-900">3 Cognitive Learning Principles</h1>
             </div>
             <ActionButtons 
                id="cognitive-principles-overview" 
                type="Section" 
                title="3 Cognitive Learning Principles" 
                path="/cognitive-principles"
                allowEmbed={true}
            />
          </div>
          <p className="text-xl text-slate-600 mb-10 max-w-4xl leading-relaxed">
            Mayer (2011) also outlines three cognitive learning principles that are crucial to understanding the multimedia learning principles
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Principle 1 */}
              <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm flex flex-col hover:border-indigo-300 transition-colors">
                  <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
                      <Layers size={28} />
                  </div>
                  <h3 className="font-bold text-xl text-slate-900 mb-4">1. Dual channels</h3>
                  <p className="text-slate-600 leading-relaxed flex-grow">
                      “people have separate channels for processing verbal and visual information”;
                  </p>
              </div>

              {/* Principle 2 */}
              <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm flex flex-col hover:border-indigo-300 transition-colors">
                  <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-6">
                      <Battery size={28} />
                  </div>
                  <h3 className="font-bold text-xl text-slate-900 mb-4">2. Limited capacity</h3>
                  <p className="text-slate-600 leading-relaxed flex-grow">
                      “people can engage in only a limited amount of cognitive processing in each channel at one time”;
                  </p>
              </div>

              {/* Principle 3 */}
              <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm flex flex-col hover:border-indigo-300 transition-colors">
                  <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
                      <Zap size={28} />
                  </div>
                  <h3 className="font-bold text-xl text-slate-900 mb-4">3. Active learning</h3>
                  <p className="text-slate-600 leading-relaxed flex-grow">
                      “meaningful learning depends on the learner’s cognitive processing during learning , including attending to relevant material, mentally organizing the material into coherent representations, and integrating the representations with each other and with relevant material activated from long-term memory”
                  </p>
              </div>
          </div>
      </div>
    </div>
  );
};

export default CognitivePrinciples;
