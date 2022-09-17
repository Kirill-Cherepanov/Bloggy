import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

type CheckboxFieldProps = {
  label?: string | undefined;
  name?: string | undefined;
  error?: FieldError | undefined;
  className?: string;
  registration?: Partial<UseFormRegisterReturn>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
};

export function CheckboxField(props: CheckboxFieldProps) {
  const { label, className, registration, error, onChange, checked } = props;
  return (
    <div className={className}>
      <label className="mb-1 flex gap-2">
        <input
          type="checkbox"
          onChange={onChange}
          checked={checked}
          className="cool-checkbox"
          {...registration}
        />
        <span className="mt-[-1px]">{label}</span>
      </label>
      {error?.message && (
        <div
          role="alert"
          aria-label={error.message}
          className="mt-1 text-sm text-red-600"
        >
          {error.message}
        </div>
      )}
    </div>
  );
}
