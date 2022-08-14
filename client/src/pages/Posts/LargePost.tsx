import React, { useEffect, useRef, useState } from 'react';

type Props = { mockImage: string };

export default function LargePost({ mockImage }: Props) {
  const mainText =
    'A somewhat long description of the post, d adadad adadad adaadada adadadada d adad or rather the main content of the post that I will need to somehow edit based on the amount d more and more and more and more and more and more text';
  const [amountOfLines, setAmountOfLines] = useState(1);
  const textBoxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const measureLines = () =>
      Math.floor(
        (textBoxRef.current!.getBoundingClientRect().height -
          Number(textBoxRef.current!.style.marginBottom)) /
          24
      );

    setAmountOfLines(measureLines());
    return () => {};
  }, []);

  return (
    <li className="row-start-1 row-end-4 relative shadow-lg transition-transform hover:scale-105">
      <img
        src={mockImage}
        alt="Post"
        className="w-full h-full object-cover cursor-pointer"
      />
      <div className="flex flex-col absolute top-1/3 w-5/6 h-64 bg-opacity-40 bg-black text-white px-8 py-4">
        <h4 className="basis-[max-content] shrink-0 text-ellipsis line-clamp-5 font-bold text-3xl cursor-pointer mb-2 hover:underline">
          This box is designed the same way as
        </h4>
        <div className="basis-0 shrink grow mb-3" ref={textBoxRef}>
          <p
            className="font-extralight line-clamp-3"
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
          {' | '}
          <span className="font-extralight">{new Date(0).toDateString()}</span>
        </div>
      </div>
    </li>
  );
}
