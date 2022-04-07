import React from 'react';
import { Link } from "react-router-dom";
import RegisterOrLoginButton from './RegisterOrLoginButton';

const Footer = (props) => {

    const userControl = props.userControl;

    return(
        <section id='footer-component'>
            <footer className="text-center text-white bg-dark">
                <div className="container p-4 pb-0">    
                    <RegisterOrLoginButton user={userControl}/>
                </div>

                <div className="text-center p-3" style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}>
                    © 2020 Copyright :
                    <Link className="text-white" to="/"> demo-blog-page.com</Link>
                </div>
            </footer>
        </section>
    )
}

export default Footer;