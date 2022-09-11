import clsx from 'clsx';
import * as React from 'react';

import { Spinner } from 'components/Elements';

const variants = {
  primary: 'bg-accent-800 text-main hover:bg-accent-900',
  secondary: 'bg-secondary-800 text-main',
  danger: 'bg-red-600 text-white',
};

const sizes = {
  sm: 'py-2 px-4 text-sm',
  md: 'py-2 px-6',
  lg: 'py-3 px-8 text-lg',
  full: 'py-2 w-full',
};

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  isLoading?: boolean;
  startIcon?: React.ReactElement;
  endIcon?: React.ReactElement;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = 'button',
      className = '',
      variant = 'primary',
      size = 'full',
      isLoading = false,
      startIcon,
      endIcon,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={clsx(
          'flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed rounded-3xl font-bold transition-colors',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {isLoading && <Spinner size="sm" className="text-current" />}
        {!isLoading && startIcon}
        <span className="mx-2">{props.children}</span> {!isLoading && endIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';
