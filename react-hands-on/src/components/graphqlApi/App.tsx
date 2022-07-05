import { useEffect, useState } from "react";
import { UserProps } from "../githubApi/exports";
import UserDetails from "../githubApi/githubUser/fetchComponents/UserDetails";
import SearchForm from "../githubApi/githubUser/SearchForm";
import { List } from "../renderProps/RenderProps";
import { client, query } from "./Query";

const App = () => {
  const [login, setLogin] = useState("moontahoe");
  const [userData, setUserData] = useState<UserProps>();
  useEffect(() => {
    client
      .request(query, { login })
      .then(({ user }) => user)
      .then(setUserData)
      .catch(console.error);
  }, [client, query, login]);
  if (!userData) return <p>loading...</p>;
  return (
    <>
      <SearchForm onSearch={setLogin} />
      <UserDetails {...{ data: userData }} />
      <p>{userData.repositories.totalCount} - repos</p>
      <List
        data={userData.repositories.nodes}
        renderItem={(repo) => <span>{repo.name}</span>}
      />
    </>
  );
};

export default App;
