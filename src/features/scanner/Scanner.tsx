import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Badge from '../../components/Badge';
import ScoreGauge from '../../components/ScoreGauge';
import { useAppDispatch } from '../../app/hooks';
import { addScan } from '../../app/scanHistorySlice';
import { incrementScans, addCo2Saved } from '../../app/userSlice';
import { generateMockAIResponse } from '../../mocks';
import { getScoreColor } from '../../utils';
import type { ScanResult } from '../../types';

type InputMode = 'manual' | 'url' | 'camera';

const breakdownLabels: Record<string, { label: string; max: number; icon: string }> = {
  packaging: { label: 'Packaging', max: 3, icon: '📦' },
  production: { label: 'Production', max: 3, icon: '🏭' },
  ethics: { label: 'Ethics', max: 2, icon: '🤝' },
  lifecycle: { label: 'Lifecycle', max: 2, icon: '♻️' },
};

export default function Scanner() {
  const [inputMode, setInputMode] = useState<InputMode>('manual');
  const [inputValue, setInputValue] = useState('');
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleScan = useCallback(() => {
    if (!inputValue.trim()) return;
    setScanning(true);
    setResult(null);

    // Simulate AI processing time
    setTimeout(() => {
      const scanResult = generateMockAIResponse(inputValue.trim());
      scanResult.inputMethod = inputMode;
      setResult(scanResult);
      setScanning(false);

      // Dispatch to Redux
      dispatch(addScan(scanResult));
      dispatch(incrementScans());
      dispatch(addCo2Saved(+(Math.random() * 2 + 0.5).toFixed(1)));
    }, 1800);
  }, [inputValue, inputMode, dispatch]);

  const handleFindAlternatives = () => {
    if (result) {
      navigate('/alternatives', { state: { product: result.product } });
    }
  };

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl lg:text-3xl font-display font-bold text-stone-100">
          Smart Product Scanner
        </h1>
        <p className="text-stone-400 mt-1 text-sm">
          Scan any product to uncover its sustainability footprint
        </p>
      </motion.div>

      {/* Input Mode Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <div className="flex gap-2 mb-5">
            {(['manual', 'url', 'camera'] as InputMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => setInputMode(mode)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
                  ${inputMode === mode
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/40'
                  }`}
                aria-label={`Switch to ${mode} input`}
              >
                {mode === 'manual' && '✏️ Name'}
                {mode === 'url' && '🔗 URL'}
                {mode === 'camera' && '📷 Camera'}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {inputMode === 'manual' && (
              <div>
                <label htmlFor="product-name" className="block text-xs font-medium text-stone-400 mb-2">
                  Product Name
                </label>
                <input
                  id="product-name"
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleScan()}
                  placeholder="e.g., Ocean Breeze Shampoo, bamboo toothbrush..."
                  className="w-full px-4 py-3 bg-stone-800/50 border border-stone-700/50 rounded-xl text-stone-100 placeholder-stone-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all"
                />
              </div>
            )}
            {inputMode === 'url' && (
              <div>
                <label htmlFor="product-url" className="block text-xs font-medium text-stone-400 mb-2">
                  Product Image URL
                </label>
                <input
                  id="product-url"
                  type="url"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleScan()}
                  placeholder="https://example.com/product-image.jpg"
                  className="w-full px-4 py-3 bg-stone-800/50 border border-stone-700/50 rounded-xl text-stone-100 placeholder-stone-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all"
                />
              </div>
            )}
            {inputMode === 'camera' && (
              <div className="flex flex-col items-center gap-4 py-8">
                <div className="w-48 h-48 rounded-2xl border-2 border-dashed border-stone-600/60 flex items-center justify-center bg-stone-800/30">
                  <div className="text-center">
                    <span className="text-4xl block mb-2">📷</span>
                    <p className="text-xs text-stone-500">Camera preview</p>
                  </div>
                </div>
                <p className="text-xs text-stone-500">
                  Camera access simulated. Enter a product name below to scan.
                </p>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleScan()}
                  placeholder="Product name (fallback)"
                  className="w-full max-w-sm px-4 py-3 bg-stone-800/50 border border-stone-700/50 rounded-xl text-stone-100 placeholder-stone-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all"
                  aria-label="Product name for camera fallback"
                />
              </div>
            )}

            <Button
              onClick={handleScan}
              disabled={!inputValue.trim() || scanning}
              fullWidth
              size="lg"
              icon={scanning ? <span className="animate-spin">⏳</span> : <span>🔍</span>}
            >
              {scanning ? 'Analyzing with AI...' : 'Scan Product'}
            </Button>
          </div>
        </Card>
      </motion.div>

      {/* Scanning Animation */}
      <AnimatePresence>
        {scanning && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex justify-center"
          >
            <Card glow className="w-full max-w-sm text-center">
              <div className="py-8">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                  className="text-5xl mb-4 inline-block"
                >
                  🌿
                </motion.div>
                <p className="text-sm text-stone-300">Gemini AI is analyzing sustainability metrics...</p>
                <div className="mt-4 flex justify-center gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }}
                      className="w-2 h-2 rounded-full bg-emerald-400"
                    />
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <AnimatePresence>
        {result && !scanning && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="space-y-4"
          >
            {/* Score + Product Info */}
            <Card glow>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <ScoreGauge score={result.product.score} />
                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-xl font-display font-bold text-stone-100">
                    {result.product.name}
                  </h2>
                  <p className="text-sm text-stone-400 mt-1">
                    by {result.product.brand} • {result.product.category}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-3 justify-center sm:justify-start">
                    {result.product.certifications.map((cert) => (
                      <Badge key={cert} variant="green" size="sm">
                        {cert}
                      </Badge>
                    ))}
                    {result.product.certifications.length === 0 && (
                      <Badge variant="red" size="sm">No certifications</Badge>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            {/* Score Breakdown */}
            <Card>
              <h3 className="text-sm font-semibold text-stone-300 mb-4">Score Breakdown</h3>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(result.product.breakdown).map(([key, value], index) => {
                  const info = breakdownLabels[key]!;
                  return (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="bg-stone-800/40 rounded-xl p-3"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span>{info.icon}</span>
                        <span className="text-xs font-medium text-stone-400">{info.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-stone-700/60 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(value / info.max) * 100}%` }}
                            transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                            className={`h-full rounded-full ${
                              value / info.max >= 0.7
                                ? 'bg-emerald-400'
                                : value / info.max >= 0.4
                                ? 'bg-amber-400'
                                : 'bg-red-400'
                            }`}
                          />
                        </div>
                        <span className={`text-xs font-bold ${getScoreColor(value * (10 / info.max))}`}>
                          {value}/{info.max}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </Card>

            {/* AI Summary */}
            <Card>
              <h3 className="text-sm font-semibold text-stone-300 mb-3">🤖 AI Analysis</h3>
              <p className="text-sm text-stone-400 leading-relaxed">{result.aiSummary}</p>
              {result.tips.length > 0 && (
                <div className="mt-4 space-y-2">
                  <h4 className="text-xs font-medium text-stone-500">Suggestions</h4>
                  {result.tips.map((tip, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      className="flex gap-2 text-xs text-stone-400"
                    >
                      <span className="text-emerald-400 mt-0.5">→</span>
                      <span>{tip}</span>
                    </motion.div>
                  ))}
                </div>
              )}
            </Card>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleFindAlternatives}
                size="lg"
                fullWidth
                icon={<span>🔄</span>}
              >
                Find Eco Alternatives
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setResult(null);
                  setInputValue('');
                }}
                size="lg"
                fullWidth
                icon={<span>🔍</span>}
              >
                Scan Another
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Scan Suggestions (when no result) */}
      {!result && !scanning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-xs font-medium text-stone-500 mb-3">Try scanning these products:</p>
          <div className="flex flex-wrap gap-2">
            {['Bamboo Toothbrush', 'EcoWash Laundry Sheets', 'Classic Cola', 'Fast Fashion T-Shirt', 'Beeswax Food Wraps'].map((name) => (
              <button
                key={name}
                onClick={() => {
                  setInputValue(name);
                  setInputMode('manual');
                }}
                className="px-3 py-1.5 bg-stone-800/40 border border-stone-700/40 rounded-full text-xs text-stone-400 hover:text-emerald-300 hover:border-emerald-500/30 transition-all"
              >
                {name}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
