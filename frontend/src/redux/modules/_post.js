import axiosInstance from "../../axios";
//Actions
const GET_POSTS = "GET_POSTS"
const CREATE_POST = "CREATE_POST"
const DELETE_POST = "DELETE_POST"
const EDIT_POST = "EDIT_POST"
const LOADING = "LOADING"
const LOADED = "LOADED"
const ERROR = "ERROR"

/*
 *    SECOND Dispatch/Action Creators
 *    REDUCER
 *    param 1 state
 *    paramter 2 actions&payload from dispatch
 */
const initialState = {
    loading:false,
    error: false,
    success: false,
    data: {
        results: []
    },
}

export default function post(state = initialState, {type, payload}){
    switch (type){
        case LOADING:
            return {...state, loading: true, success: false, error: false}
        case LOADED:
            return {...state, loading: false}
        case CREATE_POST:
            return {...state, response: payload, error: false, success: true}
        case GET_POSTS:
            return {...state, data: payload, error: false}
        case ERROR:
            return {...state, error: payload}
        default:
            return {...state}
    }
}
/*
 *    First Dispatch/Action Creators
 *    Action Creators
 *    Padulong sa Reducer
 */
export const createPost = (formData) => {
    return async (dispatch) => {
        dispatch({
            type: LOADING
        })
        await axiosInstance.post('blog/post/create/', formData)
            .then((response) => {
                dispatch({
                    type: CREATE_POST,
                    payload: response.data,
                })
        }).catch((response) => {
            dispatch({
                type: ERROR,
                payload: true,
            })
        })
        dispatch({
            type: LOADED
        })
    }
}

export const getPost = (currentPage = 1, pageItems = 5) => {
    return async (dispatch) => {
        dispatch({
            type: LOADING
        })
        await axiosInstance.get(`blog/post/lists/${pageItems}/?page=${currentPage}`)
            .then((response) => {
                dispatch({
                    type: GET_POSTS,
                    payload: response.data,
                })
            }).catch((response) => {
                dispatch({
                    type: ERROR,
                    payload: true,
                })
            })
        dispatch({
            type: LOADED
        })
    }
}
