import * as z from 'zod';
import { useState } from 'react';

import { useDisclosure } from 'hooks';
import { PrivateData } from 'types';
import { useAppSelector } from 'stores/globalStore';
import { Form, ButtonInputField } from 'components/Form';
import { capitalize } from 'utility/functionsOnStrings';
import { ConfirmPasswordForm } from './';
import { useUpdateUserMutation } from '../api/settingsApi';

type UpdateUserFormProps = {
  updateSelector: keyof Omit<PrivateData, 'blog' | 'profile-pic'>;
  className?: string;
};

const schemas = {
  email: z.object({ email: z.string().email() }),
  password: z
    .string()
    .min(3, 'Password must be at least 3 characters long')
    .max(20, 'Password must be at most 20 characters long'),
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters long')
    .max(20, 'Username must be at most 20 characters long'),
};

export function UpdateUserForm({
  updateSelector,
  className,
}: UpdateUserFormProps) {
  const user = useAppSelector((state) => state.authSlice.user);
  const { isOpen, open, close } = useDisclosure();
  const [changedValues, setChangedValues] = useState<{
    [value in typeof updateSelector]?: string;
  }>({});
  const [updateUser] = useUpdateUserMutation();

  if (user === null) throw Error('User data is null!');

  const currentValue =
    updateSelector === 'password' ? undefined : user[updateSelector];

  const schema = schemas[updateSelector];

  return (
    <>
      <Form<{ [value in typeof updateSelector]?: string }, typeof schema>
        onSubmit={(values) => {
          setChangedValues(values);
          open();
        }}
        className={className}
      >
        {({ register, formState }) => (
          <ButtonInputField
            type={updateSelector === 'username' ? 'text' : updateSelector}
            label={capitalize(updateSelector)}
            defaultValue={currentValue}
            error={formState.errors[updateSelector]}
            registration={register(updateSelector)}
            buttonType="submit"
          />
        )}
      </Form>

      {isOpen && (
        <ConfirmPasswordForm
          closeMenu={close}
          onSuccess={async (values) => {
            const response = await updateUser({ ...changedValues, ...values });

            if ('error' in response) throw response.error;
          }}
        />
      )}
    </>
  );
}
