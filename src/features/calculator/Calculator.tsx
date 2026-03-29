import { useRef, useCallback, useEffect, useState } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import { toPng } from 'html-to-image';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  setUserCount,
  setFrequency,
  setDurationMonths,
  setTotalSaved,
} from '../../app/carbonSlice';
import { calculateCarbonSaved, formatCO2, co2ToTrees, co2ToCars, co2ToPools } from '../../utils';
import type { Frequency } from '../../types';

function AnimatedNumber({ value, decimals = 1 }: { value: number; decimals?: number }) {
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    const ctrl = animate(mv, value, {
      duration: 1.2,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    });
    return ctrl.stop;
  }, [value, mv, decimals]);

  return <span>{display}</span>;
}

export default function Calculator() {
  const dispatch = useAppDispatch();
  const carbon = useAppSelector((s) => s.carbon);
  const impactRef = useRef<HTMLDivElement>(null);

  const carbonSaved = calculateCarbonSaved(carbon);

  useEffect(() => {
    dispatch(setTotalSaved(carbonSaved));
  }, [carbonSaved, dispatch]);

  const equivalencies = [
    { icon: '🌳', label: 'Trees Planted', value: co2ToTrees(carbonSaved), unit: 'trees', color: 'from-emerald-600/20 to-emerald-700/10 border-emerald-600/30' },
    { icon: '🚗', label: 'Cars Off Road', value: co2ToCars(carbonSaved), unit: 'cars/year', color: 'from-sky-600/20 to-sky-700/10 border-sky-600/30' },
    { icon: '🏊', label: 'Pools Conserved', value: co2ToPools(carbonSaved), unit: 'pools', color: 'from-teal-600/20 to-teal-700/10 border-teal-600/30' },
  ];

  const handleExport = useCallback(async () => {
    if (!impactRef.current) return;
    try {
      const dataUrl = await toPng(impactRef.current, { backgroundColor: '#1c1917', pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = 'ecosage-impact.png';
      link.href = dataUrl;
      link.click();
    } catch {
      // Fallback: copy text
      const text = `🌍 My EcoSage Impact\n\n${formatCO2(carbonSaved)} CO₂ saved\n${co2ToTrees(carbonSaved)} trees equivalent\n${co2ToCars(carbonSaved)} cars removed\n${co2ToPools(carbonSaved)} pools conserved\n\n#EcoSage #Sustainability`;
      await navigator.clipboard.writeText(text);
    }
  }, [carbonSaved]);

  const frequencies: Frequency[] = ['daily', 'weekly', 'monthly'];

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl lg:text-3xl font-display font-bold text-stone-100">
          Carbon Impact Calculator
        </h1>
        <p className="text-stone-400 mt-1 text-sm">
          See the tangible impact of sustainable choices
        </p>
      </motion.div>

      {/* Inputs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <div className="space-y-6">
            {/* User Count */}
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="user-count" className="text-xs font-medium text-stone-400">
                  Number of People
                </label>
                <span className="text-sm font-bold text-emerald-400">{carbon.userCount}</span>
              </div>
              <input
                id="user-count"
                type="range"
                min={1}
                max={10000}
                value={carbon.userCount}
                onChange={(e) => dispatch(setUserCount(+e.target.value))}
                className="w-full h-2 bg-stone-700/60 rounded-full appearance-none cursor-pointer accent-emerald-500
                  [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
                  [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-400
                  [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-emerald-500/30
                  [&::-webkit-slider-thumb]:cursor-pointer"
                aria-label="Number of people"
              />
              <div className="flex justify-between text-[10px] text-stone-600 mt-1">
                <span>1</span>
                <span>10,000</span>
              </div>
            </div>

            {/* Frequency */}
            <div>
              <label className="text-xs font-medium text-stone-400 block mb-2">Frequency</label>
              <div className="flex gap-2">
                {frequencies.map((f) => (
                  <button
                    key={f}
                    onClick={() => dispatch(setFrequency(f))}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all
                      ${carbon.frequency === f
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-stone-800/40 text-stone-400 border border-stone-700/40 hover:border-stone-600'
                      }`}
                  >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Duration */}
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="duration" className="text-xs font-medium text-stone-400">
                  Duration
                </label>
                <span className="text-sm font-bold text-emerald-400">
                  {carbon.durationMonths} {carbon.durationMonths === 1 ? 'month' : 'months'}
                </span>
              </div>
              <input
                id="duration"
                type="range"
                min={1}
                max={36}
                value={carbon.durationMonths}
                onChange={(e) => dispatch(setDurationMonths(+e.target.value))}
                className="w-full h-2 bg-stone-700/60 rounded-full appearance-none cursor-pointer accent-emerald-500
                  [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
                  [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-400
                  [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-emerald-500/30
                  [&::-webkit-slider-thumb]:cursor-pointer"
                aria-label="Duration in months"
              />
              <div className="flex justify-between text-[10px] text-stone-600 mt-1">
                <span>1 month</span>
                <span>3 years</span>
              </div>
            </div>

            {/* Formula Display */}
            <div className="bg-stone-800/30 rounded-xl p-4 border border-stone-700/30">
              <p className="text-[10px] text-stone-500 mb-2 font-mono">FORMULA</p>
              <p className="text-xs text-stone-400 font-mono">
                <span className="text-emerald-400">{carbon.userCount}</span>
                {' × '}
                <span className="text-sky-400">{carbon.frequency}</span>
                {' × '}
                <span className="text-amber-400">{carbon.durationMonths}mo</span>
                {' × '}
                <span className="text-purple-400">{carbon.impactFactor} factor</span>
                {' = '}
                <span className="text-emerald-300 font-bold">{formatCO2(carbonSaved)}</span>
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Impact Display */}
      <div ref={impactRef}>
        {/* Big Number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card glow className="text-center">
            <p className="text-xs text-stone-500 mb-2">Total CO₂ Saved</p>
            <div className="text-5xl lg:text-6xl font-display font-bold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              <AnimatedNumber value={carbonSaved} />
            </div>
            <p className="text-sm text-stone-400 mt-1">kilograms of CO₂</p>
          </Card>
        </motion.div>

        {/* Equivalency Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
          {equivalencies.map((eq, i) => (
            <motion.div
              key={eq.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <div className={`rounded-2xl bg-gradient-to-br ${eq.color} border p-5 text-center`}>
                <span className="text-3xl block mb-2">{eq.icon}</span>
                <div className="text-2xl font-bold text-stone-100 font-display">
                  <AnimatedNumber value={eq.value} decimals={eq.unit.includes('year') ? 2 : 1} />
                </div>
                <p className="text-xs text-stone-400 mt-1">{eq.unit}</p>
                <p className="text-[10px] text-stone-500 mt-0.5">{eq.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Share Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Button onClick={handleExport} fullWidth size="lg" icon={<span>📤</span>}>
          Share Impact Card
        </Button>
      </motion.div>
    </div>
  );
}
