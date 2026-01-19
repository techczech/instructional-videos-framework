import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SlideSimulation from '../components/SlideSimulation';
import { slideDesignSections } from '../data/slideDesign';
import { Layout, LayoutList, Layers, ArrowLeft, ArrowRight } from 'lucide-react';
import { SlideDesignSection } from '../types';
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation';
import ActionButtons from '../components/ActionButtons';

const SlideDesign: React.FC = () => {
  const [viewMode, setViewMode] = useState<'scroll' | 'step'>('scroll');
  const [activeStep, setActiveStep] = useState(0);
  const topRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const totalSteps = slideDesignSections.length;

  useEffect(() => {
    // If hash exists, ensure we are in scroll mode and scroll to element
    if (location.hash && viewMode === 'scroll') {
      const id = location.hash.substring(1);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location.hash, viewMode]);

  const handleModeChange = (mode: 'scroll' | 'step') => {
    setViewMode(mode);
    if (mode === 'step') {
      setActiveStep(0);
    }
  };

  const scrollToTop = () => {
      setTimeout(() => topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  }

  const handleNext = () => {
    if (activeStep < totalSteps - 1) {
      setActiveStep(prev => prev + 1);
      scrollToTop();
    }
  };

  const handlePrev = () => {
    if (activeStep > 0) {
      setActiveStep(prev => prev - 1);
      scrollToTop();
    }
  };

  const handleFirst = () => {
    setActiveStep(0);
    scrollToTop();
  }

  const handleLast = () => {
    setActiveStep(totalSteps - 1);
    scrollToTop();
  }

  useKeyboardNavigation({
    isEnabled: viewMode === 'step',
    onNext: handleNext,
    onPrev: handlePrev,
    onFirst: handleFirst,
    onLast: handleLast
  });

  const renderSection = (section: SlideDesignSection, idx: number, isStepView: boolean) => (
    <div 
      key={section.id} 
      id={section.id} 
      className={`bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden scroll-mt-24 ${isStepView ? '' : 'mb-12'}`}
    >
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-6 md:px-10 md:py-8 flex justify-between items-start gap-4">
            <div className="flex items-start gap-4">
               <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center shrink-0 mt-1">
                 {idx + 1}
               </div>
               <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-3 leading-tight">{section.title}</h2>
                  <p className="text-lg text-slate-600 leading-relaxed max-w-4xl">
                      {section.description}
                  </p>
               </div>
            </div>
            
            <ActionButtons 
                id={`slide-${section.id}`}
                type="Slide Design"
                title={`Slide Design: ${section.title}`}
                path={`/slide-design#${section.id}`}
                allowEmbed={true}
            />
        </div>
        
        <div className="p-6 md:p-10 bg-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {section.examples.map((example, i) => (
                    <div key={i} className={`p-6 rounded-xl border transition-all hover:shadow-md ${
                        example.feedback === 'negative' 
                            ? 'bg-rose-50/50 border-rose-100' 
                            : 'bg-emerald-50/50 border-emerald-100'
                    }`}>
                        <div className="mb-4">
                            <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded ${
                                example.feedback === 'negative' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                            }`}>
                                {example.feedback === 'negative' ? 'Don\'t do this' : 'Do this instead'}
                            </span>
                        </div>
                        <SlideSimulation {...example} />
                    </div>
                ))}
            </div>
        </div>
    </div>
  );

  return (
    <div className="animate-fade-in max-w-6xl mx-auto pb-20" ref={topRef}>
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-100 text-indigo-700 rounded-lg">
                        <Layout size={24} />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900">Example of good slide design</h1>
                </div>
                 <ActionButtons 
                    id="slide-design-overview" 
                    type="Section" 
                    title="Example of Good Slide Design" 
                    path="/slide-design"
                    allowEmbed={true}
                />
            </div>
            <p className="text-lg text-slate-600 max-w-3xl mb-4">
                Designing slides for video is different from designing for print. Compare these effective and ineffective layouts to improve your instructional materials.
            </p>
            <p className="text-sm text-slate-500">
                Modified from <a href="https://readability.edutools.fyi/#slide-formatting-examples" target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline">readability.edutools.fyi</a>.
            </p>
          </div>

          <div className="bg-slate-100 p-1.5 rounded-xl flex shrink-0 self-start md:self-auto">
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
      </div>

      {/* Main Content */}
      {viewMode === 'scroll' ? (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {slideDesignSections.map((section, idx) => renderSection(section, idx, false))}
        </div>
      ) : (
        <div className="relative min-h-[600px]">
            {/* Progress Bar */}
            <div className="mb-6 bg-slate-100 rounded-full h-2 overflow-hidden flex">
              {slideDesignSections.map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-full transition-all duration-300 ${i <= activeStep ? 'bg-indigo-500' : 'bg-transparent'}`}
                    style={{ width: `${100 / totalSteps}%` }}
                  />
              ))}
           </div>
           
           <div className="flex justify-between items-center text-sm font-bold text-slate-400 mb-4 uppercase tracking-wider">
              <span>Step {activeStep + 1} of {totalSteps}</span>
           </div>

           <div className="animate-in fade-in slide-in-from-right-4 duration-300">
               {renderSection(slideDesignSections[activeStep], activeStep, true)}
           </div>

           {/* Navigation Buttons */}
           <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-200">
               <button 
                 onClick={handlePrev}
                 disabled={activeStep === 0}
                 className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all
                    ${activeStep === 0
                      ? 'bg-slate-50 text-slate-300 cursor-not-allowed' 
                      : 'bg-white border border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600 shadow-sm'
                    }`}
               >
                  <ArrowLeft size={20} /> Previous
               </button>

               <div className="hidden md:flex gap-2">
                   {slideDesignSections.map((_, i) => (
                      <button 
                        key={i}
                        onClick={() => setActiveStep(i)}
                        className={`w-3 h-3 rounded-full transition-colors ${i === activeStep ? 'bg-indigo-600' : 'bg-slate-200 hover:bg-indigo-300'}`}
                        aria-label={`Go to step ${i + 1}`}
                      />
                   ))}
               </div>

               <button 
                 onClick={handleNext}
                 disabled={activeStep === totalSteps - 1}
                 className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all shadow-md
                    ${activeStep === totalSteps - 1
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none' 
                      : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg'
                    }`}
               >
                  {activeStep === totalSteps - 1 ? 'Finished' : 'Next Example'} <ArrowRight size={20} />
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

export default SlideDesign;
