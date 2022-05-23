import React from 'react';
import { Outlet, Link} from 'react-router-dom';
import {Navbar, Nav, Container} from 'react-bootstrap';
//import SearchBar from "./SearchBar";
import RegisterOrLoginButton from './RegisterOrLoginButton';

const Layout = (props) => {

    const userControl = props.userControl;

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