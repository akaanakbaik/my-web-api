import React from 'react';
import { Link } from 'react-router-dom';

// Tombol Neo-Brutalis yang "Clicky"
export const NeoButton = ({ children, onClick, className, to, variant = 'yellow', disabled, fullWidth = false }) => {
  const bgColors = {
    yellow: 'bg-neo-yellow hover:bg-yellow-300',
    pink: 'bg-neo-pink hover:bg-pink-400',
    blue: 'bg-neo-blue text-white hover:bg-blue-600',
    green: 'bg-neo-green hover:bg-green-400',
    white: 'bg-white hover:bg-gray-100',
  };

  const baseClass = `
    relative text-sm md:text-base font-bold border-2 border-neo-black 
    shadow-neo transition-all duration-200 
    active:shadow-none active:translate-x-neo active:translate-y-neo
    flex items-center justify-center gap-2 py-2.5 px-5
    ${fullWidth ? 'w-full' : ''}
    ${bgColors[variant]} 
    ${disabled ? 'opacity-50 cursor-not-allowed active:transform-none shadow-none bg-gray-300' : ''} 
    ${className}
  `;

  if (to && !disabled) return <Link to={to} className={baseClass}>{children}</Link>;
  return <button onClick={onClick} disabled={disabled} className={baseClass}>{children}</button>;
};

// Card Neo-Brutalis yang Rapi
export const NeoCard = ({ children, title, className, step }) => (
  <div className={`relative bg-white border-2 border-neo-black shadow-neo hover:shadow-neo-lg transition-shadow duration-300 p-5 md:p-6 ${className}`}>
    {step && (
      <div className="absolute -top-3 -right-3 bg-neo-black text-white text-xs font-mono py-1 px-3 border-2 border-white shadow-sm transform rotate-3">
        STEP {step}
      </div>
    )}
    {title && (
      <h2 className="text-lg md:text-xl font-extrabold mb-4 uppercase tracking-tight flex items-center gap-2">
        {step && <span className="bg-neo-yellow px-2 border border-black text-xs rounded-sm">#{step}</span>}
        {title}
      </h2>
    )}
    {children}
  </div>
);

// Input Field yang enak dilihat
export const NeoInput = (props) => (
  <input 
    {...props} 
    className="w-full p-3 text-sm md:text-base border-2 border-neo-black shadow-neo-sm focus:outline-none focus:shadow-neo focus:bg-yellow-50 transition-all font-mono mb-4 placeholder:text-gray-400"
  />
);
