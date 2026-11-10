import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', showTagline = false }) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Rounded-square mark made of circular emerald, marigold and coral blend */}
      <div 
        className={`${iconSizes[size]} rounded-xl relative overflow-hidden flex items-center justify-center shrink-0 shadow-sm bg-[#0E1A3A] border border-white/10`}
        aria-hidden="true"
      >
        <svg viewBox="0 0 36 36" fill="none" className="w-full h-full p-1">
          <circle cx="12" cy="14" r="9" fill="#0FB57F" fillOpacity="0.9" />
          <circle cx="24" cy="14" r="9" fill="#FFB627" fillOpacity="0.9" />
          <circle cx="18" cy="24" r="9" fill="#FF5C6C" fillOpacity="0.9" />
          <circle cx="18" cy="18" r="4.5" fill="#FFFFFF" fillOpacity="0.95" />
        </svg>
      </div>
      <div className="flex flex-col">
        <span className={`font-display font-extrabold tracking-tight text-[#0E1A3A] dark:text-white leading-none ${textSizes[size]}`}>
          NEXORA
        </span>
        {showTagline && (
          <span className="text-[10px] uppercase font-semibold tracking-wider text-[#0FB57F] dark:text-[#FFB627] mt-0.5">
            Everything. Connected.
          </span>
        )}
      </div>
    </div>
  );
};
