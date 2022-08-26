import { useEffect, useRef, useState } from 'react';
import Icon from '../../../components/Icon/Icon';

export default function Stage2() {
  const [categories, setCategories] = useState(['ff']);
  const [isAdding, setIsAdding] = useState(false);
  const newCategoryRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isAdding) newCategoryRef.current!.focus();
  }, [isAdding]);

  return (
    <form onSubmit={(e) => e.preventDefault()} className="mx-auto w-full mt-6">
      <h2 className="text-3xl text-center font-bold font-display uppercase mb-4">
        Create your blog
      </h2>
      <label
        htmlFor="registration__blog-description"
        className="block font-light ml-2 text-sm mb-1"
      >
        Blog description
      </label>
      <textarea
        id="registration__blog-description"
        className="bg-secondary-100 outline-1 w-full border-2 border-secondary-300 rounded-md px-2 py-1 mb-6 focus:outline-2 focus:outline-accent-400"
      />

      <label
        htmlFor="registration__blog-categories"
        className="flex items-center font-light ml-2 text-sm mb-1"
      >
        Add categories that your blog specializes in
        <span className="ml-1.5 cursor-pointer relative group rounded-full bg-secondary-300 inline-flex items-center justify-center w-4 h-4">
          ?
          <div className="w-64 px-2 py-1 absolute top-4 bg-secondary-300 mt-2 opacity-0 rounded-md transition-opacity duration-200 invisible group-hover:visible group-hover:opacity-100 after:block after:absolute after:bottom-full after:left-1/2 after:-ml-2 after:border-[8px] after:border-transparent after:border-b-secondary-300">
            Please choose categories in order of their importance to you. Also,
            you will be able to make posts from any category. This is needed
            mostly for search.
          </div>
        </span>
      </label>
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
            <span className="inline-flex justify-center items-center rounded-3xl border-2 border-accent-700 px-2 py-0.5 gap-1">
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
                  if (e.target.value === '') {
                    setIsAdding(false);
                    return;
                  }
                  setCategories((categories) => [
                    ...categories,
                    e.target.value
                  ]);
                  setIsAdding(false);
                }
              }}
            />
          </div>
        )}

        <button className="mt-8 w-full py-2 bg-accent-800 text-main font-bold rounded-3xl transition-color hover:bg-accent-900">
          Create a blog
        </button>
      </div>
    </form>
  );
}
