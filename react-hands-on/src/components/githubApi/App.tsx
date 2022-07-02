import { useState } from "react";
import GitHubUser from "./GithubUser";
import SearchForm from "./SearchForm";

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
