import clsx from 'clsx';

import { useAppSelector } from 'stores/rootStore';
import { PROFILE_PICS_LOCATION } from 'config';

type ProfilePictureProps = {
  src?: string;
  className?: string;
};

export function ProfilePicture({ src, className = '' }: ProfilePictureProps) {
  const currentProfilePic =
    useAppSelector((state) => state.authSlice.user?.profilePic) ||
    'default.jpg';

  return (
    <img
      src={PROFILE_PICS_LOCATION + (src || currentProfilePic)}
      alt=""
      className={clsx('aspect-square rounded-full object-cover', className)}
    />
  );
}
