import clsx from 'clsx';
import { UseFormRegisterReturn } from 'react-hook-form';

import { FieldWrapper, FieldWrapperPassThroughProps } from '.';

export type InputFieldProps = FieldWrapperPassThroughProps & {
  type?: 'text' | 'email' | 'password';
  className?: string;
  registration: Partial<UseFormRegisterReturn>;
  defaultValue?: string;
};

export const InputField = (props: InputFieldProps) => {
  const {
    type = 'text',
    label,
    className,
    registration,
    error,
    defaultValue,
  } = props;

  return (
    <FieldWrapper label={label} name={registration.name} error={error}>
      <input
        defaultValue={defaultValue}
        type={type}
        placeholder={label}
        className={clsx('styled-input w-full', className)}
        {...registration}
      />
    </FieldWrapper>
  );
};
