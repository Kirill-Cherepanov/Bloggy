import clsx from 'clsx';
import { UseFormRegisterReturn } from 'react-hook-form';

import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper';

type CheckboxFieldProps = FieldWrapperPassThroughProps & {
  className?: string;
  registration: Partial<UseFormRegisterReturn>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function CheckboxField(props: CheckboxFieldProps) {
  const { label, className, registration, error, onChange } = props;

  return (
    <>
      <FieldWrapper label={label} error={error} className="m-0 flex gap-2">
        <input
          type="checkbox"
          onChange={onChange}
          className={clsx('cool-checkbox', className)}
          {...registration}
        />
      </FieldWrapper>
    </>
  );
}
