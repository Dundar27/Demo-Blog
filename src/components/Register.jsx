import React from 'react';
import { Link } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import db from './Firebase';
import {collection, addDoc, query} from "firebase/firestore";

const Register = (props) => {

    //Function to run when the form is submitted
    const handleSubmit = async(event) => {
        
        event.preventDefault();  //Prevent page refresh when form is submitted

        //Values ​​of form elements
        const firstname = document.getElementById("firstname").value;
        const surname = document.getElementById("surname").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("password2").value;
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
            const firstname = document.getElementById("firstname").value = '';
            const surname = document.getElementById("surname").value = '';
            const email = document.getElementById("email").value = '';
            const password = document.getElementById("password").value = '';
            const confirmPassword = document.getElementById("password2").value = '';

            console.log(firstname, surname, email, password, confirmPassword);
        }

        //Save the values ​​of the form elements to the database if there are no errors so far
        if(validatePassword().valueOf() === true){
            const docRef = await addDoc(query(collection(db, "users")), {
                firstName: firstname,
                surName: surname,
                mail: email,
                password: password,
                registerDate: new Date()
            });
            clearValue(); ////Clear values ​​of form elements
            successMessage.style.display = "block";  //Make registration successful message visible

            //Redirect to login screen after 1.5 seconds
            setTimeout(function(){
                window.location = "/login/";
            }, 1500);
            console.log("You have successfully register", docRef);
        }else{
            errorMessage.style.display = "block"; //Show error message if there is an error
        }
    }
  
    return(
    <div className='p-3 mt-5  container' id='register-component'>
        <div>
            <h1 className='text-center mb-3'>Register Form</h1>
            <Form onSubmit={handleSubmit} className="mx-auto"> 
                <div className='d-flex'>   
                    <Form.Group className="mb-3 w-100" id="formBasicText">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="John" 
                            id="firstname"
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
                            id="surname"
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
                        id="email" 
                        onChange={props.registerMailProp} 
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
                        id="password" 
                        onChange={props.registerPasswordProp} 
                        minLength={8}
                        maxLength={16}
                        pattern={'(?=.*[a-z])(?=.*[A-Z]).{8,16}'}
                        required/>
                        <span className='form-text'>*Must contain at least one uppercase letter, lowercase letter, and number.</span>
                    </Form.Group>
                   
                    <Form.Group className="mb-3 w-100" id="formBasicPassword2">
                        <Form.Label>Repeat Password</Form.Label>
                        <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        id='password2'
                        minLength={8}
                        maxLength={16}
                        pattern={'(?=.*[A-Za-z])(?=.*[0-9]){8,16}'}
                        required/>
                    </Form.Group>
                </div>

                <Form.Group className="mb-3" id="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me outI have read the security and privacy terms" required/>
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

export default Register;