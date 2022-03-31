import React from 'react';
import { Link } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import db, { auth } from './Firebase';
import { signInWithEmailAndPassword} from 'firebase/auth'

class Login extends React.Component{    
    
    constructor(props){
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state={
            email:"",
            password:""
        }
    }

    login(e){
        e.preventDefault();
        auth.signInWithEmailAndPassword(this.state.email,this.state.password).then((u)=>{
            console.log(u)
        }).catch((err)=>{
            console.log(err);
        })
    }

    handleChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    /* const login = async(event) => {

        event.preventDefault();

        const auther = auth;
        const email = document.getElementById("login_mail").value;
        const password = document.getElementById("login_password").value;

        signInWithEmailAndPassword(auther, email, password).then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
            console.log(user);

            //Redirect to login screen after 1.5 seconds
            setTimeout(function(){
                window.location = "/";
            }, 1500);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorCode, errorMessage);
        });
    }
 */ render(){
        return(
            <div className='p-3 mt-5 container' id='login-component'>
                <div>
                    <h1 className='text-center mb-3'>Login Form</h1>
                    <Form className="mx-auto" onSubmit={this.login} > 
                    
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

                        <Form.Group className="mb-3" id="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>

                        <div className='d-flex'>
                            <Button className='w-100' variant="outline-success" type="submit">
                                Submit
                            </Button>
                            <Link to={"/register/"} className="w-100 btn btn-outline-primary">Register</Link>
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
}

export default Login;