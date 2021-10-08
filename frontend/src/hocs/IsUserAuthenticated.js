import {Redirect} from 'react-router-dom'

const IsUserAuthenticated = (Component, auth) => {

    const redirectIfNotAuth = () => {
        return !auth ? <Redirect to="/admin/"/> : ''
    }

    return (props) => (
        <>
            { !auth ? <Redirect to="/admin/"/> : <Component {...props}/> }
        </>
    )
}

export default IsUserAuthenticated