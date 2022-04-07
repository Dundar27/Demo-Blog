import React from 'react';
import { Outlet, Link } from "react-router-dom";
//import SearchBar from "./SearchBar";
import RegisterOrLoginButton from './RegisterOrLoginButton';

const Layout = (props) => {

    const userControl = props.userControl;

    //Function needed to not refresh the page when clicking the search button
    const handleForSubmit = (event) => {
        event.preventDefault();
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
                            <input className="form-control me-2" type="text" placeholder="Search..."  onChange={props.searchProp}/>
                            <div className="d-flex">
                                <button className="btn btn-primary mx-1" type="button">
                                    <i class="fa fa-search"></i>
                                </button>
                            </div>
                        </form>

                        <RegisterOrLoginButton user={userControl}/>             
                    </div>
                </div>
            </nav>

            <Outlet />
        </div>
    )   
};

export default Layout;