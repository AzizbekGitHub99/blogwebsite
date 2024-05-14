import { BASEURL } from "../consts"

const imgURL = (photo) =>{
    return `${BASEURL}upload/${photo._id}.${photo.name.split('.')[1]}` 
}

export default imgURL;