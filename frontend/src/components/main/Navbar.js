import {Switch, Route, NavLink} from 'react-router-dom'
import About from "../../containers/main_page/About";
import Blog from "../../containers/main_page/Blog";
import Home from "../../containers/main_page/Home";

const Navbar = ({ changeTheme, themeSelected }) => {
    return (
        <>
            <header id="header">
                <a href="/">
                    <div id="logo"></div>
                    <div id="title">
                        <h1>Blog site</h1>
                    </div>
                </a>
                <div id="nav">
                    <ul>
                        <li className="icon">
                            <i className="fas fa-bars fa-2x" aria-hidden="true"></i>
                        </li>
                        <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
                        <li><NavLink exact to="/blog" activeClassName="active">Blog</NavLink></li>
                        <li><NavLink exact to="/about" activeClassName="active">About</NavLink></li>
                    </ul>
                </div>
            </header>
            <Switch>
                <Route exact path="/" render={(props) => <Home {...props} changeTheme={changeTheme} themeSelected={themeSelected}/>}/>
                <Route exact path="/about" component={About}/>
                <Route exact path="/blog" component={Blog}/>
            </Switch>
        </>
    )
}

export default Navbar