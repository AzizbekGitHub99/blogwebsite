import request from "../../server/request"
import { CATEGORIES } from "../types"

const getCategories = () => async (dispatch, getState)=>{
    dispatch({type: CATEGORIES, payload: {loading: true}})
    const {page} = getState().categories
    const params = {page, limit: 10}
    const {data : {data, pagination:{total}}} = await request("category", {params})
    dispatch({type: CATEGORIES, payload: {loading: false, categories: data, total}})
}

const changeState = (payload) => ({type: CATEGORIES, payload})

export { getCategories, changeState} 