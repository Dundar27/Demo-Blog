import React from "react";
import { Row, Col } from 'react-bootstrap';
import db from './Firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import BlogPosts from './BlogPosts';

class Catagori extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      posts:[]
    };
  }

  componentDidMount(){
    this.getPosts();
  }

  async getPosts() {
    const response = await onSnapshot(
      query(
        collection(db, 'blogs'),
        where('catagories', '==', this.props.catagori)
      ),
      (snapshop) =>
        this.setState({
          posts: snapshop.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          })),
        })
    );
  }

  render(){
    return(
      <div>
        <Row>
          <Col sm={4}>
            <BlogPosts BlogPosts={this.state.posts} />
          </Col>
        </Row>
      </div>
    )
  }
}

export default Catagori;