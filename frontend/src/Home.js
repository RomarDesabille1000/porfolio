import './App.css'
import './style.css'
import React from 'react'
import {Navbar, Container, Nav, NavLink} from "react-bootstrap";

const About = () => {
    return(
        <div>
        Hello, I<span>&#39;</span>m a BSIT student of Holy Cross of Davao College. Welcome to my webpage, where you
        can view about my me <span><i className="fab fa-github" /></span>. Feel free to browse on my website!

        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation

            <p>Find me on
                <a className="icon" href="https://github.com/Rumiare" aria-label="github">
                    <i className="fab fa-github" aria-hidden="true"></i>
                </a>
                ,
                <a className="icon" href="https://www.facebook.com/IiIiIili/" aria-label="facebook">
                    <i className="fab fa-facebook" aria-hidden="true"></i>
                </a>
                and
                <a className="icon" href="https://www.youtube.com/channel/UCpnP38Wt8nkec03lLwGSHIw" aria-label="youtube">
                    <i className="fas fa-youtube" aria-hidden="true"></i>
                </a>
                .
            </p>
        </div>
    )
}


export default About