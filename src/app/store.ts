import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import scanHistoryReducer from './scanHistorySlice';
import carbonReducer from './carbonSlice';
import settingsReducer from './settingsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    scanHistory: scanHistoryReducer,
    carbon: carbonReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
