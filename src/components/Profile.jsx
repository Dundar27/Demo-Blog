import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import db from './Firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import SearchBar from './SearchBar';
import BlogPosts from './BlogPosts';
import ProfileCard from './ProfileCard';

class Profile extends React.Component {
  constructor(props){
    super(props);
    this.state= {
      userData: [],
      userBlogPosts: [],
      searchQuery:""
    }
  }

  /*
  const [userData, setUserData] = useState([]);
  const [userBlogPosts, setUserBlogPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  let { username } = useParams();

  useEffect(() => {
    onSnapshot(
      query(collection(db, 'users'), where('username', '==', username)),
      (snapshop) =>
        setUserData({
          userData: snapshop.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          })),
        })
    );
    onSnapshot(
      query(collection(db, 'blogs'), where('writer', '==', username)),
      (snapshop) =>
        setUserBlogPosts({
          userBlogPosts: snapshop.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          })),
        })
    );
  }, []);

  const searchBlogPostProp = (event) => {
    setSearchQuery({ searchQuery: event.target.value });
  };*/

  

  username  = () => {let username = useParams(); return username;}

  async getUserData() {
    const response = await onSnapshot(query(collection(db, 'users'), where("username", "==", this.username())), snapshop => this.setState({userData: snapshop.docs.map(doc => ({
      id:doc.id,data:doc.data()
    }))}));
  }

  async getUserBlogPosts() {
    const response = await onSnapshot(query(collection(db, 'blogs'), where("writer", "==", this.username())), snapshop => this.setState({userBlogPosts: snapshop.docs.map(doc => ({
      id:doc.id,data:doc.data()
    }))}));
  }

  componentDidMount(){
    this.getUserData();
    this.getUserBlogPosts();
  }

  searchBlogPostProp = (event) => {
    this.setState({ searchQuery: event.target.value });
  }
  
  render(){

  let filtered = this.state.userBlogPosts
    .filter((blog) => {
      return (
        blog.data.title.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) !== -1
      );
    })
    .sort((a, b) => {
      return a.id < b.id ? 1 : a.id > b.id ? -1 : 0;
    });

  return (
    <div id="account-component">
      <div className="p-5">
        <Row>
          <Col sm={3}>
            <ProfileCard userData={this.state.userData} />
          </Col>
          <Col sm={9}>
            <div>
              <h4>Abouth Me</h4> <br />
              <p>{this.state.userData.map((user) => user.data.usermessage)}</p> <br />
            </div>
            <div>
              <h4>My Blog Posts</h4> <hr />
              <SearchBar searchProp={this.searchBlogPostProp} />
              <BlogPosts BlogPosts={filtered} />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
  }
};

export default Profile;
