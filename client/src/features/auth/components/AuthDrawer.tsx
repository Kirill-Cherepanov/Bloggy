import { useNavigate } from 'react-router';
import { useState } from 'react';

import { LoginForm, PreRegistrationForm } from '.';
import { Logo, Drawer } from 'components/Elements';

type AuthDrawerProps = {
  closeMenu: () => unknown;
  authType: 'login' | 'signup';
};

export function AuthDrawer({ closeMenu, authType = 'login' }: AuthDrawerProps) {
  const [type, setType] = useState(authType);
  const navigate = useNavigate();

  return (
    <Drawer id="authentification" closeMenu={closeMenu} className="pb-20">
      <Logo size="sm" variant="dark" className="my-2 mb-8 block text-center" />
      <h3 className="font-display font-bold text-center text-3xl mb-6">
        Welcome to Bloggy
      </h3>

      {type === 'login' ? (
        <LoginForm
          onSuccess={() => {
            navigate('/blog/KissMyUSSR');
            closeMenu();
          }}
          swapForm={() => setType('signup')}
        />
      ) : (
        <PreRegistrationForm
          onSuccess={() => {
            navigate('/registration');
            closeMenu();
          }}
          swapForm={() => setType('login')}
        />
      )}
    </Drawer>
  );
}
