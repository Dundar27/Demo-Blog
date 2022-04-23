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
import {collection, query, onSnapshot, orderBy, limit} from "firebase/firestore";

class App extends React.Component {

  constructor(props){
    super(props);
    this.state= {
      populerBlogPosts: [],   
      blogPosts: [],  //To keep data of blog cards
      searchQuery: "", // To filter blog cards
      user: {} 
    }
  }

  componentDidMount(){
    this.getBlogPosts();
    this.getPopulerBlogPosts();
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
  async getBlogPosts() {
    const response = await onSnapshot(query(collection(db, 'blogs')), snapshop => this.setState({blogPosts: snapshop.docs.map(doc => ({
      id:doc.id,data:doc.data()
    }))}));
    
    console.log(response)
  }

  // Function to get blog data from firebase database
  async getPopulerBlogPosts() {
    const response = await onSnapshot(query(collection(db, 'blogs'), orderBy('like'), limit(4)), snapshop => this.setState({populerBlogPosts: snapshop.docs.map(doc => ({
      id:doc.id,data:doc.data()
    }))}));
    
    console.log(response)
  }

  //Get data in search button
  searchBlogPostProp = (event) =>  {
    this.setState({searchQuery: event.target.value});
  }

  render(){

    //Function to remove case insensitivity of data in search button
    let filtered = this.state.blogPosts.filter(
      (blog) => {
          return (blog.data.title.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) !== -1 ||
                 blog.data.writer.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) !== -1 ||
                 blog.data.catagories.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) !== -1)
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
                  searchProp={this.searchBlogPostProp}
                  userControl={this.state.user}
                />
                <Header />
                <Blogs getPopulerBlogPosts={filtered}/>
                <Footer userControl={this.state.user}/>
              </div>
            }/>

            <Route path="/blog/" element={
              <div>
                <Layout 
                  searchProp={this.searchBlogPostProp}
                  userControl={this.state.user}
                />
                <Blog 
                  getPopulerBlogPosts={filtered}
                  searchProp={this.searchBlogPostProp}
                />
                <Footer userControl={this.state.user}/>
              </div>
            }/>

            <Route path="/register/" element={
              <div>
                <Layout
                  searchProp={this.searchBlogPostProp}
                  userControl={this.state.user}
                />
                <Register /> 
              </div>
            }/>

            <Route path="/login/" element={
              <div>
                <Layout
                  searchProp={this.searchBlogPostProp}
                  userControl={this.state.user}
                />
                <Login /> 
              </div>
            }/>

            <Route path='/account/' element={
              this.state.user ? 
              (<div>
                <Layout
                  searchProp={this.searchBlogPostProp}
                  userControl={this.state.user}
                />
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