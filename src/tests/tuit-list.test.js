import Tuits from "../components/tuits";
import { screen, render } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import { findAllTuits } from "../services/tuits-service";
import axios from "axios";

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
    tuit: "alice's tuit",
  },
  {
    _id: "11112",
    postedBy: MOCKED_USERS[1],
    tuit: "bob's tuit",
  },
  {
    _id: "11113",
    postedBy: MOCKED_USERS[2],
    tuit: "charlie's tuit",
  },
];

test("tuit list renders static tuit array", () => {
  render(
    <HashRouter>
      <Tuits tuits={MOCKED_TUITS} />
    </HashRouter>
  );
  const linkElement = screen.getByText(/alice's tuit/i);
  expect(linkElement).toBeInTheDocument();
});

test("tuit list renders async", async () => {
  const tuits = await findAllTuits();
  render(
    <HashRouter>
      <Tuits tuits={tuits} />
    </HashRouter>
  );
  const linkElement = screen.getByText(/Hello, world/i);
  expect(linkElement).toBeInTheDocument();
});

test("tuit list renders mocked", async () => {
  const mock = jest.spyOn(axios, "get");
  mock.mockImplementation(() =>
    Promise.resolve({ data: { tuits: MOCKED_TUITS } })
  );
  const response = await findAllTuits();
  const tuits = response.tuits;

  render(
    <HashRouter>
      <Tuits tuits={tuits} />
    </HashRouter>
  );
  const linkElement = screen.getByText(/alice's tuit/i);
  expect(linkElement).toBeInTheDocument();
  mock.mockRestore();
});
