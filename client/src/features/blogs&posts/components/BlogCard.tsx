import { Icon, ProfilePicture } from 'components/Elements';
import { PublicData } from 'types';

export function BlogCard({ username, profilePic, blog }: Required<PublicData>) {
  const { likes, categories, createdAt } = blog;

  return (
    <div className="flex flex-col p-6 w-80 shrink-0 bg-accent-200 h-min rounded-md">
      <ProfilePicture className="mb-3 h-auto" />
      <h2 className="font-display font-bold text-center text-3xl mb-4">
        {username}
      </h2>
      <div className="font-medium text-xl flex items-center mb-4">
        Likes: {likes}
        <Icon
          type="heart"
          className="fill-red-500 h-3.5 ml-1 relative bottom-[1px]"
        />
      </div>

      {categories.length > 0 && (
        <div className="flex flex-wrap gap-y-2 gap-x-2 text-lg mb-4">
          {categories.map((category) => (
            <span
              key={category}
              className="border border-secondary-400 rounded-sm px-1 cursor-pointer hover:text-accent-900 hover:border-accent-400 shadow-accent-400 hover:shadow-sm transition-colors"
            >
              {category}
            </span>
          ))}
        </div>
      )}

      <div className="font-extralight text-lg">
        Registered on {new Date(createdAt).toDateString()}
      </div>
    </div>
  );
}
