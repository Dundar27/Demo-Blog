import React from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

const CatagoriesList = (props) => {

  const id = uuidv4();

  return(
    <div className="p-5" id="catagories-list">
      <h2>Catagories List</h2>
      <ul className="my-5">
        {props.catagories.map((catagori)=> (
        <li key={id} className="btn btn-warning mx-2">
          <Link to={"/blog/catagories/"+catagori} className="text-dark">{catagori}</Link>
        </li>
        ))}
      </ul>
    </div>
  );
}

export default CatagoriesList; 