import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { Icon, Logo } from 'components/Elements';
import { AccountRegistration } from '../components';

export function Registration() {
  const [shouldCreateBlog, setShouldCreateBlog] = useState(false);
  const navigate = useNavigate();

  return (
    <main className="px-page max-w-2xl py-8 min-h-screen flex">
      <div className="relative w-full">
        <div className="w-full absolute left-0 top-0 flex items-center h-10 border-b px-2">
          <button className="absolute" onClick={() => navigate('/')}>
            <Icon
              type="long-arrow"
              className="h-4 text-secondary-600 pointer-events-none"
            />
          </button>
          <h1 className="my-2 mb-4 absolute right-2">
            <Link to="/">
              <Logo size="sm" variant="dark" />
            </Link>
          </h1>
        </div>
        <AccountRegistration
          onSuccess={() => {
            if (shouldCreateBlog) navigate('/settings/blog');
            else navigate('/');
          }}
          setShouldCreateBlog={setShouldCreateBlog}
          shouldCreateBlog={shouldCreateBlog}
        />
      </div>
    </main>
  );
}
