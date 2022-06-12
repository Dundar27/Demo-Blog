import React from 'react';
import { Link } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import { auth } from './Firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import db from './Firebase';
import { doc, setDoc } from "firebase/firestore";

class Register extends React.Component {

    constructor(props){
        super(props);
        this.register = this.register.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state={
            email:"", //user mail information
            password:"", //user password information
            username:"" //user username information
        }
    }

    //Function to run when the form is submitted
    register = async(e) => {
     
        e.preventDefault();  //Prevent page refresh when form is submitted

        //Values ​​of form elements
        
        const username = document.getElementById("register_username").value;
        const password = document.getElementById("register_password").value;
        const confirmPassword = document.getElementById("register_password2").value;

        const successMessage = document.getElementById("registration_successful");
        const errorMessage = document.getElementById("registration_failed");
        const errorPassword = document.getElementById("errorPassword");
        const errorEmail = document.getElementById("errorEmail");
        
        //Function used to make passwords equal to each other
        const validate = () => {
            
            let valid;

            if (password !== '' && confirmPassword !== ''){

                if (password !== confirmPassword) {
                    errorPassword.style.display = "block";  //Make the passwords do not match error message visible
                    valid = false;
                }
                else { valid = true; }


                return valid;
            }

            return valid; //Element that will make the other function work according to the truth value
        }

        //Clear values ​​of form elements
        function clearValue(){
            const emailValue = document.getElementById("register_email").value = '';
            const passwordValue = document.getElementById("register_password").value = '';
            const confirmPasswordValue = document.getElementById("register_password2").value = '';

            console.log(emailValue, passwordValue, confirmPasswordValue);
        }
        
        
        //Save the values ​​of the form elements to the database if there are no errors so far
        if(validate().valueOf() === true){
            
            //Function to get form values ​​and create a new user with firebase function
            createUserWithEmailAndPassword(auth, this.state.email, this.state.password).then((userCredential)=>{

                console.log(userCredential);

                setDoc(doc(db, "users", auth.currentUser.uid), {
                    username: username
                });

                clearValue(); ////Clear values ​​of form elements

                successMessage.style.display = "block";  //Make registration successful message visible

                //Redirect to login screen after 1.5 seconds
                setTimeout(function(){
                    window.location = "/account/";
                }, 1500);

            }).catch((err)=>{
                errorEmail.style.display = "block";
                console.log(err);
            })
            
        }else{
            errorMessage.style.display = "block"; //Show error message if there is an error
        }
    }

    //get user mail and password information
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
                                      
                        <Form.Group className="mb-3" id="formBasicEmail">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter user name" 
                                id="register_username" 
                                name='username'
                                onChange={this.handleChange}
                                value={this.state.username}
                                pattern={'[a-zA-Z0-9._]{6,16}$'}
                                required
                            />
                        </Form.Group> 
                        
                        <Form.Group className="mb-3" id="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control 
                                type="email" 
                                placeholder="Enter email" 
                                id="register_email" 
                                name='email'
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
                                id="register_password"  
                                name='password'
                                onChange={this.handleChange}
                                value={this.state.password}
                                minLength={8}
                                maxLength={16}
                                pattern={'(?=.*[A-Za-z])(?=.*[0-9]){8,20}'}
                                required/>
                                <span className='form-text'>*Must contain at least one uppercase letter, lowercase letter, and number.</span>
                            </Form.Group>
                           
                            <Form.Group className="mb-3 w-100" id="formBasicPassword2">
                                <Form.Label>Confirm Password</Form.Label>
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
                <div className='mt-3' id='errorEmail' style={{display: "none"}}>
                    <div className="alert alert-danger" role="alert">
                        <h4 className="alert-heading">This email address is used!</h4>
                        <p>Please enter another email address.</p>
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