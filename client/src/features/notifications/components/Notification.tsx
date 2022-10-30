import clsx from 'clsx';
import { Icon } from 'components/Elements';

import { NotificationType } from '../types';

const icons: Record<NotificationType['type'], JSX.Element> = {
  info: <Icon type="info" className="text-blue-800 inline h-10" />,
  success: <Icon type="checkmark" className="text-green-800 inline h-10" />,
  warning: <Icon type="warning" className="text-amber-800 inline h-10" />,
  error: <Icon type="error" className="text-red-800 inline h-10" />,
};

export type NotificationProps = {
  notification: NotificationType;
  onDismiss: (id: string) => void;
};

export const Notification = ({
  notification: { id, type, title, message },
  onDismiss,
}: NotificationProps) => {
  return (
    <>
      <div
        role="alert"
        aria-label={title}
        className={clsx(
          // Tailwind doesn't parse these classes if they're put seperately somewhere
          type === 'info'
            ? 'bg-blue-400 border-blue-800'
            : type === 'warning'
            ? 'bg-amber-400 border-amber-800'
            : type === 'success'
            ? 'bg-green-400 border-green-800'
            : type === 'error'
            ? 'bg-red-400 border-red-800'
            : '',
          `transition-all hover:scale-103
          border-2 rounded-lg w-80 px-5 py-3 relative pointer-events-auto`
        )}
      >
        <button
          aria-label="close"
          onClick={() => onDismiss(id)}
          className="absolute right-2 top-2"
        >
          <Icon type="close" className="h-6" />
        </button>

        <h3 className="font-semibold pr-3 flex gap-2">
          <span className="self-center">{icons[type]}</span>
          <span>{title}</span>
        </h3>

        <p className="font-extralight mt-2">{message}</p>
      </div>
    </>
  );
};
