
import React from 'react';
import { platformComparisonTable } from '../data/platforms';
import { mayerPrinciples, mayerContext } from '../data/principles';
import { toolMatrix } from '../data/tools';
import { readingsData } from '../data/readings';
import { uiContent } from '../data/uiContent';
import { Database, Monitor, PenTool, Brain } from 'lucide-react';

const Appendices: React.FC = () => {
  return (
    <div className="animate-fade-in space-y-16 max-w-5xl mx-auto">
      
      <div className="border-b border-slate-200 pb-6">
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <Database className="text-indigo-600" /> {uiContent.headers.appendices}
          </h1>
          <p className="mt-2 text-slate-600 text-lg">Reference materials, principles, and technology comparisons.</p>
      </div>

      {/* Appendix 1: Platform Table */}
      <section>
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Monitor size={24} className="text-slate-400" />
            {platformComparisonTable.title}
        </h2>
        <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-sm">
          <table className="w-full text-sm">
             <thead className="bg-slate-50 text-slate-700">
                <tr>
                    {platformComparisonTable.headers.map((h, i) => (
                        <th key={i} className="px-4 py-4 text-left font-bold whitespace-nowrap">
                             {h}
                        </th>
                    ))}
                </tr>
             </thead>
             <tbody className="divide-y divide-slate-100 bg-white">
                {platformComparisonTable.rows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                        {row.map((cell, cIdx) => (
                             <td key={cIdx} className={`px-4 py-3 ${cIdx === 0 ? 'font-bold text-slate-800' : 'text-center'}`}>
                                 {cell}
                             </td>
                        ))}
                    </tr>
                ))}
             </tbody>
          </table>
        </div>
      </section>

      {/* Appendix 2: Mayer's Principles */}
      <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 md:p-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
             <Brain size={24} className="text-indigo-500" />
             {uiContent.headers.principles}
        </h2>
        <p className="text-slate-600 mb-6">{mayerContext.intro}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mayerPrinciples.map((p, idx) => (
                <div key={idx} className="bg-slate-50 rounded-lg p-5 border border-slate-100 hover:border-indigo-200 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-indigo-700">{p.name}</h3>
                        {p.effectSize && <span className="text-xs font-mono bg-white px-2 py-1 rounded border text-slate-400">ES: {p.effectSize}</span>}
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{p.definition}</p>
                </div>
            ))}
        </div>
      </section>

      {/* Appendix 3: Tool Matrix */}
      <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <PenTool size={24} className="text-slate-400" />
            Technology Tool Matrix
          </h2>
          <div className="grid grid-cols-1 gap-6">
              {toolMatrix.map((cat, idx) => (
                  <div key={idx} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                      <div className="bg-slate-50 px-6 py-4 border-b border-slate-100">
                          <h3 className="font-bold text-lg text-slate-900">{cat.type}</h3>
                          <div className="text-sm text-slate-500 mt-1" dangerouslySetInnerHTML={{ __html: cat.purpose }} />
                      </div>
                      <div className="p-6">
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Suggested Tools</h4>
                          <div className="space-y-1">
                              {cat.tools.map((tool, tIdx) => (
                                  <div key={tIdx} className={`text-sm text-slate-700 ${tool.trim().startsWith('·') ? 'pl-4' : ''}`}>
                                      <span dangerouslySetInnerHTML={{ __html: tool }} />
                                  </div>
                              ))}
                          </div>
                      </div>
                  </div>
              ))}
          </div>
      </section>

      <section className="bg-slate-900 text-slate-300 rounded-xl p-8">
           <h2 className="text-xl font-bold text-white mb-4">Examples</h2>
           <p className="mb-4">You can see examples of different types of instructions videos on <a href="https://oxford.h5p.com/content/1290815414980542397" className="text-indigo-400 hover:underline">Types of instructional videos - H5P.com</a>.</p>
           
           <h2 className="text-xl font-bold text-white mb-4 mt-8">References</h2>
           <p>The complete list of references is too extensive for a practical guide. They can be found in the public group <a href={readingsData.referencesLink} className="text-indigo-400 hover:underline">{readingsData.referencesLink}</a>.</p>
      </section>

    </div>
  );
};

export default Appendices;
