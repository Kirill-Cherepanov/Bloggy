import { useNavigate } from 'react-router';

import { Logo, Drawer } from 'components/Elements';
import { LoginForm, PreRegistrationForm } from '.';

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

  return (
    <Drawer id="authentification" closeMenu={closeMenu}>
      <Logo size="sm" variant="dark" className="my-2 mb-4 text-center" />
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
    </Drawer>
  );
}
