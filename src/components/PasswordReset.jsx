import React from "react";
import { Form, Button, Toast } from 'react-bootstrap';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./Firebase";

class passwordReset extends React.Component{

    constructor(props){
        super(props);
        this.sendMail = this.sendMail.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state={
            email:"",
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

    sendMail = async(e) => {

        e.preventDefault();

        sendPasswordResetEmail(auth, this.state.email)
        .then(() => {
            this.toggleShowA();
        })
        .catch((error) => {
            alert(error.code);
            alert(error.message);
        });
    }

    handleChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    render(){
        return(
            <div className="container my-5 w-50" id="passwordreset">
                <h2 className="text-center">Password Reset</h2> <br />
                <Form onSubmit={this.sendMail}>
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
                <button onClick={()=>(history.back())} className='btn btn-outline-primary w-100 my-3'>
                    <h6 className='m-0'>Back to</h6>
                </button>

                <Toast show={this.state.showA} onClose={this.toggleShowA} className="toast" id="toast">
                    <Toast.Header>
                        <i className="fas fa-at"></i>
                        <strong className="me-auto mx-1">Demo Blog Page</strong>
                        <small>0 mins ago</small>
                    </Toast.Header>
                    <Toast.Body className="mx-2">Successfuly</Toast.Body>
                </Toast>  
            </div>
        )
    }
}

export default passwordReset;