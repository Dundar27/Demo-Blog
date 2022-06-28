import React from "react";
import { Row, Col, ListGroup, Card, Tabs, Tab } from "react-bootstrap";
import db from './Firebase';
import { auth } from './Firebase';
import { collection, onSnapshot, query, where } from "firebase/firestore";
import ProfileSettings from "./ProfileSettings";

class Settings extends React.Component {

  constructor(props){
    super(props);
    this.state= {
      userData: []
    }
  }

  componentDidMount(){
    this.getUserData();
  }

  //my_id = "eerRtpnrN1TpmSVL7h8mbjEhCIW2";

  async getUserData() {
    const response = await onSnapshot(query(collection(db, 'users'), where("id", "==", this.props.userControl.uid)), snapshop => this.setState({userData: snapshop.docs.map(doc => ({
      id:doc.id,data:doc.data()
    }))}));
  }

  render(){

  return (
    <div id="account-component">
      <div className="p-5">
        <Row>
          <Col sm={3}>
            <Card>
              <div className="text-center p-3">
                <img
                  src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png"
                  className="avatar w-100"
                  alt="avatar"
                />             
                <h3 className="mt-3">
                  {this.state.userData.map((user)=>(user.data.username))}
                </h3>
              </div>
              <div>
                <ListGroup>

                  <ListGroup.Item className="ListGroup-Item text-muted text-center">
                    Profile 
                  </ListGroup.Item>

                  {this.state.userData.map(user =>(
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
                              {user.data.birthday}
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
                  ))}
                </ListGroup>
              </div> <br />
              <div className="panel panel-default my-2 text-center">
                  <div className="panel-heading"><h6>Social Media</h6></div>
                  <div className="panel-body">
                      <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="mx-2">
                          <i className="fab fa-facebook fa-2x"></i>
                      </a>
                      <a href="https://www.github.com/" target="_blank" rel="noopener noreferrer" className="mx-2">
                          <i className="fab fa-github fa-2x"></i>
                      </a>
                      <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer" className="mx-2">
                          <i className="fab fa-twitter fa-2x"></i>
                      </a>
                      <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="mx-2">
                          <i className="fab fa-instagram fa-2x"></i>
                      </a>
                  </div>
              </div>
            </Card>
          </Col>

          <Col sm={9}>
          <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
            <Tab eventKey="profile" title="Profile">

              <ProfileSettings 
                userData={this.state.userData}
              />

            </Tab>
            <Tab eventKey="account" title="Account">
              
            </Tab>
          </Tabs>
          </Col>
        </Row>
      </div>
    </div>
  );
  }
}


export default Settings;