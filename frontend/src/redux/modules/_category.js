import axiosInstance from "../../axios";

const GET_CATEGORY = "GET_CATEGORY"
const CREATE_CATEGORY = "CREATE_CATEGORY"
const DELETE_CATEGORY = "DELETE_CATEGORY"
const EDIT_CATEGORY = "EDIT_CATEGORY"
const LOADING = "LOADING"
const LOADED = "LOADED"
const ERROR = "ERROR"

const initialState = {
    loading:{
        status: false,
        info: '',
    },
    error: false,
    success: false,
    data: {
        results: []
    },
    response: null
}

export default function category(state = initialState, {type, payload}){
    switch (type){
        case LOADING:
            return {
                ...state,
                loading: {
                    status: true,
                    info:payload
                },
                response: null
            }
        case LOADED:
            return {
                ...state,
                loading: {
                    status: false,
                    info: ''
                },
            }
        case GET_CATEGORY:
            return {
                ...state,
                data: payload.data,
                response: payload.response,
            }
        case CREATE_CATEGORY:
            return {...state, response: payload, error: false, success: true}
        case DELETE_CATEGORY:
            return {
                ...state,
                response: payload.response,
                data: payload.data ? payload.data : {...state}
            }
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

export const categoryPaginationSettings = (currentPageNo, pageItems) => {
    if(currentPageNo === undefined)
        currentPageNo = 1
    if(pageItems === undefined)
        pageItems = 5
    return {currentPageNo, pageItems}
}

export const getCategory = (currentPage = 1, pageItems = 1) => {
    return async (dispatch) => {
        dispatch({
            type: LOADING,
            payload: 'Fetching Data...'
        })
        await axiosInstance.get(`blog/category/lists/${pageItems}/?page=${currentPage}`)
            .then(({ data }) => {
                dispatch({
                    type: GET_CATEGORY,
                    payload: {
                        data,
                        response: null
                    }
                })
            }).catch((err) => {
                dispatch({
                    type: GET_CATEGORY,
                    payload: {
                        data: { results: [] },
                        response: {
                            'status' : 'error',
                            'message' : 'Failed to fetch the data.'
                        }
                    }
                })
            })
        dispatch({
            type: LOADED
        })
    }
}

export const deleteCategory = (id, pageSize, page) => {
    return async (dispatch) => {
        dispatch({
            type: LOADING,
            payload: 'Deleting Category...'
        })
        await axiosInstance.delete(`blog/category/delete/${id}/${pageSize}/?page=${page}`)
            .then(({ data }) => {
                dispatch({
                    type: DELETE_CATEGORY,
                    payload: {
                         data,
                         response: {
                             'status' : 'success',
                             'message' : `Category id ${id} has been deleted successfully.`
                         }
                    },
                })
            }).catch((err) => {
                dispatch({
                    type: DELETE_CATEGORY,
                    payload: {
                        response: {
                             data: { results: [] },
                            'status' : 'error',
                            'message' : 'Error occurred failed to delete category.'
                        }
                    },
                })
            })
        dispatch({
            type: LOADED
        })
    }
}
