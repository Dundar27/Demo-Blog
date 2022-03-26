import React from 'react';
import { Link } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';


const Login = () => {

    return(
    <div className='p-3 mt-5 container' id='login-component'>
        <div>
            <h1 className='text-center mb-3'>Login Form</h1>
            <Form className="mx-auto"> 
              
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
    
                <Form.Group className="mb-3 w-100" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>


                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>

                <div className='d-flex'>
                    <Button className='w-100' variant="outline-success" type="submit">
                        Submit
                    </Button>
                    <Link to={"/Register/"} className="w-100 btn btn-outline-primary">Register</Link>
                </div>
            </Form>
        </div>
        <div className='mt-3'>
            <div className="alert alert-warning" role="alert">
                <h4 className="alert-heading">Warning!</h4>
                <p>Our site is still under development. You are now using the demo version. If you've discovered a bug, please let us know.</p>
            </div>
        </div>
    </div>    
    )
}

export default Login;