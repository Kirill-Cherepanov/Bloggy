import clsx from 'clsx';
import { Icon } from 'components/Elements';
import { useLikePostMutation } from 'features/blogs&posts/api/postsApi';
import { PostData } from 'types';

type LikeButtonProps = {
  postData: PostData;
  shouldMutate?: boolean;
};

export function LikeButton({ postData, shouldMutate = true }: LikeButtonProps) {
  const [likePost] = useLikePostMutation();

  return (
    <button
      className={clsx(
        'font-semibold flex items-center cursor-pointer like-button',
        postData.isLiked && 'like-button-active'
      )}
      onClick={() => shouldMutate && likePost(postData)}
    >
      <span className="relative w-5 h-5 mr-2">
        <Icon
          type="heart-outline"
          className="heart-outline absolute top-0 left-0 w-full"
        />
        <Icon type="heart" className="heart absolute top-0 left-0 w-full" />
      </span>
      {postData.likes}
    </button>
  );
}
