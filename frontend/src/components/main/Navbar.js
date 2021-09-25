import {BrowserRouter as Router, Switch, Route, NavLink} from 'react-router-dom'
import About from "../../containers/main_page/About";
import Blog from "../../containers/main_page/Blog";
import Home from "../../containers/main_page/Home";

const Navbar = () => {
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
                            <a href="#" aria-label="Menu"><i className="fas fa-bars fa-2x" aria-hidden="true"></i></a>
                        </li>
                        <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
                        <li><NavLink exact to="/blog" activeClassName="active">Blog</NavLink></li>
                        <li><NavLink exact to="/about" activeClassName="active">About</NavLink></li>
                    </ul>
                </div>
            </header>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/about" component={About}/>
                <Route exact path="/blog" component={Blog}/>
            </Switch>
        </>
    )
}

export default Navbar