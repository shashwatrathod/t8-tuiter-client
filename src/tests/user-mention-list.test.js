import Tuits from "../components/tuits";
import { screen, render } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import * as usermention from "../services/usermentions-service";
import axios from "axios";
import { UserContext } from "../contexts/user-context";
import * as router from "react-router";

import UserMentions from "../components/profile/user-mentions";
const navigate = jest.fn();

beforeEach(() => {
  jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
});
const MOCKED_USERS = [
  {
    username: "alice",
    password: "alice",
    email: "alice@wonderland.com",
    _id: "123",
  },
  { username: "bob", password: "bob", email: "bob@bob.com", _id: "246" },
  {
    username: "charlie",
    password: "charlie",
    email: "charlie@charlie.com",
    _id: "489",
  },
];

const MOCKED_TUITS = [
  {
    _id: "11111",
    postedBy: MOCKED_USERS[0],
    tuit: "alice's tuit @alice",
  },
  {
    _id: "11112",
    postedBy: MOCKED_USERS[1],
    tuit: "bob's tuit @alice",
  },
  {
    _id: "11113",
    postedBy: MOCKED_USERS[2],
    tuit: "charlie's tuit @alice",
  },
];

test("tuit list renders static tuit array", () => {
  render(
  <UserContext.Provider value={{ user: MOCKED_USERS[0] }}>
    <HashRouter>
      <Tuits tuits={MOCKED_TUITS} />
    </HashRouter>
  </UserContext.Provider>
  );
  const linkElement = screen.getByText(/alice's tuit @alice/i);
  expect(linkElement).toBeInTheDocument();
});


