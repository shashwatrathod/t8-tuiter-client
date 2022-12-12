import axios from "axios";
//const BASE_URL =
//  process.env.REACT_APP_TUIT_SERVICE_URL ||
//  "https://shash-tuiter.herokuapp.com/api";
// const BASE_URL = "https://software-engineering-node-fa22.herokuapp.com/api";
 const BASE_URL = "http://localhost:4000/api" || "http://localhost:4003/api";




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