import * as z from 'zod';

import { Form, InputField, CheckboxField } from 'components/Form';
import { Button } from 'components/Elements';
import { RegistrationValues } from '../types';

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
  'start-blog': z.boolean(),
});

type AccountRegistrationProps = {
  setShouldCreateBlog: (b: boolean) => void;
  onSuccess: () => void;
};

export function AccountRegistration({
  onSuccess,
  setShouldCreateBlog,
}: AccountRegistrationProps) {
  const wasMessageSent = true;

  return (
    <>
      <h2 className="text-3xl text-center font-bold font-display uppercase mb-2 mt-16">
        Sign up
      </h2>

      <Form<RegistrationValues, typeof schema>
        className="max-auto w-full space-y-2"
        onSubmit={async (values) => {
          // await register(values);

          // We would also need to await a responce from the server here
          if (wasMessageSent) onSuccess();
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
              error={formState.errors['email']}
              registration={register('email')}
            />
            <InputField
              type="password"
              label="Password"
              error={formState.errors['email']}
              registration={register('email')}
            />

            {wasMessageSent && (
              <>
                <InputField
                  label="Confirmation email message"
                  error={formState.errors['email']}
                  registration={register('email')}
                />

                <button className="ml-2 block text-secondary-600 mb-4 text-sm hover:underline">
                  Send again
                </button>
              </>
            )}

            <CheckboxField
              label="Do you want to start a blog? (it's free)"
              onChange={(e) => setShouldCreateBlog(e.target.checked)}
              error={formState.errors['email']}
              registration={register('email')}
            />

            <p className="text-sm text-secondary-600 my-4">
              You will be able to change anything, or start a blog, later in the
              settings
            </p>

            <Button type="submit" />
          </>
        )}
      </Form>
    </>
  );
}
