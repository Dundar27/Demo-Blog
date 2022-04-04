import React from 'react';
import { Outlet, Link } from "react-router-dom";
import { auth } from './Firebase';

const Layout = (props) => {

    //Function needed to not refresh the page when clicking the search button
    const handleForSubmit = (event) => {
        event.preventDefault();
    }

    //Output function
    const logout = (event) => {
        event.preventDefault();
        auth.signOut();
    }

    return (
        <div id="layout-component">
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark container-fluid">

                <div className="collapse navbar-collapse">

                    <ul className="navbar-nav me-auto">
                            
                        <li className="nav-item"> 
                            <Link to="/account/" className="btn btn-outline-light dropdown">
                                Profile
                            </Link>
                        </li>
                        <li className="nav-item"> 
                            <Link to="/" className="nav-link">
                                Home
                            </Link> 
                        </li>
                        <li className="nav-item">
                            <Link to="/blog/" className="nav-link">
                                Blog
                            </Link> 
                        </li>

                    </ul>

                    <div className='d-flex'>

                        <form className="d-flex mx-3" onSubmit={handleForSubmit}>
                            <input className="form-control me-2" type="text" placeholder="Search"  onChange={props.searchProp}/>
                            <button className="btn btn-primary" type="button">Search</button>
                        </form>

                        <form onSubmit={logout}>
                            <input 
                                className="form-control me-2 btn btn-danger" 
                                type="submit" value="Logout" 
                            />
                        </form>             
                    </div>
                </div>
            </nav>

            <Outlet />
        </div>
    )   
};

export default Layout;