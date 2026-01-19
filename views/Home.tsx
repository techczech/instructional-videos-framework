
import React, { useState } from 'react';
import { appInfo, navigationItems } from '../data/home';
import { uiContent } from '../data/uiContent';
import { ArrowRight, Video, GraduationCap, PlayCircle, BookOpen, CheckSquare, HelpCircle, Database, Monitor, Brain, PenTool, FileText, Book, Lightbulb, Layout as LayoutIcon, Layers, ExternalLink, Search, Command, Bookmark, Download } from 'lucide-react';
import { useBookmarks } from '../context/BookmarkContext';
import ActionButtons from '../components/ActionButtons';
import { generateEpub } from '../utils/epubGenerator';

interface Props {
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
}

const Home: React.FC<Props> = ({ onNavigate, onOpenSearch }) => {
  const { bookmarks } = useBookmarks();
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await generateEpub();
    } catch (error) {
      console.error("Export failed", error);
      alert("Failed to generate eBook. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  const IconMap: Record<string, React.ReactNode> = {
    'Scale': <BookOpen size={24} />,
    'CheckSquare': <CheckSquare size={24} />,
    'HelpCircle': <HelpCircle size={24} />,
    'Database': <Database size={24} />,
    'Monitor': <Monitor size={24} />,
    'Brain': <Brain size={24} />,
    'PenTool': <PenTool size={24} />,
    'FileText': <FileText size={24} />,
    'Book': <Book size={24} />,
    'Lightbulb': <Lightbulb size={24} />,
    'Layout': <LayoutIcon size={24} />,
    'Layers': <Layers size={24} />,
  };

  return (
    <div className="space-y-16 animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-8 md:p-16 lg:p-20 text-white shadow-xl relative overflow-hidden">
        
        {/* Top Right Controls */}
        <div className="absolute top-6 right-6 z-20 flex items-center gap-3">
             {/* Export Button */}
            <button 
                onClick={handleExport}
                disabled={isExporting}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-lg transition-all text-sm font-bold shadow-lg disabled:opacity-50"
                title="Download as ePub"
            >
                <Download size={18} /> 
                <span className="hidden sm:inline">{isExporting ? 'Generating...' : 'eBook'}</span>
            </button>

            {/* View Saved Content Button */}
            <button 
                onClick={() => onNavigate('/bookmarks')}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-lg transition-all text-sm font-bold shadow-lg"
                title="View Saved Content"
            >
                <Bookmark size={18} /> 
                <span className="hidden sm:inline">Saved</span>
                {bookmarks.length > 0 && (
                    <span className="bg-white text-indigo-600 text-[10px] px-1.5 py-0.5 rounded-full min-w-[1.2rem] text-center font-bold">
                        {bookmarks.length}
                    </span>
                )}
            </button>

            {/* Action Button for sharing the home page (Guide) */}
            <div className="flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-1 shadow-lg">
                 <ActionButtons 
                    id="guide-home" 
                    type="Guide" 
                    title={uiContent.home.heroTitle} 
                    path="/"
                    allowEmbed={true}
                    variant="glass"
                    showBookmark={false}
                 />
            </div>
        </div>

        {/* Decorative Circles */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-white opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-indigo-400 opacity-20 blur-3xl"></div>

        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center space-x-2 text-indigo-200 mb-6 uppercase tracking-widest text-xs font-bold">
            <GraduationCap size={16} />
            <span>{appInfo.title}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            {uiContent.home.heroTitle}
          </h1>
          <p className="text-lg md:text-xl text-indigo-100 mb-10 leading-relaxed max-w-xl">
            {appInfo.subtitle}. {appInfo.intro}
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-stretch gap-4">
             <button 
                onClick={() => onNavigate('/tasks')}
                className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold hover:bg-indigo-50 transition-colors flex items-center gap-2 shadow-lg text-lg"
             >
                {uiContent.home.startBtn} <ArrowRight size={20} />
             </button>
             <button 
                onClick={() => onNavigate('/pros-cons')}
                className="bg-indigo-700 bg-opacity-40 text-white border border-indigo-400 px-8 py-4 rounded-xl font-bold hover:bg-indigo-700 transition-colors backdrop-blur-sm text-lg"
             >
                {uiContent.home.whyVideoBtn}
             </button>
             <button 
                onClick={onOpenSearch}
                className="group relative bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-indigo-100 rounded-xl px-6 py-4 flex items-center justify-center transition-all shadow-lg"
                aria-label="Search"
             >
                 <Search size={24} />
                 <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-medium bg-black/60 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap flex items-center gap-1 pointer-events-none">
                    <Command size={10} /> K
                 </span>
             </button>
          </div>
        </div>
        
        {/* Hero Image / Graphic Placeholder */}
        <div className="hidden lg:block absolute right-16 top-1/2 transform -translate-y-1/2">
            <div className="w-80 h-64 bg-indigo-800 bg-opacity-30 rounded-2xl border-2 border-indigo-400/30 backdrop-blur-md flex items-center justify-center transform rotate-3 hover:rotate-0 transition-transform duration-500 shadow-2xl">
                <PlayCircle size={80} className="text-white opacity-50" />
            </div>
        </div>
      </section>

      {/* Navigation Grid */}
      <section>
        <div className="flex items-center justify-between mb-10">
             <h2 className="text-3xl font-bold text-slate-800">{uiContent.home.browseTitle}</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {navigationItems.map((item) => (
            <div 
              key={item.id}
              onClick={() => onNavigate(item.path)}
              className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-300 cursor-pointer group flex flex-col h-full"
            >
              <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors shadow-sm">
                 {IconMap[item.iconName] || <Video size={24} />}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">{item.label}</h3>
              <p className="text-slate-500 leading-relaxed mb-6 flex-grow">{item.description}</p>
              <div className="mt-auto flex items-center text-indigo-600 text-sm font-bold opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                Explore section <ArrowRight size={16} className="ml-2" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 rounded-3xl p-12 text-center border border-slate-100">
        <h3 className="text-xl font-bold text-slate-800 mb-3">{uiContent.home.aboutTitle}</h3>
        <p className="text-slate-500 max-w-2xl mx-auto mb-6 text-lg">
          Created by {appInfo.author} ({appInfo.year}). Licensed under {appInfo.license}.
        </p>
        <a href="https://dominiklukes.net/" target="_blank" rel="noreferrer" className="inline-flex items-center text-indigo-600 font-bold hover:text-indigo-800 transition-colors">
            {uiContent.home.visitAuthor} <ExternalLink size={16} className="ml-2" />
        </a>
      </section>
    </div>
  );
};

export default Home;
