import React from 'react';
import { AvailabilityStatus } from '../../types';

interface BadgeProps {
  status: AvailabilityStatus | 'NEW' | 'CONTACTED' | 'CONFIRMED' | 'DECLINED' | 'PENDING' | 'COMPLETED' | 'CANCELLED';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ status, className = '' }) => {
  const getStyles = () => {
    switch (status) {
      case 'AVAILABLE':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'LIMITED':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'PENDING':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'BOOKED':
        return 'bg-red-500/10 text-red-400 border-red-500/30';
      case 'UNAVAILABLE':
        return 'bg-zinc-800 text-zinc-400 border-zinc-700';
      case 'NEW':
        return 'bg-wow/10 text-wow border-wow/30';
      case 'CONTACTED':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      case 'CONFIRMED':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'DECLINED':
      case 'CANCELLED':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      case 'COMPLETED':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
      default:
        return 'bg-zinc-800 text-zinc-300 border-zinc-700';
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border tracking-wider uppercase ${getStyles()} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 animate-pulse" />
      {status}
    </span>
  );
};
