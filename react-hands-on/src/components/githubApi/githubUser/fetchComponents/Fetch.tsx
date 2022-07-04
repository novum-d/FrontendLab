import { useFetch } from "../../../../hooks";

const Fetch = <T,>({
  uri,
  renderSuccess,
  loadingFallback = <p>loading...</p>,
  renderError = (error) => <p>Something went wrong... {error.message}</p>,
}: FetchProps<T>) => {
  const { loading, data, error } = useFetch(uri);

  if (error) return renderError(error);
  if (loading) return loadingFallback;
  if (data) {
    switch (data["message"]) {
      case "Bad credentials":
        return <p>資格情報が正しくありません</p>;
      case "Not Found":
        return <p>存在しないURLです</p>;
    }
    return renderSuccess({ data: data });
  }
  return null;
};

type FetchProps<T> = {
  uri: string;
  renderSuccess: ({ data }: { data: T }) => JSX.Element;
  loadingFallback?: JSX.Element | null;
  renderError?: (error: Error) => JSX.Element | null;
};

export default Fetch;
