import Icon from '../Icon/Icon';

export default function ExtensiveSearchBar() {
  return (
    <div className="">
      <div className="flex items-center h-12 relative">
        <Icon
          type="search"
          className="absolute h-8 left-3 text-secondary-800"
        />
        <input
          type="text"
          className="focus:border-accent-400 outline-none w-full border-2 border-secondary-300 rounded-l-3xl pl-14 pr-3 py-2.5 placeholder:text-secondary-500 placeholder:font-light"
          placeholder="Search"
        />
        <button className="focus:outline-accent-400 rounded-r-3xl bg-secondary-300 h-full px-4 group">
          <Icon
            type="angle"
            className="h-6 rotate-180 text-secondary-800 group-focus:text-accent-800 group-hover:text-accent-800 transition-colors"
          />
        </button>
      </div>
      <div className="mt-2 mb-8 pl-6 pr-14 flex justify-between [&>*]:cursor-pointer [&>*]:hover: [&>*]:border-secondary-300 [&>*]:border [&>*]:shadow-sm [&>*]:rounded-md [&>*]:pb-1 [&>*]:px-0.5 [&>*]:outline-none">
        <select className="">
          <option value="" disabled={true}>
            Type
          </option>
          <option value="posts" selected>
            Posts
          </option>
          <option value="blogs">Blogs</option>
        </select>

        <select className="">
          <option value="" disabled={true}>
            Search by
          </option>
          <option value="categories_title" selected>
            Categories & Title
          </option>
          <option value="categories">Categories</option>
          <option value="title">Title</option>
        </select>

        <select className="">
          <option value="" disabled={true}>
            Sort by
          </option>
          <option value="new" selected>
            By new
          </option>
          <option value="popularity">By popularity</option>
        </select>

        <select className="">
          <option value="" disabled={true}>
            Over time
          </option>
          <option value="week">Over a week</option>
          <option value="month">Over a month</option>
          <option value="year">Over a year</option>
          <option value="all" selected>
            Over all time
          </option>
        </select>
      </div>
    </div>
  );
}
