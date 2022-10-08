import clsx from 'clsx';
import { Icon, ProfilePicture } from 'components/Elements';
import { Link } from 'react-router-dom';
import { PublicData } from 'types';

type BlogPreviewProps = {
  blogger: Required<PublicData>;
  classNames?: {
    wrapper?: string;
    categories?: string;
  };
};

export function BlogPreview({ blogger, classNames }: BlogPreviewProps) {
  return (
    <div
      className={clsx(
        'px-4 py-2 rounded-md transition-transform hover:scale-105',
        classNames?.wrapper
      )}
    >
      <Link to={'/blog/' + blogger.username} className="block">
        <ProfilePicture
          src={blogger.profilePic}
          className="mb-4 select-none cursor-pointer"
        />
      </Link>

      <h4 className="font-bold text-xl text-center text-ellipsis overflow-hidden mb-1">
        <Link to={'/blog/' + blogger.username} className="hover:underline">
          {blogger.username}
        </Link>
      </h4>

      <div className="font-medium text-lg flex items-center mb-1">
        Likes: {blogger.blog.likes}
        <Icon type="heart" className="fill-red-500 h-3.5 ml-1" />
      </div>

      {blogger.blog.categories.length > 0 && (
        <div className="flex gap-4 mb-2 overflow-hidden flex-wrap h-7">
          {blogger.blog.categories.map((category) => (
            <span
              key={category}
              className={clsx(
                'border inline-block h-full px-1 rounded-sm hover:shadow-md hover:border-accent-600 hover:text-accent-600 hover:shadow-accent-300 cursor-pointer',
                classNames?.categories
              )}
            >
              {category}
            </span>
          ))}
        </div>
      )}

      <div className="line-clamp-6 text-ellipsis">
        {blogger.blog.description || 'This blog has no description'}
      </div>
    </div>
  );
}
