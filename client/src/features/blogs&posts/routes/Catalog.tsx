import { useSearchQuery } from '../api/searchApi';
import { ExtensiveSearchBar, CatalogPosts, CatalogBlogs } from '../components';
import { Icon, Spinner } from 'components/Elements';
import { useQueryParams } from '../hooks';
import { useNavigate } from 'react-router';

export function Catalog() {
  const navigate = useNavigate();
  const query = useQueryParams();
  const { data, isFetching, isError, error } = useSearchQuery(
    query.toString(),
    { skip: !query.toString() }
  );

  if (isError) console.error(error);

  const goToPage = (page: number) => {
    const newQuery = new URLSearchParams(query.toString());
    newQuery.set('page', `${page}`);
    navigate(`/catalog${newQuery}`);
  };

  const page = (query.get('page') && Number(query.get('page'))) || 1;

  return (
    <main className="pt-8 px-page min-h-[300px]">
      <ExtensiveSearchBar defaultQuery={query} />

      {isFetching && (
        <div className="w-full h-80 flex items-center justify-center">
          <Spinner />
        </div>
      )}

      {isError && (
        <div className="w-full h-64 flex items-center justify-center">
          <div className="text-center sm:text-2xl md:text-3xl lg:text-4xl space-y-2">
            <div>Oops... Something went terribly wrong</div>
            <div>You may try searching again</div>
          </div>
        </div>
      )}

      {!data?.values.length && (
        <div className="w-full h-48 flex items-center justify-center sm:text-2xl md:text-3xl lg:text-4xl">
          It looks like your query did not match anything
        </div>
      )}

      {!isFetching && !isError && data?.values.length && (
        <>
          {data.type === 'posts' ? (
            <CatalogPosts posts={data.values} />
          ) : (
            <CatalogBlogs blogs={data.values} />
          )}

          <div className="flex justify-center gap-6">
            {page > 1 && (
              <button
                className="uppercase h-14 w-40 flex gap-1 items-center justify-center bg-secondary-800 text-main text-lg font-medium hover:tracking-widest transition-all"
                onClick={() => goToPage(page - 1)}
              >
                <Icon type="angle" className="h-5 -translate-y-[1px]" />
                Previous
              </button>
            )}

            {data.total - page * 10 > 0 && (
              <button
                className="uppercase h-14 w-40 flex gap-1 items-center justify-center bg-secondary-800 text-main text-lg font-medium hover:tracking-widest transition-all"
                onClick={() => goToPage(page + 1)}
              >
                Next
                <Icon
                  type="angle"
                  className="rotate-180 h-5 -translate-y-[1px]"
                />
              </button>
            )}
          </div>
        </>
      )}
    </main>
  );
}
