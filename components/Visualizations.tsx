
import React, { useEffect, useState } from 'react';
import type { MedicalFacility } from '../types';

// --- Diagnosis Confidence Chart ---

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
      {data.map((item, index) => (
        <div key={index} className="relative">
          <div className="flex justify-between text-xs mb-1">
            <span className="font-medium text-slate-300 truncate pr-2">{item.name}</span>
            <span className="font-mono text-cyan-400">{(item.confidence * 100).toFixed(0)}%</span>
          </div>
          <div className="h-2.5 w-full bg-slate-700/50 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.3)] transition-all duration-1000 ease-out"
              style={{ width: animate ? `${item.confidence * 100}%` : '0%' }}
            />
          </div>
        </div>
      ))}
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
      
      {/* Gradient Arc (simulated with coloring borders) - simplified for CSS */}
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

// --- Facility Distribution Bar ---

interface FacilityDistributionProps {
  facilities: MedicalFacility[];
}

export const FacilityDistribution: React.FC<FacilityDistributionProps> = ({ facilities }) => {
  const highPriority = facilities.filter(f => f["Priority Level"] === 'High').length;
  const total = facilities.length;
  const highPercent = total > 0 ? (highPriority / total) * 100 : 0;

  return (
    <div className="flex items-center gap-4 mt-2 text-xs">
      <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden flex">
        <div style={{ width: `${highPercent}%` }} className="bg-red-500/70 h-full"></div>
        <div style={{ width: `${100 - highPercent}%` }} className="bg-slate-500/50 h-full"></div>
      </div>
      <div className="flex gap-3 whitespace-nowrap">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-500/70"></span>
          <span className="text-slate-400">High Priority ({highPriority})</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-slate-500/50"></span>
          <span className="text-slate-400">Standard ({total - highPriority})</span>
        </div>
      </div>
    </div>
  );
};
