import React, { useEffect, useState } from "react";
import { useFetch, useIterator } from "../../hooks";

const App = () => {
  const [login, setLogin] = useState("");
  return (
    <>
      <SearchForm setLogin={setLogin} />
      <GitHubUser login={login} />
    </>
  );
};
const SearchForm = ({ setLogin }: { setLogin: (login: string) => void }) => {
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

const GitHubUser = ({ login }: { login: string }) => {
  return (
    <Fetch
      uri={`https://api.github.com/users/${login}`}
      renderSuccess={UserDetails}
    />
  );
};

const UserDetails = ({ data }: { data: LoginProps }) => {
  return (
    <div className="githubUser">
      <img src={data.avatar_url} alt={data.login} style={{ width: 200 }} />
      <div>
        <h1>{data.login}</h1>
        {data.name && <p>Name: {data.name}</p>}
        {data.location && <p>Location: {data.location}</p>}
      </div>
      <UserRepositories
        login={data.login}
        onSelect={(repoName) => console.log(`${repoName} selected`)}
      />
    </div>
  );
};

const UserRepositories = ({
  login,
  onSelect = () => undefined,
}: UserRepositoriesProps) => {
  return (
    <Fetch
      uri={`https://api.github.com/users/${login}/repos`}
      renderSuccess={({ data }) => (
        <RepoMenu repositories={data} onSelect={onSelect} />
      )}
    />
  );
};

const Fetch = ({
  uri,
  renderSuccess,
  loadingFallback = <p>loading...</p>,
  renderError = (error) => <p>Something went wrong... {error.message}</p>,
}: FetchProps) => {
  const { loading, data, error } = useFetch(uri);
  if (error) return renderError(error);
  if (loading) return loadingFallback;
  if (data) return renderSuccess({ data: data });
  return null;
};

const RepoMenu = ({
  repositories,
  onSelect = () => undefined,
}: RepoMenuProps) => {
  const [name, previous, next] = useIterator(Object.values(repositories));
  useEffect(() => {
    console.log(repositories);
    if (!name) return;
    onSelect(name);
  }, [name]);
  return (
    <div style={{ display: "flex" }}>
      <button onClick={previous}>&lt;</button>
      <p>{name}</p>
      <button onClick={next}>&gt;</button>
    </div>
  );
};

type UserRepositoriesProps = OnSelectProps & {
  login: string;
};
type RepoMenuProps = OnSelectProps & {
  repositories: LoginProps;
};

type OnSelectProps = {
  onSelect: (name: string) => void;
};

export type LoginProps = {
  name: string;
  login: string;
  avatar_url: string;
  location: string;
};

type FetchProps = {
  uri: string;
  renderSuccess: ({ data }: { data: LoginProps }) => JSX.Element;
  loadingFallback?: JSX.Element | null;
  renderError?: (error: Error) => JSX.Element | null;
};

export default App;
