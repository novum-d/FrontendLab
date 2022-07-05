import { GraphQLClient } from "graphql-request";
import { useEffect, useState } from "react";
import { FixedSizeList } from "react-window";
import { LoginProps } from "../githubApi/exports";
import UserDetails from "../githubApi/githubUser/fetchComponents/UserDetails";
import SearchForm from "../githubApi/githubUser/SearchForm";
import { List } from "../renderProps/RenderProps";
const query = `
query findRepos($login:String!) {
    user(login:$login) {
        login
        name
        location
        avatar_url: avatarUrl
        repositories(first:100) {
            totalCount
            nodes {
                name
            }
        }
    }
}
`;
const client = new GraphQLClient("https://api.github.com/graphql", {
  headers: {
    Authorization: `Bearer <PERSONAL_ACCESS_TOKEN>`,
  },
});
client
  .request(query, { login: "moontahoe" })
  .then((results) => JSON.stringify(results, null, 2))
  .then(console.log)
  .catch(console.error);

const App = () => {
  const [login, setLogin] = useState("moontahoe");
  const [userData, setUserData] = useState();
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
