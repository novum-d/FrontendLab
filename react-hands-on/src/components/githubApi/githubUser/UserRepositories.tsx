import { UserRepositoriesProps } from "../exports";
import Fetch from "./fetchComponents/Fetch";
import RepoMenu from "./fetchComponents/RepoMenu";

const UserRepositories = ({
  login,
  onSelect = () => undefined,
}: UserRepositoriesProps) => {
  return (
    <Fetch
      uri={`https://api.github.com/users/${login}/repos`}
      renderSuccess={({ data }: { data: { name: string }[] }) => (
        <RepoMenu login={login} repositories={data} onSelect={onSelect} />
      )}
    />
  );
};

export default UserRepositories;
