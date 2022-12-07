import { createContext, useState } from "react";
import * as authService from "../services/auth-service";

export const UserContext = createContext();

const UserContextProvier = (props) => {
  const [user, setUser] = useState(null);


  const login = (username, password) => {
    return authService
      .login(username, password)
      .then((res) => {
        if (res) {
          setUser(res);
        }
      })
      .catch((err) => console.log(err.message));
  };

  const signup = (user) => {
    return authService
      .signup(user)
      .then((res) => {
        if (res) {
          setUser(res);
        }
      })
      .catch((err) => console.log(err.message));
  };

  const logout = () => {
    return authService.logout().then(() => setUser(null));
  };

  return (
    <UserContext.Provider value={{ login, logout, signup, user }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvier;
