import { Icon } from 'components/Elements';
import { Link } from 'react-router-dom';

import { LikeButton, PostInfo } from '.';
import { PostDataProp } from '../../types';

type NormalPostType = {
  postData: PostDataProp;
};

export function NormalPost({ postData }: NormalPostType) {
  const wrapper = postData._id ? <li /> : <div />;

  return (
    <wrapper.type className="lg:bg-accent-50 py-5 px-8">
      {/* Main category */}
      <div className="max-w-min text-accent-600 font-display uppercase text-sm font-bold cursor-pointer hover:underline">
        {postData.categories[0]}
      </div>

      {/* Post title */}
      <h3 className="my-1 font-display font-bold text-xl">
        <Link
          to={'/post/' + (postData._id || '')}
          onClick={(e) => postData._id || e.preventDefault()}
          className="hover:underline cursor-pointer"
        >
          {postData.title}
        </Link>
      </h3>

      {/* Post text */}
      <p className="mb-3 line-clamp-4">{postData.description}</p>

      {/* Post image */}
      <Link
        to={'/post/' + (postData._id || '')}
        onClick={(e) => postData._id || e.preventDefault()}
        className="block w-full"
      >
        {postData.image ? (
          <img
            src={postData.image}
            alt="Post"
            className="max-w-full mb-3 mx-auto"
          />
        ) : (
          <Icon type="image" className="mb-3 w-3/5 mx-auto" />
        )}
      </Link>

      <div className="flex justify-between items-center">
        <LikeButton likes={postData.likes} />
        <PostInfo {...postData} />
      </div>
    </wrapper.type>
  );
}
