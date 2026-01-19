
import React from 'react';
import { Book, ExternalLink } from 'lucide-react';
import { readingsData } from '../data/readings';
import { uiContent } from '../data/uiContent';
import ActionButtons from '../components/ActionButtons';

const Readings: React.FC = () => {
  return (
    <div className="animate-fade-in max-w-3xl mx-auto">
      <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-4">
            <div className="flex items-center gap-3">
               <div className="p-2 bg-indigo-100 text-indigo-700 rounded-lg">
                   <Book size={24} />
               </div>
               <h1 className="text-3xl font-bold text-slate-900">Further readings</h1>
            </div>
            <ActionButtons 
                id="readings-overview" 
                type="Section" 
                title="Further Readings and References" 
                path="/readings"
                allowEmbed={true}
            />
          </div>
          <p className="text-lg text-slate-600" dangerouslySetInnerHTML={{ __html: readingsData.intro }} />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
           <div className="space-y-6 text-slate-600 leading-relaxed">
             <p>
               The complete list of references is too extensive for a practical guide. They can be found in the public group <a href={readingsData.referencesLink} className="text-indigo-600 font-medium hover:underline inline-flex items-center" target="_blank" rel="noreferrer">
                  {readingsData.referencesLink} <ExternalLink size={14} className="ml-1" />
               </a>.
             </p>

             <div className="pt-2">
               <h3 className="font-bold text-slate-800 mb-4">{readingsData.keyReferencesTitle}</h3>
               <ul className="space-y-4">
                 {readingsData.references.map((ref, idx) => (
                    <li key={idx} className="pl-4 border-l-4 border-indigo-100 hover:border-indigo-300 transition-colors">
                        {ref.text}
                        {ref.link && (
                            <>
                                <br />
                                <a href={ref.link} className="text-indigo-600 font-medium hover:underline break-all inline-flex items-center mt-1" target="_blank" rel="noreferrer">
                                {ref.link} <ExternalLink size={12} className="ml-1" />
                                </a>
                            </>
                        )}
                    </li>
                 ))}
               </ul>
             </div>
           </div>
      </div>
    </div>
  );
};

export default Readings;
