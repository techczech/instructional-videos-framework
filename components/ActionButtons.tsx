
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Bookmark, Share2, Code, Check, X, Copy, Link as LinkIcon, Sidebar } from 'lucide-react';
import { useBookmarks } from '../context/BookmarkContext';

interface ActionButtonsProps {
  id: string;
  type: string;
  title: string;
  path?: string; // If undefined, uses window.location.hash
  allowEmbed?: boolean;
  variant?: 'default' | 'glass';
  showBookmark?: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ 
  id, 
  type, 
  title, 
  path, 
  allowEmbed = true,
  variant = 'default',
  showBookmark = true
}) => {
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks();
  const [showModal, setShowModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedEmbed, setCopiedEmbed] = useState(false);
  const [includeNav, setIncludeNav] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (!showModal) {
        setIncludeNav(false);
        setCopiedEmbed(false);
        setCopiedLink(false);
    }
  }, [showModal]);

  const bookmarked = isBookmarked(id);
  
  // Construct absolute URL
  const currentHash = path || window.location.hash.substring(1); // remove # if present
  const fullLink = `${window.location.origin}${window.location.pathname}#${currentHash.startsWith('/') ? currentHash : '/' + currentHash}`;
  
  // Construct Embed Code
  // embed=full -> Shows sidebar (useful for embedding whole guide)
  // embed=true -> Hides sidebar (useful for embedding sections/content only)
  const embedParam = includeNav ? 'embed=full' : 'embed=true';
  const embedLink = `${fullLink}${fullLink.includes('?') ? '&' : '?'}${embedParam}`;
  const embedCode = `<iframe src="${embedLink}" width="100%" height="800" frameborder="0" allowfullscreen></iframe>`;

  const handleBookmark = () => {
    if (bookmarked) {
      removeBookmark(id);
    } else {
      addBookmark({ id, type, title, path: currentHash });
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(fullLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyEmbed = () => {
    navigator.clipboard.writeText(embedCode);
    setCopiedEmbed(true);
    setTimeout(() => setCopiedEmbed(false), 2000);
  };

  const getBookmarkClass = () => {
    if (variant === 'glass') {
      return bookmarked 
        ? 'bg-white text-indigo-900' 
        : 'bg-white/10 text-white hover:bg-white/20 border border-white/20';
    }
    return bookmarked 
      ? 'bg-amber-100 text-amber-600 hover:bg-amber-200' 
      : 'bg-white border border-slate-200 text-slate-400 hover:text-amber-500 hover:border-amber-300';
  };

  const getShareClass = () => {
    if (variant === 'glass') {
       return 'bg-white/10 text-white hover:bg-white/20 border border-white/20';
    }
    return 'bg-white border border-slate-200 text-slate-400 hover:text-indigo-600 hover:border-indigo-300';
  };

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 text-slate-800 font-sans">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
      <div className="relative bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
        <button 
            onClick={() => setShowModal(false)}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
        >
            <X size={20} />
        </button>

        <h3 className="text-xl font-bold text-slate-900 mb-1">Share Content</h3>
        <p className="text-sm text-slate-500 mb-6">"{title}"</p>

        {/* Direct Link Section */}
        <div className="mb-6">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            Direct Link
          </label>
          <div className="flex gap-2">
            <input 
              readOnly 
              value={fullLink} 
              className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleCopyLink}
              className={`px-3 py-2 rounded-lg font-bold text-sm transition-colors flex items-center gap-2 ${
                copiedLink ? 'bg-green-500 text-white' : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
               {copiedLink ? <Check size={16} /> : <LinkIcon size={16} />}
            </button>
          </div>
        </div>

        {/* Embed Section */}
        {allowEmbed && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                  <Code size={14} /> Embed in your LMS
                </label>
                
                <label className="flex items-center gap-2 cursor-pointer bg-slate-50 px-2 py-1 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors">
                    <input 
                        type="checkbox" 
                        className="w-4 h-4 rounded text-indigo-600 border-gray-300 focus:ring-indigo-500"
                        checked={includeNav}
                        onChange={(e) => setIncludeNav(e.target.checked)}
                    />
                    <span className="text-xs font-bold text-slate-600 flex items-center gap-1">
                        <Sidebar size={12} /> Include Sidebar
                    </span>
                </label>
            </div>
            
            <div className="relative group">
                <pre className="bg-slate-800 border border-slate-700 rounded-lg p-4 text-xs text-indigo-300 font-mono break-all whitespace-pre-wrap leading-relaxed overflow-x-hidden">
                    {embedCode}
                </pre>
                <button
                    onClick={handleCopyEmbed}
                    className={`absolute top-2 right-2 px-3 py-1.5 rounded-md text-xs font-bold transition-colors flex items-center gap-1 ${
                        copiedEmbed ? 'bg-green-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                >
                    {copiedEmbed ? 'Copied' : 'Copy'}
                </button>
            </div>
            <p className="mt-2 text-[10px] text-slate-400">
              {includeNav 
                ? "This code embeds the content with the sidebar navigation enabled, ideal for embedding the full guide."
                : "This code provides a clean view without the navigation sidebar, perfect for embedding specific sections."}
            </p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      <div className="flex items-center gap-2">
        {showBookmark && (
          <button
            onClick={handleBookmark}
            className={`p-2 rounded-lg transition-all ${getBookmarkClass()}`}
            title={bookmarked ? "Remove Bookmark" : "Bookmark this section"}
          >
            <Bookmark size={20} fill={bookmarked ? "currentColor" : "none"} />
          </button>
        )}

        <button
          onClick={() => setShowModal(true)}
          className={`p-2 rounded-lg transition-all ${getShareClass()}`}
          title="Share & Embed"
        >
          <Share2 size={20} />
        </button>
      </div>

      {showModal && mounted ? createPortal(modalContent, document.body) : null}
    </>
  );
};

export default ActionButtons;
