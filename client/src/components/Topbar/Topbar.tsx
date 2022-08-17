import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Context } from '../../context/Context';
import './Topbar.css';
import Icon from '../Icon';

export default function TopBar() {
  // const { user, dispatch } = useContext(Context);
  // const PF = 'http://localhost:5000/images/';

  // const handleLogout = () => {
  //   dispatch({ type: 'LOGOUT' });
  // };

  return (
    <header
      className={
        'z-10 shadow-xl sticky top-0 bg-primary-400 h-14 text-secondary-900'
      }
    >
      <div className="px-2 md:px-8 mx-auto flex justify-center items-center max-w-5xl h-full">
        <Navigation
          links={[
            ['Home', '/'],
            ['Posts', '/'],
            ['About', '/'],
            ['Contacts', '/'],
            ['Write (for deletion)', '/write']
          ]}
        />
        <div className="basis-60 text-4xl text-primary-900 shrink-0 font-sansita select-none flex justify-center text-center">
          Bloggy
        </div>
        <div className="basis-1/2 flex justify-end items-center gap-6">
          <div>
            <Icon type="search" />
            <input type="text" placeholder="search" />
          </div>
          <div>User</div>
          <img className="topImg" src={'PF + user.profilePic'} alt="" />
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
        className={'MOBILE-MENU basis-1/2 flex items-center p-2 h-12 md:hidden'}
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
            (!isHamburgerOpen ? '-translate-x-screen' : '') +
            ' border-t border-opacity-70 border-t-primary-500 absolute top-14 left-0 transition-transform flex flex-col bg-primary-400 w-full'
          }
        >
          {links.map((link, i) => (
            <li
              key={i}
              className="group text-xl font-medium transition-colors hover:bg-primary-600 hover:text-secondary-200 "
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

      <div className="DESKTOP-MENU hidden md:block basis-1/2 h-full">
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
