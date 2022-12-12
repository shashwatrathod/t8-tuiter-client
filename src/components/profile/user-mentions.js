import { useContext, useEffect, useState } from "react";
import * as service from "../../services/tuits-service";
import Tuits from "../tuits";
import * as mention from "../../services/usermentions-service";
import { UserContext } from "../../contexts/user-context";
import { useNavigate } from "react-router";


const UserMentions = () => {
  const [tuits, setTuits] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user) navigate(-1);
  }, [user, navigate]);

  const findMyTuits = () =>
    mention.findUserMentioned(user._id).then((tuits) => setTuits(tuits));

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
