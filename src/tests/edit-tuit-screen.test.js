import { render, screen } from "@testing-library/react";
import { HashRouter, MemoryRouter } from "react-router-dom";
import * as router from "react-router";
import * as tuitService from "../services/tuits-service";
import EditTuit from "../components/edit-tuit";
import Tuiter from "../components/tuiter";
import { UserContext } from "../contexts/user-context";

const navigate = jest.fn();

beforeEach(() => {
  jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
});

test("edit-tuit navigates to login if there is no user", () => {
  const routeHistory = ["/profile/tuits/027r3rupjed934r/edit"];

  render(
    <>
      <UserContext.Provider value={{ user: null }}>
        <MemoryRouter initialEntries={routeHistory}>
          <Tuiter />
        </MemoryRouter>
      </UserContext.Provider>
    </>
  );

  expect(navigate).toHaveBeenCalledWith("/login");
});

test("edit-tuit navigates back if there is no tid param", () => {
  render(
    <>
      <UserContext.Provider value={{ user: { username: "randomUser" } }}>
        <HashRouter>
          <EditTuit />
        </HashRouter>
      </UserContext.Provider>
    </>
  );

  expect(navigate).toHaveBeenCalledWith(-1);
});

test("edit-tuit renders correctly if there is a user and a tid param", () => {
  const routeHistory = ["/home", "/profile/tuits/027r3rupjed934r/edit"];

  jest
    .spyOn(tuitService, "findTuitById")
    .mockImplementation(
      (tid) => new Promise((resolve, reject) => resolve({ tuit: "some tuit" }))
    );

  render(
    <>
      <UserContext.Provider value={{ user: { username: "someusername" } }}>
        <MemoryRouter initialEntries={routeHistory}>
          <Tuiter />
        </MemoryRouter>
      </UserContext.Provider>
    </>
  );

  //   expect(navigate).not.toHaveBeenCalled();
  expect(screen.getByText(/Edit Tuit/i)).toBeInTheDocument();
});
