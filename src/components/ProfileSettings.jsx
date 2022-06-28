import React, {useState} from 'react';
import { Row, Col, Button} from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import { auth } from './Firebase';
import UserAbouthForm from './UserAbouthForm';

const ProfileSettings = (props) => {

    const [lgShow, setLgShow] = useState(false);

    return (
        <div className='p-3' id='profilesettings-component'>
            {props.userData.map(user => (
            <div>
                <div className="responseProfile">
                    <h5>Abouth</h5> <br />
                    <div className='my-1'>
                        <p id='user_message'>
                            Welcome to my profile. Hello, my name is {user.data.firstname}. I am {new Date().getFullYear()-(user.data.birthday) } years old. I live in {user.data.adress}. If you want to contact me, you can use my social media. Nice the meet you.  
                        </p>
                    </div> 
                    
                    <Row>
                        <Col sm={5}>
                            <div className='d-flex justify-content-between my-2'>
                                <div>
                                    <span>First Name :</span>
                                </div>
                                <div>{user.data.firstname}</div>    
                            </div> 
                            <div className='d-flex justify-content-between my-3'>
                                <div>
                                    <span>Age :</span>
                                </div>
                                <div>{user.data.birthday}</div>    
                            </div> 
                            <div className='d-flex justify-content-between my-3'>
                                <div>
                                    <span>Mail Adress :</span>
                                </div>
                                <div>{auth.currentUser.email}</div>    
                            </div> 
                        </Col>

                        <Col sm={2}></Col>

                        <Col sm={5}>
                            <div className='d-flex justify-content-between my-2'>
                                <div>
                                    <span>Last Name :</span>
                                </div>
                                <div>{user.data.lastname}</div>    
                            </div> 
                            <div className='d-flex justify-content-between my-3'>
                                <div>
                                    <span>Current Adress :</span>
                                </div>
                                <div>{user.data.adress}</div>    
                            </div> 
                            <div className='d-flex justify-content-between my-3'>
                                <div>
                                    <span>Contact No :</span>
                                </div>
                                <div>{user.data.phone}</div>    
                            </div> 
                        </Col>
                    </Row>
                </div>

                <div className='my-2'>
                    <Button variant="warning" className='px-1' onClick={() => setLgShow(true)}>
                        <i class="fas fa-edit text-light"></i>
                        <span className='text-light mx-2'>Edit</span>
                    </Button>
                </div>
                <Modal
                    size="lg"
                    show={lgShow}
                    onHide={() => setLgShow(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                            Large Modal
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <UserAbouthForm/>
                    </Modal.Body>
                </Modal>
            </div>
            ))}
        </div>
    );
}

export default ProfileSettings;