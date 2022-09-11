import { useEffect, useRef, useState } from 'react';

import { Icon } from 'components/Elements';
import { AuthDrawer } from 'features/auth';

export function TopbarUserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState<false | 'login' | 'signup'>(false);
  const menu = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const closeMenu = (e: MouseEvent) => {
      if (menu.current!.contains(e.target as Node)) return;
      setIsOpen(false);
    };

    document.addEventListener('click', closeMenu);

    return () => {
      document.removeEventListener('click', closeMenu);
    };
  }, []);

  return (
    <div
      ref={menu}
      className="h-full flex items-center justify-center xl:relative"
    >
      <button
        className="flex items-center"
        onClick={() => setIsOpen((isOpen) => !isOpen)}
      >
        <Icon type="person" className="h-8 sm:h-10 fill-main" />
        {/* <img src={'PF + user.profilePic'} alt="" /> */}
        <Icon
          type="angle"
          className={
            'relative -left-1 h-6 transition-transform ' +
            (isOpen ? 'rotate-90' : '-rotate-90')
          }
        />
      </button>
      <div
        className={
          'z-20 absolute right-0 top-full transition-[height] overflow-hidden ' +
          (isOpen ? 'flex h-32' : 'h-0')
        }
      >
        <div
          className={
            'flex flex-col w-60 h-max text-xl font-medium bg-secondary-800 ' +
            (isOpen
              ? ' visible'
              : ' transition-[visibility] duration-[0ms] delay-200 invisible')
          }
        >
          <button
            onClick={() => {
              setAuthOpen('signup');
              setIsOpen(false);
            }}
            className="group h-16 flex justify-center items-center hover:bg-secondary-200 hover:text-secondary-800"
          >
            <span className="transition-all inline-block group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:drop-shadow-[4px_4px_2px_rgba(0,0,0,0.15)]">
              Sign up
            </span>
          </button>
          <button
            onClick={() => {
              setAuthOpen('login');
              setIsOpen(false);
            }}
            className="group h-16 flex justify-center items-center hover:bg-secondary-200 hover:text-secondary-800 border-opacity-10 border-main border-t"
          >
            <span className="transition-all inline-block group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:drop-shadow-[4px_4px_2px_rgba(0,0,0,0.15)]">
              Log in
            </span>
          </button>
        </div>
      </div>
      {!authOpen ? null : (
        <AuthDrawer
          closeMenu={() => setAuthOpen(false)}
          authType={authOpen}
          toggleType={() =>
            setAuthOpen((authOpen) =>
              authOpen === 'login' ? 'signup' : 'login'
            )
          }
        />
      )}
    </div>
  );
}
