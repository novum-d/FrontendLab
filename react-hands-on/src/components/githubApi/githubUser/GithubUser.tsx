import Fetch from "./fetchComponents/Fetch";
import UserDetails from "./fetchComponents/UserDetails";

const GitHubUser = ({ login }: { login: string }) => {
  if (!login) return null;
  return (
    <Fetch
      uri={`https://api.github.com/users/${login}`}
      renderSuccess={UserDetails}
    />
  );
};

export default GitHubUser;
