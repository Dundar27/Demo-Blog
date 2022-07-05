import React from "react";
import db from './Firebase';
import { auth } from './Firebase';
import { updateEmail, updatePassword, deleteUser } from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";
import { Form, Button, Toast } from "react-bootstrap";


class ProfileSettings extends React.Component {

    constructor(props){
        super(props);
        this.newEmail = this.newEmail.bind(this);
        this.newPassword = this.newPassword.bind(this);
        this.deleteAccount = this.deleteAccount.bind(this);
        this.handleChange = this.handleChange.bind(this);
        
        this.state={
            email:"", 
            password:"",
            showA: false
        }
    }

    toggleShowA = () => {
        if(this.state.showA){
            this.setState({showA : false})
        }else{
            this.setState({showA : true})
        }
    };

    user = auth.currentUser;
    //blogsRef = query(collection(db ,"blogs"), where("writer", "==", this.user.displayName));
    userRef = doc(db, "users", this.user.uid);

    newEmail = async(e) => {
        e.preventDefault();

        updateEmail(this.user, this.state.email).then(() => {
            this.toggleShowA();
        }).catch((error) => {
            alert(error.code);
            alert(error.message);
        });
    }

    newPassword = async(e) => {
        e.preventDefault();

        updatePassword(this.user, this.state.password).then(() => {
            this.toggleShowA();
        }).catch((error) => {
            alert(error.code);
            alert(error.message);
        });
    }

    deleteAccount = async(e) => {
        e.preventDefault();

        deleteUser(this.user).then(()=> {
    
            deleteDoc(this.userRef).then(()=>{
                
                this.toggleShowA();
    
            }).catch((error) => {
                alert(error.code);
                alert(error.message);
            }); 

        }).catch((error) => {
            alert(error.code);
            alert(error.message);
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
                        Update
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
                        Update
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
                <Toast show={this.state.showA} onClose={this.toggleShowA} className="toast" id="toast">
                    <Toast.Header>
                        <i className="fas fa-at"></i>
                        <strong className="me-auto mx-1">Demo Blog Page</strong>
                        <small>0 mins ago</small>
                    </Toast.Header>
                    <Toast.Body className="mx-2 text-success">Successfuly</Toast.Body>
                </Toast>
            </div>
        )
    }
} 

export default ProfileSettings;