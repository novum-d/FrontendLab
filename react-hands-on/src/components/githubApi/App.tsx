import { useState } from "react";
import GitHubUser from "./githubUser/GithubUser";
import RepositoryReadme from "./githubUser/RepositoryReadme";
import SearchForm from "./githubUser/SearchForm";
import UserRepositories from "./githubUser/UserRepositories";

const App = () => {
  const [login, setLogin] = useState("");
  const [repo, setRepo] = useState("learning-react");
  return (
    <>
      <SearchForm setLogin={setLogin} />
      <GitHubUser login={login} />
      <UserRepositories login={login} onSelect={setRepo} />
      <RepositoryReadme login={login} repo={repo} />
    </>
  );
};

export default App;
