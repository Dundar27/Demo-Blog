import React from "react";
import { Row, Col, Tabs, Tab } from "react-bootstrap";
import db from './Firebase';
import { collection, onSnapshot, query, where } from "firebase/firestore";
import ProfileSettings from "./ProfileSettings";
import AccountSettings from "./AccountSettings";
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

                <ProfileSettings 
                  userData={this.state.userData}
                />

              </Tab>
              <Tab eventKey="account" title="Account">
                <AccountSettings />
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