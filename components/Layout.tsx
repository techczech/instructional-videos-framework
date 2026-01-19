
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Menu, X, Home, BookOpen, CheckSquare, HelpCircle, Database, Monitor, Brain, PenTool, FileText, ExternalLink, Book, Lightbulb, Layout as LayoutIcon, Layers, Search, Command, Download } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { NavItem } from '../types';
import { appInfo } from '../data/home';
import GlobalSearch from './GlobalSearch';
import { generateEpub } from '../utils/epubGenerator';

interface LayoutProps {
  children: React.ReactNode;
  navItems: NavItem[];
  currentPath: string;
  onNavigate: (path: string) => void;
  isSearchOpen: boolean;
  onSearchOpen: () => void;
  onSearchClose: () => void;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  navItems, 
  currentPath, 
  onNavigate,
  isSearchOpen,
  onSearchClose,
  onSearchOpen: propsOnSearchOpen
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const mainContentRef = useRef<HTMLElement>(null);
  const isHomePage = currentPath === '/';
  
  // Embed Mode Detection
  // 'content': Hides sidebar/header (classic embed for sections). Triggered by 'embed=true' or 'embed=content'.
  // 'full': Shows sidebar/header but keeps embed styling (white bg, etc). Triggered by 'embed=full'.
  // 'none': Standard app view.
  // We use useState with an initializer to ensure this "sticky" state persists across client-side navigations.
  const [embedMode] = useState<'none' | 'content' | 'full'>(() => {
    const href = window.location.href;
    if (href.includes('embed=full')) return 'full';
    if (href.includes('embed=true') || href.includes('embed=content')) return 'content';
    return 'none';
  });

  const shouldHideSidebar = embedMode === 'content';
  const isEmbedStyle = embedMode !== 'none';

  // Reset scroll position to top whenever the path changes
  useEffect(() => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTo(0, 0);
    }
  }, [currentPath]);

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        propsOnSearchOpen();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [propsOnSearchOpen]);

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setIsSidebarOpen(false);
  };

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
    'Scale': <BookOpen size={20} />,
    'CheckSquare': <CheckSquare size={20} />,
    'HelpCircle': <HelpCircle size={20} />,
    'Database': <Database size={20} />,
    'Monitor': <Monitor size={20} />,
    'Brain': <Brain size={20} />,
    'PenTool': <PenTool size={20} />,
    'FileText': <FileText size={20} />,
    'Book': <Book size={20} />,
    'Lightbulb': <Lightbulb size={20} />,
    'Layout': <LayoutIcon size={20} />,
    'Layers': <Layers size={20} />,
  };

  // Adjust padding for embed mode (both content and full)
  const contentContainerClass = isEmbedStyle 
    ? 'max-w-5xl mx-auto p-4 md:p-8 bg-white' // ensure white background and reduced padding for embed
    : isHomePage 
      ? 'max-w-7xl mx-auto p-6 md:p-12 lg:px-16 lg:py-16' 
      : 'max-w-5xl mx-auto p-6 md:p-12 pb-24';

  return (
    <div className={`min-h-screen bg-gray-50 flex flex-col md:flex-row font-sans text-slate-800 ${isEmbedStyle ? 'bg-white' : ''}`}>
      
      {!shouldHideSidebar && <GlobalSearch isOpen={isSearchOpen} onClose={onSearchClose} />}

      {/* Mobile Header - Hide on Home or if sidebar is hidden via embed */}
      {!isHomePage && !shouldHideSidebar && (
        <div className="md:hidden bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-50">
          <span className="font-bold text-lg text-indigo-700 cursor-pointer" onClick={() => handleNavClick('/')}>Instructional Videos</span>
          <div className="flex items-center gap-2">
             <button 
                onClick={propsOnSearchOpen} 
                className="p-2 text-gray-600 hover:bg-gray-100 rounded"
                aria-label="Search"
             >
                <Search size={24} />
             </button>
             <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-gray-600 hover:bg-gray-100 rounded">
                {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
             </button>
          </div>
        </div>
      )}

      {/* Sidebar Navigation - Hide on Home or if sidebar is hidden via embed */}
      {!isHomePage && !shouldHideSidebar && (
        <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-screen sticky top-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent cursor-pointer" onClick={() => handleNavClick('/')}>
                {appInfo.name}
              </h1>
          </div>
          
          <div className="px-4 py-4 space-y-2">
             <button 
               onClick={propsOnSearchOpen}
               className="w-full flex items-center justify-between bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-400 px-3 py-2 rounded-lg text-sm transition-colors"
             >
               <span className="flex items-center gap-2"><Search size={16} /> Search...</span>
               <div className="flex items-center gap-1 text-xs opacity-60">
                 <Command size={10} /> K
               </div>
             </button>
          </div>

          <nav className="px-4 pb-4 space-y-2 overflow-y-auto max-h-[calc(100vh-280px)] custom-scrollbar">
                <button 
                  onClick={() => handleNavClick('/')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-left ${currentPath === '/' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}
                >
                  <Home size={20} className="shrink-0" />
                  <span>Home</span>
                </button>

                <div className="pt-4 pb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider px-4">
                  Guide Sections
                </div>

                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.path)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-left ${currentPath === item.path ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}
                  >
                    <span className="shrink-0 flex items-center justify-center">
                      {IconMap[item.iconName] || <BookOpen size={20} />}
                    </span>
                    <span>{item.label}</span>
                  </button>
                ))}
          </nav>

          <div className="absolute bottom-0 left-0 w-full p-4 border-t border-slate-800 bg-slate-900">
             <button 
                onClick={handleExport}
                disabled={isExporting}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600/40 hover:text-white border border-indigo-500/30 p-2 rounded-lg text-sm font-bold transition-all mb-4"
             >
                {isExporting ? <span className="animate-pulse">Generating...</span> : <><Download size={16} /> Export as eBook</>}
             </button>
            <div className="text-xs text-slate-500 px-2">
              <p>&copy; {appInfo.year} {appInfo.author}</p>
              <p className="mt-1">{appInfo.license}</p>
              <a href="https://dominiklukes.net/" target="_blank" rel="noreferrer" className="flex items-center mt-2 hover:text-indigo-400 transition-colors">
                <ExternalLink size={12} className="mr-1" /> Visit Author
              </a>
            </div>
          </div>
        </aside>
      )}

      {/* Main Content */}
      <main ref={mainContentRef} className={`flex-1 overflow-y-auto h-screen relative ${isHomePage || isEmbedStyle ? 'bg-white' : ''}`}>
        <div className={contentContainerClass}>
          {children}
        </div>
      </main>
      
      {/* Overlay for mobile sidebar */}
      {!isHomePage && isSidebarOpen && !shouldHideSidebar && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;
