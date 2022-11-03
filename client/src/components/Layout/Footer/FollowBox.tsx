import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useGetCategoriesQuery } from 'features/misc/api/categoriesApi';

export function FollowBox() {
  const [followBoxParams, setFollowBoxParams] = useState({
    width: 0,
    top: 0,
    left: 0,
  });
  const { data, isError, error } = useGetCategoriesQuery();

  if (isError) {
    console.error(error);
    return <></>;
  }

  const categories =
    data?.categories &&
    // .sort mutates an array and data should be immutable
    [...data.categories].sort((curr, prev) => prev.amount - curr.amount);

  return (
    <div className="mx-auto max-w-7xl px-4 xs:px-8 sm:px-12 md:px-20 py-5 lg:py-8 border-main border-opacity-10 border-b">
      <ul className="relative flex justify-center gap-3 flex-wrap max-h-[106px] lg:max-h-[118px] overflow-y-hidden">
        {categories &&
          categories.map((category) => (
            <li
              key={category.name}
              onMouseOver={(e) => {
                const width = e.currentTarget.getBoundingClientRect().width;
                const left = e.currentTarget.offsetLeft;
                const top = e.currentTarget.offsetTop;
                setFollowBoxParams({ width, top, left });
              }}
              className="[&:hover~.FOOOTER-FOLLOW-BORDER]:opacity-100 [&:hover~.FOOOTER-FOLLOW-BORDER]:cursor-pointer border border-secondary-200 rounded-sm px-1 cursor-pointer hover:text-accent-400 transition-colors"
            >
              <Link to={`/catalog?q=${category.name}&search=categories`}>
                {category.name}
              </Link>
            </li>
          ))}
        <li
          className="FOOOTER-FOLLOW-BORDER pointer-events-none opacity-0 absolute border border-accent-400 rounded-sm px-1 transition-all"
          style={followBoxParams}
        >
          <span className="opacity-0">a{/* is needed to measure height*/}</span>
        </li>
      </ul>
    </div>
  );
}
