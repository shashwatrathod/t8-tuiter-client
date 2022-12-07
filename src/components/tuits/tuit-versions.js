import * as service from "../../services/tuits-service";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

const TuitVersions = () => {
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
  
    return(
        <div>
            <div>
                <h1>Tuit Versions</h1> 
            </div>
            <div>
                {Object.keys(allVersions).map((key)=> {
                    return <div key={key}>
                        <div>
                        tuit: {allVersions[key].tuit}
                        </div>
                        <div>
                        version: {allVersions[key].v}
                        </div>
                        <div>
                        edited on: {allVersions[key].editedOn}
                        </div>                     
                        </div>
                })}
            </div>
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

