import React, { useState } from 'react';
import getRelativeCursorPos from '../../utility/getRelativeCursorPos';
import isMobile from '../../utility/isMobile';

type Props = {
  postsData: Post[];
  className?: string;
};

export default function ParallelogramCurtains({ postsData, className }: Props) {
  const [zoomedXPos, setZoomedXPos] = useState<number | undefined>();
  return (
    <ul
      className={
        'flex justify-between w-full gap-[90px] hover:gap-[60px] pr-[120px] transition-[gap] duration-200 ease-linear pointer-events-none ' +
        (className || '')
      }
    >
      {postsData.map((postData, i) => (
        <li
          key={postData._id}
          className="pointer-events-auto group min-w-0 basis-[calc(20%-72px)] hover:basis-[calc(20%+48px)] transition-[flex-basis] duration-200 ease-linear"
        >
          <div className="cursor-pointer w-[calc(100%+120px)]">
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
                  src={postData.image}
                  alt="Post"
                  onMouseMove={(e) => setZoomedXPos(getRelativeCursorPos(e).x)}
                  className={
                    'object-cover object-center h-full' +
                    (isMobile()
                      ? ''
                      : ' transition-transform duration-200 ease-out group-hover:scale-110')
                  }
                  style={{
                    transformOrigin: zoomedXPos && `${zoomedXPos}px center`
                  }}
                />
              </div>
            </div>
            <h3
              className={
                'w-full text-center transition-[padding] duration-200 ease-linear pr-[60px] group-hover:pl-[75px] group-hover:pr-[105px] group-first:pr-[60px] group-first:group-hover:pl-[60px] group-first:group-hover:pr-[120px] group-last:pr-0 group-last:group-hover:pl-[60px] group-last:group-hover:pr-[60px]'
              }
            >
              <div className="relative">
                <div className="pt-4 text-ellipsis line-clamp-3 font-display font-bold text-lg">
                  {postData.title}
                </div>
                <div className="absolute p-1 top-0 left-1/2 -translate-y-1/2 -translate-x-1/2 flex justify-center items-center bg-secondary-800 text-main font-display uppercase text-sm font-bold">
                  {postData.categories[0]}
                </div>
              </div>
            </h3>
          </div>
        </li>
      ))}
    </ul>
  );
}
