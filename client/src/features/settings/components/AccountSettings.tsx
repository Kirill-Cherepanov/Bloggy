import { useAppSelector } from 'stores/globalStore';
import { useDisclosure } from 'hooks';
import { useResetPasswordMutation } from 'features/auth';
import {
  useDeleteUserMutation,
  useUpdateUserMutation,
} from '../api/settingsApi';
import {
  SettingsButton,
  UpdateUserForm,
  ResetPasswordForm,
  UpdateProfilePictureForm,
  ConfirmPasswordForm,
} from './';

export function AccountSettings() {
  const user = useAppSelector((state) => state.authSlice.user);

  const [updateUser] = useUpdateUserMutation();
  const [resetPassword] = useResetPasswordMutation();
  const [deleteAccount] = useDeleteUserMutation();

  const confirmEmailDisclosure = useDisclosure();

  if (user === null) throw Error('User data is null!');

  return (
    <div className="w-full">
      <h3 className="text-3xl font-medium font-display mb-5">Account</h3>

      <div className="space-y-4">
        <UpdateUserForm updateSelector="email" />
        <UpdateUserForm updateSelector="username" />
        <UpdateUserForm updateSelector="password" />
      </div>

      <button
        className="block text-sm text-secodary-600 hover:underline mb-8"
        onClick={() => {
          resetPassword();
          confirmEmailDisclosure.open();
        }}
      >
        Forgot your password?
      </button>
      {confirmEmailDisclosure.isOpen && (
        <ResetPasswordForm
          closeMenu={confirmEmailDisclosure.close}
          onSuccess={resetPassword}
        />
      )}

      <UpdateProfilePictureForm />

      <div className="flex gap-6">
        {!user.blog && (
          <SettingsButton onClick={() => updateUser({ blog: {} })}>
            Create blog
          </SettingsButton>
        )}
        <SettingsButton
          variant="danger"
          onClick={() => {
            deleteAccount();
            confirmEmailDisclosure.open();
          }}
        >
          Delete account
        </SettingsButton>
      </div>
      {confirmEmailDisclosure.isOpen && (
        <ConfirmPasswordForm
          closeMenu={confirmEmailDisclosure.close}
          onSuccess={async (values) => {
            const response = await deleteAccount(values);

            if ('error' in response) throw response.error;
          }}
        />
      )}
    </div>
  );
}
