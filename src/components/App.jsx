import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
//Components
import Layout from './Layout';
import Footer from './Footer';
import Header from './Header';
import Blogs from './Blogs';
import Account from './Account';
import Register from './Register';
import Login from './Login';
import NoPage from './NoPage';
//Style files
import './style.css'
//Database functions
import db from './Firebase';
import {collection, query, onSnapshot} from "firebase/firestore";

class App extends React.Component {

  state= {
    blogs: [],  //To keep data of blog cards
    searchQuery: "", // To filter blog cards
    isLoggedIn: true 
  }

  componentDidMount() {
    this.getBlogs();
  }

  // Function to get blog data from firebase database
  async getBlogs() {
    const response = await onSnapshot(query(collection(db, 'blogs')), snapshop => this.setState({blogs: snapshop.docs.map(doc => ({
      id:doc.id,data:doc.data()
    }))}));
    
    console.log(response)
  }

  //Get data in search button
  searchBlogProp = (event) =>  {
    this.setState({searchQuery: event.target.value});
    console.log(event.target.value);
  }

  render(){

    //Function to remove case insensitivity of data in search button
    let filteredBlogs = this.state.blogs.filter(
      (blog) => {
          return blog.data.title.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) !== -1
      }
    ).sort((a, b) => {
        return a.id < b.id ? 1 : a.id > b.id ? -1 : 0;
    });

    return (
        <BrowserRouter>
          <Routes>
              <Route path="/register/" element={
                <div>
                  <Layout/>
                  <Register /> 
                </div>}
              />
              <Route path="/login/" element={
                <div>
                  <Layout/>
                  <Login /> 
                </div>}
              />
              <Route path='/account/' element={
                <div>
                  <Layout/>
                  <Account isLoggedIn={this.state.isLoggedIn}/>
                </div>}
              />  
              <Route path="/" exact element={
                <div>
                  <Layout searchProp={this.searchBlogProp}/>
                  <Header />
                  <Blogs blogs={filteredBlogs}/>
                  <Footer />
                </div>} 
              />
            <Route path="*" element={<NoPage />} />
          </Routes> 
        </BrowserRouter>
    );
  }
}
export default App;