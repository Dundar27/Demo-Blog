import React from 'react';
import { Link } from "react-router-dom";

const NoPage = () => {
    return (
        <div>
            <div className="my-auto py-5">
                <div className="text-center py-5">
                    <h1 className="display-1">404</h1>
                    <h2>File not found</h2>
                    <ul className="navbar-nav me-auto mt-4">
                        <li className="nav-item">
                            <button onClick={()=>(history.back())} className='btn btn-outline-primary'><h6 className='m-0'>Back to</h6></button>
                        </li>
                    </ul>
                </div>
                <div className='py-3 container'>
                    <div className="alert alert-danger" role="alert">
                        <h4 className="alert-heading">Warning!</h4>
                        <p>Our site is still under development. You are now using the demo version. If you've discovered a bug, please let us know.</p>
                        <hr />
                        <p className="mb-0">Click the link above to return to the home page.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NoPage;