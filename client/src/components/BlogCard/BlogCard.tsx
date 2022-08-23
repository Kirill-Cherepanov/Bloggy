import Icon from '../Icon/Icon';

export default function BlogCard({
  username,
  profilePic,
  likes,
  categories,
  createdAt
}: Blog) {
  return (
    <div className="flex flex-col p-6 w-80 shrink-0 bg-accent-50 h-min rounded-md">
      <img
        src={profilePic}
        alt="profile"
        className="aspect-square object-cover mb-3"
      />
      <h2 className="font-display font-bold text-center text-2xl mb-4">
        {username}
      </h2>
      <div className="font-medium text-lg flex items-center mb-4">
        Likes: {likes}
        <Icon
          type="heart"
          className="fill-red-500 h-3.5 ml-1 relative bottom-[1px]"
        />
      </div>
      <div className="flex flex-wrap gap-y-2 gap-x-3 mb-4">
        {categories.map((category) => (
          <span
            key={category}
            className="border border-secondary-400 rounded-sm px-1 cursor-pointer hover:text-accent-900 hover:border-accent-400 shadow-accent-400 hover:shadow-sm transition-colors"
          >
            {category}
          </span>
        ))}
      </div>
      <div className="font-extralight">
        Registered on {createdAt.toDateString()}
      </div>
    </div>
  );
}
