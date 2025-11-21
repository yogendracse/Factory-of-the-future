import React from 'react';

const FactoryBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full bg-[#050914] overflow-hidden pointer-events-none">
      <svg className="w-full h-full opacity-60" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1920 1080">
        <defs>
          {/* Metal Gradient for Tanks */}
          <linearGradient id="tankGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="50%" stopColor="#475569" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
          
          {/* Floor Grid Pattern */}
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="1" opacity="0.5" />
          </pattern>
          
          {/* Glows */}
          <filter id="blueGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="15" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Background Grid Floor */}
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* --- ZONE 1: Processing (Top Left) --- */}
        <g transform="translate(250, 200)">
          {/* Platform */}
          <path d="M 0 50 L 200 0 L 400 50 L 200 100 Z" fill="#1e293b" stroke="#334155" strokeWidth="2" />
          {/* Tanks */}
          <g transform="translate(150, -60)">
            <ellipse cx="50" cy="100" rx="40" ry="15" fill="#1e293b" stroke="#475569" />
            <rect x="10" y="20" width="80" height="80" fill="url(#tankGradient)" />
            <ellipse cx="50" cy="20" rx="40" ry="15" fill="#475569" stroke="#64748b" />
          </g>
          <g transform="translate(50, -40)">
             <ellipse cx="50" cy="100" rx="40" ry="15" fill="#1e293b" stroke="#475569" />
             <rect x="10" y="20" width="80" height="80" fill="url(#tankGradient)" />
             <ellipse cx="50" cy="20" rx="40" ry="15" fill="#475569" stroke="#64748b" />
          </g>
           {/* Pipes */}
           <path d="M 200 80 L 300 150 L 500 150" fill="none" stroke="#64748b" strokeWidth="6" />
        </g>

        {/* --- ZONE 2: Maintenance / Utility (Mid Left) --- */}
        <g transform="translate(200, 500)">
           {/* Platform */}
           <path d="M 0 40 L 150 0 L 300 40 L 150 80 Z" fill="#0f172a" stroke="#334155" />
           {/* Machinery Boxes */}
           <path d="M 80 20 L 160 0 L 160 40 L 80 60 Z" fill="#334155" />
           <path d="M 160 0 L 240 20 L 240 60 L 160 40 Z" fill="#1e293b" />
           <path d="M 80 20 L 160 0 L 240 20 L 160 40 Z" fill="#475569" />
        </g>

        {/* --- ZONE 3: Connected Workers / Catwalks (Top Center) --- */}
        <g transform="translate(800, 150)">
           <path d="M 0 20 L 400 20" fill="none" stroke="#334155" strokeWidth="20" strokeLinecap="round" />
           <path d="M 0 20 L 400 20" fill="none" stroke="#1e293b" strokeWidth="16" strokeLinecap="round" strokeDasharray="10 20" />
           {/* Walkway Railings */}
           <path d="M 0 10 L 400 10 M 0 30 L 400 30" fill="none" stroke="#475569" strokeWidth="1" />
        </g>

        {/* --- ZONE 4: Production Lines (Center) --- */}
        <g transform="translate(600, 450)">
           {/* Main Conveyor Belt Path */}
           <path d="M 0 100 L 300 20 L 700 120" fill="none" stroke="#1e293b" strokeWidth="40" />
           <path d="M 0 100 L 300 20 L 700 120" fill="none" stroke="#059669" strokeWidth="2" strokeDasharray="20 10" opacity="0.3">
              <animate attributeName="stroke-dashoffset" from="0" to="-1000" dur="20s" repeatCount="indefinite" />
           </path>
           
           {/* Robotic Arms Base */}
           <circle cx="200" cy="80" r="15" fill="#334155" />
           <circle cx="400" cy="50" r="15" fill="#334155" />
           <circle cx="600" cy="100" r="15" fill="#334155" />
        </g>

        {/* --- ZONE 5: Warehouse (Bottom Right) --- */}
        <g transform="translate(1300, 700)">
           {/* Floor Area */}
           <path d="M 0 100 L 200 50 L 400 100 L 200 150 Z" fill="#0f172a" stroke="#334155" />
           
           {/* Racks */}
           <g transform="translate(50, 20)">
              <path d="M 0 20 L 20 15 L 20 65 L 0 70 Z" fill="#ea580c" opacity="0.8" />
              <path d="M 20 15 L 100 15 L 100 65 L 20 65 Z" fill="#c2410c" opacity="0.8" />
              <path d="M 0 20 L 20 15 L 100 15 L 80 20 Z" fill="#fb923c" opacity="0.8" />
           </g>
           <g transform="translate(180, 50)">
              <path d="M 0 20 L 20 15 L 20 65 L 0 70 Z" fill="#ea580c" opacity="0.8" />
              <path d="M 20 15 L 100 15 L 100 65 L 20 65 Z" fill="#c2410c" opacity="0.8" />
              <path d="M 0 20 L 20 15 L 100 15 L 80 20 Z" fill="#fb923c" opacity="0.8" />
           </g>
        </g>

        {/* --- ZONE 6: Watch Tower (Bottom Center) --- */}
        <g transform="translate(900, 800)">
           {/* Base Ring */}
           <ellipse cx="100" cy="50" rx="120" ry="40" fill="#1e1b4b" stroke="#4338ca" strokeWidth="2" />
           <ellipse cx="100" cy="50" rx="80" ry="25" fill="none" stroke="#6366f1" strokeDasharray="4 4" />
           
           {/* Center Pillar */}
           <path d="M 80 50 L 80 -50 L 120 -50 L 120 50 Z" fill="#312e81" stroke="#4338ca" />
           
           {/* Hologram Effect */}
           <ellipse cx="100" cy="-50" rx="60" ry="15" fill="#4f46e5" opacity="0.2" filter="url(#blueGlow)" />
        </g>

      </svg>
    </div>
  );
};

export default FactoryBackground;
