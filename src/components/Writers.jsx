import React from "react";
import SearchBar from './SearchBar';

class Writers extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className="p-4" id="writers-component">
        <div className='my-5'>
          <h1>Welcome To Our Blog Page</h1>
          <hr /> <p><i>You can find a lot of writers on the writers page</i></p>
        </div>

        <SearchBar />

        <div>
        
        </div>
      </div>
    );
  }
}

export default Writers;