interface Props extends Post {
  color?: string;
  className?: string;
}

export default function SmallPost({
  title,
  image,
  color,
  categories,
  className
}: Props) {
  return (
    <li
      className={
        'flex h-36 p-3 bg-transparent border-b last:border-b-0 border-secondary-600 relative overflow-hidden group transition-all duration-300 hover:h-44 ' +
        (className || '')
      }
    >
      <img
        src={image}
        alt="Post"
        className="z-20 absolute top-1/2 left-20 w-0 h-0 object-cover opacity-20 cursor-pointer transition-all duration-300 group-hover:opacity-100 group-hover:top-0 group-hover:left-0 group-hover:w-full group-hover:h-full"
      />
      <img
        src={image}
        alt="Post"
        className="object-cover cursor-pointer h-full aspect-square my-auto"
      />
      <div className="text-main px-4 flex flex-col transition-all duration-300 group-hover:scale-150 group-hover:translate-y-5 group-hover:opacity-0">
        <div className="text-accent-400 uppercase text-sm font-semi mb-0.5">
          {categories[0]}
        </div>
        <h3 className="font-display basis-[max-content] shrink-0 line-clamp-5 font-bold cursor-pointer text-lg">
          {title}
        </h3>
      </div>
    </li>
  );
}
