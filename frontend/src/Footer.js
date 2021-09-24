import './App.css'
import './style.css'
import React from 'react'
import {BrowserRouter as Router, Switch, Route, useHistory} from 'react-router-dom'



const About = () => {

    const history = useHistory()

    const handleOnClick = () => {
        history.push('/about')
    };


    return(
        <footer id="footer">
            <div className="footer-left">Copyright © 2021 You</div>
                <div className="footer-right">
                    <nav>
                        <ul>
                                <li><a href="/">Home</a></li>
                                <li><a href="/blog">Blog</a></li>
                                <li><a href="/about">About</a></li>
                        </ul>
                    </nav>
                </div>
        </footer>
    )
}


export default About