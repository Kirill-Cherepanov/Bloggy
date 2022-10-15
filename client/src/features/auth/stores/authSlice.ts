import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ProtectedData } from 'types';
import { PreRegistrationValues } from '../types';

type UserState = {
  isLoggedIn: boolean;
  user: ProtectedData | null;
  preRegistrationData: Partial<PreRegistrationValues>;
};

const initialState: UserState = {
  isLoggedIn: false,
  user: null,
  preRegistrationData: {},
};

export const authSlice = createSlice({
  initialState,
  name: 'authSlice',
  reducers: {
    logout: () => initialState,
    setUser: (state, action: PayloadAction<ProtectedData>) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    setPreRegistrationData: (
      state,
      action: PayloadAction<PreRegistrationValues>
    ) => {
      console.log('emailInput.current.value');
      state.preRegistrationData = action.payload;
    },
  },
});

export const authReducer = authSlice.reducer;
export const { logout, setUser, setPreRegistrationData } = authSlice.actions;
