import { POSTS } from "../types"

const initialState = {
    loading: false, 
    posts: [],
    total: 0,
    page: 0,
    btnLoading: false,
    photo: null,
    refetch: false,
    isOpen: false,
    selected: null,
}

const postsReducer =  (state = initialState, { type, payload }) => {
  switch (type) {
    case POSTS:
        return {
           ...state, ...payload
        }
  default:
    return state
  }
}


export default postsReducer; 