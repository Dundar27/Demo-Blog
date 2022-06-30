import React from 'react';
import { Button } from "react-bootstrap";

const SearchBar = (props) => { 

    function handleForSubmit(event){
        event.preventDefault();
    }

    return(
        <form className="d-flex mx-3" onSubmit={handleForSubmit} id="searchBar-component">
            <input className="form-control me-2" type="text" placeholder="Search..."  onChange={props.searchProp}/>
            <div className="d-flex">
                <Button variant="primary" className='mx-1'>
                    <i class="fa fa-search text-light"></i>
                </Button>
            </div>
        </form>
    );
}

export default SearchBar;