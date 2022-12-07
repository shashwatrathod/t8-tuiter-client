import {Link, useNavigate} from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import * as service from "../../services/users-service";
import * as authService from "../../services/auth-service";
import React from "react";
import { UserList } from "./user-list";
import { UserContext } from "../../contexts/user-context";

export const Login = () => {
  const [existingUsers, setExistingUsers] = useState([]);
  // {username: 'user1', email: 'user1', password: 'user1', _id: '123'}
  // ]);
  const [newUser, setNewUser] = useState({});
  const [loginUser, setLoginUser] = useState({});
  const navigate = useNavigate();
  const { login, signup, user } = useContext(UserContext);

  // useEffect(() => {
  //   if (user) {
  //     navigate("/profile");
  //   }
  // }, [user, navigate]);

  const uuu = [
    {
      username: "ellen_ripley",
      email: "ellen_ripley",
      password: "ellen_ripley",
      _id: "123",
    },
    {
      username: "sarah",
      email: "ellen_ripley",
      password: "ellen_ripley",
      _id: "234",
    },
  ];

  const deleteUser = (uid) => service.deleteUser(uid).then(findAllUsers);

  const findAllUsers = () =>
    service.findAllUsers().then((users) => {
      setExistingUsers(users);
    });

  const registerUser = () =>
    signup(newUser)
      .then(() => navigate("/profile"))
      .catch((e) => alert(e));

  const signinUser = () => {
    if (!loginUser?.username || !loginUser.password) return;

    login(loginUser?.username, loginUser?.password).then(() => {
      navigate("/profile");
    });
  };

  useEffect(findAllUsers, []);

  return (
    <div>
      <h1>Register</h1>
      <input
        className="mb-2 form-control"
        onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
        placeholder="username"
      />
      <input
        className="mb-2 form-control"
        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        placeholder="password"
        type="password"
      />
      <input
        className="mb-2 form-control"
        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        placeholder="email"
        type="email"
      />
      <button onClick={registerUser} className="btn btn-primary mb-5">
        Register
      </button>

      <h1>Login</h1>
      <input
        className="mb-2 form-control"
        onChange={(e) =>
          setLoginUser({ ...loginUser, username: e.target.value })
        }
        placeholder="username"
      />
      <input
        className="mb-2 form-control"
        onChange={(e) =>
          setLoginUser({ ...loginUser, password: e.target.value })
        }
        placeholder="password"
        type="password"
      />
      <button onClick={signinUser} className="btn btn-primary mb-5">
        Login
      </button>

      <h1>Login As</h1>

      <UserList users={existingUsers} deleteUser={deleteUser} />
    </div>
  );
};