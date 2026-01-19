import React from 'react';
import { useBookmarks } from '../context/BookmarkContext';
import { Bookmark, ArrowRight, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Bookmarks: React.FC = () => {
  const { bookmarks, removeBookmark } = useBookmarks();
  const navigate = useNavigate();

  if (bookmarks.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center animate-fade-in">
         <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
            <Bookmark size={40} />
         </div>
         <h1 className="text-3xl font-bold text-slate-800 mb-4">No bookmarks yet</h1>
         <p className="text-slate-600 mb-8 max-w-md mx-auto">
            You can bookmark any task, question, principle, or resource by clicking the bookmark icon found on those pages.
         </p>
         <button 
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors"
         >
            Browse Guide
         </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in max-w-5xl mx-auto">
       <div className="flex items-center gap-3 mb-8">
           <div className="p-2 bg-indigo-100 text-indigo-700 rounded-lg">
               <Bookmark size={24} />
           </div>
           <h1 className="text-3xl font-bold text-slate-900">Saved Content</h1>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bookmarks.map((item) => (
             <div key={item.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all group relative cursor-pointer" onClick={() => navigate(item.path)}>
                 <div className="pr-10">
                    <span className="text-xs font-bold text-indigo-500 uppercase tracking-wider mb-1 block">
                        {item.type}
                    </span>
                    <h3 className="text-lg font-bold text-slate-800 group-hover:text-indigo-700 transition-colors">
                        {item.title}
                    </h3>
                 </div>
                 
                 <button 
                    onClick={(e) => { e.stopPropagation(); removeBookmark(item.id); }}
                    className="absolute top-4 right-4 p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Remove bookmark"
                 >
                    <Trash2 size={18} />
                 </button>

                 <div className="mt-4 flex items-center text-sm font-bold text-slate-400 group-hover:text-indigo-600 transition-colors">
                    View <ArrowRight size={16} className="ml-1" />
                 </div>
             </div>
          ))}
       </div>
    </div>
  );
};

export default Bookmarks;
