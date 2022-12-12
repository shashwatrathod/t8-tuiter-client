import axios from "axios";
const BASE_URL =
 process.env.REACT_APP_TUIT_SERVICE_URL || "http://localhost:4000/api";




export const findUserMentioned = (uid) =>
  axios.get(`${BASE_URL}/users/${uid}/mentions`).then((response) => response.data).catch(err => {
    if (err.response.status === 400) {
      alert("No such user");
    } else {
      throw err;
    }
  });


const service = {
  findUserMentioned,
};

export default service;