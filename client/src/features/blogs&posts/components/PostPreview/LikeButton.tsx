import { Icon } from 'components/Elements';

type LikeButtonProps = { likes: number };

export function LikeButton({ likes }: LikeButtonProps) {
  return (
    <button className="font-semibold flex items-center cursor-pointer like-button">
      <span className="relative w-5 h-5 mr-2">
        <Icon
          type="heart-outline"
          className="heart-outline absolute top-0 left-0 w-full"
        />
        <Icon
          type="heart"
          className="heart absolute top-0 left-0 w-full"
        />
      </span>
      {likes}
    </button>
  );
}
