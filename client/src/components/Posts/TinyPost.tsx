import { Link } from 'react-router-dom';

interface Props extends Post {
  color?: string;
  className?: string;
}

export default function TinyPost({
  _id,
  title,
  image,
  color,
  categories,
  className
}: Props) {
  return (
    <li
      className={
        'h-36 p-3 border-b last:border-b-0 border-secondary-600 overflow-hidden group transition-all duration-300 hover:h-44 hover:p-0 ' +
        (className || '')
      }
    >
      <Link to={'/post/' + _id} className="flex h-full relative">
        <img
          src={image}
          alt="Post"
          className="z-20 absolute top-1/2 left-20 w-0 h-0 object-cover opacity-20 transition-all duration-300 group-hover:opacity-100 group-hover:top-0 group-hover:left-0 group-hover:w-full group-hover:h-full"
        />
        <img
          src={image}
          alt="Post"
          className="object-cover h-full aspect-square my-auto"
        />
        <div className="text-main px-4 flex flex-col transition-all duration-300 group-hover:scale-150 group-hover:translate-y-5 group-hover:opacity-0">
          <div className="text-accent-400 uppercase text-sm font-semi mb-0.5">
            {categories[0]}
          </div>
          <h3 className="font-display basis-[max-content] shrink-0 line-clamp-5 font-bold text-lg">
            {title}
          </h3>
        </div>
      </Link>
    </li>
  );
}