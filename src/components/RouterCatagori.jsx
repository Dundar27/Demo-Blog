import React from "react";
import { useParams } from "react-router-dom";
import Catagori from "./Catagori";

const RouterCatagori = (props) => {

  let { catagori } = useParams();

  return(
    <div>
      <Catagori 
        catagori = {catagori}
      />
    </div>
  )
}

export default RouterCatagori;