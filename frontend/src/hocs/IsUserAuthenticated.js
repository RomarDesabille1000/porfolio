import {Redirect} from 'react-router-dom'

const IsUserAuthenticated = (Component, isLogin) => {
    const f = () => {
        if(!isLogin){
            return <Redirect to="/" />
        }
    }

    return (props) => (
        <div>
            {f()}
            <Component {...props}/>
        </div>
    )
}

export default IsUserAuthenticated