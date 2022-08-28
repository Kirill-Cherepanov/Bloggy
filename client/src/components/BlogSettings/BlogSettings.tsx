import { useEffect, useRef, useState } from 'react';
import Icon from '../Icon/Icon';

interface Props {
  labelClass?: string;
  description?: string;
  categories?: string[];
}

export default function BlogSettings({
  labelClass,
  description = '',
  categories: categories_ = []
}: Props) {
  const [categories, setCategories] = useState<string[]>(categories_);
  const [isAdding, setIsAdding] = useState(false);
  const newCategoryRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isAdding) newCategoryRef.current!.focus();
  }, [isAdding]);

  return (
    <>
      <label htmlFor="blog-description" className={labelClass}>
        Blog description
      </label>
      <textarea
        id="blog-description"
        defaultValue={description}
        rows={4}
        className="bg-secondary-100 outline-1 w-full border-2 border-secondary-300 rounded-md px-2 py-1 mb-6 focus:outline-2 focus:outline-accent-400"
      />

      <p className={labelClass}>
        Add categories that your blog specializes in
        <span className="ml-1.5 cursor-pointer relative group rounded-full bg-secondary-300 inline-flex items-center justify-center w-4 h-4">
          ?
          <div className="w-80 px-2 py-1 absolute top-4 bg-secondary-300 mt-2 opacity-0 rounded-md transition-opacity duration-200 invisible group-hover:visible group-hover:opacity-100 after:block after:absolute after:bottom-full after:left-1/2 after:-ml-2 after:border-[8px] after:border-transparent after:border-b-secondary-300">
            Please choose categories in order of their importance to you. Also,
            you will be able to make posts from any category. They are needed
            mostly for search optimization.
          </div>
        </span>
      </p>
      <div className="flex gap-2 flex-wrap min-h-8">
        {categories.map((category) => (
          <span
            key={category}
            className="inline-flex justify-center items-center rounded-3xl text-main bg-accent-700 pl-3 pr-2 py-1 gap-1"
          >
            {category}
            <button
              onClick={() => {
                setCategories((categories) =>
                  categories.filter((c) => c !== category)
                );
              }}
            >
              <Icon type="close" className="h-5" />
            </button>
          </span>
        ))}
        {!isAdding ? (
          <button onClick={() => setIsAdding(true)}>
            <span className="inline-flex justify-center items-center rounded-3xl border-2 border-accent-700 px-2 py-0.5 gap-1 hover:bg-accent-100 group">
              Add <Icon type="plus" className="h-5 text-accent-900" />
            </span>
          </button>
        ) : (
          <div className="relative min-w-[120px]">
            <input
              ref={newCategoryRef}
              type="text"
              size={1}
              className="w-full border-2 border-accent-700 px-2 py-0.5 rounded-3xl focus:outline-none"
              onBlur={(e) => {
                setIsAdding(false);
                if (
                  e.target.value !== '' &&
                  e.target.value.length <= 20 &&
                  !categories.includes(e.target.value)
                ) {
                  setCategories((categories) => [
                    ...categories,
                    e.target.value
                  ]);
                }
              }}
              onKeyDown={(e) => {
                if (e.code === 'Escape') {
                  setIsAdding(false);
                }
                if (e.code === 'Enter') {
                  if (
                    e.target.value !== '' &&
                    e.target.value.length <= 20 &&
                    !categories.includes(e.target.value)
                  ) {
                    setCategories((categories) => [
                      ...categories,
                      e.target.value
                    ]);
                  }
                  setIsAdding(false);
                }
              }}
            />
          </div>
        )}
      </div>
    </>
  );
}
