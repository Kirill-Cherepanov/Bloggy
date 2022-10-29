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

  return (
    <ul className="max-w-7xl mx-auto px-4 xs:px-8 sm:px-12 md:px-20 pt-5 lg:pt-8 hidden sm:flex justify-center gap-3 relative flex-wrap">
      {data &&
        data.categories.map((category) => (
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
  );
}
