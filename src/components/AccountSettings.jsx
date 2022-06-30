import React from "react";
import db from './Firebase';
import { auth } from './Firebase';
import { updateEmail, updatePassword, deleteUser } from "firebase/auth";
import { doc, deleteDoc, collection, query, where } from "firebase/firestore";
import { Form, Button } from "react-bootstrap";


class ProfileSettings extends React.Component {

    constructor(props){
        super(props);
        this.newEmail = this.newEmail.bind(this);
        this.newPassword = this.newPassword.bind(this);
        this.deleteAccount = this.deleteAccount.bind(this);
        this.handleChange = this.handleChange.bind(this);
        
        this.state={
            email:"", 
            password:""
        }
    }

    user = auth.currentUser;

    newEmail = async(e) => {
        e.preventDefault();

        updateEmail(this.user, this.state.email).then(() => {
            alert("Transaction successful");
        }).catch((error) => {
            alert("Operation failed");
        });
    }

    newPassword = async(e) => {
        e.preventDefault();

        updatePassword(this.user, this.state.password).then(() => {
            alert("Transaction successful");
        }).catch((error) => {
            alert("Operation failed");
        });
    }

    deleteAccount = async(e) => {
        deleteUser(this.user).then(()=> {
            
            deleteDoc(doc(db, "users", this.user.uid));
            deleteDoc(query(collection(db, 'blogs'), where("writer", "==", this.user.displayName)));
            
            alert("Transaction successful");

            setTimeout(function(){
                window.location = "/";
            }, 500);

        }).catch((error) => {
            alert("Operation failed");
        });
    }

    handleChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    render (){
        return (
            <div className="p-3">
                <Form onSubmit={this.newEmail}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Update email address</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Enter email" 
                            name="email"
                            onChange={this.handleChange}
                            value={this.state.email}
                        />
                                            
                        <Form.Text className="text-muted">
                            Make sure you spelled correctly
                        </Form.Text>
                    </Form.Group>

                    <Button variant="warning" type="submit" className="text-light">
                        Submit
                    </Button>
                </Form>

                <Form className="my-4" onSubmit={this.newPassword}>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Update password</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Password"
                            name="password"
                            onChange={this.handleChange}
                            value={this.state.password}
                            minLength={8}
                            maxLength={16}
                            pattern={'(?=.*[A-Za-z])(?=.*[0-9]){8,16}'} 
                        />

                        <Form.Text className="text-muted">
                            Make sure you spelled correctly
                        </Form.Text>
                    </Form.Group>

                    <Button variant="warning" type="submit" className="text-light">
                        Submit
                    </Button>
                </Form> <hr />

                <Form className="my-5" onSubmit={this.deleteAccount}>
                    <Form.Label className="text-danger">
                        Permanently delete my account
                    </Form.Label> <br />

                    <Form.Text className="text-muted text-danger">
                        (When your account is deleted, your blog posts are also deleted. )
                    </Form.Text> <br /> <br />
                                        
                    <Button variant="danger" type="submit">
                        Delete Account
                    </Button>
                </Form>
            </div>
        )
    }
} 

export default ProfileSettings;