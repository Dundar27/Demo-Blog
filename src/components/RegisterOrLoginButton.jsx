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
                <p className="d-flex justify-content-center align-items-center">                     
                    <Link className="btn btn-outline-light btn-rounded" to="/register">Sign up!</Link>
                </p>
            </div>
        ) 
    }
    
    
}

export default RegisterOrLoginButton;