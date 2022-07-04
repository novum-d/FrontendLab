import React, { useCallback, useEffect, useMemo, useState } from "react";

const useInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);
  return [
    {
      value: value,
      onChange: handleChange,
    },
    () => setValue(initialValue),
  ] as const;
};

const useFetch = (uri: string) => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const token = "ghp_NtWGtkKT5oICjzt"; // ujwri90HfRjoKoZ1rvigx
  useEffect(() => {
    if (!uri) return;
    fetch(uri, { headers: { Authorization: `Bearer ${token}` } })
      .then((data) => data.json())
      .then(setData)
      .then(() => setLoading(false))
      .catch(setError);
  }, [uri]);
  return {
    loading,
    data,
    error,
  };
};

const useIterator = <T>(items: T[] = [], initialValue = 0) => {
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

export { useInput, useFetch, useIterator };
