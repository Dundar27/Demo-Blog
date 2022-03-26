import React from 'react';
import { Link } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';

const Register = () => {

    /* const firstname = document.getElementById("firstname").value;
    const surname = document.getElementById("surname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("password2").value; */

    function handleChange(event) {
        this.setState({value: event.target.value});
    }

    function handleSubmit(event) {
        event.preventDefault();
    }
  
    return(
    <div className='p-3 mt-5  container' id='register-component'>
        <div>
            <h1 className='text-center mb-3'>Register Form</h1>
            <Form onSubmit={handleSubmit} className="mx-auto"> 
                <div className='d-flex'>   
                    <Form.Group className="mb-3 w-100" controlId="formBasicEmail">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="John" id='firstname' onChange={handleChange}/>
                    </Form.Group>
                    
                    <Form.Group className="mb-3 w-100" controlId="formBasicEmail">
                        <Form.Label>Surname</Form.Label>
                        <Form.Control type="text" placeholder="Doe" id='surname' onChange={handleChange}/>
                    </Form.Group> 
                </div>
                              
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" id='email' onChange={handleChange}/>
                </Form.Group>


                <div className='d-flex'>     
                    <Form.Group className="mb-3 w-100" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" id='password' onChange={handleChange}/>
                    </Form.Group>
                   
                    <Form.Group className="mb-3 w-100" controlId="formBasicPassword">
                        <Form.Label>Repeat Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" id='password2' onChange={handleChange}/>
                    </Form.Group>
                </div>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>

                <div className='d-flex'>
                    <Button className='w-100' variant="outline-success" type="submit">
                        Submit
                    </Button>
                    <Link to={"/login/"} className="w-100 btn btn-outline-primary">Login</Link>
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

export default Register;