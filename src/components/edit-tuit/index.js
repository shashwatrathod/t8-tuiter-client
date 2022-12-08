import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../contexts/user-context";
import * as tuitsService from "../../services/tuits-service";
import CreateTuit from "../tuits/create-tuit";

const EditTuit = () => {
  const { user } = useContext(UserContext);
  const { tid } = useParams();
  const navigate = useNavigate();

  const [originalTuit, setOriginalTuit] = useState("");

  useEffect(() => {
    if (!user) navigate("/login"); // if the user is not logged in, we cannot let them edit this tuit

    tuitsService.findTuitById(tid).then((tuit) => {
      if (!tuit) navigate(-1);

      setOriginalTuit(tuit.tuit);
    });
  }, [user, navigate, tid]);

  const editTuit = (tuit) => {
    tuitsService
      .editTuit(tid, tuit)
      .then(() => navigate(-1))
      .catch((err) => {
        console.log(err);
        navigate(-1);
      });
  };

  return (
    <>
      <div className="ttr-home">
        <div className="border border-bottom-0">
          <h4 className="fw-bold p-2">Edit Tuit</h4>
          {user && (
            <CreateTuit initialContent={originalTuit} tuitOnClick={editTuit} />
          )}
        </div>
      </div>
    </>
  );
};

export default EditTuit;
