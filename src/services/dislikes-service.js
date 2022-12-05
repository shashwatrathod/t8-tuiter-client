import axios from "axios";

const BASE_URL =
  process.env.REACT_APP_TUIT_SERVICE_URL ||
  // "https://shash-tuiter.herokuapp.com/api"||
  "http://localhost:4000";

const USERS_API = `${BASE_URL}/users`;

const api = axios.create({
  withCredentials: true,
});

export const userTogglesTuitDislikes = (uid, tid) =>
  api
    .post(`${USERS_API}/${uid}/dislikes/${tid}`)
    .then((response) => response.data);

export const hasUserDislikedTheTuit = (uid, tid) => {
  return api.get(`${USERS_API}/${uid}/dislikes/${tid}`).then((response) => {
    return response.data?._id !== undefined;
  });
};
