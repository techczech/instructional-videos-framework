import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Command, CheckSquare, HelpCircle, Brain, PenTool, FileText, Layout, Lightbulb, BookOpen, Layers, Home, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { searchContent } from '../utils/search';
import { SearchResult } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const IconMap: Record<string, any> = {
  'Task': CheckSquare,
  'Question': HelpCircle,
  'Principle': Brain,
  'Tool': PenTool,
  'Resource': FileText,
  'Slide Design': Layout,
  'Learning Tip': Lightbulb,
  'Comparison': BookOpen,
  'Cognitive Principle': Layers,
  'Section Intro': Info,
  'General': Home
};

const GlobalSearch: React.FC<Props> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  useEffect(() => {
    const res = searchContent(query);
    setResults(res);
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[selectedIndex]) {
        handleSelect(results[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleSelect = (result: SearchResult) => {
    navigate(result.path);
    onClose();
    setQuery('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center pt-16 md:pt-24 px-4 animate-in fade-in duration-200">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] border border-slate-200">
        <div className="flex items-center p-4 border-b border-slate-100 gap-3">
          <Search className="text-slate-400" size={20} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search tasks, questions, principles..."
            className="flex-1 text-lg outline-none text-slate-800 placeholder:text-slate-400 bg-transparent"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="overflow-y-auto p-2 custom-scrollbar">
          {results.length > 0 ? (
            <div className="space-y-1">
              {results.map((result, idx) => {
                 const Icon = IconMap[result.type] || ArrowRight;
                 return (
                    <button
                      key={result.id}
                      onClick={() => handleSelect(result)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full text-left p-3 rounded-lg flex items-start gap-4 transition-colors ${
                        idx === selectedIndex ? 'bg-indigo-50' : 'hover:bg-slate-50'
                      }`}
                    >
                      <div className={`mt-1 p-2 rounded-lg shrink-0 ${
                        idx === selectedIndex ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-500'
                      }`}>
                        <Icon size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`font-bold truncate ${idx === selectedIndex ? 'text-indigo-900' : 'text-slate-800'}`}>
                            {result.title}
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded shrink-0">
                            {result.type}
                          </span>
                        </div>
                        <p className={`text-sm line-clamp-1 ${idx === selectedIndex ? 'text-indigo-700' : 'text-slate-500'}`}>
                          {result.snippet}
                        </p>
                      </div>
                    </button>
                 );
              })}
            </div>
          ) : query.length > 1 ? (
            <div className="text-center py-12 text-slate-500">
              <p>No results found for "{query}"</p>
            </div>
          ) : (
            <div className="text-center py-16 text-slate-400">
              <Command size={48} className="mx-auto mb-4 opacity-10" />
              <p>Type to search across the entire guide</p>
            </div>
          )}
        </div>
        
        <div className="p-3 bg-slate-50 border-t border-slate-100 text-[10px] md:text-xs text-slate-400 flex justify-between items-center hidden sm:flex">
            <span>
                <kbd className="font-sans px-1.5 py-0.5 bg-white border border-slate-300 rounded-md mx-1 shadow-sm">↑</kbd>
                <kbd className="font-sans px-1.5 py-0.5 bg-white border border-slate-300 rounded-md mx-1 shadow-sm">↓</kbd> 
                to navigate
            </span>
            <span>
                <kbd className="font-sans px-1.5 py-0.5 bg-white border border-slate-300 rounded-md mx-1 shadow-sm">Enter</kbd> 
                to select
            </span>
        </div>
      </div>
    </div>
  );
};

export default GlobalSearch;