import React from 'react';
import Logout from './Logout';
import { Link } from "react-router-dom";

const RegisterOrLoginButton = (props) => { 
    
    if(props.user){
        return (
            <div>
                <Logout/>
            </div> 
        )
    }else{
        return (
            <div id='registerorloginbutton-component'>                   
                <Link className="btn btn-outline-success" to="/register">Sign Up or Login</Link>
            </div>
        ) 
    }
}

export default RegisterOrLoginButton;