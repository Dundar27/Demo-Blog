import React from 'react';
import { auth } from './Firebase';

const Layout = (props) => {

    //Output function
    const logout = (event) => {
        event.preventDefault();
        auth.signOut();
    }

    return (
        <div id="lagout-component">
            <form onSubmit={logout}>
                <input 
                    className="form-control me-2 btn btn-danger" 
                    type="submit" value="Logout" 
                />
            </form>             
        </div>
    )   
};

export default Layout;