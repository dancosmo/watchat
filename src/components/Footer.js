import React, {useContext} from 'react';
import linkedin from '../gifs/linkedin.gif';
import github from '../gifs/github.gif';
import { AuthContext } from './context/auth';


const Footer = () => {
    const { theme } = useContext(AuthContext);
    return (
        <div style={{color:`${theme.text}`}} className='footer'>I'm developing this project using ReactJS and Firebase. Here are my links: 
            <a style={{textDecoration:"none"}} href="https://linkedin.com/in/daniel-perez-55b8b2235"> <img style={{width:"30px", borderRadius:"10px",}} src={linkedin} alt="linkedin"></img></a>
            <a style={{textDecoration:"none"}} href="https://github.com/dancosmo"> <img style={{width:"30px", borderRadius:"10px",}} src={github} alt="linkedin"></img></a>
        </div>
    );
}

export default Footer;