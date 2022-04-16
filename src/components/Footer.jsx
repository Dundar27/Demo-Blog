import { Link } from "react-router-dom";
import RegisterOrLoginButton from './RegisterOrLoginButton';

const Footer = (props) => {

    const userControl = props.userControl;

    return(
        <footer className="text-center text-white bg-dark" id='footer-component'>
            <div className="container p-3">    
                <RegisterOrLoginButton user={userControl}/>
            </div>
            <div className="text-center p-3" style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}>
                © 2022 Copyright :
                <Link className="text-white" to="/terms"> demo-blog-page.com</Link>
            </div>
        </footer>
    )
}

export default Footer;