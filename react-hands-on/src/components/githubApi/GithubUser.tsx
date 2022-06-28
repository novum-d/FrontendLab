import { useEffect, useState } from "react";

type LoginProps = {
  name: string;
  login: string;
  avatar_url: string;
  location: string;
};

const loadJSON = (key: string) =>
  key && JSON.parse(localStorage.getItem(key) ?? "{}");
const saveJSON = (key: string, data: LoginProps) =>
  localStorage.setItem(key, JSON.stringify(data));

/** サンプル(動きません) */
const GithubUser = ({ login }: { login: string }) => {
  const [data, setData] = useState<LoginProps>(); // user name
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   console.log(data);
  //   if (!data) return;
  //   if (data.login === login) return;
  //   const { name, avatar_url, location }: LoginProps = data;
  //   saveJSON(`user:${login}`, {
  //     name,
  //     login,
  //     avatar_url,
  //     location,
  //   });
  // }, [data]);
  useEffect(() => {
    if (!login) return;
    // if (data && data.login === login) return;
    setLoading(true);
    fetch(`https://api.github.com/users/${login}`)
      .then((response) => response.json())
      .then(setData)
      .then(() => setLoading(false))
      .catch(setError);
  }, [login]);

  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;
  if (loading) return <h1>loading...</h1>;
  if (!data) return null;

  return (
    <div className="githubUser">
      <img src={data.avatar_url} alt={data.login} style={{ width: 200 }} />
      <div>
        <h1>{data.login}</h1>
        {data.name && <p>{data.name}</p>}
        {data.location && <p>{data.location}</p>}
      </div>
    </div>
  );
};

export default GithubUser;
