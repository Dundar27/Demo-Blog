import React from "react";
import { Form, Button } from 'react-bootstrap';
import { sendPasswordResetEmail } from "firebase/auth";
import auth from "./Firebase";

class passwordReset extends React.Component{

    constructor(props){
        super(props);
        this.sendMail = this.sendMail.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state={
            email:""
        }
    }

    sendMail(){
        sendPasswordResetEmail(auth, this.state.email)
        .then(() => {
            setTimeout(function(){
                window.location = "/login/";
            }, 500);
        })
        .catch((error) => {
            alert("Operation failed");
        });
    }

    handleChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    render(){
        return(
            <div className="container">
                <Form onSubmit={this.sendMail} >
                    <Form.Group className="mb-3" id="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                            type="email" 
                            name='email'
                            id='send_mail'
                            placeholder="Enter email" 
                            onChange={this.handleChange}
                            value={this.state.email}
                            pattern={'[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$'}
                            required
                        />
                    </Form.Group>
                    <Button className='w-100' variant="outline-success" type="submit">
                        Send Mail
                    </Button>
                </Form>
            </div>
        )
    }
}

export default passwordReset;