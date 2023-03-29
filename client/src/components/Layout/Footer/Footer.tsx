import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Icon, IconType } from 'components/Elements';
import { useAppDispatch, useAppSelector } from 'stores/rootStore';
import { useLogoutMutation, setPreRegistrationData } from 'features/auth';
import { AuthDrawer } from 'features/auth';
import { useDisclosure } from 'hooks';
import { FollowBox } from './FollowBox';

export function Footer() {
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector((state) => state.authSlice.isLoggedIn);
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();
  const authDisclosure = useDisclosure();
  const emailInput = useRef<HTMLInputElement>(null);

  return (
    <footer className="bg-secondary-900 text-secondary-200 z-10 relative mt-auto">
      {isLoggedIn || (
        <div className="max-w-7xl mx-auto px-4 xs:px-8 sm:px-12 md:px-20 py-5 lg:py-8 bg-accent-400 text-secondary-1000">
          <div className="text-center lg:flex justify-center items-center gap-6">
            <div>
              <div className="text-2xl xs:text-3xl font-semibold md:font-bold uppercase">
                Sign up now
              </div>
              <div className="tracking-tight text-sm font-medium md:font-semibold md:text-base xs:text-lg uppercase mb-4 lg:mb-0">
                Become one of our exclusive first members
              </div>
            </div>
            <form
              className="flex flex-col basis-2/5 items-center gap-2 md:flex-row md:gap-0 md:justify-center lg:h-14 lg:justify-start"
              onSubmit={(e) => {
                if (emailInput.current?.value) {
                  dispatch(setPreRegistrationData({ email: emailInput.current.value }));
                }
                navigate('/registration');
              }}
            >
              <input
                ref={emailInput}
                type="text"
                placeholder="Enter your email address here"
                className="p-2 h-full w-full lg:w-[calc(100%-128px)] max-w-md transition-colors outline-none focus:text-main hover:text-main hover:bg-secondary-700 focus:bg-secondary-700"
              />
              <button
                type="submit"
                className="flex items-center justify-center bg-secondary-900 min-h-[40px] h-full text-main w-32 uppercase font-bold hover:text-accent-600"
              >
                Sign up
              </button>
            </form>
          </div>
        </div>
      )}

      <FollowBox />

      <div className="max-w-7xl mx-auto pb-5 lg:pb-8 flex flex-col">
        <ul className="px-4 xs:px-8 sm:px-12 md:px-20 py-5 border-main border-opacity-10 border-b flex flex-wrap gap-3 justify-center text-sm sm:text-base sm:gap-4 font-light">
          <li className="hover:text-accent-400">
            <Link className="link" to="/">
              Home
            </Link>
          </li>
          {isLoggedIn && (
            <li className="hover:text-accent-400">
              <Link className="link" to="/create">
                Create post
              </Link>
            </li>
          )}
          <li className="hover:text-accent-400">
            <Link className="link" to="/catalog">
              Catalog
            </Link>
          </li>
          <li className="hover:text-accent-400">
            <Link className="link" to="/about">
              About
            </Link>
          </li>
          <li className="hover:text-accent-400">
            <Link className="link" to="/contacts">
              Contacts
            </Link>
          </li>
          <li className="hover:text-accent-400 cursor-pointer">
            {isLoggedIn ? (
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
              >
                Logout
              </button>
            ) : (
              <button onClick={authDisclosure.open}>Sign in</button>
            )}
          </li>
        </ul>

        <div className="px-4 xs:px-8 sm:px-12 md:px-20 mt-5 lg:mt-8 flex justify-center items-center flex-wrap sm:flex-nowrap">
          <div className="text-lg xs:text-xl md:text-2xl font-bold font-display basis-1/3 shrink-0 grow sm:basis-48 sm:shrink-1">
            2022
          </div>
          <div className="text-lg xs:text-xl md:text-2xl font-bold font-display basis-2/3 shrink-0 grow sm:basis-48 sm:shrink-1 text-right sm:text-center">
            Kirill Cherepanov
          </div>
          <ul className="flex justify-center basis-1/2 shrink-0 grow sm:basis-48 sm:shrink-1 mt-5 sm:justify-end sm:mt-0">
            {[
              ['vk', 'https://vk.com/kcherepanov1/'],
              ['github', 'https://github.com/Kirill-Cherepanov/'],
              ['discord', 'https://discordapp.com/users/292300959265062922'],
            ].map((v, i) => (
              <li key={i}>
                <a href={v[1]} target="_blank" rel="noreferrer">
                  <Icon
                    type={v[0] as IconType}
                    className="h-10 transition-colors fill-secondary-200 hover:fill-accent-600 mx-2 last:mr-0"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {authDisclosure.isOpen && <AuthDrawer closeMenu={authDisclosure.close} authType="login" />}
    </footer>
  );
}
