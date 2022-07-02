import { useEffect } from "react";
import { useIterator } from "../../hooks";
import styled from "styled-components";
import Fetch from "./Fetch";

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
      renderSuccess={({ data }: { data: { name: string }[] }) => (
        <RepoMenu repositories={data} onSelect={onSelect} />
      )}
    />
  );
};

const RepositoryName = styled.p`
  width: 300px;
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const RepoMenu = ({
  repositories,
  onSelect = () => undefined,
}: RepoMenuProps) => {
  if (repositories.length === 0) return null;
  const [{ name }, previous, next] = useIterator(repositories);
  console.log(`name: ${name}`);
  useEffect(() => {
    if (!name) return;
    onSelect(name);
  }, [name]);
  return (
    <div style={{ display: "flex" }}>
      <button onClick={previous}>&lt;</button>
      <RepositoryName>{name}</RepositoryName>
      <button onClick={next}>&gt;</button>
    </div>
  );
};

type UserRepositoriesProps = OnSelectProps & {
  login: string;
};
type RepoMenuProps = OnSelectProps & {
  repositories: { name: string }[];
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

export default GitHubUser;
