import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'green' | 'amber' | 'red' | 'blue' | 'neutral';
  size?: 'sm' | 'md';
  icon?: ReactNode;
}

const variantClasses: Record<string, string> = {
  green: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  amber: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  red: 'bg-red-500/15 text-red-300 border-red-500/30',
  blue: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
  neutral: 'bg-stone-700/40 text-stone-300 border-stone-600/40',
};

const sizeClasses: Record<string, string> = {
  sm: 'px-2 py-0.5 text-[10px]',
  md: 'px-2.5 py-1 text-xs',
};

export default function Badge({
  children,
  variant = 'neutral',
  size = 'sm',
  icon,
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-1 rounded-full font-medium border
        ${variantClasses[variant]} ${sizeClasses[size]}
      `}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </span>
  );
}
