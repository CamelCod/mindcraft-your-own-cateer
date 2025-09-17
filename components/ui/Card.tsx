
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white border border-slate-200 rounded-lg shadow-sm ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`p-4 sm:p-6 border-b border-slate-200 ${className}`}>
      {children}
    </div>
  );
};

export const CardContent: React.FC<CardProps> = ({ children, className = '' }) => {
    return (
      <div className={`p-4 sm:p-6 ${className}`}>
        {children}
      </div>
    );
  };
  

export const CardTitle: React.FC<CardProps> = ({ children, className = '' }) => {
    return (
        <h2 className={`text-lg font-semibold text-slate-800 ${className}`}>
        {children}
        </h2>
    );
};
  

export default Card;
