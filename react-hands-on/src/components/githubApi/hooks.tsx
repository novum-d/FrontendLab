import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const token = "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";

const useFetch = (uri: string) => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const mounted = useMountedRef();
  useEffect(() => {
    if (!uri) return;
    if (!mounted.current) return;
    fetch(uri, { headers: { Authorization: `Bearer ${token}` } })
      .then((data) => {
        if (!mounted.current) {
          throw new Error("component is not mounted");
        }
        return data;
      })
      .then((data) => data.json())
      .then(setData)
      .then(() => setLoading(false))
      .catch((e) => {
        if (!mounted.current) return;
        setError(e);
      });
  }, [uri]);
  return {
    loading,
    data,
    error,
  };
};

const useIterator = <T,>(items: T[] = [], initialValue = 0) => {
  const [i, setIndex] = useState(initialValue);

  const prev = useCallback(() => {
    if (i === 0) return setIndex(items.length - 1);
    setIndex(i - 1);
  }, [i]);

  const next = useCallback(() => {
    if (i === items.length - 1) return setIndex(0);
    setIndex(i + 1);
  }, [i]);

  const item = useMemo(() => items[i], [i]);

  return [item || items[0], prev, next] as const;
};

const useMountedRef = () => {
  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  });
  return mounted;
};

export { useFetch, useIterator, useMountedRef, token };
