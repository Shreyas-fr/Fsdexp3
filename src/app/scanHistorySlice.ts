import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ScanResult } from '../types';

interface ScanHistoryState {
  scans: ScanResult[];
}

const initialState: ScanHistoryState = {
  scans: [],
};

const scanHistorySlice = createSlice({
  name: 'scanHistory',
  initialState,
  reducers: {
    addScan(state, action: PayloadAction<ScanResult>) {
      state.scans.unshift(action.payload);
    },
    removeScan(state, action: PayloadAction<string>) {
      state.scans = state.scans.filter((s) => s.id !== action.payload);
    },
    clearHistory(state) {
      state.scans = [];
    },
  },
});

export const { addScan, removeScan, clearHistory } = scanHistorySlice.actions;
export default scanHistorySlice.reducer;
