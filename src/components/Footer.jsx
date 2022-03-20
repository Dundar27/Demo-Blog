import React from 'react';
import { Link } from "react-router-dom";

const Footer = () => {

    return(
        <section id='footer-component'>
            <footer className="text-center text-white bg-dark">
                <div className="container p-4 pb-0">
                    <div>
                        <p className="d-flex justify-content-center align-items-center">
                            <span className="me-3">Register for free</span>                       
                            <Link className="btn btn-outline-light btn-rounded" to="/sign-up">Sign up!</Link>
                        </p>
                    </div>
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