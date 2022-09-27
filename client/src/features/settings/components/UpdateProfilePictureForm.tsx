import { useState } from 'react';

import { useAppSelector } from 'stores/globalStore';
import { inputFiles } from 'utility/inputFiles';
import { useUpdateProfilePicMutation } from '../api/settingsApi';
import { SettingsButton } from './SettingsButton';

export function UpdateProfilePictureForm() {
  const user = useAppSelector((state) => state.authSlice.user);
  const [updateProfilePic] = useUpdateProfilePicMutation();
  const [newProfilePic, setNewProfilePic] = useState<{
    src: string;
    file: File;
  }>();

  if (user === null) throw Error('User data is null!');

  return (
    <>
      <label htmlFor="profile-pic" className="block mb-2 ml-2">
        Profile picture
      </label>
      <div className="flex gap-5 mb-10">
        <img
          src={user['profile-pic']}
          alt="Profile"
          className="aspect-square rounded-full object-cover w-36"
        />
        <div className="flex flex-col justify-evenly">
          <SettingsButton
            variant="simple"
            onClick={() => {
              inputFiles((files) => {
                if (newProfilePic) URL.revokeObjectURL(newProfilePic.src);

                const src = URL.createObjectURL(files[0]);
                setNewProfilePic({ src, file: files[0] });
              });
            }}
          >
            Upload
          </SettingsButton>
          <SettingsButton
            variant="simple"
            onClick={() => {
              if (!newProfilePic) return;

              const data = new FormData();
              data.append('profile-pic', newProfilePic.file);
              updateProfilePic(data);
            }}
          >
            Change
          </SettingsButton>
        </div>
        {newProfilePic && (
          <img
            src={newProfilePic.src}
            alt="New profile"
            className="aspect-square rounded-full object-cover w-36"
          />
        )}
      </div>
    </>
  );
}
