import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import Card from '../../components/Card';
import ScoreGauge from '../../components/ScoreGauge';
import { useAppSelector } from '../../app/hooks';
import { mockWeeklyData } from '../../mocks';
import { formatCO2, formatDate, getScoreColor } from '../../utils';

export default function Journey() {
  const user = useAppSelector((s) => s.user);
  const scans = useAppSelector((s) => s.scanHistory.scans);
  const [activeTab, setActiveTab] = useState<'stats' | 'achievements' | 'history'>('stats');
  const [newlyUnlocked, setNewlyUnlocked] = useState<string | null>(null);

  const stats = [
    { label: 'Total Scans', value: user.stats.totalScans.toString(), icon: '🔍', color: 'text-emerald-400' },
    { label: 'CO₂ Saved', value: formatCO2(user.stats.co2SavedKg), icon: '🌍', color: 'text-sky-400' },
    { label: 'Alternatives', value: user.stats.alternativesChosen.toString(), icon: '🔄', color: 'text-amber-400' },
    { label: 'Current Streak', value: `${user.stats.currentStreak} days`, icon: '🔥', color: 'text-orange-400' },
  ];

  const unlockedCount = user.achievements.filter((a) => a.unlockedAt).length;

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl lg:text-3xl font-display font-bold text-stone-100">
          Your Sustainability Journey
        </h1>
        <p className="text-stone-400 mt-1 text-sm">
          Track your eco impact and unlock achievements
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Card hover>
              <span className="text-2xl">{stat.icon}</span>
              <p className={`text-xl lg:text-2xl font-display font-bold mt-2 ${stat.color}`}>
                {stat.value}
              </p>
              <p className="text-xs text-stone-500 mt-1">{stat.label}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Streak Banner */}
      {user.stats.currentStreak >= 3 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card glow padding="sm">
            <div className="flex items-center gap-4">
              <div className="text-4xl">🔥</div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-stone-100">
                  {user.stats.currentStreak}-Day Streak!
                </p>
                <p className="text-xs text-stone-400">
                  You've maintained a {user.stats.currentStreak}-day eco-conscious streak.
                  Your longest streak is {user.stats.longestStreak} days!
                </p>
              </div>
              <div className="text-3xl font-display font-bold text-amber-400">
                {user.stats.currentStreak}
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 bg-stone-800/40 rounded-xl p-1">
        {(['stats', 'achievements', 'history'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all
              ${activeTab === tab
                ? 'bg-emerald-500/20 text-emerald-300 shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
              }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'stats' && (
          <motion.div
            key="stats"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="space-y-4"
          >
            {/* Weekly Progress Chart */}
            <Card>
              <h3 className="text-sm font-semibold text-stone-300 mb-4">Weekly Activity</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockWeeklyData} barCategoryGap="20%">
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(120,113,108,0.15)" />
                    <XAxis
                      dataKey="day"
                      tick={{ fill: '#a8a29e', fontSize: 12 }}
                      axisLine={{ stroke: 'rgba(120,113,108,0.2)' }}
                    />
                    <YAxis
                      tick={{ fill: '#a8a29e', fontSize: 12 }}
                      axisLine={{ stroke: 'rgba(120,113,108,0.2)' }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#292524',
                        border: '1px solid rgba(120,113,108,0.3)',
                        borderRadius: '12px',
                        fontSize: 12,
                        color: '#e7e5e4',
                      }}
                    />
                    <Bar dataKey="scans" fill="#10b981" radius={[6, 6, 0, 0]} name="Scans" />
                    <Bar dataKey="co2Saved" fill="#14b8a6" radius={[6, 6, 0, 0]} name="CO₂ Saved (kg)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Long-term Stats */}
            <Card>
              <h3 className="text-sm font-semibold text-stone-300 mb-3">All-Time Stats</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-stone-800/30 rounded-xl p-4">
                  <p className="text-xs text-stone-500">Longest Streak</p>
                  <p className="text-xl font-bold text-amber-400 mt-1">{user.stats.longestStreak} days</p>
                </div>
                <div className="bg-stone-800/30 rounded-xl p-4">
                  <p className="text-xs text-stone-500">Member Since</p>
                  <p className="text-xl font-bold text-stone-300 mt-1">
                    {formatDate(user.joinedAt)}
                  </p>
                </div>
                <div className="bg-stone-800/30 rounded-xl p-4">
                  <p className="text-xs text-stone-500">Achievements</p>
                  <p className="text-xl font-bold text-emerald-400 mt-1">
                    {unlockedCount}/{user.achievements.length}
                  </p>
                </div>
                <div className="bg-stone-800/30 rounded-xl p-4">
                  <p className="text-xs text-stone-500">Avg Score</p>
                  <p className="text-xl font-bold text-teal-400 mt-1">
                    {scans.length > 0
                      ? (scans.reduce((a, s) => a + s.product.score, 0) / scans.length).toFixed(1)
                      : '—'
                    }
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {activeTab === 'achievements' && (
          <motion.div
            key="achievements"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
          >
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-stone-300">
                  Achievements ({unlockedCount}/{user.achievements.length})
                </h3>
                <div className="h-2 w-32 bg-stone-700/60 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-400 rounded-full transition-all duration-500"
                    style={{ width: `${(unlockedCount / user.achievements.length) * 100}%` }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {user.achievements.map((ach, i) => {
                  const isUnlocked = !!ach.unlockedAt;
                  return (
                    <motion.div
                      key={ach.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className={`relative rounded-xl border p-4 transition-all
                        ${isUnlocked
                          ? 'bg-emerald-950/20 border-emerald-600/30'
                          : 'bg-stone-800/20 border-stone-700/30 opacity-60'
                        }`}
                      onClick={() => {
                        if (isUnlocked) setNewlyUnlocked(ach.id);
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <span className={`text-2xl ${!isUnlocked && 'grayscale'}`}>{ach.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-semibold ${isUnlocked ? 'text-stone-100' : 'text-stone-500'}`}>
                            {ach.title}
                          </p>
                          <p className="text-xs text-stone-500 mt-0.5">{ach.description}</p>
                          {isUnlocked && ach.unlockedAt && (
                            <p className="text-[10px] text-emerald-500 mt-1">
                              Unlocked {formatDate(ach.unlockedAt)}
                            </p>
                          )}
                        </div>
                        {isUnlocked && (
                          <span className="text-emerald-400 text-xs">✓</span>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </Card>

            {/* Achievement unlock animation */}
            <AnimatePresence>
              {newlyUnlocked && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/60 backdrop-blur-sm"
                  onClick={() => setNewlyUnlocked(null)}
                >
                  <motion.div
                    initial={{ scale: 0.5, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ type: 'spring', damping: 12 }}
                    className="bg-stone-900/95 border border-emerald-500/40 rounded-2xl p-8 text-center max-w-sm shadow-2xl"
                  >
                    {(() => {
                      const ach = user.achievements.find((a) => a.id === newlyUnlocked);
                      if (!ach) return null;
                      return (
                        <>
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="text-6xl mb-4"
                          >
                            {ach.icon}
                          </motion.div>
                          <h2 className="text-xl font-display font-bold text-stone-100">
                            {ach.title}
                          </h2>
                          <p className="text-sm text-stone-400 mt-2">{ach.description}</p>
                          <div className="mt-4 flex justify-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <motion.div
                                key={i}
                                animate={{ y: [0, -8, 0], opacity: [0.5, 1, 0.5] }}
                                transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.15 }}
                                className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                              />
                            ))}
                          </div>
                        </>
                      );
                    })()}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {activeTab === 'history' && (
          <motion.div
            key="history"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
          >
            <Card>
              <h3 className="text-sm font-semibold text-stone-300 mb-4">
                Scan History ({scans.length} scans)
              </h3>
              {scans.length === 0 ? (
                <div className="text-center py-12">
                  <span className="text-4xl block mb-3">📋</span>
                  <p className="text-sm text-stone-400">No scans yet. Start scanning products!</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {scans.map((scan, i) => (
                    <motion.div
                      key={scan.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-3 p-3 bg-stone-800/30 rounded-xl hover:bg-stone-800/50 transition-colors"
                    >
                      <ScoreGauge
                        score={scan.product.score}
                        size={44}
                        strokeWidth={4}
                        animated={false}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-stone-200 truncate">
                          {scan.product.name}
                        </p>
                        <p className="text-xs text-stone-500">
                          {scan.product.brand} • {formatDate(scan.scannedAt)}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className={`text-sm font-bold ${getScoreColor(scan.product.score)}`}>
                          {scan.product.score}/10
                        </span>
                        <p className="text-[10px] text-stone-500 capitalize">{scan.inputMethod}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
