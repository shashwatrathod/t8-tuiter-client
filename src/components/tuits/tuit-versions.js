import Tuits from "../tuits";
import * as service from "../../services/tuits-service";
import {useEffect, useState} from "react";

const TuitVersions = () => {
  const [allVersions, getAllVersions] = useState([]);
  const findTuitVersions = (tid) =>{
    service.checkVersions(tid)
      .then((tuits) => getAllVersions(tuits));
  }
  useEffect(findTuitVersions, []);
  
  return(
    <div>
      <div>
        <h1>Tuit Versions</h1> 
      </div>
      <Tuits tuits={allVersions}
             refreshTuits={findTuitVersions}/>
    </div>
  );
};
export default TuitVersions;

