import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import clsx from 'clsx';

import { Icon, Logo } from 'components/Elements';
import { AccountRegistration, BlogRegistration } from '../components';

export function Registration() {
  const [stage, setStage] = useState(0);
  const [shouldCreateBlog, setShouldCreateBlog] = useState(false);
  const navigate = useNavigate();

  return (
    <main className="px-page max-w-2xl py-8 min-h-screen flex">
      <div className="relative w-full">
        <div className="w-full absolute left-0 top-0 flex items-center h-10 border-b px-2">
          <button
            className="absolute"
            onClick={() => {
              if (stage === 1) return setStage(0);
              navigate(-1);
            }}
          >
            <Icon
              type="long-arrow"
              className="h-4 text-secondary-600 pointer-events-none"
            />
          </button>
          <div className="mx-auto flex">
            {shouldCreateBlog
              ? [0, 0].map((v, i) => (
                  <span
                    key={i}
                    className={clsx(
                      'first:mr-2 inline-block w-2 h-2 rounded-full ',
                      stage === i ? 'bg-secondary-600' : 'bg-secondary-400'
                    )}
                  />
                ))
              : null}
          </div>
          <h1 className="my-2 mb-4 absolute right-2">
            <Link to="/">
              <Logo size="sm" variant="dark" />
            </Link>
          </h1>
        </div>
        {stage ? (
          <BlogRegistration
            onSuccess={() => navigate('/', { replace: true })}
          />
        ) : (
          <AccountRegistration
            onSuccess={() => {
              if (shouldCreateBlog && stage === 0) {
                console.log('ehr');
                setStage(1);
              } else {
                console.log('here');
                navigate('/', { replace: true });
              }
            }}
            setShouldCreateBlog={setShouldCreateBlog}
            shouldCreateBlog={shouldCreateBlog}
          />
        )}
      </div>
    </main>
  );
}
