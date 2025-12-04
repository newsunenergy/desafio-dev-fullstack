import React from 'react';
import logo from '../../assets/Logo.jfif';
import { cn } from '../../utils/shadcn.helper';

export function Icon({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <img
      src={logo}
      className={cn(className)}
      style={{
        ...style,
      }}
    />
  );
}