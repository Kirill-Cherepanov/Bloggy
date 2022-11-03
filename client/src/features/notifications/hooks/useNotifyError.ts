import { useAppDispatch } from 'stores/rootStore';
import { addNotification } from '../stores/notificationSlice';
import { AddNotificationType } from '../types';
import { isObject } from 'utility';

const DEFAULT_TITLE = 'Oops... Something went terribly wrong';
const DEFAULT_MESSAGE = 'Details are in the console';

const getErrorMessage = (err: unknown): string | undefined => {
  if (typeof err === 'string') return err;

  if (!isObject(err) || !err.data) return undefined;

  const data = err.data;
  if (typeof data === 'string') return data;

  if (isObject(data) && typeof data.message === 'string') return data.message;
};

type Overwrites = Partial<AddNotificationType>;

export const useNotifyError = () => {
  const dispatch = useAppDispatch();

  return (err: unknown, overwrites?: Overwrites) => {
    let message: string | undefined;
    let title = getErrorMessage(err) || DEFAULT_TITLE;

    if (title === DEFAULT_TITLE) {
      message = DEFAULT_MESSAGE;
      console.error(err);
    } else if (title.includes('The image is too large')) {
      message =
        "I'm sorry, but the storage of this website is super limited. Please compress the image, or choose another one";
    } else if (title.includes('Unsupported file type')) {
      message =
        'Currently supported types are .png, .jpg, .jpeg, .gif, .webp .svg, .avif, .json, .git, .tiff, .tif';
    }

    dispatch(
      addNotification({
        notification: { type: 'error', title, message, ...overwrites },
      })
    );
  };
};
