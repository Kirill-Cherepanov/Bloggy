import { Outlet, useLocation } from 'react-router-dom';
import { Suspense, useLayoutEffect } from 'react';

import { Footer, TopBar } from 'components/Layout';
import { Spinner } from 'components/Elements';

export const AppLayout = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => window.scrollTo(0, 0), [pathname]);

  return (
    <>
      {pathname !== '/registration' && pathname !== '/create' && <TopBar />}
      <Suspense
        fallback={
          <div className="h-100 w-full flex items-center justify-center">
            <Spinner size="lg" />
          </div>
        }
      >
        <Outlet />
      </Suspense>
      {pathname !== '/registration' && pathname !== '/create' && <Footer />}
    </>
  );
};
