import React from "react";
import auth from "./Firebase";
import { updateEmail, updatePassword } from "firebase/auth";
import {Tab, Row, Col, Nav, Form} from "react-bootstrap";


const ProfileSettings = (props) => {

    const user = auth.currentUser;

    return (
        <div className="p-3">
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="first">Update Email</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second">Update Password</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                            
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                            
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div>
    )
} 

export default ProfileSettings;