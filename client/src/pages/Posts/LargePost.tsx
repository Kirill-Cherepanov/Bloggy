import React, { useEffect, useRef, useState } from 'react';

type Props = { mockImage: string; className?: string; textBoxClass?: string };

export default function LargePost({
  mockImage,
  className,
  textBoxClass
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

    return () => {
      window.removeEventListener('resize', setLines);
    };
  }, []);

  return (
    <li
      className={
        'relative shadow-lg transition-transform hover:scale-105 ' +
        (className || '')
      }
    >
      <img
        src={mockImage}
        alt="Post"
        className="w-full h-full object-cover cursor-pointer"
      />
      <div
        className={
          'flex flex-col absolute bg-opacity-40 bg-black shadow-lg text-white px-6 py-4 md:px-8 ' +
          (textBoxClass || '')
        }
      >
        <h4 className="basis-[max-content] shrink-0 text-ellipsis line-clamp-5 font-bold cursor-pointer mb-2 hover:underline text-xl md:text-3xl">
          This box is designed the same
        </h4>
        <div className="basis-0 shrink grow mb-3 min-h-0" ref={textBoxRef}>
          <p
            className="font-extralight line-clamp-3 text-sm md:text-base"
            style={{ WebkitLineClamp: amountOfLines }}
          >
            {amountOfLines ? mainText : ''}
          </p>
        </div>
        <div className="mt-auto">
          {'By '}
          <span className="cursor-pointer text-orange-600 font-bold hover:underline">
            KissMyUSSR
          </span>
          <span className="font-extralight text-sm md:text-base">
            {' | ' + new Date(0).toDateString()}
          </span>
        </div>
      </div>
    </li>
  );
}
