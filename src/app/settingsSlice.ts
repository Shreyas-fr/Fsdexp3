import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Settings, Theme } from '../types';

const initialState: Settings = {
  searchRadiusKm: 10,
  theme: 'dark',
  language: 'en',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSearchRadius(state, action: PayloadAction<number>) {
      state.searchRadiusKm = action.payload;
    },
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload;
    },
    setLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload;
    },
  },
});

export const { setSearchRadius, setTheme, setLanguage } = settingsSlice.actions;
export default settingsSlice.reducer;
