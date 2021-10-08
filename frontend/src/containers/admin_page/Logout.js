import {useDispatch} from "react-redux";
import {logout} from "../../redux/modules/_auth";
import {useHistory} from "react-router-dom";

const Logout = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const handleOnClick = () => {
        dispatch(logout())
        history.push('/admin/')
    }

    return (
        <>
            <div id="content">
                Are your sure you want to logout ?
                <button onClick={handleOnClick} className="cancel">Yes</button>
            </div>
        </>
    )
}


export default Logout