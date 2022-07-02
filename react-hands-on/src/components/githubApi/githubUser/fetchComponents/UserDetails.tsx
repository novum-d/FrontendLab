import { LoginProps, UserRepositoriesProps } from "../../exports";
import Fetch from "./Fetch";
import RepoMenu from "./RepoMenu";

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
        <RepoMenu login={login} repositories={data} onSelect={onSelect} />
      )}
    />
  );
};

export default UserDetails;
