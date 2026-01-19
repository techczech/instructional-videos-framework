import React, { useState, useRef } from 'react';
import { learningTips, reflectionData } from '../data/platforms';
import { 
  BookOpen, Brain, GraduationCap, Settings, MessageCircle, 
  Lightbulb, ArrowRight, ArrowLeft, LayoutList, Layers,
  Eye, EyeOff
} from 'lucide-react';
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation';
import ActionButtons from '../components/ActionButtons';

const LearningTips: React.FC = () => {
  const [viewMode, setViewMode] = useState<'scroll' | 'step'>('scroll');
  const [activeStep, setActiveStep] = useState(0);
  const [focusMode, setFocusMode] = useState(false);
  const [activeTipIndex, setActiveTipIndex] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  // Normalize Reflection Data to match TipSection structure for consistent rendering in Step mode
  const reflectionAsStep = {
    id: 'reflection',
    title: reflectionData.title,
    intro: reflectionData.content,
    tips: [],
    outro: '',
    icon: 'MessageCircle',
    color: 'violet'
  };

  const allSections = [...learningTips, reflectionAsStep];
  const totalSteps = allSections.length;

  const getIcon = (iconName: string) => {
    switch(iconName) {
      case 'Brain': return Brain;
      case 'GraduationCap': return GraduationCap;
      case 'Settings': return Settings;
      case 'BookOpen': return BookOpen;
      case 'MessageCircle': return MessageCircle;
      default: return Lightbulb;
    }
  };

  const getColorClasses = (color: string) => {
    switch(color) {
      case 'emerald': return {
        bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-800', 
        iconBg: 'bg-emerald-100', icon: 'text-emerald-600', accent: 'bg-emerald-600',
        bullet: 'bg-emerald-100 text-emerald-700'
      };
      case 'blue': return {
        bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800', 
        iconBg: 'bg-blue-100', icon: 'text-blue-600', accent: 'bg-blue-600',
        bullet: 'bg-blue-100 text-blue-700'
      };
      case 'amber': return {
        bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-800', 
        iconBg: 'bg-amber-100', icon: 'text-amber-600', accent: 'bg-amber-600',
        bullet: 'bg-amber-100 text-amber-700'
      };
      case 'violet': return {
        bg: 'bg-violet-50', border: 'border-violet-200', text: 'text-violet-900', 
        iconBg: 'bg-white', icon: 'text-violet-600', accent: 'bg-violet-600',
        bullet: 'bg-violet-100 text-violet-700'
      };
      default: return { // indigo
        bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-800', 
        iconBg: 'bg-indigo-100', icon: 'text-indigo-600', accent: 'bg-indigo-600',
        bullet: 'bg-indigo-100 text-indigo-700'
      };
    }
  };

  const scrollToTop = () => {
    setTimeout(() => topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  };

  const handleNext = () => {
    const currentSection = allSections[activeStep];
    const hasMoreTips = currentSection.tips && currentSection.tips.length > 0 && activeTipIndex < currentSection.tips.length - 1;

    if (viewMode === 'step' && focusMode && hasMoreTips) {
        setActiveTipIndex(prev => prev + 1);
        return;
    }

    if (activeStep < totalSteps - 1) {
      setActiveStep(prev => prev + 1);
      setActiveTipIndex(-1); // Reset tip progress for new section
      scrollToTop();
    }
  };

  const handlePrev = () => {
    if (viewMode === 'step' && focusMode && activeTipIndex > -1) {
        setActiveTipIndex(prev => prev - 1);
        return;
    }

    if (activeStep > 0) {
      setActiveStep(prev => prev - 1);
      // When going back, show all tips of the previous section so user sees context
      const prevSection = allSections[activeStep - 1];
      setActiveTipIndex(prevSection.tips ? prevSection.tips.length - 1 : -1);
      scrollToTop();
    }
  };

  const handleFirst = () => {
    setActiveStep(0);
    setActiveTipIndex(-1);
    scrollToTop();
  };

  const handleLast = () => {
    setActiveStep(totalSteps - 1);
    setActiveTipIndex(-1);
    scrollToTop();
  };

  const handleModeChange = (mode: 'scroll' | 'step') => {
    setViewMode(mode);
    if (mode === 'step') {
      setActiveStep(0);
      setActiveTipIndex(-1);
    }
  };

  const toggleFocusMode = () => {
    setFocusMode(!focusMode);
    // When toggling ON, reset to intro (-1) to start "fresh" focus. 
    // When toggling OFF, typically show all.
    setActiveTipIndex(!focusMode ? -1 : 999); 
  };

  useKeyboardNavigation({
    isEnabled: viewMode === 'step',
    onNext: handleNext,
    onPrev: handlePrev,
    onFirst: handleFirst,
    onLast: handleLast
  });

  const renderSectionContent = (section: any, idx: number, isStepView: boolean) => {
    const Icon = getIcon(section.icon);
    const colors = getColorClasses(section.color);
    const isReflection = section.id === 'reflection';
    
    // In scroll mode, show all. In step mode, check focus mode.
    // If Focus Mode is OFF, show all (slice to end). If ON, slice to activeTipIndex.
    const visibleTipsCount = (!isStepView || !focusMode) ? section.tips.length : activeTipIndex + 1;
    const visibleTips = section.tips.slice(0, visibleTipsCount);

    return (
      <div 
        key={section.id} 
        id={`section-${idx}`}
        className={`bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden transition-all duration-500 ${isStepView ? 'min-h-[600px] flex flex-col' : 'mb-12'}`}
      >
        {/* Header */}
        <div className={`px-6 py-6 md:px-10 md:py-8 border-b ${colors.bg} ${colors.border}`}>
            <div className="flex items-start gap-5">
              <div className={`p-3 rounded-xl shrink-0 ${colors.iconBg} ${colors.icon} shadow-sm`}>
                  <Icon size={32} />
              </div>
              <div>
                  <span className={`text-xs font-bold uppercase tracking-wider mb-2 block ${colors.icon}`}>
                      {isReflection ? 'Final Thoughts' : `Part ${idx + 1}`}
                  </span>
                  <h2 className={`text-2xl md:text-3xl font-bold ${colors.text} leading-tight`}>
                      {section.title}
                  </h2>
              </div>
            </div>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-10 flex-grow">
            {/* Intro */}
            <div className="prose prose-lg prose-slate max-w-none text-slate-600 leading-relaxed mb-10">
                {section.intro.map((para: string, i: number) => (
                    <p key={i} dangerouslySetInnerHTML={{ __html: para }} className="mb-4 last:mb-0" />
                ))}
            </div>

            {/* Tips List */}
            {section.tips.length > 0 && (
              <div className="grid gap-6">
                  {visibleTips.map((tip: any, tIdx: number) => (
                      <div key={tIdx} className="flex gap-4 md:gap-6 bg-slate-50 p-5 rounded-xl border border-slate-100 hover:border-indigo-200 transition-colors animate-in fade-in slide-in-from-bottom-2 duration-300">
                          <div className={`flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full font-bold text-sm md:text-base shrink-0 mt-1 ${colors.bullet}`}>
                              {tIdx + 1}
                          </div>
                          <div>
                              <h3 className="text-lg font-bold text-slate-900 mb-2">{tip.title}</h3>
                              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                                  {tip.content}
                              </p>
                          </div>
                      </div>
                  ))}
                  
                  {isStepView && focusMode && visibleTipsCount < section.tips.length && (
                      <div className="bg-slate-50/50 border border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center text-slate-400">
                          <p className="text-sm font-semibold mb-2">Tip {visibleTipsCount + 1} is hidden</p>
                          <button 
                             onClick={() => setActiveTipIndex(prev => prev + 1)}
                             className="text-indigo-600 hover:text-indigo-800 font-bold text-sm flex items-center gap-1"
                          >
                             Reveal Next Tip <ArrowRight size={14} />
                          </button>
                      </div>
                  )}
              </div>
            )}

            {/* Outro - Only show if all tips are visible or if in scroll mode */}
            {section.outro && (visibleTipsCount === section.tips.length) && (
              <div className={`mt-10 p-5 rounded-xl border ${colors.bg} ${colors.border} flex gap-4 text-slate-700 animate-in fade-in slide-in-from-bottom-2 duration-500`}>
                 <Brain size={20} className={`shrink-0 mt-1 ${colors.icon}`} />
                 <div className="text-sm md:text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: section.outro }} />
              </div>
            )}
        </div>
      </div>
    );
  };

  // Helper to determine next button text
  const getNextButtonText = () => {
      if (viewMode === 'step' && focusMode) {
          const currentSection = allSections[activeStep];
          if (currentSection.tips && activeTipIndex < currentSection.tips.length - 1) {
              return "Next Tip";
          }
      }
      return activeStep === totalSteps - 1 ? 'Finished' : 'Next Section';
  };

  return (
    <div className="animate-fade-in max-w-5xl mx-auto pb-20" ref={topRef}>
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
           <div className="flex items-center gap-3 mb-4">
               <div className="p-2 bg-indigo-100 text-indigo-700 rounded-lg">
                   <Lightbulb size={24} />
               </div>
               <h1 className="text-3xl font-bold text-slate-900">Effective Learning Tips</h1>
            </div>
            <p className="text-lg text-slate-600 max-w-2xl">
               Strategies for students to manage cognitive load, revise effectively, and get the most out of instructional videos.
            </p>
        </div>

        {/* View Toggle */}
        <div className="flex flex-col gap-3 shrink-0 self-start md:self-auto items-end">
             <div className="mb-2">
                 <ActionButtons 
                    id="tips-overview" 
                    type="Section" 
                    title="15 Tips for Effective Learning from Videos" 
                    path="/learning-tips"
                    allowEmbed={true}
                />
             </div>

            <div className="bg-slate-100 p-1.5 rounded-xl flex">
                <button 
                    onClick={() => handleModeChange('scroll')}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all
                    ${viewMode === 'scroll' 
                        ? 'bg-white text-indigo-600 shadow-sm' 
                        : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                    }`}
                >
                    <LayoutList size={18} />
                    Scroll View
                </button>
                <button 
                    onClick={() => handleModeChange('step')}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all
                    ${viewMode === 'step' 
                        ? 'bg-white text-indigo-600 shadow-sm' 
                        : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                    }`}
                >
                    <Layers size={18} />
                    Step by Step
                </button>
            </div>

            {viewMode === 'step' && (
                <button 
                    onClick={toggleFocusMode}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all border
                        ${focusMode
                            ? 'bg-indigo-50 border-indigo-200 text-indigo-700' 
                            : 'bg-white border-slate-200 text-slate-500 hover:border-indigo-300 hover:text-indigo-600'
                        }`}
                >
                    {focusMode ? <Eye size={14} /> : <EyeOff size={14} />}
                    Focus Mode: {focusMode ? 'ON' : 'OFF'}
                </button>
            )}
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === 'scroll' ? (
        <div className="space-y-12" ref={scrollRef}>
           {allSections.map((section, idx) => renderSectionContent(section, idx, false))}
        </div>
      ) : (
        <div className="relative">
           {/* Step Progress Bar */}
           <div className="mb-6 bg-slate-100 rounded-full h-2 overflow-hidden flex">
              {allSections.map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-full transition-all duration-300 ${i <= activeStep ? 'bg-indigo-500' : 'bg-transparent'}`}
                    style={{ width: `${100 / totalSteps}%` }}
                  />
              ))}
           </div>
           
           <div className="flex justify-between items-center text-sm font-bold text-slate-400 mb-4 uppercase tracking-wider">
              <span>Step {activeStep + 1} of {totalSteps}</span>
              <span className="text-slate-800">{allSections[activeStep].title}</span>
           </div>

           {/* Active Step Content */}
           <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              {renderSectionContent(allSections[activeStep], activeStep, true)}
           </div>

           {/* Navigation Buttons */}
           <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-200">
               <button 
                 onClick={handlePrev}
                 disabled={activeStep === 0 && (!focusMode || activeTipIndex <= -1)}
                 className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all
                    ${activeStep === 0 && (!focusMode || activeTipIndex <= -1)
                      ? 'bg-slate-50 text-slate-300 cursor-not-allowed' 
                      : 'bg-white border border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600 shadow-sm'
                    }`}
               >
                  <ArrowLeft size={20} /> Previous
               </button>

               <div className="hidden md:flex gap-2">
                   {allSections.map((_, i) => (
                      <button 
                        key={i}
                        onClick={() => {
                            setActiveStep(i);
                            setActiveTipIndex(-1);
                        }}
                        className={`w-3 h-3 rounded-full transition-colors ${i === activeStep ? 'bg-indigo-600' : 'bg-slate-200 hover:bg-indigo-300'}`}
                        aria-label={`Go to step ${i + 1}`}
                      />
                   ))}
               </div>

               <button 
                 onClick={handleNext}
                 disabled={activeStep === totalSteps - 1 && (!focusMode || activeTipIndex >= allSections[activeStep].tips.length - 1)}
                 className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all shadow-md
                    ${activeStep === totalSteps - 1 && (!focusMode || activeTipIndex >= allSections[activeStep].tips.length - 1)
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none' 
                      : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg'
                    }`}
               >
                  {getNextButtonText()} <ArrowRight size={20} />
               </button>
           </div>

            <div className="text-center text-xs text-slate-400 mt-6">
                Keyboard Navigation: ← / → : Prev/Next | Home / End : First/Last
            </div>
        </div>
      )}

    </div>
  );
};

export default LearningTips;
