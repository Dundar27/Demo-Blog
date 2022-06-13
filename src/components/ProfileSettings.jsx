import React, {useState} from 'react';
import { Row, Col, Button} from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import UserAbouthForm from './UserAbouthForm';

const ProfileSettings = (props) => {

    const [lgShow, setLgShow] = useState(false);

    return (
        <div className='p-3' id='profilesettings-component'>
            <div className="responseProfile">
               <h5>Abouth</h5> <br />
               <div className='my-1'>
                    <p>
                        Hello, my name is {}. Welcome to my profile. I {} years old and  I from {}. My favorites is {}. If you want to contact me You can use my e-mail address and phone number.   Nice the meet you.  
                    </p>
               </div>
                <Row>
                    <Col sm={5}>
                        <div className='d-flex justify-content-between my-2'>
                            <div>
                                <span>First Name :</span>
                            </div>
                            <div>{}</div>    
                        </div> 
                        <div className='d-flex justify-content-between my-3'>
                            <div>
                                <span>Contact No :</span>
                            </div>
                            <div>{}</div>    
                        </div> 
                        <div className='d-flex justify-content-between my-3'>
                            <div>
                                <span>Mail Adress :</span>
                            </div>
                            <div>{}</div>    
                        </div> 
                    </Col>

                    <Col sm={2}></Col>

                    <Col sm={5}>
                        <div className='d-flex justify-content-between my-2'>
                            <div>
                                <span>Last Name :</span>
                            </div>
                            <div>{}</div>    
                        </div> 
                        <div className='d-flex justify-content-between my-3'>
                            <div>
                                <span>Current Adress :</span>
                            </div>
                            <div>{}</div>    
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
    );
}

export default ProfileSettings;