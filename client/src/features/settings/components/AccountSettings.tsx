import { useAppSelector } from 'stores/globalStore';
import {
  useUpdateProfilePicMutation,
  useUpdateUserMutation,
} from '../api/settingsApi';
import { SettingsButton, UpdateUserForm } from './';

export function AccountSettings() {
  const user = useAppSelector((state) => state.authSlice.user);
  const [updateUser] = useUpdateUserMutation();
  const [updateProfilePic] = useUpdateProfilePicMutation();

  if (user === null) throw Error('User data is null!');

  return (
    <div className="w-full">
      <h3 className="text-3xl font-medium font-display mb-5">Account</h3>

      <div className="space-y-4">
        <UpdateUserForm updateSelector="email" />
        <UpdateUserForm updateSelector="username" />
        <UpdateUserForm updateSelector="password" />
      </div>

      <button className="block text-sm text-secodary-600 hover:underline mb-8">
        Forgot your password?
      </button>

      <label htmlFor="profile-pic" className="block mb-2 ml-2">
        Profile picture
      </label>
      <div className="flex gap-5 mb-10">
        <img
          src={user['profile-pic']}
          alt="profile"
          className="aspect-square rounded-full object-cover w-36"
        />
        <div className="flex flex-col justify-evenly">
          <SettingsButton variant="simple">Upload</SettingsButton>
          <SettingsButton variant="simple">Change</SettingsButton>
        </div>
      </div>

      <div className="flex gap-6">
        <SettingsButton>Create blog</SettingsButton>
        <SettingsButton variant="danger">Delete account</SettingsButton>
      </div>
    </div>
  );
}
