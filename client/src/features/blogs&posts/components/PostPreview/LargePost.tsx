import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import formatDate from 'utility/formatDate';
import Icon from 'components/Elements/Icon';

interface Props extends Post {
  color?: string;
  className?: string;
  textBoxClass?: string;
}

export default function LargePost({
  _id,
  title,
  text,
  image,
  likes,
  authorName,
  createdAt,
  color,
  className,
  textBoxClass,
  categories,
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
    // There is a bug - that occures only from time to time - of lines not properly setting on mounting for some reason
    setTimeout(setLines, 500);
    setTimeout(setLines, 1000);

    return () => {
      window.removeEventListener('resize', setLines);
    };
  }, []);

  return (
    <li className={'relative ' + (className || '')}>
      <Link to={'/post/' + _id}>
        <img
          src={image}
          alt="Post"
          className="w-full h-full object-cover cursor-pointer"
        />
      </Link>
      <div
        className={
          'flex flex-col absolute bg-opacity-40 bg-black shadow-lg text-white px-4 py-4 xs:px-6 md:px-8 ' +
          (textBoxClass || '')
        }
      >
        <div
          className="absolute p-1 top-0 left-8 -translate-y-1/2 flex justify-center items-center bg-accent-400 text-black font-display uppercase text-sm font-bold cursor-pointer hover:underline"
          style={{ backgroundColor: color }}
        >
          {categories[0]}
        </div>
        <h3 className="mt-2 basis-[max-content] font-display uppercase shrink-0 text-ellipsis line-clamp-3 xl:line-clamp-5 font-bold xl:mb-2 text-2xl md:text-3xl">
          <Link to={'/post/' + _id} className="hover:underline cursor-pointer">
            {title}
          </Link>
        </h3>
        <div className="basis-0 shrink grow mb-3 min-h-0" ref={textBoxRef}>
          <p
            className="font-extralight line-clamp-3 text-base"
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
                className="absolute top-0 left-0 w-full text-main group-hover:text-transparent"
              />
              <Icon
                type="heart"
                className="absolute top-0 left-0 w-full fill-transparent group-hover:fill-red-400"
              />
            </span>
            {likes}
          </div>
          <div className="text-sm sm:text-base">
            By{' '}
            <Link
              to={'/blog/' + authorName}
              className="cursor-pointer font-bold hover:underline text-accent-600"
              style={{ color }}
            >
              {authorName}
            </Link>
            <span className="mx-2">|</span>
            <span className=" font-extralight text-sm md:text-base">
              {formatDate(createdAt)}
            </span>
          </div>
        </div>
      </div>
    </li>
  );
}
