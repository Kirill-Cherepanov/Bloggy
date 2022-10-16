import clsx from 'clsx';
import { Link } from 'react-router-dom';

import { useCalculateLines } from '../../hooks';
import { LikeButton } from '.';
import { Icon } from 'components/Elements';
import { formatDate } from 'utility';
import { PostData } from 'types';
import { useAppSelector } from 'stores/rootStore';

type SmallPostProps = {
  postData: PostData;
  isPreview?: boolean;
  color?: string;
  bgColor?: string;
  className?: string;
};

export function SmallPost({
  postData,
  isPreview = false,
  color,
  bgColor,
  className,
}: SmallPostProps) {
  const isLoggedIn = useAppSelector((state) => state.authSlice.isLoggedIn);
  const user = useAppSelector((state) => state.authSlice.user);
  const textBoxLineHeight = 24;
  const { amountOfLines, textBoxRef } = useCalculateLines(textBoxLineHeight);

  const imageSrc = isPreview
    ? postData.image
    : `/api/images/postImgs/${postData.image}`;

  const wrapper = isPreview ? <div /> : <li />;

  return (
    <wrapper.type
      className={clsx(
        'flex h-48 lg:h-40 transition-transform py-4 border-y lg:py-0 lg:border-y-0 lg:bg-accent-50 group',
        className
      )}
      style={{ backgroundColor: bgColor }}
    >
      {/* Post image */}
      <Link
        to={`/post/${postData._id}`}
        onClick={(e) => isPreview && e.preventDefault()}
        className="cursor-pointer h-40 w-28 md:w-32 lg:w-40 shrink-0 overflow-hidden bg-accent-200 flex items-center justify-center"
      >
        {postData.image ? (
          <img
            src={imageSrc}
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
          <span className="text-accent-600 font-display uppercase text-[0.8rem] xs:text-sm font-semibold cursor-pointer hover:underline">
            {postData.categories[0]}
          </span>
          {user?.username === postData.authorName ? (
            <>
              <span className="font-extralight group-hover:hidden text-[0.8rem] xs:text-base">
                {formatDate(postData.createdAt)}
              </span>
              <Link
                to={`/edit/${postData._id}`}
                onClick={(e) => isPreview && e.preventDefault()}
                className="font-extralight hidden group-hover:inline hover:underline text-[0.8rem] xs:text-base"
              >
                Edit post
              </Link>
            </>
          ) : (
            <span className="font-extralight group-hover:hidden text-[0.8rem] xs:text-base">
              {formatDate(postData.createdAt)}
            </span>
          )}
        </div>

        {/* Post title */}
        <h3 className="mt-7 lg:mt-6 font-display basis-[max-content] shrink-0 line-clamp-4 font-bold mb-1 xs:text-lg sm:text-xl">
          <Link
            to={`/post/${postData._id}`}
            onClick={(e) => isPreview && e.preventDefault()}
            className="hover:underline cursor-pointer"
          >
            {postData.title}
          </Link>
        </h3>

        {/* Post text */}
        <div ref={textBoxRef} className="grow min-h-0">
          <p
            className="line-clamp-3 text-secondary-800 text-sm xs:text-base"
            style={{ WebkitLineClamp: amountOfLines }}
          >
            {!!amountOfLines && postData.description}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <LikeButton
            postData={postData}
            shouldMutate={!isPreview && isLoggedIn}
          />

          <div className="text-secondary-800 text-sm xs:text-base mt-auto">
            <span className="hidden xs:inline">By </span>
            <Link
              to={`/blog/${postData.authorName}`}
              onClick={(e) => isPreview && e.preventDefault()}
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
