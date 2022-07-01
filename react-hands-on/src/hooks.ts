import React, { useCallback, useEffect, useMemo, useState } from "react";
import { LoginProps } from "./components/githubApi/GithubUser";

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
  const [data, setData] = useState<LoginProps>();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!uri) return;
    fetch(uri)
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

const useIterator = (items = [], initialValue = 0) => {
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

  return [item || items[0], prev, next];
};

export { useInput, useFetch, useIterator };
