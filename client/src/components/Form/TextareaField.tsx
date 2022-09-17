import clsx from 'clsx';
import { UseFormRegisterReturn } from 'react-hook-form';

import { FieldWrapper, FieldWrapperPassThroughProps } from '.';

type TextAreaFieldProps = FieldWrapperPassThroughProps & {
  className?: string;
  registration: Partial<UseFormRegisterReturn>;
  defaultValue?: string;
};

export function TextAreaField(props: TextAreaFieldProps) {
  const { label, className, registration, error, defaultValue } = props;
  return (
    <FieldWrapper label={label} error={error}>
      <textarea
        defaultValue={defaultValue}
        rows={4}
        className={clsx(
          'bg-secondary-100 outline-1 w-full border-2 border-secondary-300 rounded-md px-2 py-1 focus:outline-2 focus:outline-accent-400',
          className
        )}
        {...registration}
      />
    </FieldWrapper>
  );
}
