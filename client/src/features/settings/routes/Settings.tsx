import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';

import { Icon } from 'components/Elements';
import { AccountSettings, BlogSettings } from '../components';
import { useAppSelector } from 'stores/rootStore';

export function Settings() {
  const user = useAppSelector((state) => state.authSlice.user);
  if (user === null) throw Error('User data is null!');

  const navigate = useNavigate();

  const { tab: tabParam } = useParams();
  let tab: 'account' | 'blog';
  if (!user.blog || (tabParam !== 'account' && tabParam !== 'blog')) {
    tab = 'account';
  } else tab = tabParam;

  return (
    <main className="px-page py-8 overflow-x-hidden">
      <div className="relative border-b pb-1 border-secondary-300 flex items-end justify-center text-secondary-600 mb-6">
        <Link
          to={user.blog ? `/blog/${user.username}` : '/'}
          className="absolute top-[1px] h-full left-0 flex items-center"
        >
          <Icon type="long-arrow" className="h-4 text-secondary-600" />
        </Link>
        <h2 className="text-2xl font-light invisible xs:visible">Settings</h2>
        {user.blog ? (
          <Link
            to={'/blog/' + user.username}
            className="font-medium hover:underline absolute right-0"
          >
            {user.username}
          </Link>
        ) : (
          <span className="font-medium absolute right-0">{user.username}</span>
        )}
      </div>

      <div className="flex flex-col md:flex-row mt-8 gap-8 md:m-0 md:gap-12">
        <div className="flex flex-col gap-2 shrink-0 w-full md:w-48">
          <button
            onClick={() => navigate('/settings/account')}
            className={
              'rounded-md px-2 py-0.5 flex items-center text-lg ml-2 relative hover:bg-secondary-300 ' +
              (tab === 'account'
                ? 'bg-secondary-200 before:h-6 before:inline-block before:absolute before:-left-2 before:w-1 before:rounded-md before:bg-accent-600'
                : '')
            }
          >
            General
          </button>
          {user.blog && (
            <button
              onClick={() => navigate('/settings/blog')}
              className={
                'rounded-md px-2 py-0.5 flex items-center text-lg ml-2 relative hover:bg-secondary-300 ' +
                (tab === 'blog'
                  ? 'bg-secondary-200 before:h-6 before:inline-block before:absolute before:-left-2 before:w-1 before:rounded-md before:bg-accent-600'
                  : '')
              }
            >
              Blog
            </button>
          )}
        </div>

        {tab === 'account' ? (
          <AccountSettings changeTab={() => navigate('/settings/blog')} />
        ) : (
          <BlogSettings changeTab={() => navigate('/settings/account')} />
        )}
      </div>
    </main>
  );
}
