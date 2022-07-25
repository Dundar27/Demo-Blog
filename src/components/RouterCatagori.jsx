import React, {useSatate} from "react";
import { useParams } from "react-router-dom";
import Catagori from "./Catasgori";

const RouterCatagorie = (props) => {

  let { catagori } = useParams();

  return(
    <div>
      <Catagori 
        catagori = {catagori}
      />
    </div>
  )
}

export default RouterCatagorie;