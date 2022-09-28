import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

import { Icon, ProfilePicture } from 'components/Elements';
import { AuthDrawer, useLogoutMutation } from 'features/auth';
import { useAppSelector } from 'stores/globalStore';
import { useDisclosure } from 'hooks';

export function TopbarUserMenu() {
  const { close, toggle, isOpen } = useDisclosure();
  const [authOpen, setAuthOpen] = useState<false | 'login' | 'signup'>(false);
  const menu = useRef<HTMLDivElement | null>(null);
  const isLoggedIn = useAppSelector((state) => state.authSlice.isLoggedIn);
  const user = useAppSelector((state) => state.authSlice.user);
  const [logout] = useLogoutMutation();

  useEffect(() => {
    const closeMenu = (e: MouseEvent) => {
      if (!menu.current?.contains(e.target as Node)) close();
    };

    document.addEventListener('click', closeMenu);

    return () => {
      document.removeEventListener('click', closeMenu);
    };
  }, [close]);

  return (
    <div
      ref={menu}
      className="h-full flex items-center justify-center xl:relative"
    >
      <button className="flex items-center" onClick={toggle}>
        <ProfilePicture className="h-8 sm:h-10" />
        <Icon
          type="angle"
          className={clsx(
            'relative h-6 transition-transform',
            isOpen ? 'rotate-90' : '-rotate-90'
          )}
        />
      </button>

      <div
        className={clsx(
          'z-20 absolute right-0 top-full transition-[height] overflow-hidden',
          isOpen ? 'flex h-48' : 'h-0'
        )}
      >
        <div
          className={clsx(
            'flex flex-col w-60 h-max text-xl font-medium bg-secondary-800 [&>*]:border-opacity-10 [&>*]:border-main [&>*]:border-t [&>*:first-child]:border-none',
            isOpen
              ? 'visible'
              : 'transition-[visibility] duration-[0ms] delay-200 invisible'
          )}
        >
          {isLoggedIn ? (
            <>
              {user?.blog && (
                <MenuButton
                  onClick={() => {
                    window.location.replace(`/blog/${user.username}`);
                  }}
                >
                  My blog
                </MenuButton>
              )}
              <MenuButton
                onClick={() => {
                  window.location.replace('/settings');
                }}
              >
                Settigns
              </MenuButton>
              <MenuButton
                onClick={() => {
                  logout();
                  window.location.replace('/');
                }}
              >
                Logout
              </MenuButton>
            </>
          ) : (
            <>
              <MenuButton
                onClick={() => {
                  setAuthOpen('signup');
                  close();
                }}
              >
                Sign up
              </MenuButton>
              <MenuButton
                onClick={() => {
                  setAuthOpen('login');
                  close();
                }}
              >
                Log in
              </MenuButton>
            </>
          )}
        </div>
      </div>

      {authOpen ? (
        <AuthDrawer closeMenu={() => setAuthOpen(false)} authType={authOpen} />
      ) : null}
    </div>
  );
}

type MenuButtonProps = {
  onClick?: () => unknown;
  children?: React.ReactNode;
};

const MenuButton = ({ onClick, children }: MenuButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="group h-16 flex justify-center items-center hover:bg-secondary-200 hover:text-secondary-800"
    >
      <span className="transition-all inline-block group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:drop-shadow-[4px_4px_2px_rgba(0,0,0,0.15)]">
        {children}
      </span>
    </button>
  );
};
