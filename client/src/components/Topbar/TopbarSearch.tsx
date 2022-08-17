import Icon from '../Icon';

export default function TopbarSearch() {
  return (
    <div className="flex relative">
      <Icon
        type="search"
        className="h-8 sm:h-10 text-main lg:h-8 lg:text-secondary-500 lg:absolute top-[calc(50%-1rem)] left-2  "
      />
      <input
        type="text"
        placeholder="Search articles"
        className="h-10 pl-12 pr-2 placeholder:text-secondary-500 hidden lg:block"
      />
    </div>
  );
}
