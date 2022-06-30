import { useEffect, useReducer, useState } from "react";

const App = () => {
  return <Checkbox />;
};

const Checkbox = () => {
  // const [checked, setChecked] = useState(false);
  const [checked, setChecked] = useReducer((checked) => !checked, false);
  useEffect(() => {
    console.log(checked ? "Yes, checked" : "No, not checked");
  }, [checked]);
  return (
    <>
      <input type="checkbox" value={checked.toString()} onChange={setChecked} />
      {checked ? "checked" : "not checked"}
    </>
  );
};

type Admin = {
  admin: boolean;
};

type Users = {
  id: string;
  firstName: string;
  lastName: string;
  city: string;
  state: string;
  email: string;
} & Admin;

const User = () => {
  const firstUser = {
    id: "0391-3233-3201",
    firstName: "Bill",
    lastName: "Wilson",
    city: "Missoula",
    state: "Montana",
    email: "bwilson@mtnwilsons.com",
    admin: false,
  };
  const [user, changeAdmin] = useReducer(
    (user: Users, newDetails: Admin) => ({ ...user, ...newDetails }),
    firstUser
  );
  return (
    <div>
      <h1>
        {user.firstName} {user.lastName} - {user.admin ? "Admin" : "User"}
      </h1>
      <p>Email: {user.email}</p>
      <p>
        Location: {user.city}, {user.state}
      </p>
      <button onClick={() => changeAdmin({ admin: true })}>Make Admin</button>
    </div>
  );
};

export default App;
