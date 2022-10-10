import z from 'zod';
import { useState } from 'react';

import { Form, InputField } from 'components/Form';
import { Button, Drawer } from 'components/Elements';
import { useResetPasswordMutation } from 'features/auth';
import { useNavigate } from 'react-router';

// Decided to put all three components here to decrease the amount of files
// Especially considering that I'm not planning to use them anywhere else

type ResetPasswordFormProps = {
  closeMenu: () => unknown;
};

export function ResetPasswordForm({ closeMenu }: ResetPasswordFormProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>();
  const [resetPassword] = useResetPasswordMutation();

  return (
    <Drawer id="authentification" closeMenu={closeMenu} className="py-10 px-10">
      {email ? (
        <ConfirmResetPasswordForm
          onSuccess={async (values) => {
            const response = await resetPassword({ ...values, email });

            if ('error' in response) throw response.error;

            navigate('/');
          }}
        />
      ) : (
        <EmailForm
          onSuccess={async (values) => {
            const response = await resetPassword(values);

            if ('error' in response) throw response.error;

            setEmail(values.email);
          }}
        />
      )}
    </Drawer>
  );
}

const emailSchema = z.object({
  email: z.string().email(),
});

type EmailFormProps = {
  onSuccess: (values: { email: string }) => unknown;
};

const EmailForm = ({ onSuccess }: EmailFormProps) => {
  return (
    <>
      <Form<{ email: string }, typeof emailSchema>
        onSubmit={onSuccess}
        className="space-y-4 mx-auto"
      >
        {({ register, formState }) => (
          <>
            <h3 className="text-center">Please, enter your email</h3>
            <InputField
              label="Email"
              error={formState.errors['email']}
              registration={register('email')}
            />
            <Button type="submit">Confirm</Button>
          </>
        )}
      </Form>
    </>
  );
};

const confirmSchema = z.object({
  'confirm-email': z.string(),
  'new-password': z
    .string()
    .min(3, 'Password must be at least 3 characters long')
    .max(20, 'Password must be at most 20 characters long'),
});

type ResetPasswordFormValues = {
  'new-password': string;
  'confirm-email': string;
};

type ConfirmFormProps = {
  onSuccess: (values: ResetPasswordFormValues) => unknown;
};

const ConfirmResetPasswordForm = ({ onSuccess }: ConfirmFormProps) => {
  return (
    <Form<ResetPasswordFormValues, typeof confirmSchema>
      onSubmit={onSuccess}
      className="space-y-4 mx-auto"
    >
      {({ register, formState }) => (
        <>
          <h3 className="text-center">
            Confirmation message was sent to your email
          </h3>
          <InputField
            label="Confirmation message"
            error={formState.errors['confirm-email']}
            registration={register('confirm-email')}
          />
          <InputField
            type="password"
            label="New password"
            error={formState.errors['new-password']}
            registration={register('new-password')}
          />
          <Button type="submit">Confirm</Button>
        </>
      )}
    </Form>
  );
};
