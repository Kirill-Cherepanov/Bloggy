import React, { useEffect, useRef, useState } from 'react';
import formatDate from '../../utility/formatDate';

type Props = { mockImage: string };

export default function SmallPost({ mockImage }: Props) {
  const mainText =
    'A somewhat long description of the post, or rather the main content of the post that I will need to somehow edit based on the amount of free space I have and more and more and more and more and more and more and more and more text';
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
    <li className="flex h-48 transition-transform py-4 border-y lg:py-0 lg:border-y-0 lg:bg-accent-50 lg:shadow-lg hover:scale-105">
      <img
        src={mockImage}
        alt="Post"
        className="object-cover cursor-pointer h-40 w-28 md:w-32 lg:w-40"
      />
      <div className="px-4 lg:px-5 lg:py-2 flex flex-col">
        <h4 className="font-display basis-[max-content] shrink-0 line-clamp-4 lg:line-clamp-4 font-bold cursor-pointer mb-1 hover:underline text-lg md:text-xl">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga
          pariatur iure at itaque eos, omnis quis aliquam qui minus optio.
        </h4>
        <div ref={textBoxRef} className="grow min-h-0">
          <p
            className={`line-clamp-3 text-text-600`}
            style={{ WebkitLineClamp: amountOfLines }}
          >
            {amountOfLines ? mainText : ''}
          </p>
        </div>
        <div className="mt-auto text-text-600 flex flex-col xs:block">
          <span className="hidden xs:inline">By </span>
          <span className="cursor-pointer text-accent-600 font-bold hover:underline">
            {'KissMyUSSR '}
          </span>
          <span className="font-light text-sm md:text-base">
            <span className="hidden xs:inline"> | </span>
            {formatDate(new Date(Date.now()))}
          </span>
        </div>
      </div>
    </li>
  );
}
