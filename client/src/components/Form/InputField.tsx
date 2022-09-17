import clsx from 'clsx';
import { UseFormRegisterReturn } from 'react-hook-form';

import { FieldWrapper, FieldWrapperPassThroughProps } from '.';

type InputFieldProps = FieldWrapperPassThroughProps & {
  type?: 'text' | 'email' | 'password';
  className?: string;
  registration: Partial<UseFormRegisterReturn>;
};

export const InputField = (props: InputFieldProps) => {
  const { type = 'text', label, className, registration, error } = props;

  return (
    <FieldWrapper label={label} name={registration.name} error={error}>
      <input
        type={type}
        placeholder={label}
        className={clsx('styled-input w-full', className)}
        {...registration}
      />
    </FieldWrapper>
  );
};
