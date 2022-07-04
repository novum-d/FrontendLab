import { UserRepositoriesProps } from "../exports";
import Fetch from "./fetchComponents/Fetch";
import RepoMenu from "./fetchComponents/RepoMenu";

const UserRepositories = ({
  login,
  selectedRepo,
  onSelect = () => undefined,
}: UserRepositoriesProps) => {
  return (
    <Fetch
      uri={`https://api.github.com/users/${login}/repos`}
      renderSuccess={({ data }: { data: { name: string }[] }) => (
        <RepoMenu
          repositories={data}
          selected={selectedRepo}
          onSelect={onSelect}
        />
      )}
    />
  );
};

export default UserRepositories;
