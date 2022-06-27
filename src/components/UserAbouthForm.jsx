import React from 'react';
import { Form, Button } from 'react-bootstrap';
import db from './Firebase';
import { doc, updateDoc } from "firebase/firestore";
import { auth } from './Firebase';
import { updateProfile } from "firebase/auth";


class UserAbouthForm extends React.Component{

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state={
            firstname:"", 
            lastname:"",
            username:"",
            phone:"",
            adress:"",
            email:"",
            imgurl: ""
        }
    }

    writeUserData = async(e) =>{
    
        //e.preventDefault();

        const user = auth.currentUser.uid;
        const docRef = doc(db, 'users/'+user)

        await updateDoc(docRef, {

            firstname : this.state.firstname,
            lastname : this.state.lastname,
            username: this.state.username,
            birthday : this.state.birthday,
            adress : this.state.adress,  
            phone : this.state.phone,
            imgurl: this.state.imgurl
        })

        updateProfile(auth.currentUser, {
            displayName: this.state.username,
            phoneNumber: this.state.phone,
            photoURL: this.state.imgurl
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
                            placeholder="Enter First Name"   
                            id='user_firstname'
                            name='firstname'
                            onChange={this.handleChange}
                            value={this.state.firstname} 
                            pattern={'[A-Za-z]{2,12}$'}
                        />
                    </Form.Group> 

                    <Form.Group className="mb-3" id="formBasicEmail">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter Last Name"                           
                            id='user_lastname'
                            name='lastname'
                            onChange={this.handleChange}
                            value={this.state.lastname} 
                            pattern={'[A-Za-z]{2,12}$'}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" id="formBasicEmail">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter user name"                           
                            id='user_username'
                            name='username'
                            onChange={this.handleChange}
                            value={this.state.username} 
                            pattern={'[a-zA-Z0-9._]{6,16}$'}
                        />
                    </Form.Group>   

                    <Form.Group className="mb-3" id="formBasicEmail">
                        <Form.Label>Age</Form.Label>
                        <Form.Control 
                            type="number" 
                            placeholder="Enter date of birth"                           
                            id='user_birthday'
                            name='birthday'
                            onChange={this.handleChange}
                            value={this.state.birthday} 
                            pattern={'[0-9]{4}$'}
                            minLength={4}
                            maxLength={4}
                        />
                    </Form.Group>  

                    <Form.Group className="mb-3" id="formBasicEmail">
                        <Form.Label>Current Adress</Form.Label>
                        <Form.Control 
                            type='text'
                            placeholder="Enter City Where You Live"                            
                            id='user_adress'
                            name='adress'
                            onChange={this.handleChange}
                            value={this.state.adress} 
                            pattern={'[A-Za-z]{4,16}$'}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" id="formBasicEmail">
                        <Form.Label>Contact No</Form.Label>
                        <Form.Control 
                            type="tel"
                            placeholder="Enter tel no" 
                            id='user_tel'
                            name='phone'
                            onChange={this.handleChange}
                            value={this.state.phone}
                            pattern={'[0-9]{11}$'}
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