import axios from "axios";
//const BASE_URL = process.env.REACT_APP_TUIT_SERVICE_URL;
const BASE_URL = "http://localhost:4003/api";

const AUTH_API = `${BASE_URL}/auth`;

const api = axios.create({
  withCredentials: true,
});

export const signup = (user) =>
  api.post(`${AUTH_API}/signup`, user).then((response) => response.data);

export const profile = () =>
  api.get(`${AUTH_API}`).then((response) => response.data);

export const login = (username, password) =>
  api
    .post(`${AUTH_API}/login`, { username, password })
    .then((response) => response.data);

export const logout = () =>
  api.delete(`${AUTH_API}`).then((response) => response.data);