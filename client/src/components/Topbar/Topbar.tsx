import { useState } from 'react';
import { NavLink } from 'react-router-dom';
// import { Context } from '../../context/Context';
import Icon from '../Icon';

export default function TopBar() {
  // const { user, dispatch } = useContext(Context);
  // const PF = 'http://localhost:5000/images/';

  // const handleLogout = () => {
  //   dispatch({ type: 'LOGOUT' });
  // };

  return (
    <header className="z-10 shadow-xl sticky top-0 bg-secondary-900 text-secondary-200 h-20">
      <div className="px-2 md:px-8 mx-auto flex justify-center items-center max-w-5xl h-full">
        <Navigation
          links={[
            ['Home', '/'],
            ['Posts', '/'],
            ['About', '/'],
            ['Contacts', '/'],
            ['Write', '/write']
          ]}
        />
        <div className="basis-32 xs:basis-40 text-4xl xs:text-5xl text-main shrink-0 font-sansita select-none flex justify-center text-center">
          Bloggy
        </div>
        <div className="basis-1/2 flex justify-end items-center gap-4 sm:gap-6">
          <div className="flex relative">
            <Icon
              type="search"
              className="h-8 sm:h-10 text-main lg:h-8 lg:text-secondary-500 lg:absolute top-[calc(50%-1rem)] left-2  "
            />
            <input
              type="text"
              placeholder="Search articles"
              className="h-10 pl-12 pr-2 placeholder:text-secondary-500 hidden lg:block"
            />
          </div>
          <button className="flex items-center">
            <Icon type="person" className="h-8 sm:h-10 fill-main" />
            {/* <img src={'PF + user.profilePic'} alt="" /> */}
            <Icon type="angle" className="relative -left-1 h-6 -rotate-90" />
          </button>
        </div>
      </div>
    </header>
  );
}

type NavigationProps = {
  links: [string, string][];
};

function Navigation({ links }: NavigationProps) {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const toggleHamburger = () => setIsHamburgerOpen((isOpen) => !isOpen);

  return (
    <>
      <div
        className={'MOBILE-MENU basis-1/2 flex items-center p-2 h-12 lg:hidden'}
      >
        <button
          className={'hamburger-menu-btn' + (isHamburgerOpen ? ' open' : '')}
          onClick={toggleHamburger}
        >
          <span />
          <span />
          <span />
        </button>
        <ul
          className={
            (!isHamburgerOpen ? '-translate-x-screen ' : '') +
            'absolute top-20 left-0 transition-transform flex flex-col bg-accent-600 w-full'
          }
        >
          {links.map((link, i) => (
            <li
              key={i}
              className="group text-xl font-medium transition-colors hover:bg-accent-900 hover:text-secondary-200 "
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
        <ul className="w-52 h-full flex justify-between">
          {links.map((link, i) => (
            <li
              key={i}
              className="flex items-center text-xl font-medium transition-all hover:scale-110 hover:font-bold hover:drop-shadow-[4px_4px_1px_rgba(0,0,0,0.15)]"
            >
              <NavLink to={link[1]}>{link[0]}</NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
