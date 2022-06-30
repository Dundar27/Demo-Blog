import React from "react";
import { Row, Col, Card, ListGroup } from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";
import { auth } from './Firebase';

const ProfileCard = (props) => {

    return (
        <div>
            {props.userData.map(user =>(
                <Card>
                    <div className="text-center p-3">
                        {(user.data.imgurl !== "" || null || undefined || NaN) ? 
                        (<img
                        src={user.data.imgurl}
                        className="avatar w-100"
                        alt="avatar"
                        />):(
                        <img
                        src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        className="avatar w-100"
                        alt="avatar"
                        /> )}
                                    
                        <h3 className="mt-3">
                        {user.data.username}
                        </h3>
                    </div>
                    <div>
                        <ListGroup>

                            <ListGroup.Item className="ListGroup-Item text-muted text-center">
                                Profile 
                            </ListGroup.Item>

                            <div>
                                <ListGroup.Item className="ListGroup-Item">
                                    <Row>
                                        <Col sm={6}>
                                            <span className="fw-bold">
                                                First Name :
                                            </span>
                                        </Col>
                                        <Col sm={6}>
                                            <span className="text-center">
                                                {user.data.firstname}
                                            </span>  
                                        </Col> 
                                    </Row>               
                                </ListGroup.Item>

                                <ListGroup.Item className="ListGroup-Item">
                                    <Row>
                                        <Col sm={6}>
                                            <span className="fw-bold">
                                                Last Name :
                                            </span>
                                        </Col> 
                                        <Col sm={6}>
                                            <span className="text-center">
                                                {user.data.lastname}
                                            </span>
                                        </Col> 
                                    </Row> 
                                </ListGroup.Item>

                                <ListGroup.Item className="ListGroup-Item">                     
                                    <Row>
                                        <Col sm={6}>
                                            <span className="fw-bold">
                                                Age :
                                            </span>
                                        </Col> 
                                        <Col sm={6}>
                                            <span className="text-center">
                                                {new Date().getFullYear()-(user.data.birthday)}
                                            </span>
                                        </Col> 
                                    </Row> 
                                </ListGroup.Item>

                                <ListGroup.Item className="ListGroup-Item">
                                    <Row>
                                        <Col sm={6}>
                                            <span className="fw-bold">
                                                Adress :
                                            </span>
                                        </Col> 
                                        <Col sm={6}>
                                            <span className="text-center">
                                                {user.data.adress}
                                            </span>
                                        </Col> 
                                    </Row> 
                                </ListGroup.Item>

                                <ListGroup.Item className="ListGroup-Item">
                                    <Row>
                                        <Col sm={6}>
                                            <span className="fw-bold">
                                                Contact No :
                                            </span>
                                        </Col> 
                                        <Col sm={6}>
                                            <span className="text-center">
                                                {user.data.phone}
                                            </span>
                                        </Col> 
                                    </Row> 
                                </ListGroup.Item>

                                <ListGroup.Item className="ListGroup-Item">
                                    <Row>
                                        <Col sm={12}>
                                            <span className="fw-bold">
                                                Mail Adress :
                                            </span>
                                            <br />
                                            <span className="text-center">
                                                {auth.currentUser.email}
                                            </span>
                                        </Col> 
                                    </Row> 
                                </ListGroup.Item>
                            </div>
                        </ListGroup>
                    </div> <br />

                    <div className="panel panel-default my-2 text-center">
                        <div className="panel-heading"><h6>Social Media</h6></div>
                        <div className="panel-body">
                        {(user.data.facebookProfileURL !== "" || null)  ?
                            (<a href={user.data.facebookProfileURL} target="_blank" rel="noopener noreferrer" className="mx-2">
                                <i className="fab fa-facebook fa-2x"></i>
                            </a>):(
                            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="mx-2">
                                <i className="fab fa-facebook fa-2x"></i>
                            </a>)
                            }
                            {(user.data.twitterProfileURL !== "" || null) ?
                            (<a href={user.data.twitterProfileURL} target="_blank" rel="noopener noreferrer" className="mx-2">
                                    <i className="fab fa-twitter fa-2x"></i>
                            </a>):(
                            <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer" className="mx-2">
                                <i className="fab fa-twitter fa-2x"></i>
                            </a>)
                            }
                            {(user.data.instagramProfileURL !== "" || null) ?  
                            (<a href={user.data.instagramProfileURL} target="_blank" rel="noopener noreferrer" className="mx-2">
                                    <i className="fab fa-instagram fa-2x"></i>
                            </a>):(
                            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="mx-2">
                                <i className="fab fa-instagram fa-2x"></i>
                            </a>)
                            }
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    )
}

export default ProfileCard;