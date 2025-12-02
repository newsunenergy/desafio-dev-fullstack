import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  darkMode?: boolean; // Nova prop para modo escuro
}

export function Input({ label, error, darkMode = false, className = '', ...props }: InputProps) {
  return (
    <div className="w-full">
      <label className={`block text-sm font-bold mb-1 ${darkMode ? 'text-white' : 'text-text-primary'}`}>{label}</label>
      <input
        className={`w-full px-4 py-2 bg-white border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors placeholder:text-text-secondary ${
          error ? 'border-error focus:ring-error focus:border-error' : 'border-gray-300'
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-error">{error}</p>}
    </div>
  );
}

