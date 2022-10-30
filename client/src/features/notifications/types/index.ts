export type NotificationType = {
  id: string;
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message?: string;
};

export type AddNotificationType = Omit<NotificationType, 'id'>;
