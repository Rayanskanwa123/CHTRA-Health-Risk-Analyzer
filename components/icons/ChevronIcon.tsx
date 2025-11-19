
import React from 'react';

export const ChevronIcon: React.FC<React.SVGProps<SVGSVGElement> & { expanded?: boolean }> = ({ expanded, className, ...props }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    className={`${className} transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);
