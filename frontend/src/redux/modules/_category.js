import axiosInstance from "../../axios";

const GET_CATEGORY = "GET_CATEGORY"
const CREATE_CATEGORY = "CREATE_CATEGORY"
const DELETE_CATEGORY = "DELETE_CATEGORY"
const EDIT_CATEGORY = "EDIT_CATEGORY"
const LOADING = "LOADING"
const LOADED = "LOADED"
const ERROR = "ERROR"

const initialState = {
    loading:false,
    error: false,
    success: false,
    data: []
}

export default function category(state = initialState, {type, payload}){
    switch (type){
        case LOADING:
            return {...state, loading: true}
        case LOADED:
            return {...state, loading: false}
        case CREATE_CATEGORY:
            return {...state, data: payload, error: false, success: true}
        case GET_CATEGORY:
            return {...state, data: payload, error: false, success: true}
        case ERROR:
            return {...state, error: payload}
        default:
            return {...state}
    }
}

export const create_category = (formData) => {
    return async (dispatch) => {
        dispatch({
            type: LOADING
        })
        await axiosInstance.post('blog/category/create/', formData)
            .then((response) => {
                dispatch({
                    type: CREATE_CATEGORY,
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

export const get_category = () => {
    return async (dispatch) => {
        dispatch({
            type: LOADING
        })
        await axiosInstance.get('blog/category/lists/')
            .then((response) => {
                dispatch({
                    type: GET_CATEGORY,
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

