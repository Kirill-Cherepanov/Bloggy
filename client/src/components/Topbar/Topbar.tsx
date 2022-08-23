// import { useState } from 'react';
// import { Context } from '../../context/Context';
import TopbarUserMenu from './TopbarUserMenu';
import TopbarNavigation from './TopbarNavigation';
import { NavLink } from 'react-router-dom';
import TopbarSearch from './TopbarSearch';

export default function TopBar() {
  // const { user, dispatch } = useContext(Context);
  // const PF = 'http://localhost:5000/images/';

  // const handleLogout = () => {
  //   dispatch({ type: 'LOGOUT' });
  // };

  return (
    <header className="z-20 shadow-xl sticky top-0 bg-secondary-900 text-secondary-200 h-20">
      <div className="px-2 md:px-8 mx-auto flex justify-center items-center max-w-7xl h-full">
        <TopbarNavigation
          links={[
            ['Home', '/'],
            ['Posts', '/'],
            ['About', '/'],
            ['Contacts', '/']
          ]}
        />
        <h1>
          <NavLink
            to="/"
            className="basis-32 xs:basis-40 text-4xl xs:text-5xl text-main shrink-0 font-sansita select-none flex justify-center text-center -mt-2"
          >
            Bloggy
          </NavLink>
        </h1>
        <div className="basis-1/2 h-full flex justify-end items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12">
          <TopbarSearch />
          <TopbarUserMenu />
        </div>
      </div>
    </header>
  );
}
