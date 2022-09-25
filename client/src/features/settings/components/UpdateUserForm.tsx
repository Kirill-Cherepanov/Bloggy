import * as z from 'zod';

import { useAppSelector } from 'stores/globalStore';
import { useUpdateUserMutation } from '../api/settingsApi';
import { Form, ButtonInputField } from 'components/Form';
import { PrivateData } from 'types';
import { capitalize } from 'utility/functionsOnStrings';

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
  const [updateUser] = useUpdateUserMutation();

  if (user === null) throw Error('User data is null!');

  const currentValue =
    updateSelector === 'password' ? undefined : user[updateSelector];

  const schema = schemas[updateSelector];

  return (
    <Form<{ [value in typeof updateSelector]: string }, typeof schema>
      onSubmit={async (values) => {
        const response = await updateUser(values);

        if ('error' in response) throw response.error;
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
  );
}
