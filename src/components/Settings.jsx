import React from "react";
import { Row, Col, Tabs, Tab, Toast } from "react-bootstrap";
import db from './Firebase';
import { auth } from './Firebase';
import { collection, onSnapshot, query, where } from "firebase/firestore";
import ProfileSettings from "./ProfileSettings";
import AccountSettings from "./AccountSettings";
import BlogsSettings from "./BlogsSettings";
import ProfileCard from "./ProfileCard";

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
              <ProfileCard userData={this.state.userData} />
            </Col>

            <Col sm={9}>
              <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="profile" title="Profile">
                  {this.props.userControl ? (<ProfileSettings userData={this.state.userData} />) : (<div></div>)}  
                </Tab>
                <Tab eventKey="account" title="Account">
                  {this.props.userControl ? (<AccountSettings />) : (<div></div>)}
                </Tab>
                <Tab eventKey="blogs" title="Blogs">
                  {auth.currentUser.emailVerified ? (<BlogsSettings />) : 
                  (<div>
                    <Toast className="toast" id="toast">
                      <Toast.Header>
                          <i className="fas fa-at"></i>
                          <strong className="me-auto mx-1">Demo Blog Page</strong>
                          <small>0 mins ago</small>
                      </Toast.Header>
                      <Toast.Body className="mx-2 text-danger">First, verify your email address.</Toast.Body>
                    </Toast>
                  </div>)}
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