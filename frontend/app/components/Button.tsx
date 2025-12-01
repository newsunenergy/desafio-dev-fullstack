import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  loading?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  loading = false,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'px-6 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm cursor-pointer';
  const variants = {
    primary: 'bg-[#FF9D29] text-white hover:bg-[#D67603] focus:ring-2 focus:ring-[#FF9D29] focus:ring-offset-2 active:scale-[0.98]',
    secondary: 'bg-white text-[#0B3C78] border-2 border-[#0B3C78] hover:bg-[#0B3C78] hover:text-white focus:ring-2 focus:ring-[#0B3C78] focus:ring-offset-2',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? 'Carregando...' : children}
    </button>
  );
}

