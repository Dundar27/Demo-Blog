import React from "react";
import { Row, Col, ListGroup, Card } from "react-bootstrap";
import db from './Firebase';
import { collection, onSnapshot, query, where } from "firebase/firestore";
import SearchBar from './SearchBar';
import BlogPosts from "./BlogPosts";
import ProfileCard from "./ProfileCard";

class Profile extends React.Component {

  constructor(props){
    super(props);
    this.state= {
      userData: [],
      userBlogPosts: []
    }
  }

  componentDidMount(){
    this.getUserData();
    this.getUserBlogPosts();
  }

  async getUserData() {
    const response = await onSnapshot(query(collection(db, 'users'), where("id", "==", this.props.userControl.uid)), snapshop => this.setState({userData: snapshop.docs.map(doc => ({
      id:doc.id,data:doc.data()
    }))}));
  }

  async getUserBlogPosts() {
    const response = await onSnapshot(query(collection(db, 'blogs'), where("writer", "==", this.props.userControl.displayName)), snapshop => this.setState({userBlogPosts: snapshop.docs.map(doc => ({
      id:doc.id,data:doc.data()
    }))}));
  }

  render(){

  return (
    <div id="account-component">
      <div className="p-5">
        <Row>
          <Col sm={3} >
            <ProfileCard userData={this.state.userData} />
          </Col>
          <Col sm={9}>
              <div>
                <h2>Abouth Me</h2> <br />
                <p>{this.state.userData.map(user =>(user.data.usermessage))}</p> <br />
              </div>
              <div>
                <h2>My Blog Posts</h2> <hr />

                <SearchBar searchProp={this.props.searchProp}/>

                <BlogPosts BlogPosts={this.state.userBlogPosts} />

              </div>
          </Col>
        </Row>
      </div>
    </div>
  );
  }
}

export default Profile;