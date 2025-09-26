import { configureStore } from '@reduxjs/toolkit';
import globalReducer from './reducers/globalSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      global: globalReducer
    }
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
