import {Formik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {login, userData} from "../../redux/modules/_auth";
import Alert from "../../components/Alert";
import {Redirect, useHistory} from "react-router-dom";
import {useEffect} from "react";

const Login = () => {
    const authState = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const history = useHistory()

    const initialValues = {
        email: 'romar@gmail.com',
        password: '12345',
    }

    const onSubmit = (values) => {
        dispatch(login(values.email, values.password))
    }

    useEffect(() => {
        //dispatch(userData())
        if(authState.authenticated){
        }
    }, [authState.authenticated])


    return (
        <>
            <Formik initialValues={initialValues}
                    onSubmit={onSubmit}>
                {
                    ({
                         handleChange,
                         handleBlur,
                         handleSubmit,
                         values
                     }) => (
                        <div id="content">
                            <div className="login">
                                <h1>Sign In</h1>
                                {
                                    authState.loading ?
                                        <Alert type="info" message="Signing In..."/> : null
                                }
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <span>Email: </span>
                                        <input type="text"
                                               name="email"
                                               value={values.email}
                                               onChange={handleChange}
                                               onBlur={handleBlur}/>
                                    </div>
                                    <div>
                                        <span>Password: </span>
                                        <input type="password"
                                               name="password"
                                               value={values.password}
                                               onChange={handleChange}
                                               onBlur={handleBlur}/>
                                    </div>
                                    {
                                        authState.invalidCredentials ?
                                            <Alert type="error" message="Username/Password is Incorrect"/> : null
                                    }
                                    <button type="submit" style={{width:'100%', marginTop:20}}>Login</button>
                                </form>
                            </div>
                        </div>
                    )
                }
            </Formik>
        </>
    )
}

export default Login