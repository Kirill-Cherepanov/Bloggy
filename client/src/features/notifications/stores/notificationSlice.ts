import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

import { NotificationType, AddNotificationType } from '../types';

type NotificationState = {
  notifications: NotificationType[];
};

const initialState: NotificationState = {
  notifications: [],
};

type AddNotificationPayload = { notification: AddNotificationType };

export const notificationSlice = createSlice({
  initialState,
  name: 'notificationSlice',
  reducers: {
    addNotification: (state, action: PayloadAction<AddNotificationPayload>) => {
      state.notifications.push({
        ...action.payload.notification,
        id: nanoid(),
      });
    },

    dismissNotification: (state, action: PayloadAction<{ id: string }>) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload.id
      );
    },
  },
});

export const authReducer = notificationSlice.reducer;
export const { addNotification, dismissNotification } =
  notificationSlice.actions;
