import axios from 'axios'

const baseURL = 'http://127.0.0.1:8000/api/'

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        Authorization: localStorage.getItem('accessToken') ? 'Bearer ' + localStorage.getItem('accessToken') : null,
        'Content-type': 'application/json',
    },
})

const forceLogout = () => {
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('accessToken')
    window.location.href = '/admin/'
}

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if(!error.response){
            window.location.href = '/server-down/'
            return Promise.reject(error)
        }else if(error.response.status === 403){
            //Forbidden
            return Promise.reject(error)
        }else if(error.response.status !== 401){
            return Promise.reject(error)
        }

        //Check first if theres a refresh token available
        if(!localStorage.getItem('refreshToken')){
            forceLogout()
        }

        //Getting new access token by sending refresh token
        return axios.post(baseURL + 'account/token/refresh/', {
            'refresh': localStorage.getItem('refreshToken')
        }).then((response) => {
            let accessToken = response.data.access
            axiosInstance.defaults.headers['Authorization'] = `Bearer ${accessToken}`
            localStorage.setItem('accessToken', accessToken)

            //Return Original Request
            error.response.config.headers['Authorization'] = `Bearer ${accessToken}`;
            return axios(error.response.config);
        }).catch((error) => {
            if(error.response.status === 400 || error.response.status === 404){
                //Bad Request just reject
                return Promise.reject(error)
            }
            console.log('logged out.')
            //forceLogout()
            return Promise.reject(error);
        })
    }
)

export default axiosInstance
