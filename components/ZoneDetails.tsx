import React, { useEffect, useState } from 'react';
import { Zone, SimulationResponse, TourStep } from '../types';
import { generateZoneSimulation } from '../services/geminiService';
import { Activity, AlertTriangle, CheckCircle, RefreshCw, TrendingUp, TrendingDown, Minus, X, ArrowRight, MapPin, Play } from 'lucide-react';

interface ZoneDetailsProps {
  zone: Zone;
  onClose: () => void;
  tourStep?: TourStep;
  onNextTourStep?: () => void;
  isLastTourStep?: boolean;
}

const ZoneDetails: React.FC<ZoneDetailsProps> = ({ zone, onClose, tourStep, onNextTourStep, isLastTourStep }) => {
  const [loading, setLoading] = useState(false); // Don't load automatically on tour mode
  const [data, setData] = useState<SimulationResponse | null>(null);

  const fetchSimulation = async () => {
    setLoading(true);
    // If in tour mode, use the tour impact as the context for the simulation
    const context = tourStep ? tourStep.impact : undefined;
    const result = await generateZoneSimulation(zone.title, zone.description, context);
    setData(result);
    setLoading(false);
  };

  // Auto-load for non-tour mode
  useEffect(() => {
    if (!tourStep) {
      fetchSimulation();
    } else {
      // Reset data when changing tour steps so user sees the story first
      setData(null);
    }
  }, [zone, tourStep]);

  return (
    <div className="fixed inset-y-0 right-0 w-full md:w-[520px] bg-slate-900/95 backdrop-blur-xl border-l border-slate-700 shadow-2xl transform transition-transform duration-300 z-50 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-slate-700 flex justify-between items-start bg-slate-900/50">
        <div>
          {tourStep ? (
             <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded bg-indigo-600 text-white text-xs font-bold uppercase tracking-wider">
                  Stop {tourStep.stopNumber} / 5
                </span>
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">Guided Tour</span>
             </div>
          ) : (
            <div className="text-xs font-mono text-emerald-400 mb-1 uppercase tracking-wider">Active Zone</div>
          )}
          
          <h2 className="text-2xl font-bold text-white">{tourStep ? tourStep.title : zone.title}</h2>
          <p className="text-slate-400 text-sm mt-1">{tourStep ? tourStep.focus : zone.description}</p>
        </div>
        <button 
          onClick={onClose}
          className="text-slate-400 hover:text-white transition-colors p-1 hover:bg-slate-800 rounded"
        >
          <X size={24} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 relative">
        
        {/* Tour Story Card */}
        {tourStep && !data && !loading && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <div className="flex items-center gap-2 text-emerald-400 mb-3">
                <MapPin size={18} />
                <h3 className="font-semibold uppercase tracking-wide text-sm">Use Case</h3>
              </div>
              <p className="text-lg text-white font-medium leading-relaxed">
                {tourStep.useCase}
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
               <div className="flex items-center gap-2 text-blue-400 mb-3">
                <Activity size={18} />
                <h3 className="font-semibold uppercase tracking-wide text-sm">Impact</h3>
              </div>
              <p className="text-slate-300 leading-relaxed">
                {tourStep.impact}
              </p>
            </div>

            <div className="flex justify-center pt-4">
              <button 
                onClick={fetchSimulation}
                className="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full text-white font-bold shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 transition-all"
              >
                <span className="flex items-center gap-2">
                  <Play size={20} className="fill-current" /> Simulate This Scenario
                </span>
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-4 text-slate-400 animate-pulse">
            <RefreshCw className="animate-spin" size={32} />
            <p>Connecting to Factory AI Core...</p>
            {tourStep && <p className="text-xs text-slate-500">Generating scenario data based on tour parameters...</p>}
          </div>
        ) : data ? (
          <div className="animate-in fade-in duration-500 space-y-6">
             {tourStep && (
               <div className="bg-indigo-900/20 border border-indigo-500/30 p-3 rounded-lg mb-4">
                  <p className="text-xs text-indigo-300 uppercase font-bold mb-1">Active Scenario</p>
                  <p className="text-sm text-white">{tourStep.impact}</p>
               </div>
             )}

            {/* Status Overview */}
            <div className="grid grid-cols-2 gap-4">
              <div className={`glass-panel p-4 rounded-xl border-l-4 ${
                data.systemStatus === 'Optimal' ? 'border-emerald-500' : 
                data.systemStatus === 'Critical' ? 'border-red-500' : 
                data.systemStatus === 'Maintenance' ? 'border-orange-500' : 'border-amber-500'
              }`}>
                <div className="text-slate-400 text-xs uppercase">System Status</div>
                <div className={`text-xl font-bold mt-1 ${
                  data.systemStatus === 'Optimal' ? 'text-emerald-400' : 
                  data.systemStatus === 'Critical' ? 'text-red-400' : 
                  data.systemStatus === 'Maintenance' ? 'text-orange-400' : 'text-amber-400'
                }`}>
                  {data.systemStatus}
                </div>
              </div>
              <div className="glass-panel p-4 rounded-xl border-l-4 border-blue-500">
                <div className="text-slate-400 text-xs uppercase">Efficiency</div>
                <div className="text-xl font-bold text-blue-400 mt-1">{data.efficiencyScore}%</div>
              </div>
            </div>

            {/* Key Metrics */}
            <div>
              <h3 className="text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wider flex items-center gap-2">
                <Activity size={16} /> Real-Time Telemetry
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {data.metrics.map((metric, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        metric.status === 'good' ? 'bg-emerald-500' :
                        metric.status === 'warning' ? 'bg-amber-500' : 'bg-red-500'
                      }`} />
                      <span className="text-slate-200 text-sm">{metric.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-white font-mono font-medium">{metric.value} <span className="text-xs text-slate-500">{metric.unit}</span></span>
                      {metric.trend === 'up' && <TrendingUp size={14} className="text-emerald-400" />}
                      {metric.trend === 'down' && <TrendingDown size={14} className="text-red-400" />}
                      {metric.trend === 'stable' && <Minus size={14} className="text-slate-400" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Insight */}
            <div className="bg-indigo-900/20 border border-indigo-500/30 rounded-xl p-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 opacity-10">
                <Activity size={100} />
              </div>
              <h3 className="text-indigo-400 text-sm font-bold mb-2 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                AI Analysis
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">{data.aiAnalysis}</p>
              
              <div className="mt-4 pt-4 border-t border-indigo-500/20">
                <div className="text-xs text-indigo-300 uppercase mb-1">Recommended Action</div>
                <p className="text-white text-sm font-medium">{data.recommendedAction}</p>
              </div>
            </div>

            {/* Log */}
            <div>
              <h3 className="text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wider">Live Event Log</h3>
              <div className="space-y-2">
                {data.recentEvents.map((event, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm">
                    <span className="text-slate-500 font-mono whitespace-nowrap">{event.timestamp}</span>
                    <div className={`${
                      event.type === 'alert' ? 'text-amber-400' :
                      event.type === 'success' ? 'text-emerald-400' : 'text-slate-300'
                    }`}>
                      {event.message}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700 bg-slate-800/50">
        {tourStep && onNextTourStep ? (
          <div className="flex gap-3">
            <button 
              onClick={onClose} // Close serves as "Exit Tour" here essentially, but logic handled in App
              className="px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-all"
            >
              Exit Tour
            </button>
            <button 
              onClick={onNextTourStep}
              className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20"
            >
              {isLastTourStep ? "Finish Tour" : "Next Stop"} <ArrowRight size={18} />
            </button>
          </div>
        ) : (
          <button 
            onClick={fetchSimulation}
            disabled={loading}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20"
          >
            {loading ? <RefreshCw className="animate-spin" size={18} /> : <RefreshCw size={18} />}
            Run New Scenario
          </button>
        )}
      </div>
    </div>
  );
};

export default ZoneDetails;