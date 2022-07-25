import React from "react";
import { useParams } from "react-router-dom";
import Profile from "./Profile";

const Router = (props) => {

  let {username} = useParams();

  return (
    <Profile 
      username = {username}
      userControl={props.userControl}
      searchProp={props.searchProp}
    >
  );
}

export default Router;