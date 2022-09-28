import * as z from 'zod';

import { useDisclosure } from 'hooks';
import { Form, InputField } from 'components/Form';
import { Button } from 'components/Elements';
import { LoginValues } from '../types';
import { useLoginMutation } from '../api/authApi';
import { ResetPasswordForm } from './';

const schema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(5, 'Password must be at least 3 characters long')
    .max(20, 'Password must be at most 20 characters long'),
});

type LoginFormProps = {
  onSuccess: () => void;
  swapForm: () => void;
};

export function LoginForm({ onSuccess, swapForm }: LoginFormProps) {
  const [login] = useLoginMutation();
  const resetPasswordDisclosure = useDisclosure();

  return (
    <>
      <Form<LoginValues, typeof schema>
        className="w-72 mx-auto space-y-2"
        onSubmit={async (values) => {
          const response = await login(values);

          if ('error' in response) throw response.error;

          onSuccess();
        }}
        schema={schema}
      >
        {({ register, formState }) => (
          <>
            <InputField
              type="email"
              label="Email"
              error={formState.errors['email']}
              registration={register('email')}
            />
            <InputField
              type="password"
              label="Password"
              error={formState.errors['password']}
              registration={register('password')}
            />
            <button
              type="button"
              className="block text-sm text-secodary-600 hover:underline"
              onClick={() => resetPasswordDisclosure.open()}
            >
              Forgot your password?
            </button>

            <div className="flex flex-col !mt-7">
              <Button type="submit" variant="secondary">
                Log in
              </Button>
              <div className="text-center my-1.5 font-semibold text-sm">OR</div>
              <Button onClick={swapForm}>Sign up</Button>
            </div>
          </>
        )}
      </Form>
      {resetPasswordDisclosure.isOpen && (
        <ResetPasswordForm closeMenu={resetPasswordDisclosure.close} />
      )}
    </>
  );
}
