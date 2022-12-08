import React, { useContext } from "react";
import Tuits from "../tuits";
import * as service from "../../services/tuits-service";
import { useEffect, useState } from "react";
import { UserContext } from "../../contexts/user-context";
import CreateTuit from "../tuits/create-tuit";

const Home = () => {
  const { user } = useContext(UserContext);
  const [tuits, setTuits] = useState([]);

  const findTuits = () => {
    return service.findAllTuits().then((tuits) => setTuits(tuits));
  };
  useEffect(() => {
    findTuits();
  }, []);

  const createTuit = (tuit) =>
    user && service.createTuit(user._id, tuit).then(findTuits);

  const deleteTuit = (tid) => user && service.deleteTuit(tid).then(findTuits);

  return (
    <div className="ttr-home">
      <div className="border border-bottom-0">
        <h4 className="fw-bold p-2">Home Screen</h4>
        {user && <CreateTuit tuitOnClick={createTuit} />}
      </div>
      <Tuits tuits={tuits} deleteTuit={deleteTuit} refreshTuits={findTuits} />
    </div>
  );
};
export default Home;
