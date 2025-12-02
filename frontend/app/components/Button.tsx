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
    primary: 'bg-gradient-to-r from-[#FF6B6B] to-primary text-white hover:from-[#FF5252] hover:to-primary-hover focus:ring-2 focus:ring-primary focus:ring-offset-2 active:scale-[0.98] shadow-lg',
    secondary: 'bg-transparent text-white border-2 border-white hover:bg-white hover:text-text-primary focus:ring-2 focus:ring-white focus:ring-offset-2',
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

