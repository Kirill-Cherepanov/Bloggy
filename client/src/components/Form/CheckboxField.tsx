import clsx from 'clsx';
import { UseFormRegisterReturn } from 'react-hook-form';

import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper';

type InputFieldProps = FieldWrapperPassThroughProps & {
  className?: string;
  registration: Partial<UseFormRegisterReturn>;
};

export const InputField = (props: InputFieldProps) => {
  const { label, className, registration, error } = props;

  return (
    <>
      <FieldWrapper
        label={label}
        error={error}
        className="flex gap-2 mt-4 mb-4"
      >
        <input
          type="checkbox"
          id="start-blog"
          // onChange={(e) => setStage(Number(e.target.checked))}
          className={clsx('cool-checkbox', className)}
          {...registration}
        />
      </FieldWrapper>
    </>
  );
};
