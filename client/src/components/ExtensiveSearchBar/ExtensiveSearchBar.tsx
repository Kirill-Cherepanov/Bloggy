import Icon from '../Icon/Icon';

export default function ExtensiveSearchBar() {
  return (
    <div>
      <div>
        <Icon type="search" />
        <input type="text" />
        <Icon type="arrow" className="rotate-180" />
      </div>
      <div>
        <select>
          <option value="" disabled={true}>
            Type
          </option>
          <option value="posts">Posts</option>
          <option value="blogs">Blogs</option>
        </select>

        <select>
          <option value="">Search by</option>
          <option value="categories_title">Categories & Title</option>
          <option value="categories">Title</option>
          <option value="title">Title</option>
        </select>

        <select>
          <option value="" disabled={true}>
            Sort by
          </option>
          <option value="popularity">By popularity</option>
          <option value="new">By new</option>
        </select>

        <select>
          <option value="" disabled={true}>
            Over time
          </option>
          <option value="week">Over a week</option>
          <option value="month">Over a month</option>
          <option value="year">Over a year</option>
          <option value="all">Over all time</option>
        </select>
      </div>
    </div>
  );
}
