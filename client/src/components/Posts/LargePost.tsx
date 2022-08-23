import { useEffect, useRef, useState } from 'react';
import formatDate from '../../utility/formatDate';
import Icon from '../Icon/Icon';

interface Props extends Post {
  color?: string;
  className?: string;
  textBoxClass?: string;
}

export default function LargePost({
  title,
  text,
  image,
  likes,
  authorName,
  createdAt,
  color,
  className,
  textBoxClass
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
      <img
        src={image}
        alt="Post"
        className="w-full h-full object-cover cursor-pointer"
      />
      <div
        className={
          'flex flex-col absolute bg-opacity-40 bg-black shadow-lg text-white px-4 py-4 xs:px-6 md:px-8 ' +
          (textBoxClass || '')
        }
      >
        <h3 className="basis-[max-content] font-display uppercase shrink-0 text-ellipsis line-clamp-3 xl:line-clamp-5 font-bold cursor-pointer xl:mb-2 hover:underline text-2xl md:text-3xl">
          {title}
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
            <Icon
              type="heart"
              className="inline h-5 fill-white mr-2 group-hover:fill-red-400"
            />
            {likes}
          </div>
          <div className="text-sm sm:text-base">
            By{' '}
            <span
              className={
                'cursor-pointer font-bold hover:underline ' +
                (color ? '' : 'text-accent-600')
              }
              style={{ color }}
            >
              {authorName}
            </span>
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
