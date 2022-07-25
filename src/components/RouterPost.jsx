import React from "react";
import { useParams } from "react-router-dom";
import Post from "./Post";

const RouterPost = (props) => {
  let { id } = useParams();

  return (
    <div>
      <Post id={id}/>
    </div>
  )
}

export default RouterPost;