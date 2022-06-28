import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//Components
import Navbar from "./Navbar";
import Footer from "./Footer";
import Slider from "./Slider";
import MainSection from "./MainSection";
import Settings from "./Settings";
import Profile from "./Profile";
import Blog from "./Blog";
import Register from "./Register";
import Login from "./Login";
import NoPage from "./NoPage";
//Style files
import "./style.css"
//Database functions
import db, { auth } from "./Firebase";
import {collection, query, onSnapshot, orderBy, limit} from "firebase/firestore";

class App extends React.Component {

  constructor(props){
    super(props);
    this.state= {
      populerBlogPosts: [],   
      blogPosts: [],  //To keep data of blog cards
      searchQuery: "", // To filter blog cards
      user: false
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
        this.setState({user});
      }
      else{
        this.setState({user: false});
      }
    })
  }

  // Function to get blog data from firebase database
  async getBlogPosts() {
    const response = await onSnapshot(query(collection(db, 'blogs')), snapshop => this.setState({blogPosts: snapshop.docs.map(doc => ({
      id:doc.id,data:doc.data()
    }))}));
  }

  // Function to get blog data from firebase database
  async getPopulerBlogPosts() {
    const response = await onSnapshot(query(collection(db, 'blogs'), orderBy('like'), limit(4)), snapshop => this.setState({populerBlogPosts: snapshop.docs.map(doc => ({
      id:doc.id,data:doc.data()
    }))}));
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
                <Navbar 
                  searchProp={this.searchBlogPostProp}
                  userControl={this.state.user}
                />
                <Slider />
                <MainSection getPopulerBlogPosts={filtered}/>
                <Footer userControl={this.state.user}/>
              </div>
            }/>

            <Route path="/blog/" element={
              <div>
                <Navbar 
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
              this.state.user ?
              (<div>
                <Navbar
                  searchProp={this.searchBlogPostProp}
                  userControl={this.state.user}
                />
                <NoPage /> 
              </div>) : 
              (<div>
                <Navbar
                  searchProp={this.searchBlogPostProp}
                  userControl={this.state.user}
                />
                <Register /> 
              </div>)}
            />

            <Route path="/login/" element={
              this.state.user ?
              (<div>
                <Navbar
                  searchProp={this.searchBlogPostProp}
                  userControl={this.state.user}
                />
                <NoPage /> 
              </div>) : 
              (<div>
                <Navbar
                  searchProp={this.searchBlogPostProp}
                  userControl={this.state.user}
                />
                <Login /> 
              </div>)}
            />

            <Route path='/profile/' element={
              this.state.user ? 
              (<div>
                <Navbar
                  searchProp={this.searchBlogPostProp}
                  userControl={this.state.user}
                />
                <Profile userControl={this.state.user}/>
              </div>) :
              (<div>
                <Navbar/>
                <Login/>
              </div>)
            }/>

            <Route path='/profiles/' element={
              <div>
                <NoPage/>
              </div>
            }/>

            <Route path='/profile/settings/' element={
              this.state.user ? 
              (<div>
                <Navbar
                  searchProp={this.searchBlogPostProp}
                  userControl={this.state.user}
                />
                <Settings userControl={this.state.user}/>
              </div>) :
              (<div>
                <Navbar/>
                <Login/>
              </div>)}
            /> 

            <Route path="*" element={<NoPage />} />
            
          </Routes> 
        </BrowserRouter>
    );
  }
}
export default App;