import Tuit from "../tuits";
import * as service from "../../services/tuits-service";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

const TuitVersions = () => {
  const [allVersions, getAllVersions] = useState([]);
  const {tid} = useParams();
  const findTuitVersions = () =>{
    console.log(tid,"in findTuitVersions on tuit-versions.js")
    console.log(service.checkVersions(tid)
      .then((tuits) => getAllVersions(tuits))
      .catch((e) => alert(e)));
  }
  useEffect(findTuitVersions, []);
  
  return(
    <div>
      <div>
        <h1>Tuit Versions</h1> 
      </div>
      <Tuit 
            allVersions={allVersions}
            refreshTuits={findTuitVersions}/>
             <div>
        {/* <ul className="ttr-tuits list-group">
        {tuit.map &&
          tuit.map((tuit) => {
            return (
              <Tuit
                key={tuit.tid}
                findTuitVersions={findTuitVersions}
              />
            );
          })}
      </ul> */}
      {/* <Tuit tuits = {allVersions}/> */}
    </div>
    </div>
  );
};
export default TuitVersions;

