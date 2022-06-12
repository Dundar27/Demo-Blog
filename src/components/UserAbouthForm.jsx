import React from 'react';
import { Form, Button } from 'react-bootstrap';
import db from './Firebase';
import { doc, setDoc } from "firebase/firestore";
import { auth } from './Firebase';


class UserAbouthForm extends React.Component{

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state={
            firstname:"", 
            lastname:"",
            phone:"",
            adress:"",
            email:"",
            imgurl: ""
        }
    }

    writeUserData = async(e) =>{
    
        e.preventDefault();

        const user = auth.currentUser.uid;
        
        setDoc(doc(db, 'users/'+user), {

            firstname : this.state.firstname,
            lastname : this.state.lastname,
            phone : this.state.phone,
            adress : this.state.adress,
            birthday : this.state.birthday,
            email: this.state.email,
            imgurl: this.state.imgurl
        })
    }


    handleChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    render(){
        return (
            <div className='p-3 container' id='userabouthform-component'>
                <Form className="mx-auto" onSubmit={this.writeUserData} > 

                    <Form.Group className="mb-3" id="formBasicEmail">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            name='firstname'
                            id='user_firstname'
                            placeholder="Enter First Name"
                            onChange={this.handleChange}
                            value={this.state.firstname} 
                            pattern={'[A-Za-z]{2,12}$'}
                            required
                        />
                    </Form.Group> 

                    <Form.Group className="mb-3" id="formBasicEmail">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            name='lastname'
                            id='user_lastname'
                            placeholder="Enter Last Name"
                            onChange={this.handleChange}
                            value={this.state.lastname} 
                            pattern={'[A-Za-z]{2,12}$'}
                            required
                        />
                    </Form.Group>    
                    
                    <Form.Group className="mb-3" id="formBasicEmail">
                        <Form.Label>Contact No</Form.Label>
                        <Form.Control 
                            type="tel" 
                            name='phone'
                            id='user_tel'
                            placeholder="Enter tel no" 
                            onChange={this.handleChange}
                            value={this.state.phone}
                            pattern={'[0-9]{11}$'}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" id="formBasicEmail">
                        <Form.Label>Current Adress</Form.Label>
                        <Form.Control 
                            type='text' 
                            name='adress'
                            id='user_adress'
                            placeholder="Enter City Where You Live"
                            onChange={this.handleChange}
                            value={this.state.adress} 
                            pattern={'[A-Za-z]{4,16}$'}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" id="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                            type="email" 
                            name='email'
                            id='user_mail'
                            placeholder="Enter email"
                            onChange={this.handleChange}
                            value={this.state.email} 
                            pattern={'[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$'}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" id="formBasicEmail">
                        <Form.Label>Img Url</Form.Label>
                        <Form.Control 
                            type="file" 
                            name='imgurl'
                            id='user_imgurl' 
                            onChange={this.handleChange}
                            value={this.state.imgurl}
                        />
                    </Form.Group>
            

                    <div className='d-flex'>
                        <Button className='w-100' variant="outline-success" type="submit">
                            Save
                        </Button>
                    </div>
                </Form>
            </div>
        );
    }
}

export default UserAbouthForm ;