import clsx from 'clsx';
import * as React from 'react';

import { Spinner } from 'components/Elements';

const variants = {
  primary: {
    active: 'bg-accent-800 text-main hover:bg-accent-900',
    loading: 'bg-secondary-400 text-secondary-400',
  },
  secondary: {
    active: 'bg-secondary-800 text-main',
    loading: 'bg-secondary-400 text-secondary-400',
  },
  danger: {
    active: 'bg-red-700 text-white',
    loading: 'bg-secondary-400 text-secondary-400',
  },
  none: { active: '', loading: '' },
};

const sizes = {
  sm: 'py-1 px-3',
  md: 'py-2 px-6',
  lg: 'py-3 px-8 text-lg',
  full: 'py-2 w-full',
  none: '',
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
          isLoading ? variants[variant].loading : variants[variant].active,
          sizes[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <Spinner size="xs" className="text-current" variant="dark" />
        ) : (
          <>
            {startIcon}
            <span className="mx-2">{props.children}</span>
            {endIcon}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
