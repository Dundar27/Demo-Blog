import React from 'react';

const Footer = () => {

    return(
        <section id='footer-component'>
            <footer className="text-center text-white bg-dark">
                <div className="container p-4 pb-0">
                    <div>
                        <p className="d-flex justify-content-center align-items-center">
                            <span className="me-3">Register for free</span>
                            <button type="button" className="btn btn-outline-light btn-rounded">
                                Sign up!
                            </button>
                        </p>
                    </div>
                </div>

                <div className="text-center p-3" style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}>
                    © 2020 Copyright :
                    <a className="text-white" href="/"> demo-blog-page.com</a>
                </div>
            </footer>
        </section>
    )
}

export default Footer;