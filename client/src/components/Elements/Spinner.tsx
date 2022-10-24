import clsx from 'clsx';

const sizes = {
  xs: ['h-6 w-6', 'h-2 w-2 border'],
  sm: ['h-9 w-9', 'h-3 w-3 border-2'],
  md: ['h-15 w-15', 'h-5 w-5 border-2'],
  lg: ['h-24 w-24', 'h-8 w-8 border-[3px]'],
};

const variants = {
  light: ['border-main', 'bg-main'],
  accent: ['border-accent-900', 'bg-accent-900'],
  dark: ['border-secondary-800', 'bg-secondary-800'],
};

export type SpinnerProps = {
  size?: keyof typeof sizes;
  variant?: keyof typeof variants;
  className?: string;
};

export const Spinner = ({
  size = 'lg',
  variant = 'dark',
  className = '',
}: SpinnerProps) => {
  const currentVariant = variants[variant];
  const currentSize = sizes[size];

  return (
    <div
      className={clsx('spinner', currentVariant[0], currentSize[0], className)}
    >
      <div className={clsx('blob top', currentSize[1])}></div>
      <div className={clsx('blob bottom', currentSize[1])}></div>
      <div className={clsx('blob left', currentSize[1])}></div>

      <div
        className={clsx('blob move-blob', currentSize[1], currentVariant[1])}
      ></div>
    </div>
  );
};
