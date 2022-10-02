import clsx from 'clsx';
import { Link } from 'react-router-dom';

import { useCalculateLines } from '../../hooks';
import { LikeButton } from '.';
import { PostDataProp } from '../../types';
import { Icon } from 'components/Elements';
import { formatDate } from 'utility';

type SmallPostProps = {
  postData: PostDataProp;
  color?: string;
  bgColor?: string;
  className?: string;
};

export function SmallPost({
  postData,
  color,
  bgColor,
  className,
}: SmallPostProps) {
  const textBoxLineHeight = 24;
  const { amountOfLines, textBoxRef } = useCalculateLines(textBoxLineHeight);

  const wrapper = postData._id ? <li /> : <div />;

  return (
    <wrapper.type
      className={clsx(
        'flex h-48 lg:h-40 transition-transform py-4 border-y lg:py-0 lg:border-y-0 lg:bg-accent-50',
        className
      )}
      style={{ backgroundColor: bgColor }}
    >
      {/* Post image */}
      <Link
        to={'/post/' + (postData._id || '')}
        onClick={(e) => postData._id || e.preventDefault()}
        className="cursor-pointer h-40 w-28 md:w-32 lg:w-40 shrink-0 overflow-hidden bg-accent-200 flex items-center justify-center"
      >
        {postData.image ? (
          <img
            src={postData.image}
            alt="Post"
            className="object-cover h-full w-full"
          />
        ) : (
          <Icon type="image" className="h-4/5" />
        )}
      </Link>
      <div className="px-4 lg:px-5 lg:py-2 flex flex-col relative grow">
        {/* Main category */}
        <div
          className="w-full absolute left-0 top-2 px-4 lg:px-5 flex justify-between"
          style={{ color }}
        >
          <span className="text-accent-600 font-display uppercase text-sm font-semibold cursor-pointer hover:underline">
            {postData.categories[0]}
          </span>
          <span className="font-extralight">
            {formatDate(postData.createdAt)}
          </span>
        </div>

        {/* Post title */}
        <h3 className="mt-6 font-display basis-[max-content] shrink-0 line-clamp-4 lg:line-clamp-4 font-bold mb-1 text-lg md:text-xl">
          <Link
            to={'/post/' + (postData._id || '')}
            onClick={(e) => postData._id || e.preventDefault()}
            className="hover:underline cursor-pointer"
          >
            {postData.title}
          </Link>
        </h3>

        {/* Post text */}
        <div ref={textBoxRef} className="grow min-h-0">
          <p
            className="line-clamp-3 text-text-600"
            style={{ WebkitLineClamp: amountOfLines }}
          >
            {amountOfLines ? postData.description : ''}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <LikeButton likes={postData.likes} />

          <div className="mt-auto text-text-600">
            <span>By </span>
            <Link
              to={'/blog/' + postData.authorName}
              onClick={(e) => postData._id || e.preventDefault()}
              className={
                'cursor-pointer font-bold hover:underline text-accent-600'
              }
              style={{ color }}
            >
              {postData.authorName}
            </Link>
          </div>
        </div>
      </div>
    </wrapper.type>
  );
}
