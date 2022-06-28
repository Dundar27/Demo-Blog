import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
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
            birthday:"",
            imgurl: "",
            usermessage:"",
            facebookProfileURL:"",
            twitterProfileURL:"",
            instagramProfileURL:""
        }
    }

    writeUserData = async(e) =>{
    
        e.preventDefault();

        const user = auth.currentUser.uid;
        const docRef = doc(db, 'users/'+user);

        const values = new Array(11);
        values[0] = this.state.firstname;
        values[1] = this.state.lastname;
        values[2] = this.state.username;
        values[3] = this.state.phone;
        values[4] = this.state.adress;
        values[5] = this.state.birthday;
        values[6] = this.state.imgurl;
        values[7] = this.state.usermessage;
        values[8] = this.state.facebookProfileURL;
        values[9] = this.state.twitterProfileURL;
        values[10] = this.state.instagramProfileURL;


        for(var i = 0; i<values.length; i++){
            switch(i){
                case 0:
                    if(values[0] !== "" || null){
                        await updateDoc(docRef, {firstname: values[0]});
                    }
                    break;
                case 1:
                    if(values[1] !== "" || null){
                        await updateDoc(docRef, {lastname: values[1]});
                    }
                    break;
                case 2:
                    if(values[2] !== "" || null){
                        await updateDoc(docRef, {username: values[2]});
                        updateProfile(auth.currentUser, {displayName:values[2]});
                    }
                    break;
                case 3:
                    if(values[3] !== "" || null){
                        await updateDoc(docRef, {phone: values[3]});
                        updateProfile(auth.currentUser, {phoneNumber:values[3]});
                    }
                    break;
                case 4:
                    if(values[4] !== "" || null){
                        await updateDoc(docRef, {adress: values[4]});
                    }
                    break;
                case 5:
                    if(values[5] !== "" || null){
                        await updateDoc(docRef, {birthday: values[5]});
                    }
                    break;  
                case 6:
                    if(values[6] !== "" || null){
                        await updateDoc(docRef, {imgurl: values[6]});
                        updateProfile(auth.currentUser, {photoURL:values[6]});
                    }
                    break;  
                case 7:
                    if(values[7] !== "" || null){
                        await updateDoc(docRef, {usermessage: values[7]});
                    }
                    break;
                case 8:
                    if(values[8] !== "" || null){
                        await updateDoc(docRef, {facebookProfileURL: values[8]});
                    }
                    break;  
                case 9:
                    if(values[9] !== "" || null){
                        await updateDoc(docRef, {twitterProfileURL: values[9]});
                    }
                    break;
                case 10:
                    if(values[10] !== "" || null){
                        await updateDoc(docRef, {instagramProfileURL: values[10]});
                    }
                    break;      
                default:
                    console.log('error code');                     
            }
        }
        alert("Success Update Profile Datas");
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
                    <div className='d-flex'>
                        <Form.Group className="mb-3 w-100 mx-1" id="formBasicEmail">
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

                        <Form.Group className="mb-3 w-100 mx-1" id="formBasicEmail">
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
                    </div>
                    <div className='d-flex'>
                        <Form.Group className="mb-3 w-100 mx-1" id="formBasicEmail">
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

                        <Form.Group className="mb-3 w-100 mx-1" id="formBasicEmail">
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
                    </div>

                    <div className='d-flex'>
                        <Form.Group className="mb-3 w-100 mx-1" id="formBasicEmail">
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

                        <Form.Group className="mb-3 w-100 mx-1" id="formBasicEmail">
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
                    </div>

                    <Form.Group className="mb-3" id="formBasicEmail">
                        <Form.Label>Abouth Me</Form.Label>
                        <Form.Control 
                            type="text" 
                            name='usermessage'
                            id='user_message'
                            maxLength={350} 
                            onChange={this.handleChange}
                            value={this.state.usermessage}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" id="formBasicEmail">
                        <Form.Label>Img Url</Form.Label>
                        <Form.Control 
                            type='url'
                            name='imgurl'
                            id='user_imgurl' 
                            onChange={this.handleChange}
                            value={this.state.imgurl}
                        />
                    </Form.Group>

                    <Row>
                        <Col sm={4}>
                            <Form.Group className="mb-3" id="formBasicEmail">
                                <Form.Label>Facebook Profile Url</Form.Label>
                                <Form.Control 
                                    type='url'
                                    name='facebookProfileURL'
                                    id='user_socialURL1' 
                                    onChange={this.handleChange}
                                    value={this.state.facebookProfileURL}
                                />
                            </Form.Group>
                        </Col>
                        <Col sm={4}>
                            <Form.Group className="mb-3" id="formBasicEmail">
                                <Form.Label>Twitter Profile Url</Form.Label>
                                <Form.Control 
                                    type='url'
                                    name='twitterProfileURL'
                                    id='user_socialURL2' 
                                    onChange={this.handleChange}
                                    value={this.state.twitterProfileURL}
                                />
                            </Form.Group>
                        </Col>
                        <Col sm={4}>
                            <Form.Group className="mb-3" id="formBasicEmail">
                                <Form.Label>İnstagram Profile Url</Form.Label>
                                <Form.Control 
                                    type='url'
                                    name='instagramProfileURL'
                                    id='user_socialURL3' 
                                    onChange={this.handleChange}
                                    value={this.state.instagramProfileURL}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
            
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