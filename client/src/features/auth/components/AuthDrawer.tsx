import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router';

import { Icon, Logo } from 'components/Elements';
import { LoginForm } from './LoginForm';
import { PreRegistrationForm } from './PreRegistrationForm';

type AuthDrawerProps = {
  closeMenu: () => unknown;
  authType: 'login' | 'signup';
  toggleType: () => unknown;
};

export function AuthDrawer({
  closeMenu,
  authType,
  toggleType,
}: AuthDrawerProps) {
  const navigate = useNavigate();

  return createPortal(
    <div
      onMouseDown={(e) => {
        if (e.currentTarget !== e.target) return true;
        closeMenu();
      }}
      className="flex bg-opacity-60 bg-secondary-900 justify-center items-center fixed top-0 w-full h-full z-20"
    >
      <div className="text-secondary-800 flex flex-col min-w-[20rem] w-[480px] max-w-xl pb-20 bg-main p-4 shadow-lg rounded-[32px] relative">
        <button
          onClick={closeMenu}
          className="absolute right-4 top-4 ml-auto mb-4 rounded-full hover:bg-secondary-200 p-1"
        >
          <Icon type="close" className="w-8 h-8 select-none" />
        </button>
        <Logo size="sm" variant="dark" className="my-2 mb-4" />
        <h3 className="font-display font-bold text-center text-3xl mt-4 mb-6">
          Welcome to Bloggy
        </h3>

        {authType === 'login' ? (
          <LoginForm
            onSuccess={() => navigate('/blog/KissMyUSSR')}
            swapForm={toggleType}
          />
        ) : (
          <PreRegistrationForm
            onSuccess={() => navigate('/registration')}
            swapForm={toggleType}
          />
        )}
      </div>
    </div>,
    document.getElementById('authentification')!
  );
}
