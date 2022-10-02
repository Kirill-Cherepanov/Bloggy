import clsx from 'clsx';
import * as React from 'react';
import { FieldError } from 'react-hook-form';

type FieldWrapperProps = {
  label?: string;
  name?: string;
  className?: string;
  children: React.ReactNode;
  error?: FieldError | undefined;
};

export type FieldWrapperPassThroughProps = Omit<
  FieldWrapperProps,
  'className' | 'children'
>;

export const FieldWrapper = (props: FieldWrapperProps) => {
  const { label, name, className, error, children } = props;
  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className={clsx('block ml-2 font-light text-sm mb-1', className)}
        >
          {label}
        </label>
      )}
      {children}
      {error?.message && (
        <div
          role="alert"
          aria-label={error.message}
          className="ml-2 mt-1 text-sm text-red-600"
        >
          {error.message}
        </div>
      )}
    </div>
  );
};
