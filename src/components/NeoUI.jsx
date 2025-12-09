import React from 'react';
import { Link } from 'react-router-dom';

export const NeoButton = ({ children, onClick, className, to, variant = 'yellow', disabled }) => {
  const bgColors = {
    yellow: 'bg-neo-yellow',
    pink: 'bg-neo-pink',
    blue: 'bg-neo-blue text-white',
    green: 'bg-neo-green',
  };

  const baseClass = `px-6 py-3 font-bold border-2 border-black shadow-hard hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all cursor-pointer flex items-center justify-center gap-2 ${bgColors[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`;

  if (to && !disabled) return <Link to={to} className={baseClass}>{children}</Link>;
  return <button onClick={onClick} disabled={disabled} className={baseClass}>{children}</button>;
};

export const NeoCard = ({ children, title, className }) => (
  <div className={`bg-white border-2 border-black shadow-hard p-6 ${className}`}>
    {title && <h2 className="text-xl font-black mb-4 uppercase border-b-2 border-black pb-2">{title}</h2>}
    {children}
  </div>
);

export const NeoInput = (props) => (
  <input 
    {...props} 
    className="w-full p-3 border-2 border-black shadow-hard-sm focus:outline-none focus:shadow-hard transition-all font-mono mb-4"
  />
);
