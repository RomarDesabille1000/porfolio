import {NavLink} from "react-router-dom";


//Navbar layout with page
const NavbarLayout = ({children}) => {
    return (
        <>
            <header id="header">
                <div>
                    <div id="logo"/>
                    <div id="title">
                        <h1>Blog site</h1>
                    </div>
                </div>
                <div id="nav">
                    <ul>
                        <li className="icon">
                            <i className="fas fa-bars fa-2x" aria-hidden="true"/>
                        </li>
                        <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
                        <li><NavLink exact to="/blog/" activeClassName="active">Blog</NavLink></li>
                        <li><NavLink exact to="/about/" activeClassName="active">About</NavLink></li>
                    </ul>
                </div>
            </header>
            {children}
        </>
    );
}

export default NavbarLayout