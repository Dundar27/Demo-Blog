import React from 'react';
import { Link } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import { auth } from './Firebase';
import { signInWithEmailAndPassword} from 'firebase/auth';

class Login extends React.Component{    
    
    constructor(props){
        super(props);
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state={
            email:"", //user mail information
            password:"" //user password information
        }
    }

    //Login function
    login = async(e) =>{

        e.preventDefault();

        //some message box 
        const successMessage = document.getElementById("login_successful");
        const errorMessage = document.getElementById("login_failed");

        //Verify login and login with firebase function
        signInWithEmailAndPassword(auth,this.state.email,this.state.password).then((u)=>{
            
            successMessage.style.display = "block";  //Make login successful message visible
            errorMessage.style.display = "none";

            //Redirect to login screen after 1.5 seconds
            auth.currentUser.emailVerified ? 
            (setTimeout ( function () { window.location = "/"; }, 500)) :
            (setTimeout ( function () { window.location = "/verification/"; }, 500));
            console.log(u);
            
        }).catch((err)=>{
            errorMessage.style.display = "block"; //Show error message if there is an error
            
            setTimeout(function(){
                errorMessage.style.display = "none"; //disable error message if there is an error
                errorMessage.style.transitionDuration = 1+"s";
            }, 3000);

            console.log(err);
        })
    }

    //get user mail and password information
    handleChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    
    render(){
        return(
            <div className='p-3 mt-5 container' id='login-component'>
                <div>
                    <h1 className='text-center mb-3'>Login Form</h1>
                    <Form className="mx-auto" method="post" onSubmit={this.login} > 
                    
                        <Form.Group className="mb-3" id="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control 
                                type="email" 
                                name='email'
                                id='login_mail'
                                placeholder="Enter email" 
                                onChange={this.handleChange}
                                value={this.state.email}
                                pattern={'[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$'}
                                required
                            />
                        </Form.Group>
            
                        <Form.Group className="mb-3 w-100" id="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                name='password'
                                id='login_password'
                                placeholder="Password" 
                                onChange={this.handleChange}
                                value={this.state.password}
                                minLength={8}
                                maxLength={20}
                                required
                            />
                        </Form.Group>

                        <Link to={"/passwordReset/"} className="w-100 text-primary">Forget Password</Link>

                        <div className='d-flex my-2'>
                            <Button className='w-100' variant="outline-success" type="submit">
                                Login
                            </Button>
                            <Link to={"/register/"} className="w-100 btn btn-outline-primary">Register</Link>
                        </div>
                    </Form>
                </div>
                <div className='mt-3' id='login_successful' style={{display: "none"}}>
                    <div className="alert alert-success" role="alert">
                        <h4 className="alert-heading">Successful!</h4>
                        <p>You are directed to the home.</p>
                    </div>
                </div>
                <div className='mt-3' id='login_failed' style={{display: "none"}}>
                    <div className="alert alert-danger" role="alert">
                        <h4 className="alert-heading">Registration Failed!</h4>
                        <p>Make sure you enter the correct values.</p>
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

export default Login;