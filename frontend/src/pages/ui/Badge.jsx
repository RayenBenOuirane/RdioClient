import React from 'react';
import './Badge.css';

export const Badge = ({ children, className = '' }) => {
  return (
    <span className={`badge ${className}`}>
      {children}
    </span>
  );
};