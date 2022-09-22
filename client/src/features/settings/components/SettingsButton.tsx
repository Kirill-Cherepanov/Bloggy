import clsx from 'clsx';

import { Button, ButtonProps } from 'components/Elements';

const variants = {
  primary:
    'bg-accent-50 font-semibold text-accent-700 border-accent-300 hover:bg-accent-300 hover:text-accent-900',
  danger:
    'bg-red-50 font-semibold text-red-600 border-red-300 hover:bg-red-300 hover:text-red-900',
};

type SettingsButtonProps = Omit<ButtonProps, 'size' | 'variants'> & {
  variant?: keyof typeof variants;
};

// I'm not forwarding ref here cuz I don't need it yet
export function SettingsButton(props: SettingsButtonProps) {
  const { className, variant = 'primary', ...buttonProps } = props;

  return (
    <Button
      size="sm"
      variant="none"
      className={clsx('rounded-md border-2 ', variants[variant], className)}
      {...buttonProps}
    />
  );
}
