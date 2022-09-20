import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ProtectedData } from '../types';

type UserState = {
  user: ProtectedData | null;
};

const initialState: UserState = {
  user: null,
};

export const authSlice = createSlice({
  initialState,
  name: 'authSlice',
  reducers: {
    logout: () => initialState,
    setUser: (state, action: PayloadAction<ProtectedData | null>) => {
      state.user = action.payload;
    },
  },
});

export const authReducer = authSlice.reducer;
export const { logout, setUser } = authSlice.actions;
