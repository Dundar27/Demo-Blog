import React from 'react';

const SearchBar = (props) => { 

    function handleForSubmit(event){
        event.preventDefault();
    }

    return(
        <form className="d-flex mx-3" onSubmit={handleForSubmit}>
            <input className="form-control me-2" type="text" placeholder="Search"  onChange={props.searchProp}/>
            <div className="d-flex">
                <button className="btn btn-primary mx-1" type="submit">
                    <i class="fa fa-search"></i>
                </button>
            </div>
        </form>
    );
}

export default SearchBar;