import { Link } from 'react-router-dom';

import { Icon } from 'components/Elements';
import { useAppSelector } from 'stores/rootStore';
import { PostData } from 'types';
import { LikeButton } from '.';
import { POST_IMGS_LOCATION } from 'config';
import { formatDate } from 'utility';

type NormalPostType = {
  postData: PostData;
  isPreview?: boolean;
};

export function NormalPost({ postData, isPreview }: NormalPostType) {
  const isLoggedIn = useAppSelector((state) => state.authSlice.isLoggedIn);
  const user = useAppSelector((state) => state.authSlice.user);

  const imageSrc = isPreview
    ? postData.image
    : POST_IMGS_LOCATION + postData.image;

  const wrapper = isPreview ? <div /> : <li />;

  return (
    <wrapper.type className="lg:bg-accent-50 py-5 px-8 group">
      <div className="w-full flex justify-between">
        {/* Main category */}
        <Link
          to={`/catalog&q=${postData.categories[0]}&type=categories`}
          className="max-w-min text-accent-600 font-display uppercase text-sm font-bold cursor-pointer hover:underline"
        >
          {postData.categories[0]}
        </Link>

        {/* Creation date */}
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
      <h3 className="my-1 font-display font-bold text-xl">
        <Link
          to={`/post/${postData._id}`}
          onClick={(e) => isPreview && e.preventDefault()}
          className="hover:underline cursor-pointer"
        >
          {postData.title}
        </Link>
      </h3>

      {/* Post text */}
      <p className="mb-3 line-clamp-4">{postData.description}</p>

      {/* Post image */}
      <Link
        to={`/post/${postData._id}`}
        onClick={(e) => isPreview && e.preventDefault()}
        className="block w-full"
      >
        {postData.image ? (
          <img src={imageSrc} alt="Post" className="max-w-full mb-3 mx-auto" />
        ) : (
          <Icon type="image" className="mb-3 w-3/5 mx-auto" />
        )}
      </Link>

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
            className="cursor-pointer font-bold hover:underline text-accent-600"
          >
            {postData.authorName}
          </Link>
        </div>
      </div>
    </wrapper.type>
  );
}
