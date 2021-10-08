import axiosInstance from "../../axios";

const LOGIN_SUCCESS = "LOGIN_SUCCESS"
const LOGIN_FAILED = "LOGIN_FAILED"
const LOADING = "LOADING"
const LOADED = "LOADED"
const LOGOUT = "LOGOUT"
const GET_USER = "GET_USER_DATA"
const GET_USER_FAILED = "GET_USER_FAILED"

const initialState = {
    authenticated: localStorage.getItem('accessToken'),
    loading: false,
    invalidCredentials: false,
    userData: []
}

export default function auth(state = initialState, { type, payload }){
    switch (type){
        case LOADING:
            return {
                ...state,
                loading: true,
                invalidCredentials: false,
            }
        case LOADED:
            return {
                ...state,
                loading: false
            }
        case GET_USER:
            return {
                ...state,
                userData: payload,
            }
        case GET_USER_FAILED:
            return {
                ...state,
                userData: [],
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('accessToken', payload.access)
            localStorage.setItem('refreshToken', payload.refresh)
            return {
                ...state,
                authenticated: true
            }
        case LOGIN_FAILED:
            return {
                ...state,
                invalidCredentials: true
            }
        case LOGOUT:
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            return {
                ...state,
                authenticated: false,
                userData: []
            }
        default:
            return { ...state }
    }
}

export const login = (email, password) => {
    return async (dispatch) => {
        dispatch({
            type:LOADING
        })
        await axiosInstance.post('account/token/', {
            email, password
        }).then((response) => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: response.data
            })
            axiosInstance.defaults.headers['Authorization'] =
                'Bearer ' + localStorage.getItem('accessToken')
        }).catch(error => {
            dispatch({
                type: LOGIN_FAILED,
            })
        })
        dispatch({
            type:LOADED
        })
    }
}

export const userData = () => {
    return async (dispatch) => {
        dispatch({
            type:LOADING
        })
        await axiosInstance.get('account/userdata/')
            .then((response) => {
                dispatch({
                    type: GET_USER,
                    payload: response.data
                })
        }).catch((error) => {
            dispatch({
                type: GET_USER_FAILED,
            })
        })
        dispatch({
            type:LOADED
        })
    }
}

export const logout = () => ({ type: LOGOUT })

