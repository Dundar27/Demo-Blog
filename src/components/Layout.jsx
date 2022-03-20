import React from 'react';
import { Outlet, Link } from "react-router-dom";

class Layout extends React.Component{

    handleForSubmit = (event) => {
        event.preventDefault();
    }

    render(){
        return (
            <div id="layout-component">
                <nav className="navbar navbar-expand-sm navbar-dark bg-dark container-fluid">
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item"> <Link to="/" className="nav-link">Home</Link> </li>
                        </ul>
                        <form class="d-flex" onSubmit={this.handleForSubmit}>
                            <input className="form-control me-2" type="text" placeholder="Search"  onChange={this.props.searchBlog}/>
                            <button className="btn btn-primary" type="button">Search</button>
                        </form>
                    </div>
                </nav>

                <Outlet />
            </div>
        )
    }
};

export default Layout;