import { useEffect, useState } from "react";
import * as service from "../../services/tuits-service";
import Tuits from "../tuits";
import * as mention from "../../services/usermentions-service";
const UserMentions = () => {

  const [tuits, setTuits] = useState([]);

    const findMyTuits = () =>
      mention.findUserMentioned().then((tuits) => setTuits(tuits));

    useEffect(findMyTuits, []);

    const deleteTuit = (tid) => service.deleteTuit(tid).then(findMyTuits);

    return (
    <div>
       <h1>You were mentioned in these tweets </h1>
      <Tuits tuits={tuits} deleteTuit={deleteTuit} refreshTuits={findMyTuits} />
    </div>
    );

};

export default UserMentions;