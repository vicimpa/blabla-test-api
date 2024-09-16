import { useCallback, useLayoutEffect, useState } from "react";

type AsyncResut<T> = [
  data: T,
  loading: false,
  error: null,
  reload: () => void,
] | [
  data: null,
  loading: true,
  error: null,
  reload: () => void,
] | [
  data: null,
  loading: false,
  error: Error,
  reload: () => void,
];

export const useAsync = <T>(func: () => T | Promise<T>, deps: any[] = []) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [count, setCount] = useState(0);

  const reload = useCallback(() => {
    setCount(v => v + 1);
  }, []);

  useLayoutEffect(() => {
    setData(null);
    setError(null);
    setLoading(true);

    Promise.resolve()
      .then(func)
      .then(data => {
        setData(data);
      })
      .catch(error => {
        if (error instanceof Error) {

          setError(error);
        } else {
          setError(new Error(`${error}`));
        }
      })
      .finally(() => {
        setLoading(false);
      });

  }, [count, ...deps]);

  return [
    data,
    loading,
    error,
    reload
  ] as AsyncResut<T>;
};