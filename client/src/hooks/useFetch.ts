import { useEffect, useState } from 'react';

type FetchOptions = {
  isBlob?: boolean;
  skip?: boolean;
};

export const useFetch = <T>(
  url: string,
  { skip = false, isBlob = false }: FetchOptions
) => {
  const [error, setError] = useState<unknown>();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsFetching] = useState(false);
  const [data, setData] = useState<T>();

  useEffect(() => {
    if (skip) return;

    const fetchData = async () => {
      try {
        setIsFetching(true);
        const fetchRes = await fetch(url);
        setIsFetching(false);

        if (fetchRes.ok) {
          if (isBlob) return setData((await fetchRes.blob()) as unknown as T);
          return setData(await fetchRes.json());
        }

        setIsError(true);
        setError(await fetchRes.json());
      } catch (err: unknown) {
        setIsFetching(false);
        setIsError(true);
        setError(err);
      }
    };

    fetchData();
  }, [isBlob, skip, url]);

  return { data, isLoading, isError, error };
};
