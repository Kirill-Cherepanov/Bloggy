import React, { useState } from 'react';
import getRelativeCursorPos from '../../utility/getRelativeCursorPos';
import isMobile from '../../utility/isMobile';

type Props = {
  mockImage: string;
};

type Position = { x: number; y: number };

export default function ParallelogramCurtains({ mockImage }: Props) {
  const [zoomedPos, setZoomedPos] = useState<Position | undefined>();
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
                <div className="ml-[-10%] w-[120%] h-full">
                  <img
                    src={mockImage}
                    alt="Post"
                    onMouseMove={(e) => setZoomedPos(getRelativeCursorPos(e))}
                    className={
                      'object-cover object-center h-full' +
                      (isMobile()
                        ? ''
                        : ' transition-transform duration-200 ease-out group-hover:scale-125')
                    }
                    style={{
                      transformOrigin:
                        zoomedPos && `${zoomedPos.x}px ${zoomedPos.y}px`
                    }}
                  />
                </div>
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
