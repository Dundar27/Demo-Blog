import React from 'react';
import { Row, Col } from 'react-bootstrap';
import db from './Firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import SearchBar from './SearchBar';
import BlogPosts from './BlogPosts';
import ProfileCard from './ProfileCard';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [],
      userBlogPosts: [],
      searchQuery: '',
    };
  }

  componentDidMount() {
    this.getUserData();
    this.getUserBlogPosts();
  }

  async getUserData() {
    const response = await onSnapshot(
      query(
        collection(db, 'users'),
        where('username', '==', this.props.userControl.displayName)
      ),
      (snapshop) =>
        this.setState({
          userData: snapshop.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          })),
        })
    );
  }

  async getUserBlogPosts() {
    const response = await onSnapshot(
      query(
        collection(db, 'blogs'),
        where('writer', '==', this.props.userControl.displayName)
      ),
      (snapshop) =>
        this.setState({
          userBlogPosts: snapshop.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          })),
        })
    );
  }

  searchBlogPostProp = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  render() {
    let filtered = this.state.userBlogPosts
      .filter((blog) => {
        return (
          blog.data.title
            .toLowerCase()
            .indexOf(this.state.searchQuery.toLowerCase()) !== -1
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
                <p>
                  {this.state.userData.map((user) => user.data.usermessage)}
                </p>{' '}
                <br />
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
}

export default Profile;
