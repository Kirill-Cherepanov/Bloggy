import z from 'zod';

import { Form, InputField } from 'components/Form';
import { Button, Drawer } from 'components/Elements';
import { ResetPasswordValues } from 'features/auth';

type ResetPasswordFormValues = Exclude<ResetPasswordValues, void>;

type ConfirmEmailProps = {
  closeMenu: () => unknown;
  onSuccess: (values: ResetPasswordFormValues) => unknown;
};

const schema = z.object({
  'confirm-email': z.string(),
  'new-password': z
    .string()
    .min(3, 'Password must be at least 3 characters long')
    .max(20, 'Password must be at most 20 characters long'),
});

export function ResetPasswordForm({ closeMenu, onSuccess }: ConfirmEmailProps) {
  return (
    <Drawer id="authentification" closeMenu={closeMenu}>
      <Form<ResetPasswordFormValues, typeof schema> onSubmit={onSuccess}>
        {({ register, formState }) => (
          <>
            <p>Confirmation message was sent to your email</p>
            <InputField
              label="Confirmation message"
              error={formState.errors['confirm-email']}
              registration={register('confirm-email')}
            />

            <InputField
              label="New password"
              error={formState.errors['new-password']}
              registration={register('new-password')}
            />

            <Button type="submit">Confirm</Button>
          </>
        )}
      </Form>
    </Drawer>
  );
}
