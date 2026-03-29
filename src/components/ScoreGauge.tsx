import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect } from 'react';
import { getScoreGradient, getScoreLabel } from '../utils';

interface ScoreGaugeProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  animated?: boolean;
  label?: string;
}

export default function ScoreGauge({
  score,
  size = 160,
  strokeWidth = 12,
  animated = true,
  label,
}: ScoreGaugeProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = useMotionValue(0);
  const strokeDashoffset = useTransform(
    progress,
    [0, 10],
    [circumference, circumference * 0.15]
  );
  const displayScore = useMotionValue(0);

  const [startColor, endColor] = getScoreGradient(score);
  const scoreLabel = label ?? getScoreLabel(score);

  useEffect(() => {
    if (animated) {
      animate(progress, score, { duration: 1.5, ease: 'easeOut' });
      animate(displayScore, score, { duration: 1.5, ease: 'easeOut' });
    } else {
      progress.set(score);
      displayScore.set(score);
    }
  }, [score, animated, progress, displayScore]);

  const gradientId = `gauge-gradient-${score}`;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={startColor} />
            <stop offset="100%" stopColor={endColor} />
          </linearGradient>
        </defs>
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(120,113,108,0.2)"
          strokeWidth={strokeWidth}
        />
        {/* Animated progress */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          style={{ strokeDashoffset }}
        />
      </svg>
      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="text-3xl font-bold font-display text-stone-100"
          style={{ fontSize: size * 0.22 }}
        >
          {animated ? (
            <ScoreDisplay value={displayScore} />
          ) : (
            score.toFixed(1)
          )}
        </motion.span>
        <span
          className="text-xs font-medium text-stone-400 mt-0.5"
          style={{ fontSize: size * 0.08 }}
        >
          {scoreLabel}
        </span>
      </div>
    </div>
  );
}

function ScoreDisplay({ value }: { value: ReturnType<typeof useMotionValue<number>> }) {
  const rounded = useTransform(value, (v) => v.toFixed(1));
  return <motion.span>{rounded}</motion.span>;
}
