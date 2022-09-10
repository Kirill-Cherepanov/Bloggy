import clsx from 'clsx';
import { UseFormRegisterReturn } from 'react-hook-form';

import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper';

type InputFieldProps = FieldWrapperPassThroughProps & {
  type?: 'text' | 'email' | 'password';
  className?: string;
  registration: Partial<UseFormRegisterReturn>;
};

export const InputField = (props: InputFieldProps) => {
  const { type = 'text', label, className, registration, error } = props;

  return (
    <FieldWrapper label={label} error={error}>
      <input
        type={type}
        className={clsx('styled-input w-80', className)}
        {...registration}
      />
    </FieldWrapper>
  );
};
