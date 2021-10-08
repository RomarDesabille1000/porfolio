import {combineReducers} from "redux";
import post from "./modules/_post";
import category from "./modules/_category";
import auth from "./modules/_auth";

const reducer = combineReducers({
    post,
    category,
    auth
})

export default reducer
