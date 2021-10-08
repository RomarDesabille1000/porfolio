import {NavLink} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {userData} from "../../redux/modules/_auth";

const Navbar = () => {

    return (
        <>
            <header id="header">
                <div>
                    <img className="profile-img"
                         src="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg"
                         alt="profile"
                    />
                    <div id="title">
                        <h1>s</h1>
                    </div>
                </div>
                <div id="nav">
                    <ul>
                        <li className="icon">
                            <i className="fas fa-bars fa-2x" aria-hidden="true"/>
                        </li>
                        <li><NavLink exact to="/admin/dashboard" activeClassName="active">Dashboard</NavLink></li>
                        <li><NavLink exact to="/admin/category/" activeClassName="active">Category</NavLink></li>
                        <li><NavLink exact to="/admin/post/" activeClassName="active">Posts</NavLink></li>
                        <li><NavLink exact to="/admin/logout/" activeClassName="active">Logout</NavLink></li>
                    </ul>
                </div>
            </header>
        </>
    );
}

export default Navbar