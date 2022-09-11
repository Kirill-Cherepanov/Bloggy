import { useState } from 'react';
import { Tooltip, Picker } from 'components/Elements';

interface Props {
  labelClass?: string;
  description?: string;
  categories?: string[];
}

export function BlogSettings({
  labelClass,
  description = '',
  categories: categories_ = [],
}: Props) {
  const [categories, setCategories] = useState<string[]>(categories_);

  return (
    <>
      {/* !!! REFACTOR !!! */}
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
        <Tooltip outerText="?">
          Please choose categories in order of their importance to you. Also,
          you will be able to make posts from any category. They are needed
          mostly for search optimization.
        </Tooltip>
      </p>

      <Picker data={categories} setData={setCategories} />
    </>
  );
}
