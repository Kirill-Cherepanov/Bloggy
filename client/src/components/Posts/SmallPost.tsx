import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import formatDate from '../../utility/formatDate';
import Icon from '../Icon/Icon';

interface Props extends Post {
  color?: string;
  bgColor?: string;
  className?: string;
}

export default function SmallPost({
  _id,
  title,
  text,
  image,
  likes,
  authorName,
  createdAt,
  categories,
  color,
  bgColor,
  className
}: Props) {
  const [amountOfLines, setAmountOfLines] = useState(0);
  const textBoxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const setLines = () => {
      const lines = Math.floor(
        textBoxRef.current!.getBoundingClientRect().height / 24
      );
      setAmountOfLines(lines);
    };
    window.addEventListener('resize', setLines);
    setLines();

    return () => {
      window.removeEventListener('resize', setLines);
    };
  }, []);

  return (
    <li
      className={
        'flex h-48 lg:h-40 transition-transform py-4 border-y lg:py-0 lg:border-y-0 ' +
        (className || '') +
        (color ? '' : ' lg:bg-accent-50')
      }
      style={{ backgroundColor: bgColor }}
    >
      <Link
        to={'/post/' + _id}
        className="cursor-pointer h-40 w-28 md:w-32 lg:w-40 shrink-0"
      >
        <img src={image} alt="Post" className="object-cover h-full w-full" />
      </Link>
      <div className="px-4 lg:px-5 lg:py-2 flex flex-col relative">
        <div
          className="max-w-min text-accent-600 font-display uppercase text-sm font-semibold cursor-pointer hover:underline"
          style={{ color }}
        >
          {categories[0]}
        </div>
        <h3 className="font-display basis-[max-content] shrink-0 line-clamp-4 lg:line-clamp-4 font-bold mb-1 text-lg md:text-xl">
          <Link to={'/post/' + _id} className="hover:underline cursor-pointer">
            {title}
          </Link>
        </h3>
        <div ref={textBoxRef} className="grow min-h-0">
          <p
            className={`line-clamp-3 text-text-600`}
            style={{ WebkitLineClamp: amountOfLines }}
          >
            {amountOfLines ? text : ''}
          </p>
        </div>
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
                'cursor-pointer font-bold hover:underline ' +
                (color ? '' : 'text-accent-600')
              }
              style={{ color }}
            >
              {authorName}
            </Link>
            <span className="font-light text-sm md:text-base">
              <span className="hidden xs:inline mx-1"> | </span>
              {formatDate(createdAt)}
            </span>
          </div>
        </div>
      </div>
    </li>
  );
}
