import clsx from 'clsx';

import { useAppSelector } from 'stores/rootStore';
import { PROFILE_PICS_LOCATION, DEFAULT_PROFILE_PICTURE } from 'config';
import defaultProfilePicture from 'assets/default-profile-picture.jpg';

type ProfilePictureProps = {
  src?: string;
  className?: string;
};

export function ProfilePicture({ src, className = '' }: ProfilePictureProps) {
  const currentProfilePic =
    useAppSelector((state) => state.authSlice.user?.profilePic) ||
    DEFAULT_PROFILE_PICTURE;

  let source: string;
  if (src) source = src;
  else if (currentProfilePic === DEFAULT_PROFILE_PICTURE) {
    source = defaultProfilePicture;
  } else source = PROFILE_PICS_LOCATION + currentProfilePic;

  return (
    <img
      src={source}
      alt="profile"
      className={clsx('aspect-square rounded-full object-cover', className)}
    />
  );
}
