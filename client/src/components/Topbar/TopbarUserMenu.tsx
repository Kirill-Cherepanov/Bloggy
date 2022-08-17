import React, { useEffect, useRef, useState } from 'react';
import Icon from '../Icon';

export default function TopbarUserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen((isOpen) => !isOpen);
  const menu = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const closeMenu = (e: MouseEvent) => {
      if (menu.current!.contains(e.target as Node)) return;
      console.log('close');
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
        <Icon type="angle" className="relative -left-1 h-6 -rotate-90" />
      </button>
      <div
        className={
          'absolute right-0 top-full transition-[height] duration-200 overflow-hidden ' +
          (isOpen ? 'flex h-32' : 'h-0')
        }
      >
        <div
          className={
            'flex flex-col w-60 bg-secondary-800 h-max' +
            (isOpen
              ? ' visible'
              : ' transition-[visibility] duration-[0ms] delay-200 invisible')
          }
        >
          <button className="h-16">Sign up</button>
          <button className="h-16 border-opacity-10 border-main border-t">
            Log in
          </button>
        </div>
      </div>
    </div>
  );
}
