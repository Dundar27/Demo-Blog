import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
//Components
import Layout from './Layout';
import Footer from './Footer';
import Header from './Header';
import Blogs from './Blogs';
import Account from './Account';
import Blog from './Blog';
import Register from './Register';
import Login from './Login';
import NoPage from './NoPage';
//Style files
import './style.css'
//Database functions
import db, { auth } from './Firebase';
import {collection, query, onSnapshot} from "firebase/firestore";

class App extends React.Component {

  constructor(props){
    super(props);
    this.state= {
      blogs: [],  //To keep data of blog cards
      searchQuery: "", // To filter blog cards
      user: {} 
    }
  }

  componentDidMount(){
    this.getBlogs();
    this.authListener();
  }

  //Check if the user is logged in
  authListener(){
    auth.onAuthStateChanged((user)=> {
      if(user){
        this.setState({user})
      }
      else{
        this.setState({user: null})
      }
    })
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

            <Route path="/" exact element={
              <div>
                <Layout 
                  searchProp={this.searchBlogProp}
                  LogoutProp={this.LogoutProp}
                />
                <Header />
                <Blogs blogs={filteredBlogs}/>
                <Footer />
              </div>
            }/>

            <Route path="/blog/" element={
              <div>
                <Layout searchProp={this.searchBlogProp}/>
                <Blog getBlogs = {filteredBlogs} /> 
              </div>
            }/>

            <Route path="/register/" element={
              <div>
                <Layout/>
                <Register /> 
              </div>
            }/>

            <Route path="/login/" element={
              <div>
                <Layout/>
                <Login /> 
              </div>
            }/>

            <Route path='/account/' element={
              this.state.user ? 
              (<div>
                <Layout/>
                <Account/>
              </div>) :
              (<div>
                <Layout/>
                <Register/>
              </div>)}
            /> 

            <Route path="*" element={<NoPage />} />
            
          </Routes> 
        </BrowserRouter>
    );
  }
}
export default App;