import * as z from 'zod';

import { Form, InputField } from 'components/Form';
import { Button } from 'components/Elements';
import { LoginValues } from '../types';

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
  return (
    <Form<LoginValues, typeof schema>
      className="w-72 mx-auto space-y-2"
      onSubmit={async (values) => {
        // await login(values);
        onSuccess();
      }}
      schema={schema}
    >
      {({ register, formState }) => (
        <>
          <InputField
            type="email"
            label="Email address"
            error={formState.errors['email']}
            registration={register('email')}
          />
          <InputField
            type="password"
            label="Password"
            error={formState.errors['password']}
            registration={register('password')}
          />
          <button className="block text-sm text-secodary-600 hover:underline">
            Forgot your password?
          </button>

          <div className="flex flex-col mt-5">
            <Button type="submit" variant="secondary">
              Log in
            </Button>
            <div className="text-center my-1.5 font-semibold text-sm order-2">
              OR
            </div>
            <Button onClick={swapForm}>Sign up</Button>
          </div>
        </>
      )}
    </Form>
  );
}
