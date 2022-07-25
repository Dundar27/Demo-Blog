import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import RegisterOrLoginButton from './RegisterOrLoginButton';
import SettingsButton from './SettingsButton';

const navbarLayout = (props) => {

  const userControl = props.userControl;

  return (
    <div id="layout-component">
      <Navbar bg="dark" expand="sm">
        <Container fluid>
          <Navbar.Collapse id="navbarScroll">

            <Nav className="me-auto my-2 my-lg-0" navbarScroll>

              <Link to="/" className="nav-link text-light">
                Home
              </Link>
              <Link to="/blog/" className="nav-link text-light">
                Blog
              </Link>

              {userControl ?
                (<>
                  <Link to="/writers/" className="nav-link text-light">
                    Writers
                  </Link>
                  <Link to={"/profile/"+userControl.displayName}className="nav-link text-light">
                    Profile
                  </Link>
                </>) :

                (<Link to="/writers/" className="nav-link text-light">
                  Writers
                </Link>)}
            </Nav>

            <div className='d-flex'>
              <SettingsButton user={userControl} />
              <RegisterOrLoginButton user={userControl} />
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Outlet />
    </div>
  )
};

export default navbarLayout;