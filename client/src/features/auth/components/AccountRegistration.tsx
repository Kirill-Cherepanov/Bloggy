import * as z from 'zod';
import { useState } from 'react';

import { Form, InputField, CheckboxField } from 'components/Form';
import { Button } from 'components/Elements';
import { RegistrationValues } from '../types';
import { useRegisterMutation } from '../api/authApi';
import { useAppSelector } from 'stores/rootStore';
import { useNotifyError } from 'features/notifications';

const schema = z.object({
  email: z.string().email(),
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters long')
    .max(20, 'Username must be at most 20 characters long'),
  password: z
    .string()
    .min(5, 'Password must be at least 5 characters long')
    .max(20, 'Password must be at most 20 characters long'),
  confirmationMessage: z.string().optional(),
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
  const initial = useAppSelector(
    (state) => state.authSlice.preRegistrationData
  );
  const [wasMessageSent, setWasMessageSent] = useState(false);
  const [register] = useRegisterMutation();
  const [hasOngoingRequest, setHasOngoingRequest] = useState(false);
  const [shouldSendAgain, setShouldSendAgain] = useState(false);
  const notifyError = useNotifyError();

  return (
    <>
      <h2 className="text-3xl text-center font-bold font-display uppercase mb-2 mt-16">
        Sign up
      </h2>

      <Form<RegistrationValues, typeof schema>
        className="max-auto w-full space-y-2"
        onSubmit={async (values) => {
          if (hasOngoingRequest) return;
          setHasOngoingRequest(true);

          const response = await register({ ...values, shouldSendAgain });

          setShouldSendAgain(false);
          setHasOngoingRequest(false);

          if ('error' in response) return notifyError(response.error);

          if (response.data.status === 'success') return onSuccess();
          if (response.data.status === 'message sent') setWasMessageSent(true);
        }}
        schema={schema}
      >
        {({ register, formState }) => (
          <>
            <InputField
              defaultValue={initial.email}
              type="email"
              label="Email address"
              error={formState.errors['email']}
              registration={register('email')}
            />
            <InputField
              defaultValue={initial.username}
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
                  error={formState.errors['confirmationMessage']}
                  registration={register('confirmationMessage')}
                  autoComplete="off"
                />

                <button
                  type="submit"
                  className="ml-2 block text-secondary-600 mb-4 text-sm hover:underline"
                  onClick={() => setShouldSendAgain(true)}
                >
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

            <Button type="submit" isLoading={hasOngoingRequest}>
              Sign up
            </Button>
          </>
        )}
      </Form>
    </>
  );
}
