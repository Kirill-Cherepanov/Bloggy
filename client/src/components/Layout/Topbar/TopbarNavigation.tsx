import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

type NavigationProps = {
  links: [string, string][];
};

export default function TopbarNavigation({ links }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleHamburger = () => setIsOpen((isOpen) => !isOpen);
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
    <>
      <div
        ref={menu}
        className={'MOBILE-MENU basis-1/2 flex items-center p-2 h-12 lg:hidden'}
      >
        <button
          className={'hamburger-menu-btn' + (isOpen ? ' open' : '')}
          onClick={toggleHamburger}
        >
          <span />
          <span />
          <span />
        </button>
        <ul
          className={
            (!isOpen ? '-translate-x-screen ' : '') +
            'absolute top-20 left-0 transition-transform flex flex-col bg-secondary-800 w-full'
          }
        >
          {links.map((link, i) => (
            <li
              key={i}
              className="group text-xl font-medium transition-colors hover:bg-secondary-600 hover:text-secondary-200 "
            >
              <NavLink
                onClick={toggleHamburger}
                to={link[1]}
                className="p-4 sm:p-5 block w-full h-full"
              >
                <span className="transition-all inline-block group-hover:scale-110 group-hover:translate-x-1 group-hover:font-bold group-hover:drop-shadow-[-4px_4px_1px_rgba(0,0,0,0.15)]">
                  {link[0]}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="DESKTOP-MENU hidden lg:block basis-1/2 h-full">
        <ul className="w-52 h-full flex justify-between gap-5 xl:gap-7">
          {links.map((link, i) => (
            <li key={i} className="flex items-center text-xl font-medium]">
              <NavLink
                to={link[1]}
                className="transition-all hover-bottom-border"
              >
                {link[0]}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
