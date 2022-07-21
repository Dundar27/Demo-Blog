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
      writerPosts:[],
      searchQuery:""
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

  searchWriterPostProp = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  render() {

    let filtered = this.state.writerPosts
      .filter((writer) => {
        return (
          writer.data.username
            .toLowerCase()
            .indexOf(this.state.searchQuery.toLowerCase()) !== -1
        );
      })
      .sort((a, b) => {
        return a.id < b.id ? 1 : a.id > b.id ? -1 : 0;
      });

    return (
      <div className="p-4" id="writers-component">
        <div className='my-5'>
          <h1>Welcome To Our Blog Page</h1>
          <hr /> <p><i>You can find a lot of writers on the writers page</i></p>
        </div>

        <SearchBar searchProp={this.searchWriterPostProp}/>

        <div>
          <WriterPosts WriterPosts={filtered}/>
        </div>
      </div>
    );
  }
}

export default Writers;