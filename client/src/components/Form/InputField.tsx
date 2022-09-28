import clsx from 'clsx';
import { UseFormRegisterReturn } from 'react-hook-form';

import { FieldWrapper, FieldWrapperPassThroughProps } from '.';

const variants = {
  normal: 'styled-input w-full',
  none: '',
};

export type InputFieldProps = FieldWrapperPassThroughProps & {
  type?: 'text' | 'email' | 'password';
  className?: string;
  registration: Partial<UseFormRegisterReturn>;
  defaultValue?: string;
  variant?: keyof typeof variants;
};

export const InputField = (props: InputFieldProps) => {
  const {
    type = 'text',
    label,
    className = '',
    registration,
    error,
    defaultValue,
    variant = 'normal',
  } = props;

  return (
    <FieldWrapper label={label} name={registration.name} error={error}>
      <input
        defaultValue={defaultValue}
        type={type}
        placeholder={label}
        className={clsx(variants[variant], className)}
        {...registration}
      />
    </FieldWrapper>
  );
};
