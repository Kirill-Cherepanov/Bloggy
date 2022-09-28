import clsx from 'clsx';

import { useAppSelector } from 'stores/globalStore';

type ProfilePictureProps = {
  src?: string;
  className?: string;
};

export function ProfilePicture({ src, className = '' }: ProfilePictureProps) {
  const base = '/api/images/profilePics/';
  const currentProfilePic =
    useAppSelector((state) => state.authSlice.user?.profilePic) ||
    'default.jpg';

  return (
    <img
      src={base + (src || currentProfilePic)}
      alt="Profile"
      className={clsx('aspect-square rounded-full object-cover', className)}
    />
  );
}
