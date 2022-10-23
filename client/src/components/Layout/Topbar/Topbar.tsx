import { NavLink } from 'react-router-dom';

import { TopbarUserMenu, TopbarNavigation, TopbarSearch } from '.';
import { Logo, Icon } from 'components/Elements';
import { useAppSelector } from 'stores/rootStore';

export function TopBar() {
  const isLoggedIn = useAppSelector((state) => state.authSlice.isLoggedIn);

  return (
    <header className="z-20 shadow-xl sticky top-0 bg-secondary-900 text-secondary-200 h-20">
      <div className="px-2 md:px-8 mx-auto flex justify-center items-center max-w-7xl h-full">
        <TopbarNavigation
          links={[
            ['Home', '/'],
            ['Catalog', '/catalog'],
            ['About', '/about'],
            ['Contacts', '/contacts'],
          ]}
        />
        <h1>
          <NavLink to="/">
            <Logo
              variant="light"
              className="basis-32 xs:basis-40 shrink-0 -mt-2 flex justify-center text-center"
            />
          </NavLink>
        </h1>
        <div className="basis-1/2 h-full flex justify-end items-center gap-1 xs:gap-2 sm:gap-4 md:gap-6 lg:gap-4">
          <TopbarSearch />
          {isLoggedIn && (
            <NavLink
              to="/create"
              className="hidden lg:block"
              data-testid="create-top-nav-link"
            >
              <Icon type="plus" className="h-10 sm:h-12 text-main" />
            </NavLink>
          )}
          <TopbarUserMenu />
        </div>
      </div>
    </header>
  );
}
