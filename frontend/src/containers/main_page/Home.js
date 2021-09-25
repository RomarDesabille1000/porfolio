import React from 'react'

const About = () => {
    return(
        <div>
        Hello, I<span>&#39;</span>m a BSIT student of Holy Cross of Davao College. Welcome to my webpage, where you
        can view about my me <span><i className="fab fa-github" /></span>. Feel free to browse on my website!

        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation

            <p>Find me on
                <a className="icon" href="https://github.com/Rumiare" aria-label="github">
                    <span> <i className="fab fa-github" aria-hidden="true"></i></span>
                </a>
                ,
                <a className="icon" href="https://www.facebook.com/IiIiIili/" aria-label="facebook">
                    <span> <i className="fab fa-facebook" aria-hidden="true"></i></span>
                </a>
                <span> and</span>
                <a className="icon" href="https://www.youtube.com/channel/UCpnP38Wt8nkec03lLwGSHIw" aria-label="youtube">
                    <span> <i className="fas fa-envelope" aria-hidden="true"></i></span>
                </a>
                .
            </p>

            <section id="projects">
                <span className="h1">
                    Featured Post
                </span>
                <ul className="post-list">
                    <li className="post-item">
                        <div className="meta">
                            <time dateTime="2016-11-14T16:49:32.000Z" itemProp="datePublished">14 Nov 2016</time>
                        </div>
                        <span className="link">
                            Hello World
                        </span>
                    </li>
                    <li className="post-item">
                        <div className="meta">
                            <time dateTime="2016-11-14T16:49:32.000Z" itemProp="datePublished">14 Nov 2016</time>
                        </div>
                        <span className="link">
                            test
                        </span>
                    </li>
                </ul>
            </section>
            <section id="projects">
                <span className="h1" style={{fontSize:19}}>
                     Featured Projects
                </span>
                <div className="project-list-container">
                    <ul className="project-list">
                        <li className="project">
                            <div className="image">
                                <img src="https://www.takuzen.me/hugo-theme-cactus/images/logo.png" alt="ca"/>
                            </div>
                            <div className="title">Hello world</div>
                        </li>
                        <li className="project">
                            <div className="image">
                                <img src="https://www.takuzen.me/hugo-theme-cactus/images/logo.png" alt="ca"/>
                            </div>
                            <div className="title">Hello world</div>
                        </li>
                        <li className="project">
                            <div className="image">
                                <img src="https://www.takuzen.me/hugo-theme-cactus/images/logo.png" alt="ca"/>
                            </div>
                            <div className="title">Hello world</div>
                        </li>
                        <li className="project">
                            <div className="image">
                                <img src="https://www.takuzen.me/hugo-theme-cactus/images/logo.png" alt="ca"/>
                            </div>
                            <div className="title">Hello world</div>
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    )
}


export default About