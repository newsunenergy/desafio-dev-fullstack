import React from 'react';
import logo from '../../assets/Logo.jfif';
import { cn } from '../../utils/shadcn.helper';
import { useTheme } from '../../hooks/useTheme';

export function HorizontalLogo({
  className,
  style,
  inverted = false,
}: {
  className?: string;
  style?: React.CSSProperties;
  inverted?: boolean;
}) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const logoSrc =
    (isDark && !inverted) || (!isDark && inverted) ? logo : logo;

  return (
    <img
      src={logoSrc}
      className={cn(className)}
      style={{
        ...style,
      }}
    />
  );
}