import React from 'react';
import { ProsConsRow } from '../types';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

interface Props {
  title: string;
  data: ProsConsRow[];
  color: 'indigo' | 'emerald';
}

const ComparisonTable: React.FC<Props> = ({ title, data, color }) => {
  const themeClass = color === 'indigo' ? 'border-indigo-100 bg-indigo-50/30' : 'border-emerald-100 bg-emerald-50/30';
  const headerClass = color === 'indigo' ? 'text-indigo-700 bg-indigo-50' : 'text-emerald-700 bg-emerald-50';

  return (
    <div className="mb-12 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
      <div className={`px-6 py-4 border-b border-slate-200 ${headerClass}`}>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm md:text-base">
          <thead>
            <tr className="border-b border-slate-200 bg-white">
              <th className="px-6 py-4 font-semibold text-slate-900 w-1/4">Mode</th>
              <th className="px-6 py-4 font-semibold text-slate-900 w-1/3">
                <div className="flex items-center gap-2 text-emerald-600">
                   <ThumbsUp size={18} /> Pros
                </div>
              </th>
              <th className="px-6 py-4 font-semibold text-slate-900 w-1/3">
                 <div className="flex items-center gap-2 text-rose-600">
                   <ThumbsDown size={18} /> Cons
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-100">
            {data.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-6 font-bold text-slate-800 align-top">{row.label}</td>
                <td className="px-6 py-6 align-top">
                  <ul className="space-y-3">
                    {row.pros.map((p, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1.5 block w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
                        <span className="text-slate-600">{p}</span>
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="px-6 py-6 align-top">
                   <ul className="space-y-3">
                    {row.cons.map((c, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1.5 block w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0"></span>
                        <span className="text-slate-600">{c}</span>
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparisonTable;