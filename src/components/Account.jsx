import React from 'react';
import Register from './Register';

function Account (props){

    const isLoggedIn = props.isLoggedIn;

    if (isLoggedIn) {
        return (
            <div>
                <h1>Compoenet</h1>
            </div>
        );
    }else{
        return <Register />;
    }
}

export default Account;