import formatDate from '../../utility/formatDate';
import Icon from '../Icon/Icon';

export default function NormalPost({
  title,
  text,
  image,
  likes,
  authorName,
  createdAt
}: Post) {
  return (
    <li className="lg:bg-accent-50 py-5 px-8">
      <h3 className="font-display font-bold text-xl">{title}</h3>
      <p className="my-3 line-clamp-4">{text}</p>
      <img src={image} alt="post" className="mb-3" />
      <div className="flex justify-between items-center">
        <div className="font-semibold flex items-center cursor-pointer group">
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
        </div>
        <div className="mt-auto text-text-600 flex flex-col xs:block">
          <span className="hidden xs:inline">By </span>
          <span
            className={
              'cursor-pointer font-bold hover:underline text-accent-600'
            }
          >
            {authorName}
          </span>
          <span className="font-light text-sm md:text-base">
            <span className="hidden xs:inline mx-1"> | </span>
            {formatDate(createdAt)}
          </span>
        </div>
      </div>
    </li>
  );
}
