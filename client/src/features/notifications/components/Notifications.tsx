import { Notification } from '.';

import { useAppSelector, useAppDispatch } from 'stores/rootStore';
import { dismissNotification } from '../stores/notificationSlice';

export const Notifications = () => {
  const notifications = useAppSelector(
    (state) => state.notificationSlice.notifications
  );
  const dispatch = useAppDispatch();

  console.log(notifications);

  return (
    <div
      aria-live="assertive"
      className="transition-all duration-500
      z-30  fixed inset-0 px-4 py-6 sm:p-6 pointer-events-none
      flex flex-col justify-end items-end gap-4"
    >
      {notifications.slice(-3).map((notification) => (
        <Notification
          key={notification.id}
          notification={notification}
          onDismiss={(id) => dispatch(dismissNotification({ id }))}
        />
      ))}
    </div>
  );
};
