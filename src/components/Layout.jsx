import React from 'react';
import { Outlet, Link } from "react-router-dom";

class Layout extends React.Component{

    //Function needed to not refresh the page when clicking the search button
    handleForSubmit = (event) => {
        event.preventDefault();
    }

    render(){
        return (
            <div id="layout-component">
                <nav className="navbar navbar-expand-sm navbar-dark bg-dark container-fluid">
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item"> <Link to="/account/" className="nav-link">My Account</Link> </li>
                            <li className="nav-item"> <Link to="/" className="nav-link">Home</Link> </li>
                            <li className="nav-item"> <Link to="/blog/" className="nav-link">Blog</Link> </li>
                        </ul>
                        <div className='d-flex'>
                            <form className="d-flex" onSubmit={this.handleForSubmit}>
                                <input className="form-control me-2" type="text" placeholder="Search"  onChange={this.props.searchProp}/>
                                <button className="btn btn-primary" type="button">Search</button>
                            </form>
                            <form className='mx-3' onSubmit={this.handleForSubmit}>
                                <input className="form-control me-2 btn btn-outline-danger" type="submit" value="Logout"  onChange={this.props.LogoutProp}/>
                            </form>
                        </div>
                    </div>
                </nav>

                <Outlet />
            </div>
        )
    }
};

export default Layout;