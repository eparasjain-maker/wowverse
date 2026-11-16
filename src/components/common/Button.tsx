import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  to?: string;
  href?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  to,
  href,
  children,
  icon,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium tracking-wide transition-all duration-300 rounded-full select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-wow/50 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-wow text-white hover:bg-wow-hover shadow-lg hover:shadow-wow/30 active:scale-[0.98]',
    secondary: 'bg-surface-light text-ivory hover:bg-surface-hover hover:text-white border border-surface-border active:scale-[0.98]',
    outline: 'border border-ivory/30 text-ivory hover:border-wow hover:text-wow hover:bg-wow/5 active:scale-[0.98]',
    ghost: 'text-ivory-muted hover:text-white hover:bg-surface-light/50',
  };

  const sizes = {
    sm: 'text-xs px-4 py-2 gap-1.5 uppercase tracking-wider',
    md: 'text-sm px-6 py-3 gap-2 uppercase tracking-widest',
    lg: 'text-sm md:text-base px-8 py-4 gap-2.5 uppercase tracking-widest font-semibold',
  };

  const combinedClass = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedClass}>
        {children}
        {icon && <span className="transition-transform duration-300 group-hover:translate-x-1">{icon}</span>}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={combinedClass}>
        {children}
        {icon && <span>{icon}</span>}
      </a>
    );
  }

  return (
    <button className={combinedClass} {...props}>
      {children}
      {icon && <span>{icon}</span>}
    </button>
  );
};
