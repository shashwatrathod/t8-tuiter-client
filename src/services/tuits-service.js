import axios from "axios";
const BASE_URL =
  process.env.REACT_APP_TUIT_SERVICE_URL ||
  "https://shash-tuiter.herokuapp.com/api";
const TUITS_API = `${BASE_URL}/tuits`;
const USERS_API = `${BASE_URL}/users`;

const api = axios.create({
  withCredentials: true,
});

export const findAllTuits = () =>
  api.get(TUITS_API).then((response) => response.data);

export const findTuitById = (tid) =>
  api.get(`${TUITS_API}/${tid}`).then((response) => response.data);

export const findTuitsByUser = (uid) =>
  api.get(`${USERS_API}/${uid}/tuits`).then((response) => response.data);

export const createTuit = (uid, tuit) =>
  api.post(`${USERS_API}/${uid}/tuits`, tuit).then((response) => response.data);

export const updateTuit = (tid, tuit) =>
  api.post(`${TUITS_API}/${tid}`, tuit).then((response) => response.data);

export const deleteTuit = (tid) =>
  api.delete(`${TUITS_API}/${tid}`).then((response) => response.data);

export const editTuit = (tid, tuit) =>
  api.put(`${TUITS_API}/${tid}/edit`, tuit);