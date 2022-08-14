import React from 'react';

type Props = {
  mockImage: string;
};

export default function ParallelogramCurtains({ mockImage }: Props) {
  return (
    <ul className="flex w-full gap-[90px] hover:gap-[60px] pr-[120px] transition-[gap] duration-200 ease-linear">
      {Array(5)
        .fill(0)
        .map((v, i) => (
          <li
            key={i}
            className="group min-w-0 basis-1/5 hover:basis-[calc(20%+210px)] transition-[flex-basis] duration-200 ease-linear"
          >
            <div className="cursor-pointer w-[calc(100%+120px)] h-100">
              <div
                className={
                  'overflow-hidden w-full h-80 ' +
                  (i === 0
                    ? 'clip-parallelogram-right'
                    : i === 4
                    ? 'clip-parallelogram-left'
                    : 'clip-parallelogram')
                }
              >
                <img
                  src={mockImage}
                  alt="Post"
                  className={
                    'object-cover object-center h-80 transition-transform duration-500 group-hover:duration-3000 ease-out delay-200 group-hover:scale-125 '
                  }
                />
              </div>
              <h3
                className={
                  'w-full text-center transition-[padding] duration-200 ease-linear' +
                  (i === 0
                    ? ' pr-[60px] group-hover:pl-[60px] group-hover:pr-[120px]'
                    : i === 4
                    ? ' group-hover:pl-[60px] group-hover:pr-[60px]'
                    : ' pr-[60px] group-hover:pl-[75px] group-hover:pr-[105px]')
                }
              >
                Please don't judge this component. It was tough making it
              </h3>
            </div>
          </li>
        ))}
    </ul>
  );
}
