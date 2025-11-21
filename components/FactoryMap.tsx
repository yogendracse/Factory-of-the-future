import React, { useEffect, useState } from 'react';
import { FACTORY_ZONES, FACTORY_AREAS } from '../constants';
import { Zone } from '../types';
import { generateFactoryBackground } from '../services/geminiService';
import { 
  Cpu, Users, Wifi, Activity, Eye, Bot, Brain, 
  TowerControl, Copy, Truck, Hexagon, Image as ImageIcon, Loader
} from 'lucide-react';

interface FactoryMapProps {
  onZoneSelect: (zone: Zone) => void;
  selectedZoneId?: string;
}

const iconMap: Record<string, React.ElementType> = {
  'Cpu': Cpu,
  'Users': Users,
  'Wifi': Wifi,
  'Activity': Activity,
  'Eye': Eye,
  'Bot': Bot,
  'Brain': Brain,
  'TowerControl': TowerControl,
  'Copy': Copy,
  'Truck': Truck
};

const FactoryMap: React.FC<FactoryMapProps> = ({ onZoneSelect, selectedZoneId }) => {
  
  const watchTowerZone = FACTORY_ZONES.find(z => z.id === 'watch-tower');
  const [bgImage, setBgImage] = useState<string | null>(null);
  const [loadingBg, setLoadingBg] = useState(false);
  const [hoveredAreaId, setHoveredAreaId] = useState<string | null>(null);

  useEffect(() => {
    const loadBackground = async () => {
      // 1. Try to load from localStorage first
      const savedBg = localStorage.getItem('factory_bg');
      if (savedBg) {
        setBgImage(savedBg);
        return;
      }
      
      // 2. Generate new background with Imagen 3
      setLoadingBg(true);
      const image = await generateFactoryBackground();
      if (image) {
        setBgImage(image);
        // 3. Save to localStorage for next time
        try {
          localStorage.setItem('factory_bg', image);
        } catch (e) {
          console.warn("Could not save background to local storage (quota exceeded likely)", e);
        }
      }
      setLoadingBg(false);
    };

    loadBackground();
  }, []);

  return (
    <div className="relative w-full h-full bg-[#050914] overflow-hidden rounded-2xl border border-slate-800 shadow-2xl select-none">
      
      {/* 1. Background Layer */}
      {bgImage ? (
        <div className="absolute inset-0 z-0 animate-in fade-in duration-1000">
           <img 
            src={bgImage} 
            alt="Factory Floor" 
            className="w-full h-full object-cover opacity-40 grayscale-[30%] mix-blend-luminosity" 
           />
           <div className="absolute inset-0 bg-[#050914]/60 mix-blend-multiply"></div>
        </div>
      ) : (
        /* Enhanced Fallback Background - Futuristic Grid Pattern */
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Primary Grid */}
          <div className="absolute inset-0 opacity-15" 
               style={{ 
                 backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(52, 211, 153, 0.5) 1px, transparent 0)',
                 backgroundSize: '40px 40px'
               }}>
          </div>
          {/* Secondary Larger Grid */}
          <div className="absolute inset-0 opacity-10" 
               style={{ 
                 backgroundImage: 'linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.3) 1px, transparent 1px)',
                 backgroundSize: '120px 120px'
               }}>
          </div>
          {/* Radial Gradient Overlay for Depth */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-[#050914]/20 to-[#050914]/60"></div>
          {/* Animated Scan Lines */}
          <div className="absolute inset-0 opacity-5 animate-[scan_8s_linear_infinite]"
               style={{
                 backgroundImage: 'linear-gradient(0deg, transparent 0%, rgba(16, 185, 129, 0.5) 50%, transparent 100%)',
                 backgroundSize: '100% 200px'
               }}>
          </div>
        </div>
      )}

      {/* Loading Indicator for Background */}
      {loadingBg && (
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/50 border border-slate-700/50 backdrop-blur-sm">
          <Loader size={12} className="animate-spin text-indigo-400" />
          <span className="text-[10px] text-slate-400 uppercase tracking-wide">Generating AI Factory Layout...</span>
        </div>
      )}

      {/* 2. Area Highlights (Spotlights) */}
      {FACTORY_AREAS.map((area) => (
        <div
          key={`spotlight-${area.id}`}
          style={{ top: area.position.top, left: area.position.left }}
          className={`
            absolute pointer-events-none transform -translate-x-1/2 -translate-y-1/2 z-0
            transition-opacity duration-500 ease-in-out
            ${hoveredAreaId === area.id ? 'opacity-100' : 'opacity-0'}
          `}
        >
          {/* Core bright spot */}
          <div className="w-[300px] h-[300px] bg-emerald-500/20 rounded-full blur-[60px]"></div>
          {/* Wider ambient glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px]"></div>
        </div>
      ))}

      {/* 3. Overlay SVG Layer (Connections & Isometric Grid) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" preserveAspectRatio="none">
        <defs>
          <linearGradient id="floorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* Only show vector floor if no image, to define space */}
        {!bgImage && (
          <path 
            d="M 15% 30% L 50% 10% L 90% 30% L 90% 80% L 50% 95% L 15% 80% Z" 
            fill="url(#floorGradient)" 
            stroke="#334155" 
            strokeWidth="2"
          />
        )}
        
        {/* Production Flow Lines (Animated Conveyors) - Always Visible */}
        <path 
          d="M 20% 25% C 20% 45%, 35% 55%, 35% 55% S 50% 60%, 60% 50% S 80% 75%, 80% 75%" 
          stroke="#059669" 
          strokeWidth="3" 
          fill="none" 
          strokeDasharray="10,5"
          className="animate-[dash_20s_linear_infinite]"
          opacity="0.6"
          filter="drop-shadow(0 0 4px rgba(5, 150, 105, 0.5))"
        />

        {/* Connections to Maintenance */}
        <line x1="20%" y1="25%" x2="15%" y2="45%" stroke="#64748b" strokeWidth="1" strokeDasharray="4 4" />
        
        {/* DATA LAYER: Watch Tower Connectivity */}
        {watchTowerZone && FACTORY_ZONES.map((zone) => {
          if (zone.id === 'watch-tower') return null;
          return (
            <g key={`net-${zone.id}`} className="pointer-events-none">
              {/* Base Link Line */}
              <line 
                x1={zone.position.left} 
                y1={zone.position.top} 
                x2={watchTowerZone.position.left} 
                y2={watchTowerZone.position.top} 
                stroke="#6366f1" 
                strokeWidth="1" 
                opacity="0.3" 
              />
              {/* Animated Data Packet flowing TO the tower */}
              <line 
                x1={zone.position.left} 
                y1={zone.position.top} 
                x2={watchTowerZone.position.left} 
                y2={watchTowerZone.position.top} 
                stroke="#a5b4fc" 
                strokeWidth="2" 
                strokeDasharray="4 80"
                strokeOpacity="1"
                className="animate-[dataStream_3s_linear_infinite]"
              />
            </g>
          );
        })}

         <style>{`
          @keyframes dash {
            to {
              stroke-dashoffset: -1000;
            }
          }
          @keyframes dataStream {
            to {
              stroke-dashoffset: -84;
            }
          }
          @keyframes scan {
            0% {
              background-position: 0% 0%;
            }
            100% {
              background-position: 0% 100%;
            }
          }
        `}</style>
      </svg>

      {/* 4. Area Labels (Interactive) - Low Z-Index */}
      {FACTORY_AREAS.map((area) => (
        <div
          key={area.id}
          style={{ top: area.position.top, left: area.position.left }}
          className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
          onMouseEnter={() => setHoveredAreaId(area.id)}
          onMouseLeave={() => setHoveredAreaId(null)}
        >
          <div className={`
            px-3 py-1.5 rounded border backdrop-blur-md transition-all duration-300
            ${hoveredAreaId === area.id 
              ? 'bg-emerald-900/80 border-emerald-400 text-white scale-110 shadow-[0_0_15px_rgba(16,185,129,0.5)]' 
              : 'bg-slate-900/60 border-slate-700/50 text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
            }
          `}>
            <span className="text-xs font-bold tracking-widest uppercase whitespace-nowrap">
              {area.title}
            </span>
          </div>
        </div>
      ))}

      {/* 5. Interactive Zones - High Z-Index (Above Labels) */}
      {FACTORY_ZONES.map((zone) => {
        const Icon = iconMap[zone.iconName] || Hexagon;
        const isSelected = selectedZoneId === zone.id;
        const isWatchTower = zone.id === 'watch-tower';
        
        // Check if this zone belongs to the currently hovered area
        const isAreaHighlighted = hoveredAreaId 
          ? FACTORY_AREAS.find(a => a.id === hoveredAreaId)?.zoneIds.includes(zone.id)
          : false;

        return (
          <button
            key={zone.id}
            onClick={() => onZoneSelect(zone)}
            style={{ top: zone.position.top, left: zone.position.left }}
            className={`absolute group z-20 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500`}
          >
            {/* Hover Tooltip */}
            <div className={`
              absolute -top-10 left-1/2 -translate-x-1/2 
              px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-700 text-white text-xs font-medium whitespace-nowrap shadow-xl
              transition-all duration-300 pointer-events-none z-30
              ${isSelected ? 'opacity-100 -translate-y-2 scale-100' : 'opacity-0 translate-y-2 scale-95 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100'}
            `}>
              {zone.title}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-slate-900 border-r border-b border-slate-700"></div>
            </div>

            {/* Isometric Node Structure */}
            <div className="relative">
              {/* Base Plate (Tilted) */}
              <div className={`
                w-14 h-10 rounded-[100%] border-2 transition-all duration-300 backdrop-blur-sm
                ${isSelected 
                  ? 'bg-emerald-900/80 border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.6)]' 
                  : isWatchTower 
                    ? 'bg-indigo-900/60 border-indigo-500/80 shadow-[0_0_20px_rgba(99,102,241,0.4)]'
                    : isAreaHighlighted
                      ? 'bg-emerald-800/50 border-emerald-400/60 shadow-[0_0_20px_rgba(16,185,129,0.3)]' // Highlighted by Area Hover
                      : 'bg-slate-900/60 border-slate-500/50 group-hover:border-emerald-400/80 group-hover:bg-slate-800/80'
                }
              `}></div>

              {/* Icon Container (Floating above base) */}
              <div className={`
                absolute -top-6 left-1/2 -translate-x-1/2
                flex items-center justify-center w-10 h-10 rounded-xl
                transition-all duration-300 transform
                ${isSelected 
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/40 scale-110 -translate-y-2' 
                  : isWatchTower
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                    : isAreaHighlighted
                      ? 'bg-emerald-700 text-white shadow-lg shadow-emerald-500/20 -translate-y-1 scale-105' // Highlighted by Area Hover
                      : 'bg-slate-800 text-slate-400 border border-slate-700 group-hover:bg-slate-700 group-hover:text-emerald-400 group-hover:-translate-y-1'
                }
              `}>
                <Icon size={20} strokeWidth={isSelected || isAreaHighlighted ? 2 : 1.5} />
                
                {/* Active Indicator Dot */}
                {(isSelected || isWatchTower) && (
                   <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isWatchTower ? 'bg-indigo-400' : 'bg-white'}`}></span>
                    <span className={`relative inline-flex rounded-full h-3 w-3 ${isWatchTower ? 'bg-indigo-400' : 'bg-emerald-400'}`}></span>
                  </span>
                )}
              </div>
            </div>

            {/* Connecting vertical line to base */}
            <div className={`
              absolute top-4 left-1/2 -translate-x-1/2 w-0.5 h-4 
              bg-gradient-to-b from-slate-700 to-transparent 
              transition-colors duration-300 -z-10
              ${isSelected || isAreaHighlighted ? 'from-emerald-500' : isWatchTower ? 'from-indigo-500' : ''}
            `}></div>

          </button>
        );
      })}

      {/* Legend / Decor */}
      <div className="absolute bottom-4 left-6 pointer-events-none z-10">
        <div className="flex items-center gap-2 mb-2">
           <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
           <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold shadow-black drop-shadow-md">Live Simulation Active</span>
        </div>
        <h3 className="text-xl font-bold text-white/40 tracking-tighter uppercase drop-shadow-lg">Pharmavite Digital Twin</h3>
      </div>
    </div>
  );
};

export default FactoryMap;