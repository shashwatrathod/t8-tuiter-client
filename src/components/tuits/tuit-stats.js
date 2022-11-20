import React, { useEffect, useState } from "react";
import * as likesService from "../../services/likes-service";
import * as dislikesService from "../../services/dislikes-service";
import clsx from "clsx";

const TuitStats = ({ likeTuit, tuit, dislikeTuit }) => {
  const [hasLikedTuit, sethasLikedTuit] = useState(false);
  const [hasDislikedTuit, sethasDislikedTuit] = useState(false);

  useEffect(() => {
    const fetchLikesDislikes = () => {
      likesService.hasUserLikedTheTuit("me", tuit._id).then((liked) => {
        sethasLikedTuit(liked);
      });
      dislikesService
        .hasUserDislikedTheTuit("me", tuit._id)
        .then((disliked) => {
          sethasDislikedTuit(disliked);
        });
    };

    fetchLikesDislikes();
  }, [tuit]);

  return (
    <div className="row mt-2">
      <div className="col">
        <i className="far fa-message me-1"></i>
        {tuit.stats && tuit.stats.replies}
      </div>
      <div className="col">
        <i className="far fa-retweet me-1"></i>
        {tuit.stats && tuit.stats.retuits}
      </div>
      <div className="col" onClick={() => likeTuit(tuit)}>
        <i
          className={clsx("fa-solid", "fa-thumbs-up", "me-1", {
            "ttr-like-unlike-color-red": hasLikedTuit,
          })}
        ></i>
        {tuit.stats && tuit.stats.likes}
      </div>
      <div className="col" onClick={() => dislikeTuit(tuit)}>
        <i
          className={clsx("fa-solid", "fa-thumbs-down", "me-1", {
            "ttr-like-unlike-color-red": hasDislikedTuit,
          })}
        ></i>
        {tuit.stats && tuit.stats.dislikes}
      </div>
    </div>
  );
};

export default TuitStats;
