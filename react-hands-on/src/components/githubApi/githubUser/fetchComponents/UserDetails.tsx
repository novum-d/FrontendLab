import { LoginProps, UserRepositoriesProps } from "../../exports";

const UserDetails = ({ data }: { data: LoginProps }) => {
  return (
    <div className="githubUser">
      <img src={data.avatar_url} alt={data.login} style={{ width: 200 }} />
      <div>
        <h1>{data.login}</h1>
        {data.name && <p>Name: {data.name}</p>}
        {data.location && <p>Location: {data.location}</p>}
      </div>
    </div>
  );
};

export default UserDetails;
