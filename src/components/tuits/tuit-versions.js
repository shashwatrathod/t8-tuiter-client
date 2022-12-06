import Tuits from "../tuits";
import * as service from "../../services/tuits-service";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

const TuitVersions = ({tuit}) => {
  const [allVersions, getAllVersions] = useState([]);
  const {tid} = useParams();
  const findTuitVersions = async () =>{
    const versions = await service.getVersions(tid)//.then((tuits) => getAllVersions(tuits));
    return versions
  }
  findTuitVersions().then((res)=>console.log(res));
  
  useEffect(findTuitVersions, []);

//   useEffect(() => {
//     async function findTuitVersions() {
//       // You can await here
//       const response = await service.getVersions(tid)
//       // ...
//     }
//     findTuitVersions();
//   }, []); // Or []
  
  return(
    <div>
      <div>
        <h1>Tuit Versions</h1> 
      </div>
      {/* <Tuits 
            tuits={allVersions}
            refreshTuits={findTuitVersions}/> */}
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

