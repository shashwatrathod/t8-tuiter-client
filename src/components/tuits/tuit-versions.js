import Tuits from "./tuit";
import * as service from "../../services/tuits-service";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

const TuitVersions = ({tuitVersion}) => {
  const [allVersions, getAllVersions] = useState([]);
  const {tid} = useParams();
//   const findTuitVersions = async () =>{
//     const versions = await service.getVersions(tid)
//     return versions
//   }
//   findTuitVersions().then((res)=>console.log((res)));
  
//   useEffect(findTuitVersions, [tid]);
// const [ video, setVideo ] = useState([]);
// useEffect(async () => {
//     await console.log(service.getVersions(tid)
//       .then((matched) => setVideo(matched)));
//   }, []);
const findTuitVersions = async () => {
        const versions =   await service.getVersions(tid)
        getAllVersions(versions)
        console.log("inside the function",versions)
}
  
useEffect(() => {
        findTuitVersions();
    }, []);

console.log("outside the function",allVersions)
  
//   return(
//     <div>
//       <div>
//         <h1>Tuit Versions</h1> 
//       </div>
//         {allVersions && allVersions.map((versions) => {
//                 return (
//                     <div>
//                         {versions.v}
//                     </div>
//                 )
//             })}
//              <div>
//         {/* <ul className="ttr-tuits list-group">
//         {tuit.map &&
//           tuit.map((tuit) => {
//             return (
//               <Tuit
//                 key={tuit.tid}
//                 findTuitVersions={findTuitVersions}
//               />
//             );
//           })}
//       </ul> */}
//       {/* <Tuit tuits = {allVersions}/> */}
//     </div>
//     </div>
//   );
    return(
        <div>
            <p>The video and it's details will go here </p>
            {/* {allVersions && allVersions.map((allVersions, i) => (
            <div key={i}>
                <div>{allVersions.i}</div>
            </div>
            ))} */}
            <div>
            {allVersions.tuit}
            </div>
            <div>
            {allVersions.v}
            </div>
            <div>
            {allVersions.editedOn}
            </div>
        
        </div>
    )
};
export default TuitVersions;

