import { Link } from 'react-router-dom';
import formatDate from '../../utility/formatDate';
import Icon from '../Icon/Icon';

export default function NormalPost({
  _id,
  title,
  text,
  image,
  likes,
  authorName,
  createdAt,
  categories
}: Post) {
  return (
    <li className="lg:bg-accent-50 py-5 px-8">
      <div className="max-w-min text-accent-600 font-display uppercase text-sm font-bold cursor-pointer hover:underline">
        {categories[0]}
      </div>
      <h3 className="my-1 font-display font-bold text-xl">
        <Link to={'/post/' + _id} className="hover:underline cursor-pointer">
          {title}
        </Link>
      </h3>
      <p className="mb-3 line-clamp-4">{text}</p>
      <Link to={'/post/' + _id}>
        <img src={image} alt="post" className="mb-3" />
      </Link>
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
          <Link
            to={'/blog/' + authorName}
            className={
              'cursor-pointer font-bold hover:underline text-accent-600'
            }
          >
            {authorName}
          </Link>
          <span className="font-light text-sm md:text-base">
            <span className="hidden xs:inline mx-1"> | </span>
            {formatDate(createdAt)}
          </span>
        </div>
      </div>
    </li>
  );
}
