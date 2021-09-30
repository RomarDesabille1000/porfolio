import {useHistory} from 'react-router-dom'

const About = () => {

    const history = useHistory()

    return(
        <footer id="footer">
            <div className="footer-left">Copyright © 2021 You</div>
                <div className="footer-right">
                    <nav>
                        <ul>
                            <li style={{cursor:"pointer"}} onClick={() => { history.push('/') }}>Home</li>
                            <li style={{cursor:"pointer"}} onClick={() => { history.push('/blog') }}>Blog</li>
                            <li style={{cursor:"pointer"}} onClick={() => { history.push('/about') }}>About</li>
                        </ul>
                    </nav>
                </div>
        </footer>
    )
}


export default About