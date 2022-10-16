import { Link } from 'react-router-dom';

import { Icon } from 'components/Elements';
import { useAppSelector } from 'stores/rootStore';
import { PostData } from 'types';
import { LikeButton, PostInfo } from '.';

type NormalPostType = {
  postData: PostData;
  isPreview?: boolean;
};

export function NormalPost({ postData, isPreview }: NormalPostType) {
  const isLoggedIn = useAppSelector((state) => state.authSlice.isLoggedIn);
  const user = useAppSelector((state) => state.authSlice.user);

  const imageSrc = isPreview
    ? postData.image
    : `/api/images/postImgs/${postData.image}`;

  const wrapper = isPreview ? <div /> : <li />;

  return (
    <wrapper.type className="lg:bg-accent-50 py-5 px-8 group">
      {/* Main category */}
      <div className="max-w-min text-accent-600 font-display uppercase text-sm font-bold cursor-pointer hover:underline">
        {postData.categories[0]}
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

        {user?.username === postData.authorName ? (
          <>
            <PostInfo {...postData} className="group-hover:hidden" />
            <Link
              to={`/edit/${postData._id}`}
              onClick={(e) => isPreview && e.preventDefault()}
              className="hidden group-hover:inline hover:underline"
            >
              Edit post
            </Link>
          </>
        ) : (
          <PostInfo {...postData} />
        )}
      </div>
    </wrapper.type>
  );
}
