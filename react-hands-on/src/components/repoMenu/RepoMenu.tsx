import { useEffect } from "react";
import { useIterator } from "../../hooks";
import { Fetch, LoginProps } from "../githubApi/GithubUser";

type UserRepositoriesProps = {
  login: string;
  onSelect: (name: string) => void;
};
type RepoMenuProps = {
  repositories: LoginProps;
  onSelect: (name: string) => void;
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

const RepoMenu = ({
  repositories,
  onSelect = () => undefined,
}: RepoMenuProps) => {
  const [{ name }, previous, next] = useIterator(repositories);
  useEffect(() => {
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

export default UserRepositories;
