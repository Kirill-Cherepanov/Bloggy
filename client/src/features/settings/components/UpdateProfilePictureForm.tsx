import { useState } from 'react';

import { ProfilePicture } from 'components/Elements';
import { useAppSelector } from 'stores/rootStore';
import { inputFiles } from 'utility/inputFiles';
import { useUpdateProfilePicMutation } from '../api/settingsApi';
import { SettingsButton } from './SettingsButton';
import clsx from 'clsx';

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
      <label htmlFor="profile-picture" className="block mb-2 ml-2">
        Profile picture
      </label>
      <div className="flex gap-5 mb-10">
        <ProfilePicture
          className={clsx(
            'h-32 sm:h-36',
            !!newProfilePic && 'hidden xs:block md:hidden lg:block'
          )}
        />
        <div className="flex flex-col justify-evenly order-3 xs:order-2 md:order-3 lg:order-2">
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
              data.append('profile-picture', newProfilePic.file);
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
            className={clsx(
              'aspect-square rounded-full object-cover h-32 sm:h-36 order-2 xs:order-3 md:order-2 lg:order-3',
              !newProfilePic && 'hidden xs:block md:hidden lg:block'
            )}
          />
        )}
      </div>
    </>
  );
}
