import React from "react";
import { v4 as uuidv4 } from 'uuid';

const CatagoriesList = (props) => {

  const id = uuidv4();

  return(
    <div>
      <ul className="my-3">
        {props.catagories.map((catagori)=> (<li key={id} className="btn btn-dark text-light mx-2">{catagori}</li>))}
      </ul>
    </div>
  );
}

export default CatagoriesList; 