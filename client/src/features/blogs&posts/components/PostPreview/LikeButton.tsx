import clsx from 'clsx';
import { Icon } from 'components/Elements';
import { useLikePostMutation } from 'features/blogs&posts/api/postsApi';
import { PostData } from 'types';

type LikeButtonProps = {
  postData: PostData;
  shouldMutate?: boolean;
  variant?: 'dark' | 'light';
};

export function LikeButton({
  postData,
  shouldMutate = true,
  variant = 'dark',
}: LikeButtonProps) {
  const [likePost] = useLikePostMutation();

  return (
    <button
      data-testid="like-button"
      className={clsx(
        'font-semibold flex items-center cursor-pointer text-sm xs:text-base like-button',
        `like-button-${variant}`,
        postData.isLiked && 'like-button-active'
      )}
      data-isliked={postData.isLiked}
      onClick={() => shouldMutate && likePost(postData)}
    >
      <span className="relative w-5 h-5 mr-2">
        <Icon
          type="heart-outline"
          className={clsx(
            'heart-outline absolute top-0 left-0 w-full',
            variant === 'light' && 'text-main'
          )}
        />
        <Icon
          type="heart"
          className={clsx(
            'heart absolute top-0 left-0 w-full',
            variant === 'light' && 'fill-main'
          )}
        />
      </span>
      {postData.likes}
    </button>
  );
}
