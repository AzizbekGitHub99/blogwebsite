import request from "../../server/request";
import { USERS } from "../types";

const getUsers = () => async (dispatch, getState)=>{
    dispatch({type: USERS, payload: {loading: true}})
    const {page} = getState().users
    const params = {page , limit: 10}
    const {data: {data, pagination : {total}}} = await request("user", {params})
    dispatch({type: USERS, payload: {loading: false, users: data, total}})
}

const changeState = (payload) => ({type: USERS, payload})
export {changeState}

export default getUsers;