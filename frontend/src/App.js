import './App.css'
import './style.css'
import React from 'react'
import {Navbar, Container, Nav} from "react-bootstrap";
import {BrowserRouter as Router, Switch, Route, NavLink} from 'react-router-dom'
import Home from './Home'
import About from './About'
import Blog from './Blog'
import Footer from './Footer'


function App() {
  return (
       <div className="max-width mx-auto px3 ltr newClass">
            <div className="content index py4">
                <Router>
                    <header id="header">
                        <a href="/">
                            <div id="logo"></div>
                            <div id="title">
                            <h1>Rogienald Philip Agol</h1>
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
                </Router>

                <Footer />

            </div>
       </div>
  );
}

export default App;
