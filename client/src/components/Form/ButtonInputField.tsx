import clsx from 'clsx';
import { UseFormRegisterReturn } from 'react-hook-form';

import { FieldWrapper, FieldWrapperPassThroughProps } from '.';

type ButtonInputFieldProps = FieldWrapperPassThroughProps & {
  type?: 'text' | 'email' | 'password';
  className?: string;
  registration: Partial<UseFormRegisterReturn>;
  defaultValue?: string;
  buttonType?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

export const ButtonInputField = (props: ButtonInputFieldProps) => {
  const {
    type = 'text',
    label,
    className,
    registration,
    error,
    defaultValue,
    buttonType,
    onClick,
  } = props;

  return (
    <FieldWrapper
      label={label}
      name={registration.name}
      error={error}
      className="text-base font-normal"
    >
      <div className="w-full flex">
        <input
          defaultValue={defaultValue}
          type={type}
          placeholder={label}
          className={clsx(
            'styled-input min-w-0 rounded-r-none border-r-0',
            className
          )}
          {...registration}
        />
        <button
          type={buttonType}
          onClick={onClick}
          className="rounded-r-2xl border-2 px-3 py-2.5 border-secondary-300 focus:outline-accent-400 hover:border-accent-300 hover:bg-accent-300"
        >
          Change
        </button>
      </div>
    </FieldWrapper>
  );
};
