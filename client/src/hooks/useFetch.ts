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
  const [data, setData] = useState<T>();
  const isError = !!error;
  const isLoading = !skip && !data && !isError;

  useEffect(() => {
    if (skip) return;

    const fetchData = async () => {
      try {
        const fetchRes = await fetch(url);

        if (fetchRes.ok) {
          if (isBlob) return setData((await fetchRes.blob()) as unknown as T);
          return setData(await fetchRes.json());
        }

        setError(await fetchRes.json());
      } catch (err: unknown) {
        setError(err);
      }
    };

    fetchData();
  }, [isBlob, skip, url]);

  return { data, isLoading, isError, error };
};
