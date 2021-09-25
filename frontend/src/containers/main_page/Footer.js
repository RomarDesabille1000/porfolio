import {useHistory} from 'react-router-dom'

const About = () => {

    const history = useHistory()

    return(
        <footer id="footer">
            <div className="footer-left">Copyright © 2021 You</div>
                <div className="footer-right">
                    <nav>
                        <ul>
                            <li><a style={{cursor:"pointer"}} onClick={() => { history.push('/') }}>Home</a></li>
                            <li><a style={{cursor:"pointer"}} onClick={() => { history.push('/blog') }}>Blog</a></li>
                            <li><a style={{cursor:"pointer"}} onClick={() => { history.push('/about') }}>About</a></li>
                        </ul>
                    </nav>
                </div>
        </footer>
    )
}


export default About