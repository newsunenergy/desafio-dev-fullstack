import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="w-full">
      <label className="block text-sm font-bold text-[#0B3C78] mb-1">{label}</label>
      <input
        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FF9D29] focus:border-[#FF9D29] transition-colors placeholder:text-[#676767] ${
          error ? 'border-[#EF4444] focus:ring-[#EF4444] focus:border-[#EF4444]' : 'border-gray-500'
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-[#EF4444]">{error}</p>}
    </div>
  );
}

