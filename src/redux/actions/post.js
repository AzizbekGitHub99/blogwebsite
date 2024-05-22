import request from "../../server/request";
import { POSTS } from "../types";

const getPosts = () => async (dispatch, getState) => {
  dispatch({ type: POSTS, payload: { loading: true } });
  const params = { page: getState().posts.page, limit: 10 };
  const {
    data: {
      data,
      pagination: { total },
    },
  } = await request("post", { params });
  dispatch({ type: POSTS, payload: { loading: false, posts: data, total } });
};
 
const changeState = (payload) => ({type: POSTS, payload})
export  {getPosts, changeState};
