import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import { onSnapshot, query, collection, where } from 'firebase/firestore';
import db from "./Firebase";
import { Row, Col } from 'react-bootstrap';
import ProfileCard from './ProfileCard';
import SearchBar from './SearchBar';
import BlogPosts from './BlogPosts';

function CopyProfile(){
  
  const [userData, setUserData] = useState([]);
  const [userBlogPosts, setUserBlogPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  let { username } = useParams();
  
  useEffect(()=>{
    onSnapshot(query(collection(db, "users"), where("username", "==", username)), (snapshot)=> setUserData({
      userData: snapshop.docs.map((doc) => ({id: doc.id, data: doc.data()}))
    }));
    onSnapshot(query(collection(db, "blogs"), where("writer", "==", username)), (snapshot)=>  setUserBlogPosts({
      userBlogPosts: snapshop.docs.map((doc) => ({id: doc.id, data: doc.data()}))
    }));
  });
  
  function searchBlogPostProp(event){
    setSearchQuery({searchQuery: event.target.value});
  }
  
  let filtered = userBlogPosts.filter((blog) => {
        return (
          blog.data.title
            .toLowerCase()
            .indexOf(searchQuery.toLowerCase()) !== -1
        );
      }).sort((a, b) => {
        return a.id < b.id ? 1 : a.id > b.id ? -1 : 0;
      });
  
  return(
    <div>
      <div className="p-5">
          <Row>
            <Col sm={3}>
              <ProfileCard userData={userData} />
            </Col>
            <Col sm={9}>
              <div>
                <h4>Abouth Me</h4> <br />
                <p>
                  {userData.map((user) => user.data.usermessage)}
                </p>
                <br />
              </div>
              <div>
                <h4>My Blog Posts</h4> <hr />
                <SearchBar searchProp={searchBlogPostProp()} />
                <BlogPosts BlogPosts={filtered} />
              </div>
            </Col>
          </Row>
        </div>
    </div>
  )
}

export default CopyProfile;
