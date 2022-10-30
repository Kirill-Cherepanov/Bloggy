import { useAppDispatch } from 'stores/rootStore';
import { addNotification } from '../stores/notificationSlice';
import { AddNotificationType } from '../types';
import { isObject } from 'utility';

type Overwrites = Partial<AddNotificationType>;

export const useNotifyError = () => {
  const dispatch = useAppDispatch();

  return (error: unknown, overwrites?: Overwrites) => {
    let message: string | undefined;
    let title = 'Oops... Something went terribly wrong';

    if (!isObject(error) || !error.data) {
      if (typeof error === 'string') title = error;
      else {
        message = 'Details are in the console';
        console.error(error);
      }

      return dispatch(
        addNotification({
          notification: { type: 'error', title, message, ...overwrites },
        })
      );
    }

    const data = error.data;

    if (typeof data === 'string') title = data;
    else if (isObject(data) && typeof data.message === 'string') {
      title = data.message;
    } else {
      message = 'Details are in the console';
      console.error(error);
    }

    dispatch(
      addNotification({
        notification: { type: 'error', title, message, ...overwrites },
      })
    );
  };
};
