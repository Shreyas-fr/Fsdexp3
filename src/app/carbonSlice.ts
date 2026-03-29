import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CarbonState, Frequency } from '../types';

const initialState: CarbonState = {
  userCount: 100,
  frequency: 'weekly',
  durationMonths: 6,
  impactFactor: 0.85,
  totalSaved: 0,
};

const carbonSlice = createSlice({
  name: 'carbon',
  initialState,
  reducers: {
    setUserCount(state, action: PayloadAction<number>) {
      state.userCount = action.payload;
    },
    setFrequency(state, action: PayloadAction<Frequency>) {
      state.frequency = action.payload;
    },
    setDurationMonths(state, action: PayloadAction<number>) {
      state.durationMonths = action.payload;
    },
    setImpactFactor(state, action: PayloadAction<number>) {
      state.impactFactor = action.payload;
    },
    setTotalSaved(state, action: PayloadAction<number>) {
      state.totalSaved = action.payload;
    },
  },
});

export const {
  setUserCount,
  setFrequency,
  setDurationMonths,
  setImpactFactor,
  setTotalSaved,
} = carbonSlice.actions;

export default carbonSlice.reducer;
