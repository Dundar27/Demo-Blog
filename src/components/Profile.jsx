import React from "react";
import { Row, Col, ListGroup, Card, Tabs, Tab } from "react-bootstrap";
import db from './Firebase';
import { collection, onSnapshot, query, where } from "firebase/firestore";
import ProfileSettings from "./ProfileSettings";

class Profile extends React.Component {

  constructor(props){
    super(props);
    this.state= {
      userData: []
    }
  }

  componentDidMount(){
    this.getUserData();
  }

  userID = toString(this.props.userID);

  async getUserData() {
    const response = await onSnapshot(query(collection(db, 'users'), where("id", "==", this.userID)), snapshop => this.setState({userData: snapshop.docs.map(doc => ({
      id:doc.id,data:doc.data()
    }))}));
    
    console.log(response)
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
                    Activity 
                  </ListGroup.Item>

                  <ListGroup.Item className="ListGroup-Item">
                    <Row>
                      <Col sm={8}>
                        <span className="fw-bold">
                          Followers :
                        </span>
                      </Col>
                      <Col sm={4}>
                        <span className="text-center">
                          {}
                        </span>  
                      </Col> 
                    </Row>               
                  </ListGroup.Item>

                  <ListGroup.Item className="ListGroup-Item">
                    <Row>
                      <Col sm={8}>
                        <span className="fw-bold">
                          Posts :
                        </span>
                      </Col> 
                      <Col sm={4}>
                        <span className="text-center">
                          {}
                        </span>
                      </Col> 
                    </Row> 
                  </ListGroup.Item>

                  <ListGroup.Item className="ListGroup-Item">                     
                    <Row>
                      <Col sm={8}>
                        <span className="fw-bold">
                          Likes :
                        </span>
                      </Col> 
                      <Col sm={4}>
                        <span className="text-success text-center">
                          {}
                        </span>
                      </Col> 
                    </Row> 
                  </ListGroup.Item>

                  <ListGroup.Item className="ListGroup-Item">
                    <Row>
                      <Col sm={8}>
                        <span className="fw-bold">
                          Dislikes :
                        </span>
                      </Col> 
                      <Col sm={4}>
                        <span className="text-danger text-center">
                          {}
                        </span>
                      </Col> 
                    </Row> 
                  </ListGroup.Item>

                  <ListGroup.Item className="ListGroup-Item text-center fw-bold">
                    <span className="px-2">
                      Average Rating :
                    </span>
                     <br />
                    <span className="px-2 text-warning bg-secondary">
                     {}
                    </span>      
                  </ListGroup.Item>

                </ListGroup>
              </div>
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
            <Tab eventKey="statistics" title="Statistics">
              
            </Tab>
          </Tabs>
          </Col>
        </Row>
      </div>
    </div>
  );
  }
}


export default Profile;