import * as z from 'zod';

import { Form, InputField } from 'components/Form';
import { Button } from 'components/Elements';

const schema = z.object({
  email: z.string().email(),
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters long')
    .max(20, 'Username must be at most 20 characters long'),
});

type PreRegistrationValues = {
  email: string;
  username: string;
};

type PreRegistrationFormProps = {
  onSuccess: () => void;
  swapForm: () => void;
};

export function PreRegistrationForm({
  onSuccess,
  swapForm,
}: PreRegistrationFormProps) {
  return (
    <Form<PreRegistrationValues, typeof schema>
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
            label="Email Address"
            error={formState.errors['email']}
            registration={register('email')}
          />
          <InputField
            type="text"
            label="Username"
            error={formState.errors['username']}
            registration={register('username')}
          />

          <div className="flex flex-col mt-5">
            <Button type="submit">Sign up</Button>
            <div className="text-center my-1.5 font-semibold text-sm order-2">
              OR
            </div>
            <Button variant="secondary" onClick={swapForm}>
              Log in
            </Button>
          </div>
        </>
      )}
    </Form>
  );
}
