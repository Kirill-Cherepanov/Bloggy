import clsx from 'clsx';
import { Icon } from 'components/Elements';
import { useLikePostMutation } from 'features/blogs&posts/api/postsApi';

type LikeButtonProps = {
  likes: number;
  isLiked: boolean;
  id: string;
  shouldMutate?: boolean;
};

export function LikeButton({
  likes,
  isLiked,
  id,
  shouldMutate = true,
}: LikeButtonProps) {
  const [likePost] = useLikePostMutation();

  return (
    <button
      className={clsx(
        'font-semibold flex items-center cursor-pointer like-button',
        isLiked && 'like-button-active'
      )}
      onClick={() => shouldMutate && likePost(id)}
    >
      <span className="relative w-5 h-5 mr-2">
        <Icon
          type="heart-outline"
          className="heart-outline absolute top-0 left-0 w-full"
        />
        <Icon type="heart" className="heart absolute top-0 left-0 w-full" />
      </span>
      {likes}
    </button>
  );
}
