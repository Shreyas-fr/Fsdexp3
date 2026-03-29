import { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Badge from '../../components/Badge';
import ScoreGauge from '../../components/ScoreGauge';
import Modal from '../../components/Modal';
import { useAppDispatch } from '../../app/hooks';
import { incrementAlternativesChosen, addCo2Saved } from '../../app/userSlice';
import { getAlternativesForProduct, mockProducts } from '../../mocks';

import type { Alternative, Product } from '../../types';

type SortBy = 'score' | 'price' | 'name';

const retailerColors: Record<string, string> = {
  Target: 'bg-red-500/15 text-red-300 border-red-500/30',
  REI: 'bg-green-500/15 text-green-300 border-green-500/30',
  'Whole Foods': 'bg-lime-500/15 text-lime-300 border-lime-500/30',
  Local: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  Amazon: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
  'Thrive Market': 'bg-purple-500/15 text-purple-300 border-purple-500/30',
};

export default function Alternatives() {
  const location = useLocation();
  const passedProduct = (location.state as { product?: Product })?.product;
  const product = passedProduct ?? mockProducts[2]!; // Default to Cola if no product passed

  const alternatives = useMemo(() => getAlternativesForProduct(product), [product]);

  const [sortBy, setSortBy] = useState<SortBy>('score');
  const [onlineOnly, setOnlineOnly] = useState(false);
  const [compareItems, setCompareItems] = useState<Alternative[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);
  const dispatch = useAppDispatch();

  const sorted = useMemo(() => {
    let filtered = [...alternatives];
    if (onlineOnly) filtered = filtered.filter((a) => a.availableOnline);
    switch (sortBy) {
      case 'score': return filtered.sort((a, b) => b.score - a.score);
      case 'price': return filtered.sort((a, b) => a.priceRange.localeCompare(b.priceRange));
      case 'name': return filtered.sort((a, b) => a.name.localeCompare(b.name));
      default: return filtered;
    }
  }, [alternatives, sortBy, onlineOnly]);

  const toggleCompare = (alt: Alternative) => {
    setCompareItems((prev) =>
      prev.find((a) => a.id === alt.id)
        ? prev.filter((a) => a.id !== alt.id)
        : prev.length < 2
        ? [...prev, alt]
        : [prev[1]!, alt]
    );
  };

  const handleChoose = (alt: Alternative) => {
    dispatch(incrementAlternativesChosen());
    dispatch(addCo2Saved(+(alt.score * 0.3).toFixed(1)));
  };

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl lg:text-3xl font-display font-bold text-stone-100">
          Eco Alternatives
        </h1>
        <p className="text-stone-400 mt-1 text-sm">
          Better choices for <span className="text-emerald-400 font-medium">{product.name}</span>
        </p>
      </motion.div>

      {/* Original product mini card */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card padding="sm">
          <div className="flex items-center gap-4">
            <ScoreGauge score={product.score} size={60} strokeWidth={6} animated={false} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-stone-300 truncate">{product.name}</p>
              <p className="text-xs text-stone-500">{product.brand} • Current product</p>
            </div>
            <Badge variant={product.score >= 6 ? 'green' : product.score >= 4 ? 'amber' : 'red'}>
              {product.score}/10
            </Badge>
          </div>
        </Card>
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="flex flex-wrap items-center gap-3"
      >
        <div className="flex gap-1 bg-stone-800/40 rounded-lg p-1">
          {(['score', 'price', 'name'] as SortBy[]).map((s) => (
            <button
              key={s}
              onClick={() => setSortBy(s)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all
                ${sortBy === s
                  ? 'bg-emerald-500/20 text-emerald-300'
                  : 'text-stone-400 hover:text-stone-200'
                }`}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
        <button
          onClick={() => setOnlineOnly(!onlineOnly)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all
            ${onlineOnly
              ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
              : 'text-stone-400 border-stone-700/40 hover:border-stone-600'
            }`}
        >
          🌐 Online Only
        </button>
        {compareItems.length > 0 && (
          <Button size="sm" variant="secondary" onClick={() => setCompareOpen(true)}>
            Compare ({compareItems.length}/2)
          </Button>
        )}
      </motion.div>

      {/* Alternatives List */}
      <div className="space-y-3">
        {sorted.map((alt, index) => (
          <motion.div
            key={alt.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.08 }}
          >
            <Card hover>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <ScoreGauge score={alt.score} size={64} strokeWidth={5} animated={false} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-semibold text-stone-100">{alt.name}</h3>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${
                          retailerColors[alt.retailer] ?? retailerColors['Local']
                        }`}
                      >
                        {alt.retailer}
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 mt-0.5">{alt.brand} • {alt.priceRange}</p>
                    <p className="text-xs text-stone-400 mt-2 line-clamp-2">{alt.description}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {alt.certifications.map((cert) => (
                        <Badge key={cert} variant="green" size="sm">{cert}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex sm:flex-col gap-2 sm:items-end justify-end">
                  <Button size="sm" onClick={() => handleChoose(alt)}>
                    Choose This
                  </Button>
                  <Button
                    size="sm"
                    variant={compareItems.find((c) => c.id === alt.id) ? 'primary' : 'ghost'}
                    onClick={() => toggleCompare(alt)}
                  >
                    {compareItems.find((c) => c.id === alt.id) ? '✓' : '⇔'} Compare
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Comparison Modal */}
      <Modal
        isOpen={compareOpen}
        onClose={() => setCompareOpen(false)}
        title="Side-by-Side Comparison"
        size="lg"
      >
        {compareItems.length === 2 ? (
          <div className="grid grid-cols-2 gap-4">
            {compareItems.map((alt) => (
              <div key={alt.id} className="space-y-4">
                <div className="flex flex-col items-center">
                  <ScoreGauge score={alt.score} size={100} strokeWidth={8} />
                  <h3 className="text-sm font-semibold text-stone-100 mt-2 text-center">{alt.name}</h3>
                  <p className="text-xs text-stone-500">{alt.brand}</p>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-stone-400">Price</span>
                    <span className="text-stone-200">{alt.priceRange}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Retailer</span>
                    <span className="text-stone-200">{alt.retailer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Online</span>
                    <span className={alt.availableOnline ? 'text-emerald-400' : 'text-red-400'}>
                      {alt.availableOnline ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div>
                    <span className="text-stone-400 block mb-1">Certifications</span>
                    <div className="flex flex-wrap gap-1">
                      {alt.certifications.map((c) => (
                        <Badge key={c} variant="green" size="sm">{c}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <Button size="sm" fullWidth onClick={() => handleChoose(alt)}>
                  Choose This
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-stone-400 text-center py-8">
            Select 2 alternatives to compare them side-by-side.
          </p>
        )}
      </Modal>
    </div>
  );
}
