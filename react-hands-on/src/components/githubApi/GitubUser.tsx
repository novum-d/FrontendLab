import React, { useEffect, useState } from "react";

const App = () => {
  const [useName, setUserName] = useState(""); // json data
  const [data, setData] = useState(""); // user name
  useEffect(() => {
    if (!useName) return;
    fetch(`https://api.github.com/users/${useName}`)
      .then((response) => response.json())
      .then(setData)
      .catch(console.error);
  }, [useName]);
  return (
    <>
      <input id="search_field" type="text" />
      <button onClick={(e) => setUserName()}>検索</button>
      <GithubUser data={data} />
    </>
  );
};

const GithubUser = ({ data }: { data: string }) => {
  if (data) return <pre>{JSON.stringify(data, null, 2)}</pre>;
  return null;
};

const reaquestGithubUser = async () => {};

export default App;
