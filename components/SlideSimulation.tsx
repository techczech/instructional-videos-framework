import React from 'react';
import { ThumbsDown, ThumbsUp, Layout, Shuffle, Leaf, Users, Anchor, Bitcoin } from 'lucide-react';
import { SlideSimulationProps } from '../types';

const SlideSimulation: React.FC<SlideSimulationProps> = ({ variant, data, caption, feedback }) => {
  
  const renderContent = () => {
    switch (variant) {
      case 'text-heavy':
        return (
          <div className="bg-white border-2 border-rose-200 rounded-xl shadow-sm aspect-video p-6 relative flex flex-col mb-4">
             <div className="absolute top-4 right-4 text-rose-500"><ThumbsDown className="w-8 h-8" /></div>
             <h4 className="text-lg font-bold text-indigo-900 mb-4 leading-tight w-3/4">{data.title}</h4>
             <ul className="space-y-2 text-xs text-slate-600 flex-1 overflow-hidden">
               {data.items?.map((item, i) => (
                 <li key={i} className="flex items-start"><span className="mr-2 text-indigo-500">▶</span>{item}</li>
               ))}
             </ul>
             <div className="text-xs text-slate-300 text-right mt-2">Slide 1 of 1</div>
          </div>
        );
      case 'structured-sequence':
        return (
          <div className="grid grid-cols-2 gap-4 mb-4">
             {/* Intro Slide */}
             <div className="bg-white border border-slate-200 rounded-lg shadow-sm aspect-video flex items-center justify-center p-4 relative">
                <h4 className="text-indigo-900 font-bold text-center">{data.labels?.[0]}</h4>
                <span className="absolute bottom-2 right-2 text-[8px] text-slate-400">Intro</span>
             </div>
             {/* Summary Slide */}
             <div className="bg-white border border-slate-200 rounded-lg shadow-sm aspect-video p-3 relative flex flex-col items-center justify-center">
                <div className="grid grid-cols-3 gap-2 w-full">
                   {[Layout, Shuffle, Leaf, Users, Anchor, Bitcoin].map((Icon, i) => (
                     <div key={i} className="flex flex-col items-center">
                       <Icon className="w-3 h-3 text-emerald-500 mb-1" />
                       <div className="h-1 w-6 bg-slate-200 rounded"></div>
                     </div>
                   ))}
                </div>
                <span className="absolute bottom-2 right-2 text-[8px] text-slate-400">Summary</span>
             </div>
             {/* Detail Slide 1 */}
             <div className="bg-white border border-slate-200 rounded-lg shadow-sm aspect-video p-4 flex items-center col-span-2 relative">
                 <Layout className="w-12 h-12 text-indigo-900 mr-6 flex-shrink-0" />
                 <div>
                   <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Point 1</p>
                   <p className="text-sm font-bold text-slate-800 leading-tight">Leverage <span className="text-indigo-600">agile frameworks</span> to provide a robust synopsis.</p>
                 </div>
                 <div className="absolute top-2 right-2 text-emerald-500"><ThumbsUp className="w-5 h-5" /></div>
             </div>
          </div>
        );
      case 'small-graphic':
        return (
           <div className="bg-white border-2 border-rose-200 rounded-xl shadow-sm aspect-video p-6 relative flex flex-col mb-4">
              <div className="absolute top-4 right-4 text-rose-500"><ThumbsDown className="w-8 h-8" /></div>
              <h4 className="text-sm font-bold text-indigo-900 mb-2">{data.title}</h4>
              <div className="flex-1 flex flex-col items-center justify-center py-2">
                 <div className="flex items-center justify-center space-x-2">
                    <div className="w-16 h-12 bg-amber-400 rounded flex items-center justify-center text-[8px] font-bold">Point 1</div>
                    <div className="w-8 h-2 bg-slate-300"></div>
                    <div className="w-16 h-12 bg-amber-400 rounded flex items-center justify-center text-[8px] font-bold">Point 2</div>
                 </div>
              </div>
              <p className="text-[10px] text-slate-500 leading-tight">
                {data.items?.[0]}
              </p>
           </div>
        );
      case 'zoomed-graphic':
        return (
           <div className="bg-white border-2 border-emerald-200 rounded-xl shadow-sm aspect-video p-8 relative flex items-center justify-center mb-4 overflow-hidden">
              <div className="absolute top-4 right-4 text-emerald-500"><ThumbsUp className="w-8 h-8" /></div>
              <div className="flex items-center justify-center space-x-8 w-full">
                 <div className="w-32 h-32 bg-indigo-900 rounded-full flex flex-col items-center justify-center text-white shadow-lg">
                    <span className="text-lg font-bold">Point 1</span>
                    <div className="w-8 h-1 bg-indigo-400 mt-2 mb-1"></div>
                    <span className="text-[8px] opacity-70">Subpoint</span>
                 </div>
                 <div className="flex flex-col space-y-2">
                    <div className="w-16 h-6 bg-slate-300 rounded-r-full"></div>
                    <div className="w-16 h-6 bg-slate-300 rounded-l-full self-end"></div>
                 </div>
                 <div className="w-32 h-32 bg-indigo-900 rounded-full flex flex-col items-center justify-center text-white shadow-lg">
                    <span className="text-lg font-bold">Point 2</span>
                    <div className="w-8 h-1 bg-indigo-400 mt-2 mb-1"></div>
                    <span className="text-[8px] opacity-70">Subpoint</span>
                 </div>
              </div>
           </div>
        );
      case 'split-attention':
        return (
           <div className="bg-white border-2 border-rose-200 rounded-xl shadow-sm aspect-video p-6 relative flex mb-4">
              <div className="absolute top-4 right-4 text-rose-500 z-10"><ThumbsDown className="w-8 h-8" /></div>
              <div className="w-1/2 pr-4 flex flex-col justify-center">
                 <h4 className="text-sm font-bold text-indigo-900 mb-3">{data.title}</h4>
                 <ul className="space-y-2 text-[10px] text-slate-600">
                   {data.items?.map((item, i) => (
                     <li key={i} className="flex items-start"><span className="mr-1 text-indigo-500">▶</span>{item}</li>
                   ))}
                 </ul>
              </div>
              <div className="w-1/2 h-full bg-slate-200 rounded-lg overflow-hidden relative">
                 <img 
                   src={data.imageSrc}
                   alt="Example" 
                   className="w-full h-full object-cover opacity-80"
                 />
              </div>
           </div>
        );
      case 'immersive':
        return (
           <div className="bg-white border-2 border-emerald-200 rounded-xl shadow-sm aspect-video relative flex items-center mb-4 overflow-hidden group">
              <img 
                   src={data.imageSrc}
                   alt="Example zoomed" 
                   className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-slate-900/40"></div>
              
              <div className="absolute top-4 right-4 text-emerald-400 z-10"><ThumbsUp className="w-8 h-8" /></div>
              
              <div className="relative z-10 ml-8 bg-white/90 backdrop-blur-sm p-6 rounded-lg max-w-[60%] shadow-xl">
                 <h4 className="text-2xl font-bold text-slate-900 mb-1">{data.title}</h4>
                 <p className="text-xs text-slate-500 uppercase tracking-wider">{data.labels?.[0]}</p>
              </div>
           </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full">
      {renderContent()}
      <p className={`font-medium text-sm text-center mt-auto ${feedback === 'negative' ? 'text-rose-700' : 'text-emerald-700'}`}>
        {caption}
      </p>
    </div>
  );
};

export default SlideSimulation;