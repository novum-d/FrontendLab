import React, { useEffect, useState } from "react";
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

export { useInput, useFetch };
