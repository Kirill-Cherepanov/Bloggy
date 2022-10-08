import { BgTransition, BgTransitionType } from 'components/Layout';
import { Spinner } from 'components/Elements';
import { useSearchQuery } from 'features/blogs&posts';
import { PostData, PublicData } from 'types';

type QuerySectionProps<T> = {
  query: string;
  children: (data: T) => React.ReactNode;
  bgTransitionType?: BgTransitionType;
  className?: string;
  minLength?: number;
};

export function QuerySection<T extends PostData[] & Required<PublicData>[]>({
  query,
  children,
  bgTransitionType,
  className = '',
  minLength = 0,
}: QuerySectionProps<T>) {
  const { data, isFetching, isError, error } = useSearchQuery(query);

  if (isError) {
    console.error(error);
    return <></>;
  }

  if (!isFetching && (!data?.values || data.values.length < minLength)) {
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
        {!isFetching && data?.values && children(data.values as T)}
      </section>
      {bgTransitionType && <BgTransition type={bgTransitionType} />}
    </>
  );
}
