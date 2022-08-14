import React, { useEffect, useRef, useState } from 'react';

type Props = { mockImage: string };

export default function SmallPost({ mockImage }: Props) {
  const mainText =
    'A somewhat long description of the post, or rather the main content of the post that I will need to somehow edit based on the amount of free space I have and more and more and more and more and more and more and more and more text';
  const [amountOfLines, setAmountOfLines] = useState(1);
  const textBoxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const measureLines = () =>
      Math.floor(textBoxRef.current!.getBoundingClientRect().height / 24);

    setAmountOfLines(measureLines());
    return () => {};
  }, []);

  return (
    <li className="flex h-40 transition-transform bg-orange-50 shadow-lg hover:scale-105">
      <img
        src={mockImage}
        alt="Post"
        className="w-40 h-40 object-cover cursor-pointer"
      />
      <div className="px-5 py-2 flex flex-col">
        <h4 className="basis-[max-content] shrink-0 line-clamp-4 font-bold text-xl cursor-pointer mb-1 hover:underline">
          This box is designed the
        </h4>
        <div ref={textBoxRef} className="grow">
          <p
            className={`line-clamp-3 text-light-dark`}
            style={{ WebkitLineClamp: amountOfLines }}
          >
            {amountOfLines ? mainText : ''}
          </p>
        </div>
        <div className="mt-auto text-light-dark">
          {'By '}
          <span className="cursor-pointer text-orange-600 font-bold hover:underline">
            KissMyUSSR
          </span>
          {' | '}
          <span className="">{new Date(0).toDateString()}</span>
        </div>
      </div>
    </li>
  );
}
