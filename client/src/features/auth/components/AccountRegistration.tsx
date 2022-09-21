import * as z from 'zod';
import { useState } from 'react';

import { Form, InputField, CheckboxField } from 'components/Form';
import { Button } from 'components/Elements';
import { RegistrationValues } from '../types';
import { useRegisterMutation } from '../api/authApi';

const schema = z.object({
  email: z.string().email(),
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters long')
    .max(20, 'Username must be at most 20 characters long'),
  password: z
    .string()
    .min(3, 'Password must be at least 3 characters long')
    .max(20, 'Password must be at most 20 characters long'),
  'confirm-email': z.string().optional(),
});

type AccountRegistrationProps = {
  shouldCreateBlog: boolean;
  setShouldCreateBlog: (b: boolean) => void;
  onSuccess: () => void;
};

export function AccountRegistration({
  onSuccess,
  shouldCreateBlog,
  setShouldCreateBlog,
}: AccountRegistrationProps) {
  const [wasMessageSent, setWasMessageSent] = useState(false);
  const [register] = useRegisterMutation();

  return (
    <>
      <h2 className="text-3xl text-center font-bold font-display uppercase mb-2 mt-16">
        Sign up
      </h2>

      <Form<RegistrationValues, typeof schema>
        className="max-auto w-full space-y-2"
        onSubmit={async (values) => {
          const response = await register(values);

          if ('error' in response) throw response.error;

          if (!wasMessageSent && 'messageSent' in response.data) {
            return setWasMessageSent(true);
          }

          if ('success' in response.data) onSuccess();
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
              label="Username"
              error={formState.errors['username']}
              registration={register('username')}
            />
            <InputField
              type="password"
              label="Password"
              error={formState.errors['password']}
              registration={register('password')}
            />

            {wasMessageSent && (
              <>
                <InputField
                  label="Confirmation email message"
                  error={formState.errors['confirm-email']}
                  registration={register('confirm-email')}
                />

                <button className="ml-2 block text-secondary-600 mb-4 text-sm hover:underline">
                  Send again
                </button>
              </>
            )}

            <CheckboxField
              label="Do you want to start a blog? (it's free)"
              onChange={(e) => setShouldCreateBlog(e.target.checked)}
              checked={shouldCreateBlog}
              className="!my-3"
            />

            <p className="text-sm text-secondary-600 !my-4">
              You will be able to change anything, or start a blog, later in the
              settings
            </p>

            <Button type="submit">Sign up</Button>
          </>
        )}
      </Form>
    </>
  );
}
