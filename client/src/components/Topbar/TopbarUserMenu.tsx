import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Icon from '../Icon';

export default function TopbarUserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen((isOpen) => !isOpen);
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
      <button className="flex items-center" onClick={toggleOpen}>
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
          'absolute right-0 top-full transition-[height] overflow-hidden ' +
          (isOpen ? 'flex h-32' : 'h-0')
        }
      >
        <div
          className={
            'flex flex-col w-60 h-max text-xl font-medium bg-accent-600 ' +
            (isOpen
              ? ' visible'
              : ' transition-[visibility] duration-[0ms] delay-200 invisible')
          }
        >
          <NavLink
            onClick={toggleOpen}
            to={'/register'}
            className="group h-16 flex justify-center items-center transition-colors hover:bg-accent-900 hover:text-secondary-200"
          >
            <span className="transition-all inline-block group-hover:scale-110 group-hover:drop-shadow-[-4px_4px_1px_rgba(0,0,0,0.15)]">
              Sign up
            </span>
          </NavLink>
          <NavLink
            onClick={toggleOpen}
            to={'/login'}
            className="group h-16 flex justify-center items-center transition-colors hover:bg-accent-900 hover:text-secondary-200 border-opacity-10 border-main border-t"
          >
            <span className="transition-all inline-block group-hover:scale-110 group-hover:drop-shadow-[-4px_4px_1px_rgba(0,0,0,0.15)]">
              Log in
            </span>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
