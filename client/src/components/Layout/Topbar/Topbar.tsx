import TopbarUserMenu from './TopbarUserMenu';
import TopbarNavigation from './TopbarNavigation';
import { NavLink } from 'react-router-dom';
import TopbarSearch from './TopbarSearch';
import { Logo } from 'components/Elements';

export default function TopBar() {
  return (
    <header className="z-20 shadow-xl sticky top-0 bg-secondary-900 text-secondary-200 h-20">
      <div className="px-2 md:px-8 mx-auto flex justify-center items-center max-w-7xl h-full">
        <TopbarNavigation
          links={[
            ['Home', '/'],
            ['Posts', '/catalog'],
            ['About', '/about'],
            ['Contacts', '/contacts'],
          ]}
        />
        <h1>
          <NavLink to="/">
            <Logo className="basis-32 xs:basis-40 shrink-0 -mt-2 flex justify-center text-center" />
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
