import React, { useState } from 'react';
import FactoryMap from './components/FactoryMap';
import ZoneDetails from './components/ZoneDetails';
import { Zone } from './types';
import { FACTORY_ZONES, TOUR_STEPS } from './constants';
import { LayoutDashboard, Zap, Settings, Bell, PlayCircle, ChevronRight } from 'lucide-react';

function App() {
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const [tourStepIndex, setTourStepIndex] = useState<number | null>(null);
  const [hasEntered, setHasEntered] = useState(false);

  // Start the interactive tour
  const startTour = () => {
    setTourStepIndex(0);
    const firstStep = TOUR_STEPS[0];
    const zone = FACTORY_ZONES.find(z => z.id === firstStep.zoneId);
    if (zone) {
      setSelectedZone(zone);
    }
  };

  // Handle next step in the tour
  const handleNextStep = () => {
    if (tourStepIndex === null) return;

    const nextIndex = tourStepIndex + 1;
    if (nextIndex < TOUR_STEPS.length) {
      setTourStepIndex(nextIndex);
      const nextStep = TOUR_STEPS[nextIndex];
      const zone = FACTORY_ZONES.find(z => z.id === nextStep.zoneId);
      if (zone) {
        setSelectedZone(zone);
      }
    } else {
      // End of tour
      setTourStepIndex(null);
      setSelectedZone(null);
    }
  };

  // Handle closing the modal (also exits tour)
  const handleClose = () => {
    setSelectedZone(null);
    setTourStepIndex(null);
  };

  return (
    <div className="relative h-screen bg-[#050914] text-white overflow-hidden selection:bg-emerald-500/30 font-sans">
      
      {/* Welcome Overlay */}
      <div className={`absolute inset-0 z-50 flex flex-col items-center justify-center transition-all duration-1000 ${hasEntered ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="absolute inset-0 bg-[#050914]/30"></div> {/* Reduced opacity to see blurred background better */}
        
        <div className="relative z-10 text-center space-y-8 p-8 max-w-5xl">
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both">
            <h2 className="text-2xl md:text-3xl text-slate-300 font-light tracking-[0.2em] uppercase">Welcome to the</h2>
            <h1 className="text-5xl md:text-8xl font-bold text-white tracking-tight leading-none drop-shadow-[0_0_50px_rgba(16,185,129,0.4)]">
              FACTORY OF THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">FUTURE</span>
            </h1>
          </div>

          <div className="pt-10 animate-in fade-in zoom-in duration-1000 delay-300 fill-mode-both flex flex-col items-center">
            <button 
              onClick={() => setHasEntered(true)}
              className="group relative inline-flex items-center justify-center px-12 py-5 text-xl font-bold text-white transition-all duration-500 bg-emerald-600/20 border border-emerald-500/50 rounded-full hover:bg-emerald-500 hover:scale-105 hover:shadow-[0_0_60px_rgba(16,185,129,0.6)] focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              <span className="mr-3 tracking-widest">ENTER SIMULATION</span>
              <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
            </button>
            <p className="mt-6 text-xs text-slate-500 font-mono uppercase tracking-[0.3em] opacity-60">Powered by Gemini 3.0 Pro Preview</p>
          </div>
        </div>
      </div>

      {/* Main Content Wrapper - Blurred when not entered */}
      <div className={`flex h-full w-full transition-all duration-1000 ease-in-out ${!hasEntered ? 'blur-xl scale-110 opacity-40' : 'blur-0 scale-100 opacity-100'}`}>
        
        {/* Sidebar Navigation */}
        <div className="w-16 md:w-20 border-r border-slate-800 flex flex-col items-center py-8 gap-8 bg-[#0B1121]">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <span className="font-bold text-lg">P</span>
          </div>
          
          <nav className="flex flex-col gap-6 w-full items-center">
            <button className="p-3 rounded-xl bg-slate-800/50 text-emerald-400 shadow-inner"><LayoutDashboard size={20} /></button>
            <button className="p-3 rounded-xl text-slate-500 hover:text-slate-300 hover:bg-slate-800/50 transition-colors"><Zap size={20} /></button>
            <button className="p-3 rounded-xl text-slate-500 hover:text-slate-300 hover:bg-slate-800/50 transition-colors"><Bell size={20} /></button>
            <button className="p-3 rounded-xl text-slate-500 hover:text-slate-300 hover:bg-slate-800/50 transition-colors"><Settings size={20} /></button>
          </nav>

          <div className="mt-auto text-[10px] text-slate-600 font-mono rotate-180 whitespace-nowrap" style={{ writingMode: 'vertical-rl' }}>
            v2.4.0-beta
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col relative">
          
          {/* Top Header */}
          <header className="h-16 border-b border-slate-800 flex items-center justify-between px-8 bg-[#0B1121]">
            <div>
              <h1 className="text-lg font-semibold tracking-tight text-white">Factory of the Future <span className="text-slate-500 font-normal mx-2">/</span> Supply Chain View</h1>
            </div>
            
            <div className="flex items-center gap-6">
              {tourStepIndex === null ? (
                <button 
                  onClick={startTour}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-full transition-colors shadow-lg shadow-indigo-500/20"
                >
                  <PlayCircle size={16} /> Start Interactive Tour
                </button>
              ) : (
                <div className="flex items-center gap-2 px-4 py-2 bg-indigo-900/50 border border-indigo-500/30 rounded-full">
                  <span className="text-indigo-300 text-xs font-bold uppercase tracking-wider">Tour Active</span>
                  <span className="w-1 h-1 bg-indigo-500 rounded-full"></span>
                  <span className="text-xs text-white">Step {tourStepIndex + 1} of {TOUR_STEPS.length}</span>
                </div>
              )}
              
              <div className="h-6 w-px bg-slate-800"></div>

              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/20 border border-emerald-500/20">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-xs font-medium text-emerald-400">Live Connection</span>
              </div>
              
              <div className="hidden lg:flex gap-4 text-xs font-mono text-slate-400">
                <div>OEE: <span className="text-white">87.4%</span></div>
                <div>Energy: <span className="text-white">124 kWh</span></div>
              </div>
            </div>
          </header>

          {/* Map Area */}
          <main className="flex-1 p-6 relative overflow-hidden">
            <FactoryMap 
              onZoneSelect={(zone) => {
                setSelectedZone(zone);
              }} 
              selectedZoneId={selectedZone?.id} 
            />
          </main>

          {/* Details Panel (Slide Over) */}
          {selectedZone && (
            <ZoneDetails 
              zone={selectedZone} 
              onClose={handleClose}
              tourStep={
                tourStepIndex !== null && TOUR_STEPS[tourStepIndex].zoneId === selectedZone.id 
                  ? TOUR_STEPS[tourStepIndex] 
                  : undefined
              }
              onNextTourStep={handleNextStep}
              isLastTourStep={tourStepIndex !== null && tourStepIndex === TOUR_STEPS.length - 1}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;