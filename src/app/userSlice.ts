import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { UserProfile, Achievement } from '../types';
import { mockAchievements } from '../mocks';

const initialState: UserProfile = {
  name: 'Eco Explorer',
  avatarUrl: '',
  joinedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  stats: {
    totalScans: 12,
    co2SavedKg: 34.7,
    alternativesChosen: 5,
    currentStreak: 3,
    longestStreak: 7,
    lastActiveDate: new Date().toISOString(),
  },
  achievements: mockAchievements.map((a) => ({
    ...a,
    unlockedAt:
      (a.thresholdType === 'scans' && a.threshold <= 12) ||
      (a.thresholdType === 'co2' && a.threshold <= 34.7) ||
      (a.thresholdType === 'alternatives' && a.threshold <= 5) ||
      (a.thresholdType === 'streak' && a.threshold <= 3)
        ? new Date(Date.now() - Math.random() * 20 * 24 * 60 * 60 * 1000).toISOString()
        : undefined,
  })),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    incrementScans(state) {
      state.stats.totalScans += 1;
      state.stats.lastActiveDate = new Date().toISOString();
      checkAchievements(state);
    },
    addCo2Saved(state, action: PayloadAction<number>) {
      state.stats.co2SavedKg = +(state.stats.co2SavedKg + action.payload).toFixed(1);
      checkAchievements(state);
    },
    incrementAlternativesChosen(state) {
      state.stats.alternativesChosen += 1;
      checkAchievements(state);
    },
    incrementStreak(state) {
      state.stats.currentStreak += 1;
      if (state.stats.currentStreak > state.stats.longestStreak) {
        state.stats.longestStreak = state.stats.currentStreak;
      }
      checkAchievements(state);
    },
    resetStreak(state) {
      state.stats.currentStreak = 0;
    },
    updateProfile(state, action: PayloadAction<{ name?: string; avatarUrl?: string }>) {
      if (action.payload.name) state.name = action.payload.name;
      if (action.payload.avatarUrl) state.avatarUrl = action.payload.avatarUrl;
    },
  },
});

function checkAchievements(state: UserProfile) {
  const now = new Date().toISOString();
  state.achievements.forEach((ach: Achievement) => {
    if (ach.unlockedAt) return;
    let current = 0;
    switch (ach.thresholdType) {
      case 'scans': current = state.stats.totalScans; break;
      case 'co2': current = state.stats.co2SavedKg; break;
      case 'alternatives': current = state.stats.alternativesChosen; break;
      case 'streak': current = state.stats.currentStreak; break;
    }
    if (current >= ach.threshold) {
      ach.unlockedAt = now;
    }
  });
}

export const {
  incrementScans,
  addCo2Saved,
  incrementAlternativesChosen,
  incrementStreak,
  resetStreak,
  updateProfile,
} = userSlice.actions;

export default userSlice.reducer;
