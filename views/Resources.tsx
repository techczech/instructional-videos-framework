import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  FileText, PlayCircle, ChevronLeft, ChevronRight, List, 
  ChevronDown, SkipBack, SkipForward, LayoutList, RectangleHorizontal
} from 'lucide-react';
import { resourceCategories } from '../data/resources';
import { VideoItem, ResourceCategory } from '../types';
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation';
import ActionButtons from '../components/ActionButtons';

// --- Sub-components ---

const VideoCard: React.FC<{ video: VideoItem }> = ({ video }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const getYoutubeId = (url: string) => {
    const match = url.match(/\/embed\/([^/?]+)/);
    return match ? match[1] : null;
  };

  const videoId = getYoutubeId(video.url);
  const thumbnailUrl = videoId 
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` 
    : 'https://via.placeholder.com/640x360?text=No+Thumbnail';

  return (
    <div className="flex flex-col h-full bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative aspect-video bg-slate-900 overflow-hidden">
        {!isPlaying ? (
          <button 
            onClick={() => setIsPlaying(true)}
            className="w-full h-full relative flex items-center justify-center group"
            aria-label={`Play video: ${video.title || 'Instructional Video'}`}
          >
            <img 
              src={thumbnailUrl} 
              alt={video.title} 
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
              loading="lazy"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
              <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                <PlayCircle className="text-indigo-600 w-10 h-10 ml-1" />
              </div>
            </div>
          </button>
        ) : (
          <iframe
            src={`${video.url}?autoplay=1`}
            title={video.title || "Video player"}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          ></iframe>
        )}
      </div>
      
      {(video.title || video.description) && (
        <div className="p-5 flex-grow">
          {video.title && <h4 className="font-bold text-slate-800 text-lg mb-2">{video.title}</h4>}
          {video.description && <p className="text-slate-600 leading-relaxed text-sm md:text-base">{video.description}</p>}
        </div>
      )}
    </div>
  );
};

const TitleSlide: React.FC<{ 
  category: ResourceCategory; 
  categories: ResourceCategory[]; 
  onNavigate: (index: number) => void;
  id?: string;
  dataIndex?: number;
}> = ({ category, categories, onNavigate, id, dataIndex }) => {
  return (
    <div 
      id={id}
      data-index={dataIndex}
      className="scroll-mt-6 relative w-full min-h-[550px] rounded-2xl overflow-hidden flex flex-col items-center justify-center text-center p-8 md:p-12 text-white isolate shadow-lg mb-12"
    >
        {/* Background Image */}
        <img 
            src="https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=2070" 
            alt="Background" 
            className="absolute inset-0 w-full h-full object-cover -z-10"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-slate-900/70 -z-10 backdrop-blur-[2px]"></div>

        <div className="max-w-4xl mx-auto z-10 flex flex-col h-full justify-center w-full">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-white drop-shadow-sm">{category.heading}</h2>
            <p className="text-xl md:text-2xl text-indigo-100 mb-12 leading-relaxed font-light drop-shadow-sm">
                {category.content}
            </p>

            <div className="bg-black/30 backdrop-blur-md rounded-xl p-6 border border-white/10 text-left w-full mx-auto shadow-2xl">
                <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-wider mb-4 border-b border-white/10 pb-2 flex items-center gap-2">
                    <List size={16} /> In this slideshow
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                    {categories.slice(1).map((cat, i) => (
                        <button 
                            key={i}
                            onClick={() => onNavigate(i + 1)}
                            className="text-indigo-50 hover:text-white hover:bg-white/10 rounded-lg px-3 py-2 text-sm truncate text-left flex items-center gap-3 transition-colors w-full"
                        >
                            <span className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center text-[10px] shrink-0 font-bold">{i + 2}</span>
                            <span className="truncate">{cat.heading}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
};

const ContentSlide: React.FC<{
  category: ResourceCategory;
  index: number;
  viewMode: 'slide' | 'list';
  id?: string;
  dataIndex?: number;
}> = ({ category, index, viewMode, id, dataIndex }) => {
  const isList = viewMode === 'list';
  
  return (
    <div 
      id={id}
      data-index={dataIndex}
      className={`rounded-2xl p-6 md:p-10 border border-slate-200 shadow-sm transition-all duration-300 relative group/slide ${isList ? 'bg-white scroll-mt-6 mb-12' : 'bg-slate-50 min-h-[500px]'}`}
    >
        {isList && (
            <div className="absolute top-6 right-6">
                <ActionButtons 
                    id={`resource-${index}`}
                    type="Resource"
                    title={`Video Example: ${category.heading}`}
                    path={`/resources?slide=${index}`}
                    allowEmbed={true}
                />
            </div>
        )}

        <div className={`mb-8 ${isList ? 'border-b border-slate-100 pb-6' : ''}`}>
            <h2 className={`text-2xl md:text-3xl font-bold text-slate-900 mb-4 flex items-center gap-3 pr-16`}>
               {isList && (
                   <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 text-sm font-bold shrink-0">
                       {index + 1}
                   </span>
               )}
               {category.heading}
            </h2>
            {category.content && (
                <div className={`text-lg text-slate-600 leading-relaxed ${isList ? 'pl-0 md:pl-11' : 'border-l-4 border-indigo-200 pl-4'}`}>
                  {category.content}
                </div>
            )}
        </div>

        {category.videos.length > 0 ? (
            <div className={`grid gap-6 ${category.videos.length === 1 && !isList ? 'max-w-3xl mx-auto' : isList ? 'pl-0 md:pl-11 grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2'}`}>
                {category.videos.map((video, idx) => (
                    <VideoCard key={`${index}-${idx}`} video={video} />
                ))}
            </div>
        ) : (
             <div className={`bg-white border border-slate-200 border-dashed rounded-xl p-12 text-center text-slate-400 ${isList ? 'ml-0 md:ml-11 bg-slate-50' : ''}`}>
                <PlayCircle size={48} className="mx-auto mb-4 opacity-50" />
                <p>No videos available for this category.</p>
            </div>
        )}
    </div>
  );
}

// --- Main Component ---

const Resources: React.FC = () => {
  // Navigation & State
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'slide' | 'list'>('slide');

  // Derive active index from URL params for permalinking/embedding support
  const indexParam = searchParams.get('slide');
  const activeIndex = useMemo(() => {
     const idx = parseInt(indexParam || '0', 10);
     return isNaN(idx) ? 0 : Math.max(0, Math.min(idx, resourceCategories.length - 1));
  }, [indexParam]);

  const activeCategory = resourceCategories[activeIndex];
  const totalSlides = resourceCategories.length;

  // Slide View State
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // List View State
  const [activeSectionId, setActiveSectionId] = useState<number>(0);

  // Handle click outside to close dropdown (Slide Mode)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Intersection Observer for List Mode
  useEffect(() => {
    if (viewMode !== 'list') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0', 10);
            setActiveSectionId(index);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );

    resourceCategories.forEach((_, idx) => {
      const el = document.getElementById(`list-section-${idx}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [viewMode]);

  // Synchronize view modes when switching
  useEffect(() => {
      if (viewMode === 'list') {
          // When switching to list, try to scroll to the active slide
          setTimeout(() => {
              scrollToListSection(activeIndex);
          }, 100);
      } else {
          // When switching to slide, sync URL to active section from list
          setSearchParams({ slide: activeSectionId.toString() }, { replace: true });
      }
  }, [viewMode]);

  // Navigation Functions
  const goToSlide = (index: number) => {
    setSearchParams({ slide: index.toString() });
    setIsMenuOpen(false);
    if (viewMode === 'slide') {
      topRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const nextSlide = () => {
    const newIndex = (activeIndex + 1) % totalSlides;
    goToSlide(newIndex);
  };

  const prevSlide = () => {
    const newIndex = (activeIndex - 1 + totalSlides) % totalSlides;
    goToSlide(newIndex);
  };

  const goToFirst = () => goToSlide(0);
  const goToLast = () => goToSlide(totalSlides - 1);

  // Enable keyboard navigation only in slide mode
  useKeyboardNavigation({
    isEnabled: viewMode === 'slide',
    onNext: nextSlide,
    onPrev: prevSlide,
    onFirst: goToFirst,
    onLast: goToLast
  });

  // List Navigation Functions
  const scrollToListSection = (index: number) => {
      const el = document.getElementById(`list-section-${index}`);
      if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          setActiveSectionId(index);
      }
  };

  const navBtnClass = "p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-indigo-600 transition-colors disabled:opacity-30";

  return (
    <div className="animate-fade-in relative max-w-[1600px] mx-auto" ref={topRef}>
      
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-indigo-100 text-indigo-700 rounded-lg">
                    <FileText size={24} />
                </div>
                <h1 className="text-3xl font-bold text-slate-900">Video Examples</h1>
            </div>
            <p className="text-lg text-slate-600 max-w-3xl">
                Browse a curated selection of instructional videos demonstrating different production values, styles, and pedagogic approaches.
            </p>
          </div>

          <div className="bg-slate-100 p-1.5 rounded-xl flex shrink-0 self-start md:self-auto items-center">
             <button 
                onClick={() => setViewMode('slide')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all
                  ${viewMode === 'slide' 
                    ? 'bg-white text-indigo-600 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                  }`}
             >
                <RectangleHorizontal size={18} />
                Slideshow
             </button>
             <button 
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all
                  ${viewMode === 'list' 
                    ? 'bg-white text-indigo-600 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                  }`}
             >
                <LayoutList size={18} />
                View as List
             </button>
             
             {/* Slide mode generic share button */}
             <div className="border-l border-slate-300 ml-2 pl-2">
                 <ActionButtons 
                    id={`resource-${activeIndex}`}
                    type="Resource"
                    title={`Video Example: ${activeCategory.heading}`}
                    path={`/resources?slide=${activeIndex}`}
                    allowEmbed={true}
                />
             </div>
          </div>
      </div>

      {viewMode === 'slide' ? (
        // ================= SLIDE VIEW =================
        <div className="max-w-6xl mx-auto">
            {/* Top Navigation Bar */}
            <div className="relative flex items-center justify-between bg-white p-2 md:p-4 rounded-xl border border-slate-200 shadow-sm mb-6 sticky top-4 z-40 xl:relative xl:top-0 xl:z-40">
                
                <div className="flex items-center gap-1 md:gap-2">
                    <button 
                    onClick={goToFirst}
                    className={navBtnClass}
                    title="First slide (Home)"
                    disabled={activeIndex === 0}
                    >
                    <SkipBack size={20} />
                    </button>
                    <button 
                    onClick={prevSlide}
                    className={navBtnClass}
                    title="Previous slide (Left Arrow)"
                    >
                    <ChevronLeft size={20} />
                    </button>
                </div>

                {/* Title / Menu Trigger */}
                <div className="flex-1 mx-2 relative">
                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="w-full flex flex-col items-center px-2 py-1 rounded-lg hover:bg-slate-50 transition-colors group"
                        aria-expanded={isMenuOpen}
                        aria-haspopup="true"
                    >
                        <span className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1 group-hover:text-indigo-500 transition-colors">
                            Slide {activeIndex + 1} of {totalSlides}
                        </span>
                        <div className="flex items-center justify-center gap-2 w-full">
                            <span className="font-bold text-slate-800 text-center line-clamp-1 text-sm md:text-base">
                                {activeCategory.heading}
                            </span>
                            <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 ${isMenuOpen ? 'rotate-180 text-indigo-500' : ''}`} />
                        </div>
                    </button>

                    {/* Dropdown Menu */}
                    {isMenuOpen && (
                        <div 
                            ref={menuRef}
                            className="absolute top-full left-1/2 -translate-x-1/2 w-[90vw] md:w-96 mt-4 bg-white rounded-xl shadow-xl border border-slate-200 max-h-[60vh] overflow-y-auto z-50 custom-scrollbar animate-in fade-in slide-in-from-top-2 duration-200"
                        >
                            <div className="sticky top-0 bg-slate-50 p-3 border-b border-slate-100 flex justify-between items-center">
                                <span className="text-xs font-bold text-slate-500 uppercase">Select a slide</span>
                                <button onClick={() => setIsMenuOpen(false)} className="text-slate-400 hover:text-slate-600">
                                    <ChevronDown size={16} className="rotate-180" />
                                </button>
                            </div>
                            <div className="p-2">
                                {resourceCategories.map((cat, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => goToSlide(idx)}
                                        className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center gap-3 mb-1
                                            ${activeIndex === idx 
                                            ? 'bg-indigo-50 text-indigo-700' 
                                            : 'text-slate-600 hover:bg-slate-50'
                                            }`}
                                    >
                                        <span className={`text-xs font-bold w-6 shrink-0 ${activeIndex === idx ? 'text-indigo-400' : 'text-slate-300'}`}>
                                            {idx + 1}.
                                        </span>
                                        <span className="line-clamp-1">{cat.heading}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-1 md:gap-2">
                    <button 
                    onClick={nextSlide}
                    className={navBtnClass}
                    title="Next slide (Right Arrow)"
                    >
                    <ChevronRight size={20} />
                    </button>
                    <button 
                    onClick={goToLast}
                    className={navBtnClass}
                    title="Last slide (End)"
                    disabled={activeIndex === totalSlides - 1}
                    >
                    <SkipForward size={20} />
                    </button>
                </div>
            </div>

            {/* Render Active Slide */}
            <div className="min-h-[600px]">
                {activeIndex === 0 ? (
                    <TitleSlide 
                      category={activeCategory} 
                      categories={resourceCategories} 
                      onNavigate={goToSlide} 
                    />
                ) : (
                    <ContentSlide 
                      category={activeCategory} 
                      index={activeIndex} 
                      viewMode="slide" 
                    />
                )}
            </div>

            {/* Bottom Navigation Buttons */}
            <div className="flex justify-between mt-8">
                <button 
                    onClick={prevSlide}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600 shadow-sm transition-all"
                >
                    <ChevronLeft size={20} /> Previous
                </button>
                <div className="text-xs text-slate-400 flex flex-col justify-center text-center px-4 hidden sm:flex">
                  <span>Keyboard Navigation:</span>
                  <span>← / → : Prev/Next | Home / End : First/Last</span>
                </div>
                <button 
                    onClick={nextSlide}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all"
                >
                    Next <ChevronRight size={20} />
                </button>
            </div>
            
            <div className="mt-12 text-center text-slate-500 text-sm">
                <p>
                    Content adapted from <a href="https://oxford.h5p.com/content/1290815414980542397" target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline">H5P Instructional Videos</a>.
                </p>
            </div>
        </div>
      ) : (
        // ================= LIST VIEW =================
        <div className="flex flex-col 2xl:flex-row gap-12 relative items-start">
             {/* List Content */}
             <div className="flex-1 min-w-0 pb-24 mx-auto w-full max-w-5xl">
                
                {/* Mobile/Tablet Sticky Dropdown Header */}
                <div className="sticky top-4 z-40 mb-8 2xl:hidden" ref={menuRef}>
                    <div className="bg-white/95 backdrop-blur-sm border border-slate-200 shadow-md rounded-xl p-2 relative">
                         <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="w-full flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg transition-colors"
                        >
                            <div className="flex items-center gap-3 overflow-hidden">
                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 text-sm font-bold shrink-0">
                                    {activeSectionId + 1}
                                </div>
                                <div className="text-left truncate">
                                    <div className="text-[10px] uppercase tracking-wider font-bold text-slate-400 leading-none mb-1">
                                        Current Section
                                    </div>
                                    <div className="font-bold text-slate-800 truncate text-sm sm:text-base">
                                        {resourceCategories[activeSectionId].heading}
                                    </div>
                                </div>
                            </div>
                            <ChevronDown size={20} className={`text-slate-400 transition-transform duration-200 shrink-0 ${isMenuOpen ? 'rotate-180 text-indigo-500' : ''}`} />
                        </button>

                         {/* Dropdown Menu */}
                        {isMenuOpen && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-200 max-h-[60vh] overflow-y-auto z-50 custom-scrollbar animate-in fade-in slide-in-from-top-2 duration-200">
                                <div className="p-2">
                                    {resourceCategories.map((cat, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => {
                                                scrollToListSection(idx);
                                                setIsMenuOpen(false);
                                            }}
                                            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center gap-3 mb-1
                                                ${activeSectionId === idx 
                                                ? 'bg-indigo-50 text-indigo-700' 
                                                : 'text-slate-600 hover:bg-slate-50'
                                                }`}
                                        >
                                            <span className={`text-xs font-bold w-6 shrink-0 ${activeSectionId === idx ? 'text-indigo-400' : 'text-slate-300'}`}>
                                                {idx + 1}.
                                            </span>
                                            <span className="line-clamp-1">{cat.heading}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {resourceCategories.map((category, idx) => {
                  if (idx === 0) {
                    return (
                      <TitleSlide 
                        key={idx}
                        id={`list-section-${idx}`}
                        dataIndex={idx}
                        category={category}
                        categories={resourceCategories}
                        onNavigate={(targetIndex) => scrollToListSection(targetIndex)}
                      />
                    );
                  }
                  return (
                    <ContentSlide 
                      key={idx}
                      id={`list-section-${idx}`}
                      dataIndex={idx}
                      category={category} 
                      index={idx} 
                      viewMode="list" 
                    />
                  );
                })}

                <div className="text-center text-slate-500 text-sm pt-8">
                    <p>
                        Content adapted from <a href="https://oxford.h5p.com/content/1290815414980542397" target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline">H5P Instructional Videos</a>.
                    </p>
                </div>
             </div>

             {/* Floating ToC (List View Sidebar) */}
             <div className="hidden 2xl:block w-72 shrink-0">
                <div className="sticky top-6 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col max-h-[calc(100vh-40px)]">
                    <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
                        <List size={18} className="text-slate-400" />
                        <h3 className="font-bold text-slate-700 text-sm uppercase tracking-wide">Contents</h3>
                    </div>
                    <div className="overflow-y-auto custom-scrollbar flex-1 p-2 space-y-1">
                        {resourceCategories.map((cat, idx) => {
                            const isActive = activeSectionId === idx;
                            return (
                                <button
                                    key={idx}
                                    onClick={() => scrollToListSection(idx)}
                                    className={`w-full text-left px-3 py-3 text-sm rounded-lg transition-all duration-200 flex items-start gap-3
                                        ${isActive 
                                            ? 'bg-indigo-600 text-white shadow-md' 
                                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                        }
                                    `}
                                >
                                    <span className={`shrink-0 flex items-center justify-center w-5 h-5 rounded text-xs font-bold mt-0.5
                                         ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}
                                    `}>
                                        {idx + 1}
                                    </span>
                                    <span className="leading-tight font-medium line-clamp-2">{cat.heading}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
             </div>
        </div>
      )}

    </div>
  );
};

export default Resources;
