import React from 'react';
import { Link } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import { auth } from './Firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import db from './Firebase';
import { doc, setDoc, onSnapshot, query, collection } from "firebase/firestore";

class Register extends React.Component {

    constructor(props){
        super(props);
        this.Register = this.Register.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state={
            firstname:"",
            lastname:"",
            birthday:"",
            adress:"",
            phone:"",
            username:"",
            email:"", 
            password:"", 
            password2:"",
            userNames: []
        }
    }

    componentDidMount(){
        this.getUserNames();
    }

    async getUserNames(){
        const response = await onSnapshot(collection(db, 'usernames'), snapshop => this.setState({userNames: snapshop.docs.map(doc => ({
            data: doc.data()
        }))}));
    }

    async Register(e){

        e.preventDefault();

        const firstname = this.state.firstname;
        const lastname = this.state.lastname;
        const birthday = this.state.birthday;
        const adress = this.state.adress;
        const phone = this.state.phone;
        const username = this.state.username;
        const email = this.state.email;
        const password = this.state.password;
        const password2 = this.state.password2;
        const userNames = this.state.userNames;

        function validate(){
            
            let valid, valid1, valid2;

            if ( userNames.indexOf(username) > -1 ) { valid1 = false; }
            else { valid1 = true; } 

            if (password !== password2) { valid2 = false; }
            else { valid2 = true; }

            if ( valid1 && valid2 == true ) { valid = true }
            else { valid = false }

            return valid;
        }

        function createUser(){

            createUserWithEmailAndPassword(auth, email, password).then((userCredential)=>{

                userCredential.user.displayName = username; 
                userCredential.user.phoneNumber = phone;

                setDoc(doc(db, "users", auth.currentUser.uid), {
                    
                    username: username,
                    firstname: firstname,
                    lastname: lastname,
                    birthday: birthday,
                    adress: adress,
                    phone: phone,
                    id: auth.currentUser.uid,
                    
                    imgurl: "",
                    facebookProfileURL:"",
                    twitterProfileURL:"",
                    instagramProfileURL:""
                });

                //send to username
                setDoc(doc(db, "usernames", auth.currentUser.uid),{
                    username: username
                })

                //Redirect to login screen after 1 seconds
                setTimeout(function(){
                    window.location = "/profile/";
                }, 750);

            }).catch((err)=>{
                console.log(err);
            });
        }

        if ( validate().valueOf() === true ) { createUser(); }
        else { alert('Registaration failed !'); }
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
                    <h1 className='text-center mb-5'>Register Form</h1>
                    <Form onSubmit={this.Register} className="mx-auto"> 
                                       
                        <div className='d-flex'>
                            <Form.Group className="mb-3 w-100" id="formBasicEmail">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter First Name"   
                                    id='register_firstname'
                                    name='firstname'
                                    onChange={this.handleChange}
                                    value={this.state.firstname} 
                                    pattern={'[A-Za-z]{2,12}$'}
                                />
                            </Form.Group> 

                            <Form.Group className="mb-3 w-100 mx-2" id="formBasicEmail">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter Last Name"                           
                                    id='register_lastname'
                                    name='lastname'
                                    onChange={this.handleChange}
                                    value={this.state.lastname} 
                                    pattern={'[A-Za-z]{2,12}$'}
                                />
                            </Form.Group>    
                        </div>

                        <Form.Group className="mb-3" id="formBasicEmail">
                            <Form.Label>Age</Form.Label>
                            <Form.Control 
                                type="number" 
                                placeholder="Enter date of birth"                           
                                id='register_birthday'
                                name='birthday'
                                onChange={this.handleChange}
                                value={this.state.birthday} 
                                pattern={'[0-9]{4}$'}
                                minLength={4}
                                maxLength={4}
                            />
                        </Form.Group>

                        <div className='d-flex'>

                            <Form.Group className="mb-3 w-100" id="formBasicEmail">
                                <Form.Label>Current Adress</Form.Label>
                                <Form.Control 
                                    type='text'
                                    placeholder="Enter City Where You Live"                            
                                    id='register_adress'
                                    name='adress'
                                    onChange={this.handleChange}
                                    value={this.state.adress} 
                                    pattern={'[A-Za-z]{4,16}$'}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3 w-100 mx-2" id="formBasicEmail">
                                <Form.Label>Contact No</Form.Label>
                                <Form.Control 
                                    type="tel"
                                    placeholder="Enter tel no" 
                                    id='register_tel'
                                    name='phone'
                                    onChange={this.handleChange}
                                    value={this.state.phone}
                                    pattern={'[0-9]{11}$'}
                                />
                            </Form.Group>
                        </div>
                        
                        <div className="d-flex">
                            <Form.Group className="mb-3 w-100" id="formBasicEmail">
                                <Form.Label>User Name *</Form.Label>
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
                                <span className='form-text'>*Username must consist of letters and numbers</span>
                            </Form.Group>

                            <Form.Group className="mb-3 w-100 mx-2" id="formBasicEmail">
                                <Form.Label>Email address *</Form.Label>
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
                        </div>

                        <div className='d-flex'>     
                            <Form.Group className="mb-3 w-100" id="formBasicPassword1">
                                <Form.Label>Password *</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    placeholder="Password" 
                                    id="register_password"  
                                    name='password'
                                    onChange={this.handleChange}
                                    value={this.state.password}
                                    minLength={8}
                                    maxLength={16}
                                    pattern={'[a-zA-Z0-9.-]{8,16}$'}
                                    required
                                />
                                <span className='form-text'>*Must contain at least one uppercase letter, lowercase letter, and number.</span>
                            </Form.Group>
                           
                            <Form.Group className="mb-3 w-100 mx-2" id="formBasicPassword2">
                                <Form.Label>Confirm Password *</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    placeholder="Password" 
                                    id='register_password2'
                                    name='password2'
                                    onChange={this.handleChange}
                                    value={this.state.password2}
                                    minLength={8}
                                    maxLength={16}
                                    pattern={'[a-zA-Z0-9.-]{8,16}$'}
                                    required
                                />
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
            </div>    
        )
    }
}

export default Register;