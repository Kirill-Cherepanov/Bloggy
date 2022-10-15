import { Icon } from 'components/Elements';

type ExtensiveSearchBarProps = {
  defaultQuery?: URLSearchParams;
};

export function ExtensiveSearchBar({ defaultQuery }: ExtensiveSearchBarProps) {
  return (
    <form>
      <div className="flex items-center h-12 relative">
        <Icon
          type="search"
          className="absolute h-8 left-3 text-secondary-800"
        />
        <input
          id="catalog-search-input"
          type="text"
          className="focus:border-accent-400 outline-none w-full border-2 border-secondary-300 rounded-l-3xl pl-14 pr-3 py-2.5 placeholder:text-secondary-500 placeholder:font-light"
          placeholder="Search"
          name="q"
          defaultValue={defaultQuery?.get('q') || ''}
        />
        <button
          type="submit"
          className="focus:outline-accent-400 rounded-r-3xl bg-secondary-300 h-full px-4 group"
        >
          <Icon
            type="angle"
            className="h-6 rotate-180 text-secondary-800 group-focus:text-accent-800 group-hover:text-accent-800 transition-colors"
          />
        </button>
      </div>

      <div className="mt-2 px-2 xs:pl-6 xs:pr-14 grid grid-cols-2 text-[12px] gap-2 xs:text-base sm:flex sm:justify-between [&>*]:cursor-pointer [&>*]:hover: [&>*]:border-secondary-300 [&>*]:border [&>*]:shadow-sm [&>*]:rounded-md [&>*]:pb-1 [&>*]:px-0.5 [&>*]:outline-none">
        <select name="type" defaultValue={defaultQuery?.get('type') || 'posts'}>
          <option value="" disabled={true}>
            Type
          </option>
          <option value="posts">Posts</option>
          <option value="blogs">Blogs</option>
        </select>

        <select
          name="search"
          defaultValue={defaultQuery?.get('search') || 'both'}
        >
          <option value="" disabled={true}>
            Search by
          </option>
          <option value="both">Categories & Title</option>
          <option value="categories">Categories</option>
          <option value="title">Title</option>
        </select>

        <select name="sort" defaultValue={defaultQuery?.get('sort') || 'new'}>
          <option value="" disabled={true}>
            Sort by
          </option>
          <option value="new">By new</option>
          <option value="popular">By popularity</option>
        </select>

        <select name="time" defaultValue={defaultQuery?.get('time') || 'all'}>
          <option value="" disabled={true}>
            Over time
          </option>
          <option value="week">Over a week</option>
          <option value="month">Over a month</option>
          <option value="year">Over a year</option>
          <option value="all">Over all time</option>
        </select>
      </div>
    </form>
  );
}
