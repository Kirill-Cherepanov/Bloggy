import clsx from 'clsx';
import { Link } from 'react-router-dom';

import { useCalculateLines } from '../../hooks';
import { LikeButton } from '.';
import { Icon } from 'components/Elements';
import { PostData } from 'types';
import { useAppSelector } from 'stores/rootStore';
import { POST_IMGS_LOCATION } from 'config';
import { formatDate } from 'utility';

const textBoxPositions = {
  bottomLeft: 'left-0 bottom-8',
  fullBottomLeft: 'left-0 bottom-0',
};

const sizes = {
  md: {
    wrapper: 'h-80 sm:h-100 md:h-[440px]',
    textBox: 'w-5/6 h-40 sm:h-48 md:h-56',
  },
  none: { wrapper: '', textBox: '' },
};

const animationClass = 'transition-transform hover:scale-105';

type LargePostProps = {
  postData: PostData;
  isPreview?: boolean;
  className?: string;
  textBoxClass?: string;
  textBoxPosition?: keyof typeof textBoxPositions;
  size?: keyof typeof sizes;
  shouldAnimate?: boolean;
  color?: string;
};

export function LargePost({
  postData,
  isPreview = false,
  color,
  className = '',
  textBoxClass = '',
  textBoxPosition = 'bottomLeft',
  size = 'md',
  shouldAnimate = false,
}: LargePostProps) {
  const isLoggedIn = useAppSelector((state) => state.authSlice.isLoggedIn);
  const user = useAppSelector((state) => state.authSlice.user);
  const textBoxLineHeight = 24;
  const { amountOfLines, textBoxRef } = useCalculateLines(textBoxLineHeight);

  const imageSrc = isPreview
    ? postData.image
    : POST_IMGS_LOCATION + postData.image;

  const wrapper = isPreview ? <div /> : <li />;

  return (
    <wrapper.type
      className={clsx(
        'relative group',
        sizes[size].wrapper,
        shouldAnimate && animationClass,
        className
      )}
    >
      {/* Post image */}
      <Link
        to={`/post/${postData._id}`}
        onClick={(e) => isPreview && e.preventDefault()}
        className="flex items-center justify-center w-full h-full cursor-pointer bg-accent-200"
      >
        {postData.image ? (
          <img
            src={imageSrc}
            alt="Post"
            className="w-full h-full object-cover"
          />
        ) : (
          <Icon type="image" className="h-4/5" />
        )}
      </Link>

      <div
        className={clsx(
          'flex flex-col absolute bg-opacity-40 bg-black shadow-lg text-white px-4 py-4 xs:px-6 md:px-8',
          sizes[size].textBox,
          textBoxPositions[textBoxPosition],
          textBoxClass
        )}
      >
        {/* Main category */}
        {postData.categories.length > 0 && (
          <div
            className="absolute p-1 top-0 left-8 -translate-y-1/2 flex justify-center items-center bg-accent-400 text-black font-display uppercase text-sm font-bold cursor-pointer hover:underline"
            style={{ backgroundColor: color }}
          >
            {postData.categories[0]}
          </div>
        )}

        {/* Post title */}
        <h3 className="mt-2 basis-[max-content] font-display uppercase shrink-0 text-ellipsis line-clamp-3 xl:line-clamp-5 font-bold xl:mb-2 text-lg xs:text-xl sm:text-2xl md:text-3xl">
          <Link
            to={`/post/${postData._id}`}
            onClick={(e) => isPreview && e.preventDefault()}
            className="hover:underline cursor-pointer"
          >
            {postData.title}
          </Link>
        </h3>

        {/* Post text */}
        <div className="basis-0 shrink grow mb-3 min-h-0" ref={textBoxRef}>
          <p
            className="font-extralight line-clamp-5 text-base"
            style={{ WebkitLineClamp: amountOfLines }}
          >
            {amountOfLines ? postData.description : ''}
          </p>
        </div>

        <div className="flex justify-between items-end">
          <LikeButton
            postData={postData}
            shouldMutate={!isPreview && isLoggedIn}
            variant="light"
          />
          {user?.username === postData.authorName ? (
            <>
              <div className="mt-auto text-text-600 flex flex-col group-hover:hidden">
                <div>
                  <span className="hidden xs:inline">By </span>
                  <Link
                    to={'/blog/' + postData.authorName}
                    onClick={(e) => isPreview && e.preventDefault()}
                    className="cursor-pointer font-bold hover:underline text-accent-600"
                    style={{ color }}
                  >
                    {postData.authorName}
                  </Link>
                </div>
                <span className="font-light text-sm md:text-base">
                  {formatDate(postData.createdAt)}
                </span>
              </div>

              <Link
                to={`/edit/${postData._id}`}
                onClick={(e) => isPreview && e.preventDefault()}
                className="hidden group-hover:inline hover:underline"
              >
                Edit post
              </Link>
            </>
          ) : (
            <div className="mt-auto text-text-600 flex flex-col group-hover:hidden">
              <div>
                <span className="hidden xs:inline">By </span>
                <Link
                  to={'/blog/' + postData.authorName}
                  onClick={(e) => isPreview && e.preventDefault()}
                  className="cursor-pointer font-bold hover:underline text-accent-600"
                  style={{ color }}
                >
                  {postData.authorName}
                </Link>
              </div>
              <span className="font-light text-sm md:text-base">
                {formatDate(postData.createdAt)}
              </span>
            </div>
          )}
        </div>
      </div>
    </wrapper.type>
  );
}
