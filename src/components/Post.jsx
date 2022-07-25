import React from "react";
import db from './Firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import PostContent from './PostContent';

class Post extends React.Component{
  
  constructor(props) {
    super(props);
    this.state = {
      post:[]
    };
  }

  componentDidMount(){
    this.getPost();
  }
  
  async getPost() {
    const response = await onSnapshot(
      query(
        collection(db, 'blogs'),
        where('id', '==', this.props.id)
      ),
      (snapshop) =>
        this.setState({
          post: snapshop.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          })),
        })
    );
  }

  render(){
    return(
      <div>
        <PostContent post={this.state.post}/>
      </div>
    )
  }
}

export default Post;