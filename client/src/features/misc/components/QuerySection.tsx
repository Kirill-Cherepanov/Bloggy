import { BgTransition, BgTransitionType } from 'components/Layout';
import { Spinner } from 'components/Elements';
import { useSearchPostsQuery } from 'features/blogs&posts';
import { PostData } from 'types';

type QuerySectionProps = {
  query: string;
  children: (data: PostData[]) => React.ReactNode;
  bgTransitionType?: BgTransitionType;
  className?: string;
  minLength?: number;
};

export function QuerySection({
  query,
  children,
  bgTransitionType,
  className = '',
  minLength = 0,
}: QuerySectionProps) {
  const { data, isFetching, isError, error } = useSearchPostsQuery(query);

  if (isError) {
    console.error(error);
    return <></>;
  }

  if (!isFetching && (!data?.posts || data.posts.length < minLength)) {
    return <></>;
  }

  return (
    <>
      <section className={className}>
        {isFetching && (
          <div className="w-full h-80 flex items-center justify-center">
            <Spinner />
          </div>
        )}
        {!isFetching && data?.posts && children(data.posts)}
      </section>
      {bgTransitionType && <BgTransition type={bgTransitionType} />}
    </>
  );
}
