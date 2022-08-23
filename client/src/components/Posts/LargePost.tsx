import React, { useEffect, useRef, useState } from 'react';
import formatDate from '../../utility/formatDate';

type Props = {
  image: string;
  color?: string;
  className?: string;
  textBoxClass?: string;
};

export default function LargePost({
  image,
  className,
  textBoxClass,
  color
}: Props) {
  const mainText =
    'A somewhat long description of the post, d adadad adadad adaadada adadadada d adad or rather the main content of the post that I will need to somehow edit based on the amount d more and more and more and more and more and more text';
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
    setTimeout(setLines, 500);

    return () => {
      window.removeEventListener('resize', setLines);
    };
  }, []);

  return (
    <li className={'relative shadow-lg ' + (className || '')}>
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
        <h4 className="basis-[max-content] font-display uppercase shrink-0 text-ellipsis line-clamp-3 xl:line-clamp-5 font-bold cursor-pointer xl:mb-2 hover:underline text-2xl md:text-3xl">
          This box is designed the same way way way
        </h4>
        <div className="basis-0 shrink grow mb-3 min-h-0" ref={textBoxRef}>
          <p
            className="font-extralight line-clamp-3 text-base"
            style={{ WebkitLineClamp: amountOfLines }}
          >
            {amountOfLines ? mainText : ''}
          </p>
        </div>
        <div className="mt-auto text-sm sm:text-base">
          {'By '}
          <span
            className={
              'cursor-pointer font-bold hover:underline ' +
              (color ? '' : 'text-accent-600')
            }
            style={{ color }}
          >
            KissMyUSSR
          </span>
          <span className=" font-extralight text-sm md:text-base">
            {' | ' + formatDate(new Date(Date.now()))}
          </span>
        </div>
      </div>
    </li>
  );
}
