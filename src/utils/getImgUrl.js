import { BASE } from "../consts"

const imgURL = (photo) =>{
    const res = `${BASE}upload/${photo?._id}.${photo?.name.split('.')[1]}` 
    return res 
}

export default imgURL;