import {combineReducers} from "redux";
import post from "./modules/_post";
import category from "./modules/_category";

const reducer = combineReducers({
    post,
    category
})

export default reducer
