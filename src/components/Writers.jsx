import React from "react";
import SearchBar from './SearchBar';
import WriterPosts from "./WriterPosts";
import db from "./Firebase";
import {
  collection,
  query,
  onSnapshot
} from "firebase/firestore";

class Writers extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      writerPosts:[]
    }
  }

  componentDidMount(){
    this.getWritersData();
  }  

  async getWritersData(){
    const response = await onSnapshot(
      query(collection(db, "writers")),
      (snapshop) =>
        this.setState({
          writerPosts: snapshop.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          })),
        })
    );
  }

  render() {
    return (
      <div className="p-4" id="writers-component">
        <div className='my-5'>
          <h1>Welcome To Our Blog Page</h1>
          <hr /> <p><i>You can find a lot of writers on the writers page</i></p>
        </div>

        <SearchBar />

        <div>
          <WriterPosts WriterPosts={this.state.writerPosts}/>
        </div>
      </div>
    );
  }
}

export default Writers;