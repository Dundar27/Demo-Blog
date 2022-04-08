import React from 'react';
import { Outlet, Link} from "react-router-dom";
import {Navbar, Nav, Container, Button} from "react-bootstrap";
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
            <Navbar bg="dark" expand="sm">
                <Container fluid>
                    <Navbar.Collapse id="navbarScroll">

                        <Nav className="me-auto my-2 my-lg-0" navbarScroll>
                            
                            <Link to="/account/" className="nav-link text-light">
                                Profile
                            </Link>

                            <Link to="/" className="nav-link text-light">
                                Home
                            </Link> 
                            <Link to="/blog/" className="nav-link text-light">
                                Blog
                            </Link> 
                        </Nav>

                        <div className='d-flex'>

                            <form className="d-flex mx-3" onSubmit={handleForSubmit}>
                                <input className="form-control me-2" type="text" placeholder="Search..."  onChange={props.searchProp}/>
                                <div className="d-flex">
                                    <Button variant="btn-light mx-1">
                                        <i class="fa fa-search text-light"></i>
                                    </Button>
                                </div>
                            </form>

                            <RegisterOrLoginButton user={userControl}/>             
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Outlet />
        </div>
    )   
};

export default Layout;