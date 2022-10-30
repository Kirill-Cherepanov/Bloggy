import { useState } from 'react';
import * as z from 'zod';

import { Form, TextAreaField } from 'components/Form';
import { Button, Picker, Tooltip } from 'components/Elements';
import { useUpdateUserMutation } from 'features/settings';
import { useNotifyError } from 'features/notifications';

const schema = z.object({
  description: z
    .string()
    .max(1000, 'Description must be at most 1000 characters long'),
});

type BlogValues = {
  description: string;
};

type BlogRegistrationProps = {
  onSuccess: () => void;
};

export function BlogRegistration({ onSuccess }: BlogRegistrationProps) {
  const [categories, setCategories] = useState<string[]>([]);
  const [updateUser] = useUpdateUserMutation();
  const [hasOngoingRequest, setHasOngoingRequest] = useState(false);
  const notifyError = useNotifyError();

  return (
    <>
      <h2 className="text-3xl text-center font-bold font-display uppercase mt-16 mb-4">
        Create your blog
      </h2>
      <Form<BlogValues, typeof schema>
        className="mx-auto w-full"
        onSubmit={async (values) => {
          if (hasOngoingRequest) return;
          setHasOngoingRequest(true);

          const blogData = {
            blog: {
              ...values,
              categories,
            },
          };
          const response = await updateUser(blogData);

          setHasOngoingRequest(false);

          if ('error' in response) return notifyError(response.error);

          if (response.data.status === 'success') onSuccess();
        }}
      >
        {({ register, formState }) => (
          <>
            <TextAreaField
              label="Blog description"
              error={formState.errors['description']}
              registration={register('description')}
            />

            <div>
              <div className="flex items-center font-light text-sm mb-2">
                Add categories that your blog specializes in
                <Tooltip outerText="?">
                  Please choose categories in order of their importance to you.
                  Also, you will be able to make posts from any category. They
                  are needed mostly for search optimization.
                </Tooltip>
              </div>
              <Picker
                data={categories}
                setData={setCategories}
                maxLength={10}
              />
            </div>

            <Button
              type="submit"
              className="mt-6"
              isLoading={hasOngoingRequest}
            >
              Create a blog
            </Button>
          </>
        )}
      </Form>
    </>
  );
}
