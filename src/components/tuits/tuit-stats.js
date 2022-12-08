import React, { useContext, useEffect, useState } from "react";
import * as likesService from "../../services/likes-service";
import * as dislikesService from "../../services/dislikes-service";
import { UserContext } from "../../contexts/user-context";
import clsx from "clsx";

const TuitStats = ({ likeTuit, tuit, dislikeTuit }) => {
  const [likedTuit, setLikedTuit] = useState(false);
  const [dislikedTuit, setDislikedTuit] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchLikesDislikes = () => {
      likesService.hasUserLikedTheTuit("me", tuit._id).then((liked) => {
        setLikedTuit(liked);
      });
      dislikesService
        .hasUserDislikedTheTuit("me", tuit._id)
        .then((disliked) => {
          setDislikedTuit(disliked);
        });
    };

    fetchLikesDislikes();
  }, [tuit]);

  return (
    <div className="row mt-2">
      <div className="col">
        <span className="ttr-tuit-stats-cursor">
          <i className="far fa-message me-1"></i>
          {tuit.stats && tuit.stats.replies}
        </span>
      </div>
      <div className="col">
        <span span className="ttr-tuit-stats-cursor">
          <i className="far fa-retweet me-1"></i>
        </span>
        {tuit.stats && tuit.stats.retuits}
      </div>
      <div className="col" onClick={() => likeTuit(tuit)}>
        <span className="ttr-tuit-stats-cursor">
          <i
            className={clsx("fa-solid", "fa-thumbs-up", "me-1", {
              "ttr-like-unlike-color-red": likedTuit,
            })}
          ></i>
        </span>
        {tuit.stats?.likes}
      </div>
      <div className="col" onClick={() => dislikeTuit(tuit)}>
        <span className="ttr-tuit-stats-cursor">
          <i
            className={clsx("fa-solid", "fa-thumbs-down", "me-1", {
              "ttr-like-unlike-color-red": dislikedTuit,
            })}
          ></i>
          {tuit.stats?.dislikes}
        </span>
      </div>
      {user &&
        // Account for conditions where postedBy is populated and where postedBy is not populated
        (user?._id == tuit?.postedBy?._id || user?._id == tuit?.postedBy) && (
          <>
            <div className="col ttr-tuit-stats-cursor">
              <i className="fa fa-pencil me-1" aria-hidden="true"></i>
              Edit
            </div>
          </>
        )}
    </div>
  );
};

export default TuitStats;
