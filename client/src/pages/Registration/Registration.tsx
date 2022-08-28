import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Icon from 'components/Icon/Icon';
import AccountRegistration from 'components/AccountRegistration/AccountRegistration';
import BlogRegistration from 'components/BlogRegistration/BlogRegistration';

export default function Register() {
  const [stage, setStage] = useState(0);
  const navigate = useNavigate();

  return (
    <main className="px-page max-w-2xl py-8 min-h-screen flex items-center">
      <div className="relative w-full">
        <div className="w-full absolute left-0 top-0 flex items-center h-10 border-b px-2">
          <button className="absolute" onClick={() => navigate(-1)}>
            <Icon
              type="long-arrow"
              className="h-4 text-secondary-600 pointer-events-none"
            />
          </button>
          <div className="mx-auto flex">
            {!stage
              ? null
              : [0, 0].map((v, i) => (
                  <span
                    key={i}
                    className={
                      'first:mr-2 inline-block w-2 h-2 rounded-full ' +
                      (stage === i + 1
                        ? 'bg-secondary-600'
                        : 'bg-secondary-400')
                    }
                  />
                ))}
          </div>
          <div className="my-2 mb-4 text-3xl font-sansita select-none absolute right-2">
            Bloggy
          </div>
        </div>
        {stage === 2 ? (
          <BlogRegistration />
        ) : (
          <AccountRegistration setStage={setStage} />
        )}
      </div>
    </main>
  );
}
