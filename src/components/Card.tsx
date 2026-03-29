import { type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  hover?: boolean;
  glow?: boolean;
  padding?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

const paddingClasses: Record<string, string> = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export default function Card({
  children,
  hover = false,
  glow = false,
  padding = 'md',
  className = '',
  onClick,
}: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); } : undefined}
      className={`
        relative rounded-2xl
        bg-stone-900/60 backdrop-blur-xl
        border border-stone-800/60
        ${glow ? 'shadow-lg shadow-emerald-900/20' : 'shadow-md shadow-black/20'}
        ${onClick ? 'cursor-pointer' : ''}
        ${paddingClasses[padding]}
        transition-all duration-300
        ${className}
      `}
    >
      {glow && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-teal-500/5 pointer-events-none" />
      )}
      <div className="relative">{children}</div>
    </motion.div>
  );
}
