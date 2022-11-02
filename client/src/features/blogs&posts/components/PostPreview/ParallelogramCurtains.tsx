import clsx from 'clsx';
import { POST_IMGS_LOCATION } from 'config';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PostData } from 'types';

import { getRelativeCursorPos } from '../../utility';

type CurtainsProps = {
  postsData: PostData[];
  className?: string;
};

export function ParallelogramCurtains({ postsData, className }: CurtainsProps) {
  const [zoomedXPos, setZoomedXPos] = useState<number | undefined>();
  return (
    <ul
      className={clsx(
        'flex justify-between w-full gap-[90px] hover:gap-[60px] pr-[120px] transition-[gap] duration-200 ease-linear pointer-events-none',
        className
      )}
    >
      {postsData.map((postData, i) => (
        <li
          key={postData._id}
          className={`pointer-events-auto group min-w-0 transition-[flex-basis] duration-200 ease-linear parallelogram-${postsData.length}`}
        >
          <Link
            to={'/post/' + postsData[i]._id}
            className="block w-[calc(100%+120px)]"
          >
            <div
              className={clsx(
                'overflow-hidden w-full h-80',
                i === 0
                  ? 'clip-parallelogram-right'
                  : i === postsData.length - 1
                  ? 'clip-parallelogram-left'
                  : 'clip-parallelogram'
              )}
            >
              <div className="ml-[-10%] w-[120%] h-full">
                <img
                  src={POST_IMGS_LOCATION + postData.image}
                  alt="Post"
                  onMouseMove={(e) => setZoomedXPos(getRelativeCursorPos(e).x)}
                  className="mx-auto object-cover object-center h-full lg:transition-transform lg:duration-200 lg:ease-out lg:group-hover:scale-110"
                  style={{
                    transformOrigin: zoomedXPos && `${zoomedXPos}px center`,
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
                <div className="pt-4 text-ellipsis line-clamp-3 font-display font-bold text-lg hover:underline">
                  {postData.title}
                </div>
                <div className="absolute top-0 left-1/2 -translate-y-1/2 -translate-x-1/2 flex justify-center items-center text-main font-display uppercase text-sm font-bold bg-gradient-to-t from-secondary-800 to-secondary-700">
                  <Link
                    to={`/catalog?q=${postData.categories[0]}&search=categories`}
                    className="block p-1 h-full w-full bg-secondary-800 hover:bg-transparent transition-colors"
                  >
                    {postData.categories[0]}
                  </Link>
                </div>
              </div>
            </h3>
          </Link>
        </li>
      ))}
    </ul>
  );
}
