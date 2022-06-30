import React, { useEffect, useState } from "react";

const App = () => {
  const [login, setLogin] = useState("");
  return (
    <>
      <SearchForm login={login} setLogin={setLogin} />
      <GitHubUser login={login} />
    </>
  );
};

// hook
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

const GitHubUser = ({ login }: { login: string }) => {
  const { loading, data, error } = useFetch(
    `https://api.github.com/users/${login}`
  );
  if (error) return <pre>error: {JSON.stringify(error, null, 2)}</pre>;
  if (loading) return <h1>loading...</h1>;
  if (!data) return null;
  return (
    <div className="githubUser">
      <img src={data.avatar_url} alt={data.login} style={{ width: 200 }} />
      <div>
        <h1>{data.login}</h1>
        {data.name && <p>Name: {data.name}</p>}
        {data.location && <p>Location: {data.location}</p>}
      </div>
    </div>
  );
};

type SearchFormProps = {
  login: string;
  setLogin: (login: string) => void;
};

const SearchForm = ({ login, setLogin }: SearchFormProps) => {
  const [text, setText] = useState("");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLogin(text);
  };
  return (
    <>
      <form onSubmit={submit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Github User..."
        />
        <button>検索</button>
      </form>
    </>
  );
};

const Fetch = ({
  uri,
  renderSuccess,
  loadingFallback = <p>loading...</p>,
  renderError = (error) => <pre>{JSON.stringify(error, null, 2)}</pre>,
}: FetchProps) => {
  const { loading, data, error } = useFetch(uri);
  if (error) return renderError(error);
  if (loading) return loadingFallback;
  if (data) return renderSuccess(data);
};

type LoginProps = {
  name: string;
  login: string;
  avatar_url: string;
  location: string;
};

type FetchProps = {
  uri: string;
  renderSuccess: (data: LoginProps) => JSX.Element;
  loadingFallback: JSX.Element;
  renderError: (error: Error) => JSX.Element;
};

export default App;
