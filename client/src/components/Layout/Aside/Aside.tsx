import { useEffect, useRef, useState } from 'react';

import { TinyPost, useSearchQuery } from 'features/blogs&posts';
import { PostData } from 'types';

type AsideProps = {
  shouldRenderPopular?: boolean;
  children?: React.ReactNode;
};

export function Aside({ children, shouldRenderPopular = true }: AsideProps) {
  const { maxHeightElement, minHeightElement, amountOfPosts } =
    useCalculatePosts();

  const { data, isError, error } = useSearchQuery('sort=popular', {
    skip: !shouldRenderPopular && amountOfPosts > 0,
  });

  if (isError) console.error(error);

  return (
    <aside
      ref={minHeightElement}
      className="w-80 h-min shrink-0 bg-secondary-800 flex flex-col rounded-md"
    >
      <div className="absolute top-0 bottom-0" ref={maxHeightElement}>
        {/* In order to calculate how many posts can fit into the Aside */}
        {/* This element measures the maximum height that Aside can take */}
        {/* For that you need to set position property of the container to relative */}
      </div>
      {children}
      {shouldRenderPopular && amountOfPosts > 0 && data?.values && (
        <div className="mt-3">
          <h3 className="mx-auto mb-1 w-max bg-accent-400 px-3 py-2 font-bold text-xl uppercase">
            Popular posts
          </h3>
          <ul>
            {(data.values as PostData[]).slice(0, amountOfPosts).map((post) => (
              <TinyPost key={post._id} postData={post} />
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}

const useCalculatePosts = () => {
  const maxHeightElement = useRef<HTMLDivElement | null>(null);
  const minHeightElement = useRef<HTMLElement | null>(null);
  const [amountOfPosts, setAmountOfPosts] = useState(0);

  useEffect(() => {
    const maxHeight = maxHeightElement.current!.getBoundingClientRect().height;
    const minHeight = minHeightElement.current!.getBoundingClientRect().height;

    let newAmountOfPosts = Math.floor((maxHeight - minHeight - 32 - 44) / 144);
    if (newAmountOfPosts < 0) return;
    if (newAmountOfPosts > 5) newAmountOfPosts = 5;

    // Need to fix this
    setAmountOfPosts(newAmountOfPosts);
    setTimeout(() => setAmountOfPosts(newAmountOfPosts), 500);
    setTimeout(() => setAmountOfPosts(newAmountOfPosts), 1000);
  }, []);

  return { maxHeightElement, minHeightElement, amountOfPosts };
};
