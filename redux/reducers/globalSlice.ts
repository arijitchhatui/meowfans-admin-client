import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCookie } from 'cookies-next';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { RootState } from '../store';

interface GlobalState {
  locale: string;
}

const initialState: GlobalState = {
  locale: (getCookie('locale') ?? 'en') as string
};

const { reducer, actions } = createSlice({
  initialState: initialState,
  name: 'global',
  reducers: {
    setLanguage: (state: GlobalState, action: PayloadAction<string>) => {
      state.locale = action.payload;
    }
  }
});

const getLocaleState = (state: RootState) => state.global.locale;

export const useLocaleState = () => useAppSelector(getLocaleState);

export const useGlobalStateDispatch = () => {
  const dispatch = useAppDispatch();

  const setLanguage = ({ language }: { language: string }) => {
    dispatch(actions.setLanguage(language));
  };

  return { setLanguage };
};

export default reducer;
