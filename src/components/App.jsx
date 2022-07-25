import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//Components
import Navbar from './Navbar';
import Footer from './Footer';
import Slider from './Slider';
import MainSection from './MainSection';
import Settings from './Settings';
import Router from './RouterProfile';
import Blog from './Blog';
import CatagoriesList from './CatagoriesList';
import RouterCatagori from "./RouterCatagori";
import Register from './Register';
import Login from './Login';
import NoPage from './NoPage';
import PasswordReset from './PasswordReset';
import Contact from './Contact';
import Verification from './Verification';
import CreateBlogPost from './CreateBlogPost';
import EditBlogPost from './EditBlogPost';
import PrivacyPolicy from './PrivacyPolicy';
import Writers from './Writers';
//Style files
import './style.css';
//Database functions
import db, { auth } from './Firebase';
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  limit,
} from 'firebase/firestore';
import CatagoriesList from './CatagoriesList';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      populerBlogPosts: [],
      blogPosts: [], //To keep data of blog cards
      searchQuery: '', // To filter blog cards
      user: false,
    };
  }

  componentDidMount() {
    this.getBlogPosts();
    this.getPopulerBlogPosts();
    this.authListener();
  }

  //Check if the user is logged in
  authListener() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: false });
      }
    });
  }

  // Function to get blog data from firebase database
  async getBlogPosts() {
    const response = await onSnapshot(
      query(collection(db, 'blogs')),
      (snapshop) =>
        this.setState({
          blogPosts: snapshop.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          })),
        })
    );
  }

  // Function to get blog data from firebase database
  async getPopulerBlogPosts() {
    const response = await onSnapshot(
      query(collection(db, 'blogs'), orderBy('like'), limit(4)),
      (snapshop) =>
        this.setState({
          populerBlogPosts: snapshop.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          })),
        })
    );
  }

  //Get data in search button
  searchBlogPostProp = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  render() {
    //Function to remove case insensitivity of data in search button
    let filtered = this.state.blogPosts
      .filter((blog) => {
        return (
          blog.data.title
            .toLowerCase()
            .indexOf(this.state.searchQuery.toLowerCase()) !== -1 ||
          blog.data.writer
            .toLowerCase()
            .indexOf(this.state.searchQuery.toLowerCase()) !== -1 ||
          blog.data.catagories
            .toLowerCase()
            .indexOf(this.state.searchQuery.toLowerCase()) !== -1
        );
      })
      .sort((a, b) => {
        return a.id < b.id ? 1 : a.id > b.id ? -1 : 0;
      });

    return (
      <BrowserRouter>
        <Navbar userControl={this.state.user} />
        <Routes>
          <Route
            path="/"
            exact
            element={
              <div>
                <Slider />
                <MainSection getPopulerBlogPosts={filtered} />
                <Footer userControl={this.state.user} />
              </div>
            }
          />

          <Route
            path="/blog/"
            element={
              <div>
                <Blog
                  getBlogPosts={filtered}
                  searchProp={this.searchBlogPostProp}
                />
                <Footer userControl={this.state.user} />
              </div>
            }
          />

          <Route
            path="/blog/catagories/"
            element={
              <CatagoriesList
                catagories={this.state.blogPosts.map(
                  (catagori) => catagori.data.catagories
                )}
              />
            }
          />

          <Route
            path="/blog/catagories/:catagorie"
            element={
              <RouterCatagori
                catagories={this.state.blogPosts.map(
                  (catagori) => catagori.data.catagories
                )}
              />
            }
          />

          <Route
            path="/blog/create-post/"
            element={
              this.state.user ? (
                auth.currentUser.emailVerified ? (
                  <div>
                    <CreateBlogPost />
                  </div>
                ) : (
                  <div>
                    <Verification />
                  </div>
                )
              ) : (
                <div>
                  <Login />
                </div>
              )
            }
          />

          <Route
            path={`/blog/edit-post/`}
            element={
              this.state.user ? (
                auth.currentUser.emailVerified ? (
                  <div>
                    <EditBlogPost />
                  </div>
                ) : (
                  <div>
                    <Verification />
                  </div>
                )
              ) : (
                <div>
                  <Login />
                </div>
              )
            }
          />

          <Route
            path="/register/"
            element={
              this.state.user ? (
                <div>
                  <NoPage />
                </div>
              ) : (
                <div>
                  <Register />
                </div>
              )
            }
          />

          <Route
            path="/verification/"
            element={
              this.state.user ? (
                <div>
                  <Verification />
                </div>
              ) : (
                <div>
                  <Login />
                </div>
              )
            }
          />

          <Route
            path="/login/"
            element={
              this.state.user ? (
                <div>
                  <NoPage />
                </div>
              ) : (
                <div>
                  <Login />
                </div>
              )
            }
          />

          <Route
            path="/passwordReset/"
            element={
              <div>
                <PasswordReset />
              </div>
            }
          ></Route>

          <Route
            path="/profile/:username"
            element={
              this.state.user ? (
                <div>
                  <Router
                    userControl={this.state.user}
                    searchProp={this.searchBlogPostProp}
                  />
                </div>
              ) : (
                <div>
                  <Login />
                </div>
              )
            }
          />

          <Route
            path="/profile/settings/"
            element={
              this.state.user ? (
                <div>
                  <Settings userControl={this.state.user} />
                </div>
              ) : (
                <div>
                  <Login />
                </div>
              )
            }
          />

          <Route
            path="/contact/"
            element={
              <div>
                <Contact />
                <Footer userControl={this.state.user} />
              </div>
            }
          />

          <Route
            path="/writers/"
            element={
              <div>
                <Writers />
                <Footer userControl={this.state.user} />
              </div>
            }
          />

          <Route
            path="/policys/"
            element={
              <div>
                <PrivacyPolicy />
                <Footer userControl={this.state.user} />
              </div>
            }
          />

          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    );
  }
}
export default App;
