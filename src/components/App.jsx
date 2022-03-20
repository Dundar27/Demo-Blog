import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from './Layout';
import Header from './Header';
import NoPage from './NoPage';
import Blogs from './Blogs';
import Footer from './Footer';
import './style.css'

class App extends React.Component {
  render(){
    return (
        <BrowserRouter>
          <Routes>
              <Route path="/" exact element={<div><Layout searchBlogProp={this.serachBlog}/><Header /><Blogs /><Footer /></div>} />
              <Route path="*" element={<NoPage />} />
          </Routes> 
        </BrowserRouter>
    );
  }
}
export default App;