import { BASE } from "../consts"

const imgURL = (photo) =>{
    return `${BASE}upload/${photo._id}.${photo.name.split('.')[1]}` 
}

export default imgURL;