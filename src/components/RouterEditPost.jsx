import React from "react";
import {useParams} from "react-router-dom";
import EditBlogPost from "./EditBlogPost";

const RouterEditPost = () => {
  let {id} = useParams();

  return <EditBlogPost id={id}/>;
}

export default RouterEditPost;
