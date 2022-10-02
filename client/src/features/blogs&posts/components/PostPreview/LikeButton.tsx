import { Icon } from 'components/Elements';

type LikeButtonProps = { likes: number };

export function LikeButton({ likes }: LikeButtonProps) {
  return (
    <button className="font-semibold flex items-center cursor-pointer group">
      <span className="relative w-5 h-5 mr-2">
        <Icon
          type="heart-outline"
          className="absolute top-0 left-0 w-full text-secondary-800 group-hover:text-transparent"
        />
        <Icon
          type="heart"
          className="absolute top-0 left-0 w-full fill-transparent group-hover:fill-red-400"
        />
      </span>
      {likes}
    </button>
  );
}
