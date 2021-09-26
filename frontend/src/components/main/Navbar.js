import {Switch, Route, NavLink} from 'react-router-dom'
import About from "../../containers/main_page/About";
import Blog from "../../containers/main_page/Blog";
import Home from "../../containers/main_page/Home";
import Create from "../../admin/Create";
import Post from "../../admin/Post";

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
                    <ul>
                        <li><NavLink exact to="/admin/post/create" activeClassName="active">Create Post</NavLink></li>
                        <li><NavLink exact to="/admin/post" activeClassName="active">Post list</NavLink></li>
                    </ul>
                </div>
            </header>
            <Switch>
                <Route exact path="/" render={(props) => <Home {...props} changeTheme={changeTheme} themeSelected={themeSelected}/>}/>
                <Route exact path="/about" component={About}/>
                <Route exact path="/blog" component={Blog}/>
                <Route exact path="/admin/post/create" component={Create}/>
                <Route exact path="/admin/post" component={Post}/>
            </Switch>
        </>
    )
}

export default Navbar