import { combineReducers } from "redux";
import postsReducer from "./posts";
import userReducer from "./users";
import categoriesReducer from "./categories";

const root = combineReducers({
    posts: postsReducer,
    users: userReducer,
    categories: categoriesReducer
})

export default root;