import React, { useEffect, useState } from "react";
import TuitStats from "./tuit-stats";
import TuitImage from "./tuit-image";
import TuitVideo from "./tuit-video";
import TuitVersions from "./tuit-versions";
import {HashRouter, Link, Route, Routes, useNavigate, useLocation, useParams} from "react-router-dom";

const Tuit = ({ tuit, deleteTuit, likeTuit, dislikeTuit, checkVersions }) => {
  const navigate = useNavigate();
  const tuit_id = tuit._id
  const handleClick = () => {
    console.log(tuit_id)
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
          <div className="col">
            <i
              onClick={() => deleteTuit(tuit._id)}
              className="fas fa-remove fa-2x fa-pull-right"
            ></i>
          </div>
          
          
          <h2 className="fs-5">
            {/* {tuit.postedBy && tuit.postedBy.username}@
            {tuit.postedBy && tuit.postedBy.username} -{tuit.postedOn} */}
          </h2>
          <div>
            {tuit.tuit}
            {tuit?.youtube && <TuitVideo tuit={tuit} />}
            {tuit?.image && <TuitImage tuit={tuit} />}
            <i 
              onClick={() => handleClick()}
              className="far fa-pencil me-1 "></i>
          </div>
          {/* <div>
            <i className="far fa-pencil me-1"></i>
              {tuit.stats.edits}
          </div> */}
          <TuitStats tuit={tuit} likeTuit={likeTuit} dislikeTuit={dislikeTuit} />

        </div>

      </div>
    </li>
  );
};
export default Tuit;