import React from 'react';
import { Link } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import { auth } from './Firebase';
import { createUserWithEmailAndPassword} from 'firebase/auth';
//import {collection, addDoc, query} from "firebase/firestore";

class Register extends React.Component {

    constructor(props){
        super(props);
        this.register = this.register.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state={
            email:"",
            password:""
        }
    }

    //Function to run when the form is submitted
    register = async(e) => {
     
        e.preventDefault();  //Prevent page refresh when form is submitted

        //Values ​​of form elements
        const password = document.getElementById("register_password").value;
        const confirmPassword = document.getElementById("register_password2").value;
        const successMessage = document.getElementById("registration_successful");
        const errorMessage = document.getElementById("registration_failed");
        const errorPassword = document.getElementById("errorPassword");
        
        //Function used to make passwords equal to each other
        const validatePassword = () => {
            
            let valid;  

            if (password !== '' && confirmPassword !== ''){

                if (password !== confirmPassword) {
                    errorPassword.style.display = "block";  //Make the passwords do not match error message visible
                    valid = false;
                }
                else { valid = true; }

                return valid; //Element that will make the other function work according to the truth value
            }
        }

        //Clear values ​​of form elements
        function clearValue(){
            const firstname = document.getElementById("register_firstname").value = '';
            const surname = document.getElementById("register_surname").value = '';
            const email = document.getElementById("register_email").value = '';
            const password = document.getElementById("register_password").value = '';
            const confirmPassword = document.getElementById("register_password2").value = '';

            console.log(firstname, surname, email, password, confirmPassword);
        }

        //Save the values ​​of the form elements to the database if there are no errors so far
        if(validatePassword().valueOf() === true){
            createUserWithEmailAndPassword(auth, this.state.email, this.state.password).then((u)=>{
                console.log(u);
            }).catch((err)=>{
                console.log(err)
            })
            clearValue(); ////Clear values ​​of form elements
            successMessage.style.display = "block";  //Make registration successful message visible

            //Redirect to login screen after 1.5 seconds
            setTimeout(function(){
                window.location = "/login/";
            }, 1500);

        }else{
            errorMessage.style.display = "block"; //Show error message if there is an error
        }
    }

    handleChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }
  
    render(){
        return(
            <div className='p-3 mt-5  container' id='register-component'>
                <div>
                    <h1 className='text-center mb-3'>Register Form</h1>
                    <Form onSubmit={this.register} className="mx-auto"> 
                        <div className='d-flex'>   
                            <Form.Group className="mb-3 w-100" id="formBasicText">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="John" 
                                    id="register_firstname"
                                    minLength={3}
                                    maxLength={22} 
                                    pattern={'[a-zA-Z]*'}
                                    required
                                />
                            </Form.Group>
                            
                            <Form.Group className="mb-3 w-100" id="formBasicText2">
                                <Form.Label>Surname</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Doe" 
                                    id="register_surname"
                                    minLength={3}
                                    maxLength={14}
                                    pattern={'[a-zA-Z]*'}
                                    required
                                />
                            </Form.Group> 
                        </div>
                                      
                        <Form.Group className="mb-3" id="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control 
                                type="email" 
                                placeholder="Enter email" 
                                name='email'
                                id="register_email" 
                                onChange={this.handleChange}
                                value={this.state.email}
                                pattern={'[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$'}
                                required
                            />
                        </Form.Group>
        
                        <div className='d-flex'>     
                            <Form.Group className="mb-3 w-100" id="formBasicPassword1">
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                type="password" 
                                placeholder="Password" 
                                name='password'
                                id="register_password"  
                                onChange={this.handleChange}
                                value={this.state.password}
                                minLength={8}
                                maxLength={16}
                                pattern={'(?=.*[a-z])(?=.*[A-Z]).{8,20}'}
                                required/>
                                <span className='form-text'>*Must contain at least one uppercase letter, lowercase letter, and number.</span>
                            </Form.Group>
                           
                            <Form.Group className="mb-3 w-100" id="formBasicPassword2">
                                <Form.Label>Repeat Password</Form.Label>
                                <Form.Control 
                                type="password" 
                                placeholder="Password" 
                                id='register_password2'
                                minLength={8}
                                maxLength={16}
                                pattern={'(?=.*[A-Za-z])(?=.*[0-9]){8,20}'}
                                required/>
                            </Form.Group>
                        </div>
        
                        <Form.Group className="mb-3 d-flex" id="formBasicCheckbox">
                            <Form.Check type="checkbox" required/>
                            <Form.Label>
                                <Link to={"/terms"} className="mx-1">
                                    Check me out have read the security and privacy terms
                                </Link>
                            </Form.Label>
                        </Form.Group>
        
                        <div className='d-flex'>
                            <Button className='w-100' variant="outline-success" type="submit">
                                Submit
                            </Button>
                            <Link to={"/login/"} className="w-100 btn btn-outline-primary">Login</Link>
                        </div>
                    </Form>
                </div>
                <div className='mt-3' id='registration_successful' style={{display: "none"}}>
                    <div className="alert alert-success" role="alert">
                        <h4 className="alert-heading">Registration Successful!</h4>
                        <p>You have successfully registered. You are directed to the login form to enter the system.</p>
                    </div>
                </div>
                <div className='mt-3' id='registration_failed' style={{display: "none"}}>
                    <div className="alert alert-danger" role="alert">
                        <h4 className="alert-heading">Registration Failed!</h4>
                        <p>Make sure you enter the correct values ​​and meet the requirements.</p>
                    </div>
                </div>
                <div className='mt-3' id='errorPassword' style={{display: "none"}}>
                    <div className="alert alert-danger" role="alert">
                        <h4 className="alert-heading">Passwords Do Not Match!</h4>
                        <p>Please make sure you enter the passwords correctly.</p>
                    </div>
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
}

export default Register;