
import React, { useEffect, useState } from 'react';
import type { MedicalFacility } from '../types';

// --- Diagnosis Confidence Chart (Horizontal Bar) ---

interface DiagnosisChartProps {
  data: { name: string; confidence: number }[];
}

export const DiagnosisChart: React.FC<DiagnosisChartProps> = ({ data }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full space-y-3 my-4">
      <div className="flex justify-between text-[10px] uppercase text-slate-500 border-b border-slate-700 pb-1 mb-2">
        <span>Condition</span>
        <span>AI Confidence Score</span>
      </div>
      {data.map((item, index) => (
        <div key={index} className="group">
          <div className="flex justify-between text-xs mb-1">
            <span className="font-medium text-slate-300 truncate pr-2">{item.name}</span>
            <span className="font-mono text-cyan-400">{(item.confidence * 100).toFixed(0)}%</span>
          </div>
          <div className="h-3 w-full bg-slate-700/30 rounded-r-md overflow-hidden relative">
             {/* Grid lines */}
             <div className="absolute inset-0 flex justify-between px-1 opacity-30">
                <div className="border-r border-slate-500 h-full"></div>
                <div className="border-r border-slate-500 h-full"></div>
                <div className="border-r border-slate-500 h-full"></div>
                <div className="border-r border-slate-500 h-full"></div>
             </div>
            <div 
              className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-r-md shadow-[0_0_10px_rgba(34,211,238,0.3)] transition-all duration-1000 ease-out relative z-10"
              style={{ width: animate ? `${item.confidence * 100}%` : '0%' }}
            />
          </div>
        </div>
      ))}
      <div className="flex justify-between text-[10px] text-slate-600 pt-1">
        <span>0%</span>
        <span>25%</span>
        <span>50%</span>
        <span>75%</span>
        <span>100%</span>
      </div>
    </div>
  );
};

// --- Risk Level Gauge ---

interface RiskGaugeProps {
  level: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL' | 'UNKNOWN';
}

export const RiskGauge: React.FC<RiskGaugeProps> = ({ level }) => {
  const getRotation = () => {
    switch (level) {
      case 'LOW': return 'rotate-[-45deg]'; // 0%
      case 'MODERATE': return 'rotate-[0deg]'; // 33%
      case 'HIGH': return 'rotate-[45deg]'; // 66%
      case 'CRITICAL': return 'rotate-[90deg]'; // 100%
      default: return 'rotate-[-90deg]';
    }
  };

  const getColor = () => {
    switch (level) {
      case 'LOW': return 'text-green-500';
      case 'MODERATE': return 'text-yellow-500';
      case 'HIGH': return 'text-orange-500';
      case 'CRITICAL': return 'text-red-500';
      default: return 'text-slate-500';
    }
  };

  return (
    <div className="relative w-32 h-16 overflow-hidden mx-auto mb-2">
      {/* Background Arc */}
      <div className="absolute top-0 left-0 w-32 h-32 rounded-full border-[12px] border-slate-700 box-border"></div>
      
      {/* Gradient Arc (simulated) */}
      <div className={`absolute top-0 left-0 w-32 h-32 rounded-full border-[12px] border-transparent border-t-${getColor().split('-')[1]}-500/30 border-l-${getColor().split('-')[1]}-500/30 rotate-45 opacity-20`}></div>

      {/* Needle */}
      <div 
        className={`absolute bottom-0 left-1/2 w-1 h-14 bg-slate-200 origin-bottom -translate-x-1/2 transition-transform duration-1000 ease-out z-10 rounded-full ${getRotation()}`}
        style={{ transformOrigin: '50% 100%' }}
      >
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full ${getColor()} shadow-[0_0_8px_currentColor]`}></div>
      </div>
      
      {/* Hub */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-slate-200 rounded-full z-20 border-2 border-slate-800"></div>
    </div>
  );
};

// --- Facility Priority Chart (Donut) ---

interface FacilityPriorityChartProps {
  facilities: MedicalFacility[];
}

export const FacilityPriorityChart: React.FC<FacilityPriorityChartProps> = ({ facilities }) => {
  const priorityCounts = facilities.reduce((acc, f) => {
    const p = f["Priority Level"];
    acc[p] = (acc[p] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const total = facilities.length;
  
  // Define colors and order
  const config = [
      { key: 'High', color: '#ef4444', label: 'High Priority' },     // red-500
      { key: 'Medium', color: '#eab308', label: 'Medium Priority' }, // yellow-500
      { key: 'Low', color: '#22c55e', label: 'Standard' }   // green-500
  ];

  let cumulativePercent = 0;
  const data = config.map(c => {
      const count = priorityCounts[c.key] || 0;
      const percent = total > 0 ? count / total : 0;
      const item = { ...c, count, percent, start: cumulativePercent };
      cumulativePercent += percent;
      return item;
  }).filter(d => d.count > 0);

  const getCoordinatesForPercent = (percent: number) => {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  };
  
  // Viewbox -1 -1 to 1 1. Radius 1.
  return (
    <div className="flex flex-row items-center justify-around p-4 bg-slate-900/30 rounded-lg border border-slate-800">
        <div className="relative w-24 h-24 flex-shrink-0">
            <svg viewBox="-1 -1 2 2" className="transform -rotate-90 w-full h-full overflow-visible">
                {total === 0 && <circle cx="0" cy="0" r="0.9" fill="none" stroke="#334155" strokeWidth="0.2" />}
                {data.map((slice, i) => {
                    const startP = slice.start;
                    const endP = slice.start + slice.percent;

                    // Full circle case
                    if (slice.percent === 1) {
                        return <circle key={i} cx="0" cy="0" r="0.8" fill="none" stroke={slice.color} strokeWidth="0.35" />;
                    }

                    const [startX, startY] = getCoordinatesForPercent(startP);
                    const [endX, endY] = getCoordinatesForPercent(endP);
                    const largeArcFlag = slice.percent > 0.5 ? 1 : 0;
                    
                    const pathData = [
                        `M ${startX} ${startY}`,
                        `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`
                    ].join(' ');
                    
                    return (
                        <path 
                            key={i}
                            d={pathData}
                            fill="none"
                            stroke={slice.color}
                            strokeWidth="0.35"
                            strokeLinecap="butt"
                            className="hover:opacity-80 transition-opacity cursor-pointer"
                        />
                    );
                })}
                <text x="0" y="0" className="text-[0.4px] font-bold fill-slate-200" textAnchor="middle" dominantBaseline="middle" transform="rotate(90)">
                    {total}
                </text>
                 <text x="0" y="0.35" className="text-[0.18px] fill-slate-500" textAnchor="middle" dominantBaseline="middle" transform="rotate(90)">
                    Fac.
                </text>
            </svg>
        </div>
        
        <div className="flex flex-col gap-2">
             <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Facility Breakdown</h5>
             {data.map(d => (
                 <div key={d.key} className="flex items-center gap-2 text-xs">
                     <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: d.color }}></span>
                     <span className="text-slate-300 flex-1">{d.label}</span>
                     <span className="font-mono text-slate-500">{d.count} ({Math.round(d.percent * 100)}%)</span>
                 </div>
             ))}
        </div>
    </div>
  );
};

// Deprecated simple bar, kept for type safety if needed elsewhere, but FacilityPriorityChart is preferred
export const FacilityDistribution: React.FC<{ facilities: MedicalFacility[] }> = ({ facilities }) => {
  return <FacilityPriorityChart facilities={facilities} />;
};
