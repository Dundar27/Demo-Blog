import React from "react";
import { Link } from "react-router-dom";

const SettingsButton = (props) => {
    
    if(props.user){
        return (
            <div>
                <Link className="btn btn-outline-warning mx-2" to="/profile/settings">Settings</Link>
            </div> 
        )
    }else{
        return (
            <div>                   
                
            </div>
        ) 
    }
}

export default SettingsButton;