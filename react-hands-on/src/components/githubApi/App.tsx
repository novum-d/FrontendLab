import { useState } from "react";
import GitHubUser from "./githubUser/GithubUser";
import RepositoryReadme from "./githubUser/RepositoryReadme";
import SearchForm from "./githubUser/SearchForm";
import UserRepositories from "./githubUser/UserRepositories";

const App = () => {
  const [login, setLogin] = useState("");
  const [repo, setRepo] = useState("");
  return (
    <>
      <SearchForm onSearch={setLogin} />
      {login && (
        <>
          <GitHubUser login={login} />
          <UserRepositories
            login={login}
            selectedRepo={repo}
            onSelect={setRepo}
          />
        </>
      )}
      {login && repo && <RepositoryReadme login={login} repo={repo} />}
    </>
  );
};

export default App;
