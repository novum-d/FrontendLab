import { useState } from "react";
import GitHubUser from "./githubUser/GithubUser";
import SearchForm from "./searchForm/SearchForm";

const App = () => {
  const [login, setLogin] = useState("");
  return (
    <>
      <SearchForm setLogin={setLogin} />
      <GitHubUser login={login} />
    </>
  );
};

export default App;
