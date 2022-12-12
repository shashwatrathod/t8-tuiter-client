import React from "react";
import TuitStats from "./tuit-stats";
import TuitImage from "./tuit-image";
import TuitVideo from "./tuit-video";
import {useNavigate} from "react-router-dom";

const Tuit = ({ tuit, deleteTuit, likeTuit, dislikeTuit}) => {
  const navigate = useNavigate();
  const handleClick = (tuit_id) => {
    navigate(`/tuits/${tuit_id}/versions`)};
  return (
    <li className="p-2 ttr-tuit list-group-item d-flex rounded-0">
      <div className="pe-2">
        {/* {
          tuit.postedBy &&
          <img src={`../images/${tuit.postedBy.username}.jpg`}
               className="ttr-tuit-avatar-logo rounded-circle"/>
        } */}
      </div>
      <div className="w-100">
        <div className="row">
          <div className="col d-flex justify-content-between align-items-center">
            <h2 className="fs-5 align-middle">
              {tuit.postedBy && tuit.postedBy.username}@
              {tuit.postedBy && tuit.postedBy.username}
            </h2>
            <div>
              {tuit?.v > 1 && (
                <i
                  onClick={() => handleClick(tuit._id)}
                  className="fa fa-pencil-square me-3 fa-2x ttr-tuit-stats-cursor"
                ></i>
              )}
              <i
                onClick={() => deleteTuit(tuit._id)}
                className="fas fa-remove fa-2x ttr-tuit-stats-cursor"
              ></i>
            </div>
          </div>
          <div>
            {tuit.tuit}
            {tuit?.youtube && <TuitVideo tuit={tuit} />}
            {tuit?.image && <TuitImage tuit={tuit} />}
          </div>
          <TuitStats
            tuit={tuit}
            likeTuit={likeTuit}
            dislikeTuit={dislikeTuit}
          />
        </div>
      </div>
    </li>
  );
};
export default Tuit;